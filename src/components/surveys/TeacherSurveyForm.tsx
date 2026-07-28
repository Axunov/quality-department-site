"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { localizedTeacherSurvey } from "@/data/teacherSurvey";
import { readStudentPortalToken } from "@/lib/studentPortal";

type Teacher = {
  id: string;
  teacher_id: string;
  subject: string | null;
  teachers: { full_name: string } | { full_name: string }[] | null;
};

type TeacherAnswer = {
  teacherId: string;
  ratings: number[];
  violation: string;
  comment: string;
};

type AnonymousSession = {
  session_token: string;
  completion_receipt: string;
  resolved_group_id: string;
};

const content = {
  ru: {
    eyebrow: "Анонимный опрос",
    title: "Преподаватель глазами студента",
    intro:
      "Оцените преподавателей объективно. Ответы сохраняются анонимно и используются только для повышения качества образования.",
    loading: "Подготавливаем анкету…",
    teacher: "Преподаватель",
    scale: "5 — полностью согласен, 1 — совершенно не согласен.",
    violation:
      "Возникали ли в работе данного преподавателя ситуации, требующие внимания администрации?",
    choose: "Выберите вариант",
    comment: "Комментарий о преподавателе (необязательно)",
    general: "Общие вопросы",
    satisfaction:
      "Насколько в целом Вы удовлетворены качеством преподавания в текущем семестре?",
    suggestions:
      "Какие предложения Вы хотели бы внести для повышения качества преподавания? (необязательно)",
    submit: "Отправить анкету",
    required: "Ответьте на все обязательные вопросы.",
    noTeachers: "Для вашей группы преподаватели пока не добавлены.",
    error: "Не удалось открыть опрос. Вернитесь в личный кабинет и попробуйте ещё раз.",
    success: "Спасибо! Анонимная анкета успешно отправлена.",
    successText:
      "В личном кабинете статус опроса изменён на «Опрос завершён». Содержание ответов не связано с вашими личными данными.",
    cabinet: "Вернуться в личный кабинет",
  },
  uz: {
    eyebrow: "Anonim so‘rov",
    title: "O‘qituvchi talaba nigohida",
    intro:
      "O‘qituvchilarni xolis baholang. Javoblar anonim saqlanadi va faqat ta’lim sifatini oshirish uchun ishlatiladi.",
    loading: "So‘rov tayyorlanmoqda…",
    teacher: "O‘qituvchi",
    scale: "5 — to‘liq qo‘shilaman, 1 — mutlaqo qo‘shilmayman.",
    violation:
      "Mazkur o‘qituvchi faoliyatida ma’muriyat e’tiborini talab qiladigan holatlar bo‘lganmi?",
    choose: "Variantni tanlang",
    comment: "O‘qituvchi haqida izoh (ixtiyoriy)",
    general: "Umumiy savollar",
    satisfaction: "Joriy semestrdagi o‘qitish sifatidan umuman qay darajada qoniqasiz?",
    suggestions: "O‘qitish sifatini oshirish bo‘yicha takliflaringiz (ixtiyoriy)",
    submit: "Anketani yuborish",
    required: "Barcha majburiy savollarga javob bering.",
    noTeachers: "Guruhingiz uchun o‘qituvchilar hali kiritilmagan.",
    error: "So‘rovni ochib bo‘lmadi. Shaxsiy kabinetga qaytib, yana urinib ko‘ring.",
    success: "Rahmat! Anonim anketa muvaffaqiyatli yuborildi.",
    successText:
      "Shaxsiy kabinetda so‘rov holati «So‘rov yakunlangan» deb o‘zgartirildi. Javoblar shaxsiy ma’lumotlaringiz bilan bog‘lanmaydi.",
    cabinet: "Shaxsiy kabinetga qaytish",
  },
  en: {
    eyebrow: "Anonymous survey",
    title: "Teacher Through the Eyes of a Student",
    intro:
      "Please assess each teacher objectively. Answers are stored anonymously and used only to improve education quality.",
    loading: "Preparing the survey…",
    teacher: "Teacher",
    scale: "5 — strongly agree, 1 — strongly disagree.",
    violation: "Were there situations involving this teacher that require administrative attention?",
    choose: "Select an option",
    comment: "Comment about the teacher (optional)",
    general: "General questions",
    satisfaction: "How satisfied are you overall with teaching quality this semester?",
    suggestions: "Your suggestions for improving teaching quality (optional)",
    submit: "Submit survey",
    required: "Answer all required questions.",
    noTeachers: "No teachers have been added for your group yet.",
    error: "Unable to open the survey. Return to your account and try again.",
    success: "Thank you! Your anonymous survey was submitted.",
    successText:
      "Your account now shows the survey as completed. Your answers are not linked to your personal details.",
    cabinet: "Return to student account",
  },
} as const;

export default function TeacherSurveyForm({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[lang];
  const surveyText = localizedTeacherSurvey[lang];
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const started = useRef(false);

  const [sessionToken, setSessionToken] = useState("");
  const [completionReceipt, setCompletionReceipt] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [answers, setAnswers] = useState<TeacherAnswer[]>([]);
  const [satisfaction, setSatisfaction] = useState(0);
  const [suggestions, setSuggestions] = useState("");
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const portalToken = readStudentPortalToken();
    if (!portalToken) {
      router.replace("/student/login");
      return;
    }

    async function loadSurvey() {
      const { data: sessionData, error: sessionError } = await supabase.rpc(
        "begin_teacher_survey_from_portal",
        { p_portal_token: portalToken },
      );
      const session = sessionData?.[0] as AnonymousSession | undefined;

      if (sessionError || !session) {
        setMessage(t.error);
        setBusy(false);
        return;
      }

      const { data, error } = await supabase
        .from("survey_group_teachers")
        .select("id,teacher_id,subject,teachers:survey_teachers(full_name)")
        .eq("group_id", session.resolved_group_id)
        .eq("active", true)
        .order("sort_order");

      if (error) {
        setMessage(t.error);
        setBusy(false);
        return;
      }

      const list = (data || []) as unknown as Teacher[];
      setSessionToken(session.session_token);
      setCompletionReceipt(session.completion_receipt);
      setTeachers(list);
      setAnswers(
        list.map((item) => ({
          teacherId: item.teacher_id,
          ratings: Array(surveyText.questions.length).fill(-1),
          violation: "",
          comment: "",
        })),
      );
      if (list.length === 0) setMessage(t.noTeachers);
      setBusy(false);
    }

    void loadSurvey();
  }, [router, supabase, surveyText.questions.length, t.error, t.noTeachers]);

  function updateRating(teacherIndex: number, questionIndex: number, value: number) {
    setAnswers((current) =>
      current.map((answer, index) =>
        index === teacherIndex
          ? {
              ...answer,
              ratings: answer.ratings.map((rating, qIndex) =>
                qIndex === questionIndex ? value : rating,
              ),
            }
          : answer,
      ),
    );
  }

  async function submit() {
    const incomplete =
      answers.some(
        (answer) =>
          answer.ratings.some((rating) => rating < 0) || !answer.violation,
      ) || satisfaction < 1;

    if (incomplete) {
      setMessage(t.required);
      return;
    }

    setBusy(true);
    setMessage("");
    const { error } = await supabase.rpc("submit_teacher_survey_anonymous", {
      p_session_token: sessionToken,
      p_completion_receipt: completionReceipt,
      p_locale: lang,
      p_answers: answers,
      p_final_satisfaction: satisfaction,
      p_final_suggestions: suggestions.trim() || null,
    });
    setBusy(false);

    if (error) {
      setMessage(t.error);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="container-main py-10 sm:py-16">
        <section className="mx-auto max-w-2xl rounded-[30px] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm sm:p-12">
          <div className="text-6xl text-emerald-700">✓</div>
          <h1 className="mt-5 text-3xl font-black text-emerald-950">{t.success}</h1>
          <p className="mt-4 leading-7 text-emerald-900">{t.successText}</p>
          <button
            type="button"
            onClick={() => router.replace("/student")}
            className="mt-7 rounded-2xl bg-emerald-700 px-7 py-4 font-black text-white hover:bg-emerald-800"
          >
            {t.cabinet}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="container-main py-8 sm:py-12">
      <div className="space-y-7">
        <header className="rounded-[28px] bg-gradient-to-br from-[#083b73] to-[#087d83] p-6 text-white shadow-xl sm:p-9">
          <p className="text-sm font-black uppercase tracking-[.18em] text-cyan-100">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-blue-50">{t.intro}</p>
        </header>

        {busy && teachers.length === 0 && (
          <section className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="font-semibold text-slate-600">{t.loading}</p>
          </section>
        )}

        {!busy && message && teachers.length === 0 && (
          <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-7 text-center">
            <p className="font-semibold text-amber-900">{message}</p>
            <button
              type="button"
              onClick={() => router.replace("/student")}
              className="mt-5 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
            >
              {t.cabinet}
            </button>
          </section>
        )}

        {teachers.map((teacher, teacherIndex) => {
          const relation = Array.isArray(teacher.teachers)
            ? teacher.teachers[0]
            : teacher.teachers;

          return (
            <section
              key={teacher.id}
              className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">
                {t.teacher} {teacherIndex + 1}/{teachers.length}
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                {relation?.full_name}
              </h2>
              {teacher.subject && (
                <p className="mt-1 text-slate-500">{teacher.subject}</p>
              )}
              <p className="mt-3 text-sm font-semibold text-blue-700">{t.scale}</p>

              <div className="mt-6 space-y-6">
                {surveyText.questions.map((question, questionIndex) => (
                  <fieldset key={question}>
                    <legend className="font-semibold leading-6 text-slate-800">
                      {questionIndex + 1}. {question}
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      {[5, 4, 3, 2, 1, 0].map((value) => (
                        <label
                          key={value}
                          className={`cursor-pointer rounded-xl border p-3 text-center text-sm transition ${
                            answers[teacherIndex]?.ratings[questionIndex] === value
                              ? "border-blue-700 bg-blue-700 text-white"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <input
                            className="sr-only"
                            type="radio"
                            name={`t${teacherIndex}q${questionIndex}`}
                            checked={
                              answers[teacherIndex]?.ratings[questionIndex] === value
                            }
                            onChange={() =>
                              updateRating(teacherIndex, questionIndex, value)
                            }
                          />
                          <span className="block text-lg font-black">
                            {value || "—"}
                          </span>
                          <span>{surveyText.ratingLabels[value]}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}

                <label className="block font-semibold text-slate-800">
                  9. {t.violation}
                  <select
                    value={answers[teacherIndex]?.violation || ""}
                    onChange={(event) =>
                      setAnswers((current) =>
                        current.map((answer, index) =>
                          index === teacherIndex
                            ? { ...answer, violation: event.target.value }
                            : answer,
                        ),
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                  >
                    <option value="">{t.choose}</option>
                    {surveyText.violations.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block font-semibold text-slate-800">
                  10. {t.comment}
                  <textarea
                    maxLength={2000}
                    value={answers[teacherIndex]?.comment || ""}
                    onChange={(event) =>
                      setAnswers((current) =>
                        current.map((answer, index) =>
                          index === teacherIndex
                            ? { ...answer, comment: event.target.value }
                            : answer,
                        ),
                      )
                    }
                    className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </label>
              </div>
            </section>
          );
        })}

        {teachers.length > 0 && (
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black text-slate-900">{t.general}</h2>

            <label className="mt-5 block font-semibold text-slate-800">
              {t.satisfaction}
              <div className="mt-3 flex flex-wrap gap-2">
                {[5, 4, 3, 2, 1].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSatisfaction(value)}
                    className={`h-12 w-12 rounded-xl border text-lg font-black ${
                      satisfaction === value
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </label>

            <label className="mt-6 block font-semibold text-slate-800">
              {t.suggestions}
              <textarea
                maxLength={3000}
                value={suggestions}
                onChange={(event) => setSuggestions(event.target.value)}
                className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>

            {message && (
              <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900">
                {message}
              </p>
            )}

            <button
              type="button"
              disabled={busy}
              onClick={submit}
              className="mt-6 w-full rounded-xl bg-emerald-700 px-6 py-4 text-lg font-black text-white hover:bg-emerald-800 disabled:opacity-50"
            >
              {busy ? t.loading : t.submit}
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
