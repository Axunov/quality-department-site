"use client";

import { useEffect, useRef, useState } from "react";
import { matchesSurveyGroup, studyModes, studyMode, type StudyMode } from "@/lib/surveyGroupSearch";
import { surveyJourney } from "@/data/surveyJourney";
import { useRouter } from "@/i18n/routing";
import { localizedTeacherSurvey } from "@/data/teacherSurvey";

type Teacher = {
  id: string;
  teacher_id: string;
  subject: string | null;
  teachers: { full_name: string } | { full_name: string }[] | null;
};
type Group = { id:string; name:string };

type TeacherAnswer = {
  teacherId: string;
  ratings: number[];
  violation: string;
  comment: string;
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
    group: "Выберите свою учебную группу", open: "Открыть анкету",
    error: "Не удалось открыть или отправить опрос. Попробуйте ещё раз.",
    success: "Спасибо! Анонимная анкета успешно отправлена.",
    successText:
      "Анкета принята. Содержание ответов не связано с вашими личными данными.",
    cabinet: "Вернуться на сайт",
  },
  uz: {
    eyebrow: "Anonim sörov",
    title: "Öqituvçi talaba nigohida",
    intro:
      "Öqituvçilarni xolis baholang. Javoblar anonim saqlanadi va faqat ta’lim sifatini oşiriş uçun işlatiladi.",
    loading: "Sörov tayyorlanmoqda…",
    teacher: "Öqituvçi",
    scale: "5 — töliq qöşilaman, 1 — mutlaqo qöşilmayman.",
    violation:
      "Mazkur öqituvçi faoliyatida ma’muriyat e’tiborini talab qiladigan holatlar bölganmi?",
    choose: "Variantni tanlang",
    comment: "Öqituvçi haqida izoh (ixtiyoriy)",
    general: "Umumiy savollar",
    satisfaction: "Joriy semestrdagi öqitiş sifatidan umuman qay darajada qoniqasiz?",
    suggestions: "Öqitiş sifatini oşiriş böyiça takliflaringiz (ixtiyoriy)",
    submit: "Anketani yuboriş",
    required: "Barça majburiy savollarga javob bering.",
    noTeachers: "Guruhingiz uçun öqituvçilar hali kiritilmagan.",
    group: "Öquv guruhingizni tanlang", open: "Sörovni oçiş",
    error: "Sörovni oçib yoki yuborib bölmadi. Qayta urinib köring.",
    success: "Rahmat! Anonim anketa muvaffaqiyatli yuborildi.",
    successText:
      "Sörov qabul qilindi. Javoblar şaxsiy ma’lumotlaringiz bilan boğlanmaydi.",
    cabinet: "Saytga qaytiş",
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
    group: "Select your study group", open: "Open survey",
    error: "Unable to open or submit the survey. Please try again.",
    success: "Thank you! Your anonymous survey was submitted.",
    successText:
      "The survey was accepted. Your answers are not linked to your personal details.",
    cabinet: "Return to website",
  },
} as const;

export default function TeacherSurveyForm({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[lang];
  const ui = surveyJourney[lang];
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const surveyText = localizedTeacherSurvey[lang];
  const router = useRouter();
  const started = useRef(false);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const groupCopy = {
    ru: { query:"Поиск группы по номеру или названию", mode:"Форма обучения", all:"Все формы", full:"Очная", part:"Заочная", distance:"Дистанционная", other:"Не указана", none:"Нет групп по выбранным условиям. Измените поиск или форму обучения.", found:"Групп найдено" },
    uz: { query:"Guruh raqami yoki nomi böyiça qidiriş", mode:"Ta’lim şakli", all:"Barça şakllar", full:"Kunduzgi", part:"Sirtqi", distance:"Masofaviy", other:"Körsatilmagan", none:"Guruh topilmadi. Qidiruvni yoki ta’lim şaklini özgartiring.", found:"Topilgan guruhlar" },
    en: { query:"Find a group by number or name", mode:"Study mode", all:"All modes", full:"Full-time", part:"Part-time", distance:"Distance learning", other:"Unspecified", none:"No groups match. Change the search or study mode.", found:"Groups found" },
  }[lang];
  const [searchGroup, setSearchGroup] = useState("");
  const [mode, setMode] = useState<StudyMode | "all">("all");
  const [groups,setGroups]=useState<Group[]>([]),[groupId,setGroupId]=useState("");
  const [answers, setAnswers] = useState<TeacherAnswer[]>([]);
  const [satisfaction, setSatisfaction] = useState(0);
  const [suggestions, setSuggestions] = useState("");
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const visibleGroups = groups.filter(g => (mode === "all" || studyMode(g.name) === mode) && matchesSurveyGroup(g.name, searchGroup));

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    async function loadGroups() {
      const response = await fetch("/api/student/survey/start", {
        method: "POST",
        headers:{"Content-Type":"application/json"},body:"{}",
      });
      if (!response.ok) {
        setMessage(t.error);
        setBusy(false);
        return;
      }
      const result=(await response.json()) as {groups?:Group[]};setGroups(result.groups||[]);setBusy(false);
    }
    void loadGroups().catch(() => { setMessage(t.error); setBusy(false); });
  }, [t.error]);

  async function loadSurvey(){if(!groupId)return;setBusy(true);setMessage("");const response=await fetch("/api/student/survey/start",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({groupId})});if(!response.ok){setMessage(t.error);setBusy(false);return;}const result=await response.json() as {teachers?:Teacher[]};const list=result.teachers||[];
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
    const response = await fetch("/api/student/survey/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale: lang,
        groupId,
        answers,
        finalSatisfaction: satisfaction,
        finalSuggestions: suggestions.trim() || null,
      }),
    });
    setBusy(false);

    if (!response.ok) {
      setMessage(t.error);
      return;
    }

    setDone(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function move(next: number) {
    setMessage("");
    setStep(next);
    requestAnimationFrame(() => stepHeading.current?.focus());
  }

  function next() {
    const answer = answers[step];
    if (!answer || answer.ratings.some(rating => rating < 0) || !answer.violation) {
      setMessage(t.required);
      return;
    }
    move(step + 1);
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
            onClick={() => router.replace("/")}
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

        {teachers.length === 0 && <section className="campus-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="min-w-0 text-sm font-bold">{groupCopy.query}<input type="search" disabled={busy} maxLength={80} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3" value={searchGroup} onChange={event => { setSearchGroup(event.target.value); setGroupId(""); setMessage(""); }} /></label>
            <label className="min-w-0 text-sm font-bold">{groupCopy.mode}<select className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3" value={mode} disabled={busy} onChange={event => { setMode(event.target.value as StudyMode | "all"); setGroupId(""); setMessage(""); }}>
              <option value="all">{groupCopy.all}</option>{studyModes.map(value => <option key={value} value={value}>{groupCopy[value]}</option>)}
            </select></label>
          </div>
          {!busy && groups.length > 0 && <p className="mt-3 text-sm text-slate-600" role="status">{visibleGroups.length ? `${groupCopy.found}: ${visibleGroups.length}` : groupCopy.none}</p>}
          <label className="mt-4 block text-sm font-black">{t.group}<select value={groupId} disabled={busy || !visibleGroups.length} onChange={e => { setGroupId(e.target.value); setMessage(""); }} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3">
            <option value="">—</option>{visibleGroups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
          </select></label>
          <button type="button" disabled={!groupId || busy} onClick={() => void loadSurvey().then(() => requestAnimationFrame(() => stepHeading.current?.focus())).catch(() => { setMessage(t.error); setBusy(false); })} className="mt-4 w-fit rounded-xl bg-blue-700 px-6 py-3 font-black text-white disabled:opacity-50">{t.open}</button>
        </section>}

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
              onClick={() => router.replace("/")}
              className="mt-5 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white"
            >
              {t.cabinet}
            </button>
          </section>
        )}

        {teachers.length > 0 && <section className="form-journey">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold">
            <span>{step < teachers.length ? `${t.teacher} ${step + 1}/${teachers.length}` : t.general}</span>
            <span>{step + 1}/{teachers.length + 1}</span>
          </div>
          <progress className="journey-progress" max={teachers.length + 1} value={step + 1} aria-label={ui.progress} />
        </section>}

        {teachers.map((teacher, teacherIndex) => {
          if (teacherIndex !== step) return null;
          const relation = Array.isArray(teacher.teachers)
            ? teacher.teachers[0]
            : teacher.teachers;

          return (
            <section
              key={teacher.id}
              className="step-enter rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">
                {t.teacher} {teacherIndex + 1}/{teachers.length}
              </p>
              <h2 ref={stepHeading} tabIndex={-1} className="mt-2 scroll-mt-36 break-words text-2xl font-black text-slate-900">
                {relation?.full_name}
              </h2>
              {teacher.subject && (
                <p className="mt-1 text-slate-500">{teacher.subject}</p>
              )}
              <p className="mt-3 text-sm font-semibold text-blue-700">{t.scale}</p>

              <div className="mt-6 space-y-6">
                {surveyText.questions.map((question, questionIndex) => (
                  <fieldset key={question} className="min-w-0">
                    <legend className="max-w-full break-words font-semibold leading-6 text-slate-800">
                      {questionIndex + 1}. {question}
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                      {[5, 4, 3, 2, 1, 0].map((value) => (
                        <label
                          key={value}
                          className={`min-w-0 cursor-pointer break-words rounded-xl border p-3 text-center text-sm transition focus-within:ring-2 focus-within:ring-blue-500 ${
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

        {teachers.length > 0 && step === teachers.length && (
          <section className="step-enter rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 ref={stepHeading} tabIndex={-1} className="scroll-mt-36 text-2xl font-black text-slate-900">{t.general}</h2>

            <fieldset className="mt-5 block font-semibold text-slate-800">
              <legend>{t.satisfaction}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {[5, 4, 3, 2, 1].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={satisfaction === value}
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
            </fieldset>

            <label className="mt-6 block font-semibold text-slate-800">
              {t.suggestions}
              <textarea
                maxLength={3000}
                value={suggestions}
                onChange={(event) => setSuggestions(event.target.value)}
                className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>

          </section>
        )}
        {teachers.length > 0 && <div className="survey-actions">
          {message && <p role="alert" className="mb-3 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-900">{message}</p>}
          <div className="flex gap-3">
            {step > 0 && <button type="button" disabled={busy} onClick={() => move(step - 1)} className="rounded-xl border border-slate-300 px-5 py-3 font-bold disabled:opacity-50">{ui.back}</button>}
            {step < teachers.length
              ? <button type="button" onClick={next} className="flex-1 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">{ui.next}</button>
              : <button type="button" disabled={busy} onClick={() => void submit().catch(() => { setMessage(t.error); setBusy(false); })} className="flex-1 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white disabled:opacity-50">{busy ? t.loading : t.submit}</button>}
          </div>
        </div>}
      </div>
    </main>
  );
}
