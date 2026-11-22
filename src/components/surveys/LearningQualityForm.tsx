"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import FormSteps from "@/components/common/FormSteps";
import { surveyJourney } from "@/data/surveyJourney";
import survey from "@/data/learningQualitySurvey.json";
import { learningLocale, learningQualityCopy } from "@/data/learningQualityCopy";

const draftKey = `learning-quality-draft:${survey.id}:v1`;
const lifetime = 24 * 60 * 60 * 1000;
const sections = [survey.questions.slice(0, 5), survey.questions.slice(5, 10), survey.questions.slice(10)];
type Answers = Record<string, number | string>;

function ratingsOnly(values: Answers) {
  return Object.fromEntries(sections.slice(0, 2).flat().flatMap(q => {
    const value = values[q.id];
    return typeof value === "number" && Number.isInteger(value) && value >= 0 && value < q.options.length ? [[q.id, value]] : [];
  }));
}

function readDraft(): Answers | null {
  try {
    const item = window.localStorage.getItem(draftKey);
    if (!item) return null;
    const { expires, ratings } = JSON.parse(item);
    if (typeof expires === "number" && expires > Date.now() && ratings && typeof ratings === "object") return ratingsOnly(ratings);
    window.localStorage.removeItem(draftKey);
  } catch { /* Storage may be unavailable in private browsing. */ }
  return null;
}

function storeDraft(answers: Answers | null) {
  try {
    if (answers) window.localStorage.setItem(draftKey, JSON.stringify({ expires: Date.now() + lifetime, ratings: ratingsOnly(answers) }));
    else window.localStorage.removeItem(draftKey);
  } catch { /* Keep the survey usable without local storage. */ }
}

export default function LearningQualityForm({ locale }: { locale: string }) {
  const lang = learningLocale(locale), t = learningQualityCopy[lang];
  const [ready, setReady] = useState(false), [loadError, setLoadError] = useState("");
  const ui = surveyJourney[lang];
  const [answers, setAnswers] = useState<Answers>({});
  const [remember, setRemember] = useState(false);
  const [step, setStep] = useState(0);
  const heading = useRef<HTMLDivElement>(null);
  const steps = [ui.teaching, ui.conditions, ui.feedback];
  const [busy, setBusy] = useState(false), [done, setDone] = useState(false), [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const submitting = useRef(false);
  const answered = survey.questions.filter(q => q.required && Number.isInteger(answers[q.id])).length;
  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/student/surveys/${survey.id}/start`, { method: "POST", signal: controller.signal })
      .then(r => { if (r.ok) { setReady(true); setLoadError(""); } else setLoadError(r.status === 404 ? t.unavailable : t.loadingError); })
      .catch(() => { if (!controller.signal.aborted) setLoadError(t.loadingError); });
    return () => controller.abort();
  }, [attempt, t]);
  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      // The form is mounted after its availability request; restore at the next paint.
      const frame = requestAnimationFrame(() => { setAnswers(draft); setRemember(true); });
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  function update(id: string, value: number | string) {
    const next = { ...answers, [id]: value };
    if (remember && sections.slice(0, 2).some(section => section.some(q => q.id === id))) storeDraft(next);
    setAnswers(next);
  }

  function navigate(next: number) {
    setError("");
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }

  function advance() {
    const missing = sections[step].find(q => q.required && !Number.isInteger(answers[q.id]));
    if (missing) { setError(t.required); document.getElementById(`question-${missing.id}`)?.focus(); }
    else navigate(step + 1);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    if (step < sections.length - 1) { advance(); return; }
    const missing = survey.questions.find(q => q.required && !Number.isInteger(answers[q.id]));
    if (missing) { setStep(sections.findIndex(section => section.some(q => q.id === missing.id))); setError(t.required); requestAnimationFrame(() => document.getElementById(`question-${missing.id}`)?.focus()); return; }
    submitting.current = true; setBusy(true); setError("");
    try {
      const r = await fetch(`/api/student/surveys/${survey.id}/submit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, answers }) });
      const body = await r.json();
      if (r.ok) { storeDraft(null); setDone(true); window.scrollTo({ top: 0 }); }
      else setError(body.code === "already_completed" ? t.duplicate : r.status === 429 ? t.limit : t.error);
    } catch { setError(t.error); }
    finally { submitting.current = false; setBusy(false); }
  }
  if (done) return <main className="container-main py-16"><section role="status" className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white p-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-700"/><h1 className="mt-5 text-3xl font-bold">{t.success}</h1><p className="mt-4">{t.successText}</p></section></main>;
  return <main className="container-main py-8 sm:py-12"><div className="mx-auto max-w-3xl">
    <header className="rounded-3xl bg-gradient-to-br from-[#083b73] to-[#087d83] p-6 text-white sm:p-9"><p className="text-sm font-semibold text-cyan-100">2026/2027</p><h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{survey.title[lang]}</h1><p className="mt-5 leading-7 text-blue-50">{survey.description[lang]}</p><p className="mt-5 flex items-start gap-2 text-sm"><ShieldCheck className="shrink-0" size={19}/>{t.privacy}</p></header>
    {!ready ? <section role="status" className="mt-6 rounded-2xl border bg-white p-6"><p>{loadError || t.loading}</p>{loadError && <button type="button" onClick={() => setAttempt(a => a + 1)} className="mt-4 rounded-xl bg-blue-700 px-5 py-3 text-white">{t.retry}</button>}</section> : <form onSubmit={submit} noValidate className="mt-6 space-y-5">
      <div className="rounded-2xl border bg-white p-5"><p className="font-semibold">{t.instructions}</p><p className="mt-3 text-sm text-slate-600">{t.scale}</p><label htmlFor="survey-progress" className="mt-4 block text-sm">{t.progress}: {answered}/11</label><progress id="survey-progress" max={11} value={answered} className="mt-2 h-2 w-full accent-teal-600"/></div>
      <div ref={heading} tabIndex={-1} className="scroll-mt-32"><FormSteps locale={lang} current={step} steps={steps} help={remember ? ui.draft : undefined} /></div>
      {step === 0 && <label className="flex items-start gap-3 rounded-2xl border bg-white p-4 text-sm">
        <input type="checkbox" checked={remember} className="mt-1 h-5 w-5 shrink-0 accent-teal-700" onChange={event => { setRemember(event.target.checked); storeDraft(event.target.checked ? answers : null); }} />
        <span><strong className="block">{ui.save}</strong><span className="mt-1 block text-slate-600">{ui.note}</span></span>
      </label>}
      {sections[step].map((q) => <div key={q.id} className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><fieldset id={`question-${q.id}`} tabIndex={-1} disabled={busy} className="m-0 min-w-0 scroll-mt-28 border-0 p-0 focus:outline-2 focus:outline-blue-600"><legend className="mb-1 block w-full max-w-full whitespace-normal break-words p-0 text-base font-semibold leading-6 sm:text-lg sm:leading-7">{survey.questions.indexOf(q) + 1}. {q.prompt[lang]} {q.required ? <span aria-hidden="true" className="text-red-700">*</span> : <span className="text-sm font-normal text-slate-500">({t.optional})</span>}</legend>
        {q.question_type === "text" ? <><textarea aria-label={q.prompt[lang]} aria-describedby="comment-note" maxLength={3000} rows={5} value={answers[q.id] ?? ""} onChange={e => update(q.id, e.target.value)} className="mt-3 w-full rounded-xl border border-slate-300 p-3 focus:outline-2 focus:outline-blue-600"/><p id="comment-note" className="mt-2 text-sm text-slate-500">{t.commentNote}</p></> : <div className="mt-3 grid gap-2">{q.options.map((option, index) => <label key={index} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-blue-600 ${answers[q.id] === index ? "border-teal-600 bg-teal-50 text-teal-950" : "border-slate-200 hover:bg-slate-50"}`}><input required name={q.id} type="radio" value={index} checked={answers[q.id] === index} onChange={() => update(q.id, index)} className="h-4 w-4 shrink-0 accent-teal-700"/><span className="min-w-0 break-words">{option[lang]}</span></label>)}</div>}
      </fieldset></div>)}
      <div className="survey-actions">
        {error && <p role="alert" className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <div className="flex gap-3">
          {step > 0 && <button type="button" disabled={busy} onClick={() => navigate(step - 1)} className="rounded-xl border border-slate-300 px-5 py-3 font-bold disabled:opacity-50">{ui.back}</button>}
          <button type="submit" disabled={busy} className="flex-1 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-50">{step < sections.length - 1 ? ui.next : busy ? t.sending : t.submit}</button>
        </div>
      </div>
    </form>}
  </div></main>;
}
