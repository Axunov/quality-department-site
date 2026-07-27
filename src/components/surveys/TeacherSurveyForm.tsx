"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  localizedTeacherSurvey,
} from "@/data/teacherSurvey";

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
  resolved_group_name: string;
};

const text = {
  ru: {
    title: "Преподаватель глазами студента",
    intro:
      "Анкета проводится для повышения качества образования. Оцените преподавателей объективно. Опрос полностью анонимный, результаты используются только в обобщённом виде.",
    studentId: "Student ID",
    studentIdHint: "Введите постоянный ID в формате STU-0001.",
    group: "Ваша группа",
    choose: "Выберите группу",
    load: "Начать анонимный опрос",
    loading: "Загрузка…",
    privacy:
      "Student ID используется только для проверки права участия. После начала создаётся отдельная анонимная сессия. Ф.И.О. и Student ID не передаются в ответы.",
    teacher: "Преподаватель",
    scale: "5 — полностью согласен, 1 — совершенно не согласен.",
    violation:
      "Возникали ли в работе данного преподавателя ситуации, требующие внимания администрации?",
    comment: "Комментарий о преподавателе (необязательно)",
    generalSatisfaction:
      "Насколько в целом Вы удовлетворены качеством преподавания в текущем семестре?",
    suggestions:
      "Какие предложения Вы хотели бы внести для повышения качества преподавания? (необязательно)",
    submit: "Отправить анкету",
    required: "Ответьте на все оценочные вопросы.",
    noTeachers: "Для этой группы преподаватели пока не добавлены.",
    success: "Спасибо! Анонимная анкета успешно отправлена.",
    receipt: "Квитанция о завершении",
    receiptHint: "Сохраните номер квитанции до окончания периода опроса.",
    error: "Не удалось продолжить. Проверьте Student ID и попробуйте ещё раз.",
  },
  uz: {
    title: "O‘qituvchi talaba nigohida",
    intro:
      "So‘rov ta’lim sifatini oshirish maqsadida o‘tkaziladi. O‘qituvchilarni xolis baholang. So‘rov to‘liq anonim bo‘lib, natijalar faqat umumlashtirilgan holda qo‘llanadi.",
    studentId: "Student ID",
    studentIdHint: "STU-0001 formatidagi doimiy ID raqamingizni kiriting.",
    group: "Sizning guruhingiz",
    choose: "Guruhni tanlang",
    load: "Anonim so‘rovni boshlash",
    loading: "Yuklanmoqda…",
    privacy:
      "Student ID faqat ishtirok etish huquqini tekshirish uchun ishlatiladi. So‘rov uchun alohida anonim sessiya yaratiladi. F.I.Sh. va Student ID javoblarga uzatilmaydi.",
    teacher: "O‘qituvchi",
    scale: "5 — to‘liq qo‘shilaman, 1 — mutlaqo qo‘shilmayman.",
    violation: "Mazkur o‘qituvchi faoliyatida ma’muriyat e’tiborini talab qiladigan holatlar bo‘lganmi?",
    comment: "O‘qituvchi haqida izoh (ixtiyoriy)",
    generalSatisfaction: "Joriy semestrdagi o‘qitish sifatidan umuman qay darajada qoniqasiz?",
    suggestions: "O‘qitish sifatini oshirish bo‘yicha takliflaringiz (ixtiyoriy)",
    submit: "Anketani yuborish",
    required: "Barcha baholash savollariga javob bering.",
    noTeachers: "Bu guruh uchun o‘qituvchilar hali kiritilmagan.",
    success: "Rahmat! Anonim anketa muvaffaqiyatli yuborildi.",
    receipt: "Yakunlanganlik kvitansiyasi",
    receiptHint: "So‘rov muddati tugaguniga qadar kvitansiya raqamini saqlang.",
    error: "Davom etib bo‘lmadi. Student ID ni tekshirib, qayta urinib ko‘ring.",
  },
  en: {
    title: "Teacher Through the Eyes of a Student",
    intro:
      "This anonymous survey helps improve education quality. Please assess each teacher objectively. Results are used only in aggregate.",
    studentId: "Student ID",
    studentIdHint: "Enter your permanent ID in the STU-0001 format.",
    group: "Your group",
    choose: "Select a group",
    load: "Start anonymous survey",
    loading: "Loading…",
    privacy:
      "Your Student ID is used only to confirm eligibility. A separate anonymous session is then created. Your name and Student ID are never sent with your answers.",
    teacher: "Teacher",
    scale: "5 — strongly agree, 1 — strongly disagree.",
    violation: "Were there situations involving this teacher that require the administration’s attention?",
    comment: "Comment about the teacher (optional)",
    generalSatisfaction: "How satisfied are you overall with teaching quality this semester?",
    suggestions: "Your suggestions for improving teaching quality (optional)",
    submit: "Submit survey",
    required: "Answer all rating questions.",
    noTeachers: "No teachers have been added for this group yet.",
    success: "Thank you! Your anonymous survey was submitted.",
    receipt: "Completion receipt",
    receiptHint: "Keep the receipt number until the survey period ends.",
    error: "Unable to continue. Check your Student ID and try again.",
  },
} as const;

export default function TeacherSurveyForm({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = text[lang];
  const surveyText = localizedTeacherSurvey[lang];
  const supabase = useMemo(() => createClient(), []);
  const [groupName, setGroupName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [completionReceipt, setCompletionReceipt] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [answers, setAnswers] = useState<TeacherAnswer[]>([]);
  const [satisfaction, setSatisfaction] = useState(0);
  const [suggestions, setSuggestions] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  async function startSurvey() {
    if (!studentId.trim()) return;
    setBusy(true);
    setMessage("");

    const { data: sessionData, error: sessionError } = await supabase.rpc(
      "begin_teacher_survey_by_student_id",
      { p_student_identifier: studentId.trim().toUpperCase() },
    );

    if (sessionError) {
      setLoaded(false);
      setMessage(`${t.error} ${sessionError.message}`);
      setBusy(false);
      return;
    }

    const session = (sessionData?.[0] || null) as AnonymousSession | null;
    if (!session) {
      setLoaded(false);
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
      setTeachers([]);
      setAnswers([]);
      setLoaded(false);
      setMessage(`${t.error} ${error.message}`);
      setBusy(false);
      return;
    }

    const list = (data || []) as unknown as Teacher[];
    setGroupName(session.resolved_group_name);
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
    setLoaded(list.length > 0);
    if (list.length === 0) setMessage(t.noTeachers);
    setBusy(false);
  }

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
    setMessage(t.success);
  }

  if (done) {
    return (
      <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="text-5xl">✓</div>
        <h2 className="mt-4 text-2xl font-black text-emerald-900">{t.success}</h2>
        <p className="mt-6 text-sm font-bold uppercase tracking-[.14em] text-emerald-800">
          {t.receipt}
        </p>
        <p className="mx-auto mt-2 max-w-md rounded-xl border border-emerald-300 bg-white px-4 py-3 font-mono text-lg font-black text-emerald-950">
          {completionReceipt}
        </p>
        <p className="mt-3 text-sm text-emerald-800">{t.receiptHint}</p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="rounded-[28px] bg-gradient-to-br from-[#083b73] to-[#087d83] p-6 text-white shadow-xl sm:p-9">
        <p className="text-sm font-black uppercase tracking-[.18em] text-cyan-100">Анонимный опрос</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-blue-50">{t.intro}</p>
      </div>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="grid gap-5">
          <label className="font-bold text-slate-800">
            {t.studentId}
            <input
              value={studentId}
              onChange={(event) => setStudentId(event.target.value.toUpperCase())}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-mono uppercase outline-none focus:border-blue-600"
              placeholder="STU-0001"
              autoComplete="off"
              disabled={loaded}
            />
            <span className="mt-2 block text-xs font-normal text-slate-500">{t.studentIdHint}</span>
          </label>
        </div>
        <p className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950">
          {t.privacy}
        </p>
        {!loaded && (
          <button
            type="button"
            disabled={busy || !studentId.trim()}
            onClick={startSurvey}
            className="mt-5 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? t.loading : t.load}
          </button>
        )}
        {loaded && groupName && (
          <p className="mt-5 font-bold text-slate-800">
            {t.group}: <span className="text-blue-700">{groupName}</span>
          </p>
        )}
        {message && teachers.length === 0 && (
          <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900">
            {message}
          </p>
        )}
      </section>

      {loaded && teachers.map((teacher, teacherIndex) => {
        const relation = Array.isArray(teacher.teachers) ? teacher.teachers[0] : teacher.teachers;
        return (
          <section key={teacher.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">{t.teacher} {teacherIndex + 1}/{teachers.length}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">{relation?.full_name}</h2>
            {teacher.subject && <p className="mt-1 text-slate-500">{teacher.subject}</p>}
            <p className="mt-3 text-sm font-semibold text-blue-700">{t.scale}</p>

            <div className="mt-6 space-y-6">
              {surveyText.questions.map((question, questionIndex) => (
                <fieldset key={question}>
                  <legend className="font-semibold leading-6 text-slate-800">
                    {questionIndex + 1}. {question}
                  </legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {[5, 4, 3, 2, 1, 0].map((value) => (
                      <label key={value} className={`cursor-pointer rounded-xl border p-3 text-center text-sm transition ${answers[teacherIndex]?.ratings[questionIndex] === value ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 hover:border-blue-300"}`}>
                        <input
                          className="sr-only"
                          type="radio"
                          name={`t${teacherIndex}q${questionIndex}`}
                          checked={answers[teacherIndex]?.ratings[questionIndex] === value}
                          onChange={() => updateRating(teacherIndex, questionIndex, value)}
                        />
                        <span className="block text-lg font-black">{value || "—"}</span>
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
                  onChange={(event) => setAnswers((current) => current.map((answer, index) => index === teacherIndex ? { ...answer, violation: event.target.value } : answer))}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
                >
                  <option value="">{t.choose}</option>
                  {surveyText.violations.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="block font-semibold text-slate-800">
                10. {t.comment}
                <textarea
                  maxLength={2000}
                  value={answers[teacherIndex]?.comment || ""}
                  onChange={(event) => setAnswers((current) => current.map((answer, index) => index === teacherIndex ? { ...answer, comment: event.target.value } : answer))}
                  className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </label>
            </div>
          </section>
        );
      })}

      {teachers.length > 0 && (
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">Общие вопросы</h2>
          <label className="mt-5 block font-semibold text-slate-800">
            {t.generalSatisfaction}
            <div className="mt-3 flex flex-wrap gap-2">
              {[5, 4, 3, 2, 1].map((value) => (
                <button key={value} type="button" onClick={() => setSatisfaction(value)} className={`h-12 w-12 rounded-xl border text-lg font-black ${satisfaction === value ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300"}`}>{value}</button>
              ))}
            </div>
          </label>
          <label className="mt-6 block font-semibold text-slate-800">
            {t.suggestions}
            <textarea maxLength={3000} value={suggestions} onChange={(event) => setSuggestions(event.target.value)} className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3" />
          </label>
          {message && <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900">{message}</p>}
          <button type="button" disabled={busy} onClick={submit} className="mt-6 w-full rounded-xl bg-emerald-700 px-6 py-4 text-lg font-black text-white hover:bg-emerald-800 disabled:opacity-50">
            {busy ? t.loading : t.submit}
          </button>
        </section>
      )}
    </div>
  );
}
