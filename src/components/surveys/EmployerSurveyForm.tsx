"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Script from "next/script";
import { Building2, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import {
  cooperationOptions,
  employerSurveyText,
  graduateQualities,
  improvementOptions,
  programmeOptions,
  ratingItems,
  type SurveyLocale,
} from "@/data/employerSurvey";

type FormState = {
  organizationName: string;
  activityArea: string;
  respondentPosition: string;
  programmes: string[];
  otherProgramme: string;
  graduatesCount: string;
  curriculumParticipation: string;
  commissionParticipation: string;
  practiceParticipation: string[];
  graduateQualities: string[];
  ratings: number[];
  practiceRating: number;
  programmeRelevance: string;
  cooperationDirections: string[];
  improvementAreas: string[];
  demandedCompetencies: string;
  proposals: string;
  hiringReadiness: string;
  recommendationScore: number;
  cooperationReadiness: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  captchaToken: string;
  consent: boolean;
};

const initialState: FormState = {
  organizationName: "", activityArea: "", respondentPosition: "", programmes: [], otherProgramme: "", graduatesCount: "",
  curriculumParticipation: "", commissionParticipation: "", practiceParticipation: [], graduateQualities: [], ratings: Array(10).fill(0),
  practiceRating: 0, programmeRelevance: "", cooperationDirections: [], improvementAreas: [], demandedCompetencies: "",
  proposals: "", hiringReadiness: "", recommendationScore: -1, cooperationReadiness: "", contactName: "", contactPhone: "", contactEmail: "", captchaToken: "", consent: false,
};

declare global { interface Window { onEmployerTurnstileSuccess?: (token: string) => void; onEmployerTurnstileExpired?: () => void; turnstile?: { reset: () => void }; } }

function ToggleList({ options, values, onChange }: { options: string[]; values: string[]; onChange: (values: string[]) => void }) {
  return <div className="grid gap-2 sm:grid-cols-2">{options.map((option) => {
    const active = values.includes(option);
    return <label key={option} className={`cursor-pointer rounded-2xl border p-4 text-sm font-semibold transition ${active ? "border-blue-700 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}>
      <input className="sr-only" type="checkbox" checked={active} onChange={() => onChange(active ? values.filter((item) => item !== option) : [...values, option])} />
      <span className="flex items-start gap-3"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300"}`}>{active ? "✓" : ""}</span>{option}</span>
    </label>;
  })}</div>;
}

function FieldLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <span className="mb-2 block font-bold text-slate-800">{children}{required && <span className="ml-1 text-red-600">*</span>}</span>;
}

const inputClass = "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

export default function EmployerSurveyForm({ locale }: { locale: string }) {
  const lang: SurveyLocale = locale === "uz" || locale === "en" ? locale : "ru";
  const t = employerSurveyText[lang];
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const progress = useMemo(() => ((step + 1) / t.steps.length) * 100, [step, t.steps.length]);
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  useEffect(() => {
    window.onEmployerTurnstileSuccess = (token) => setForm(current => ({ ...current, captchaToken: token }));
    window.onEmployerTurnstileExpired = () => setForm(current => ({ ...current, captchaToken: "" }));
    return () => { delete window.onEmployerTurnstileSuccess; delete window.onEmployerTurnstileExpired; };
  }, []);

  function isStepValid() {
    if (step === 0) return Boolean(form.organizationName.trim() && form.activityArea.trim() && form.respondentPosition.trim());
    if (step === 1) return Boolean(form.programmes.length && form.curriculumParticipation && form.commissionParticipation && form.practiceParticipation.length);
    if (step === 2) return form.ratings.every((value) => value >= 1) && Boolean(form.programmeRelevance && form.hiringReadiness && form.recommendationScore >= 0);
    if (step === 3) return Boolean(form.cooperationDirections.length && form.improvementAreas.length && form.cooperationReadiness);
    return form.consent && Boolean(form.captchaToken);
  }

  function next() {
    if (!isStepValid()) { setMessage(t.required); return; }
    setMessage(""); setStep((value) => Math.min(value + 1, t.steps.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    if (!isStepValid()) { setMessage(t.required); return; }
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/employer-survey/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, ...form }) });
      if (!response.ok) throw new Error("submit_failed");
      setDone(true);
    } catch { setMessage(t.error); window.turnstile?.reset(); set("captchaToken", ""); } finally { setBusy(false); }
  }

  if (done) return <main className="container-main py-12 sm:py-20"><section className="mx-auto max-w-2xl rounded-[32px] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm sm:p-12"><CheckCircle2 className="mx-auto h-16 w-16 text-emerald-700" /><h1 className="mt-5 text-3xl font-black text-emerald-950">{t.success}</h1><p className="mt-4 leading-7 text-emerald-900">{t.successText}</p><button onClick={() => { setForm(initialState); setStep(0); setDone(false); }} className="mt-7 rounded-2xl bg-emerald-700 px-7 py-4 font-black text-white hover:bg-emerald-800">{t.again}</button></section></main>;

  return <main className="container-main py-8 sm:py-12">
    <header className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#083b73] via-[#0b4f87] to-[#087d83] p-6 text-white shadow-xl sm:p-10">
      <div className="flex items-start gap-4"><div className="hidden rounded-2xl bg-white/15 p-4 sm:block"><Building2 className="h-9 w-9" /></div><div><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-100">{t.eyebrow}</p><h1 className="mt-3 max-w-4xl text-3xl font-black sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-4xl leading-7 text-blue-50">{t.intro}</p><div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold"><span className="rounded-full bg-white/15 px-4 py-2">{t.time}</span><span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2"><ShieldCheck size={17} />{t.privacy}</span></div></div></div>
    </header>

    <section className="mt-7 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-3 flex items-center justify-between text-sm font-bold text-slate-600"><span>{t.steps[step]}</span><span>{step + 1}/{t.steps.length}</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-600 transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="mt-4 hidden grid-cols-5 gap-2 text-center text-xs font-bold sm:grid">{t.steps.map((label, index) => <span key={label} className={index <= step ? "text-blue-700" : "text-slate-400"}>{label}</span>)}</div>
    </section>

    <section className="mt-7 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {step === 0 && <div className="grid gap-6"><label><FieldLabel required>1. Наименование организации</FieldLabel><input className={inputClass} value={form.organizationName} onChange={(e) => set("organizationName", e.target.value)} maxLength={250} /></label><label><FieldLabel required>2. Сфера деятельности организации</FieldLabel><input className={inputClass} value={form.activityArea} onChange={(e) => set("activityArea", e.target.value)} maxLength={250} /></label><label><FieldLabel required>3. Ваша должность</FieldLabel><input className={inputClass} value={form.respondentPosition} onChange={(e) => set("respondentPosition", e.target.value)} maxLength={200} /></label><label><FieldLabel>4. Количество выпускников института в организации</FieldLabel><select className={inputClass} value={form.graduatesCount} onChange={(e) => set("graduatesCount", e.target.value)}><option value="">Выберите вариант</option><option>1–5</option><option>6–10</option><option>Более 10</option><option>В настоящее время не работают</option></select></label></div>}

      {step === 1 && <div className="grid gap-7"><div><FieldLabel required>5. Выпускники каких направлений работают в организации?</FieldLabel><ToggleList options={programmeOptions} values={form.programmes} onChange={(v) => set("programmes", v)} /><input className={`${inputClass} mt-3`} placeholder="Другое направление" value={form.otherProgramme} onChange={(e) => set("otherProgramme", e.target.value)} maxLength={250} /></div>{[["6. Участвуете ли Вы в разработке образовательных программ?", "curriculumParticipation"], ["7. Участвуете ли Вы в работе аттестационных комиссий?", "commissionParticipation"]].map(([label, key]) => <label key={key}><FieldLabel required>{label}</FieldLabel><select className={inputClass} value={form[key as "curriculumParticipation"]} onChange={(e) => set(key as "curriculumParticipation", e.target.value)}><option value="">Выберите вариант</option><option>{t.yes}</option><option>{t.no}</option><option>Пока нет, но заинтересованы</option><option>{t.unsure}</option></select></label>)}<div><FieldLabel required>8. Как Ваша организация участвует в практической подготовке?</FieldLabel><ToggleList options={["Принимает студентов на практику", "Участвует в практических занятиях", "Проводит мастер-классы и консультации", "Пока не участвует", "Заинтересована в сотрудничестве"]} values={form.practiceParticipation} onChange={(v) => set("practiceParticipation", v)} /></div><div><FieldLabel>9. Какими качествами обладают выпускники?</FieldLabel><ToggleList options={graduateQualities} values={form.graduateQualities} onChange={(v) => set("graduateQualities", v)} /></div></div>}

      {step === 2 && <div className="grid gap-8"><div><FieldLabel required>10. Оцените уровень подготовки выпускников по шкале от 1 до 10</FieldLabel><div className="space-y-5">{ratingItems.map((item, index) => <div key={item} className="rounded-2xl border border-slate-200 p-4"><p className="font-semibold text-slate-800">{index + 1}. {item}</p><div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">{Array.from({ length: 10 }, (_, i) => i + 1).map((value) => <button type="button" key={value} onClick={() => set("ratings", form.ratings.map((rating, idx) => idx === index ? value : rating))} className={`rounded-xl border py-2 text-sm font-black ${form.ratings[index] === value ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 hover:border-blue-400"}`}>{value}</button>)}</div></div>)}</div></div><label><FieldLabel>11. Общая оценка подготовки студентов, проходивших практику</FieldLabel><select className={inputClass} value={form.practiceRating || ""} onChange={(e) => set("practiceRating", Number(e.target.value))}><option value="">Не могу оценить</option>{Array.from({ length: 10 }, (_, i) => i + 1).map((v) => <option key={v} value={v}>{v}</option>)}</select></label><label><FieldLabel required>12. Соответствие образовательных программ требованиям рынка труда</FieldLabel><select className={inputClass} value={form.programmeRelevance} onChange={(e) => set("programmeRelevance", e.target.value)}><option value="">Выберите вариант</option><option>Полностью соответствует</option><option>В основном соответствует</option><option>Частично соответствует</option><option>Не соответствует</option><option>{t.unsure}</option></select></label><label><FieldLabel required>13. Готовы ли Вы принимать выпускников института на работу?</FieldLabel><select className={inputClass} value={form.hiringReadiness} onChange={(e) => set("hiringReadiness", e.target.value)}><option value="">Выберите вариант</option><option>{t.yes}</option><option>Скорее да</option><option>В зависимости от вакансий</option><option>Скорее нет</option><option>{t.no}</option></select></label><div><FieldLabel required>14. Насколько готовы рекомендовать выпускников? (0–10)</FieldLabel><div className="grid grid-cols-6 gap-2 sm:grid-cols-11">{Array.from({ length: 11 }, (_, i) => i).map((value) => <button type="button" key={value} onClick={() => set("recommendationScore", value)} className={`rounded-xl border py-3 font-black ${form.recommendationScore === value ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200"}`}>{value}</button>)}</div></div></div>}

      {step === 3 && <div className="grid gap-7"><div><FieldLabel required>15. Перспективные направления сотрудничества</FieldLabel><ToggleList options={cooperationOptions} values={form.cooperationDirections} onChange={(v) => set("cooperationDirections", v)} /></div><div><FieldLabel required>16. Что следует улучшить в подготовке выпускников?</FieldLabel><ToggleList options={improvementOptions} values={form.improvementAreas} onChange={(v) => set("improvementAreas", v)} /></div><label><FieldLabel>17. Наиболее востребованные знания и компетенции</FieldLabel><textarea className={`${inputClass} min-h-28`} value={form.demandedCompetencies} onChange={(e) => set("demandedCompetencies", e.target.value)} maxLength={3000} /></label><label><FieldLabel>18. Дополнительные предложения</FieldLabel><textarea className={`${inputClass} min-h-28`} value={form.proposals} onChange={(e) => set("proposals", e.target.value)} maxLength={3000} /></label><label><FieldLabel required>19. Готовы ли Вы к дальнейшему сотрудничеству?</FieldLabel><select className={inputClass} value={form.cooperationReadiness} onChange={(e) => set("cooperationReadiness", e.target.value)}><option value="">Выберите вариант</option><option>{t.yes}</option><option>Скорее да</option><option>При наличии конкретных предложений</option><option>Скорее нет</option><option>{t.no}</option></select></label></div>}

      {step === 4 && <div className="grid gap-6"><div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950"><strong>20. Контактные данные заполняются добровольно.</strong> Они могут использоваться только для связи по вопросам сотрудничества.</div><label><FieldLabel>Ф.И.О. представителя</FieldLabel><input className={inputClass} value={form.contactName} onChange={(e) => set("contactName", e.target.value)} maxLength={200} /></label><div className="grid gap-6 sm:grid-cols-2"><label><FieldLabel>Телефон</FieldLabel><input className={inputClass} value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} maxLength={50} /></label><label><FieldLabel>E-mail</FieldLabel><input className={inputClass} type="email" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} maxLength={200} /></label></div><label className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-5 ${form.consent ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}><input type="checkbox" className="mt-1 h-5 w-5" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} /><span className="font-semibold leading-6 text-slate-800">Подтверждаю достоверность информации и согласен(на) на обработку предоставленных данных для анализа качества подготовки специалистов и организации взаимодействия с работодателями. <span className="text-red-600">*</span></span></label><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-action="employer_survey" data-size="flexible" data-callback="onEmployerTurnstileSuccess" data-expired-callback="onEmployerTurnstileExpired"/></div></div>}

      {message && <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-800">{message}</p>}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between"><button type="button" disabled={step === 0 || busy} onClick={() => { setMessage(""); setStep((v) => Math.max(0, v - 1)); }} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 py-3.5 font-black text-slate-700 disabled:opacity-40"><ChevronLeft size={19} />{t.back}</button>{step < t.steps.length - 1 ? <button type="button" onClick={next} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-7 py-3.5 font-black text-white hover:bg-blue-800">{t.next}<ChevronRight size={19} /></button> : <button type="button" disabled={busy} onClick={submit} className="rounded-2xl bg-emerald-700 px-8 py-3.5 font-black text-white hover:bg-emerald-800 disabled:opacity-60">{busy ? t.sending : t.submit}</button>}</div>
    </section>
  </main>;
}
