"use client";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import survey from "@/data/learningQualitySurvey.json";
import { learningLocale, learningQualityCopy } from "@/data/learningQualityCopy";

export default function LearningQualityForm({ locale }: { locale: string }) {
  const lang = learningLocale(locale), t = learningQualityCopy[lang];
  const [ready, setReady] = useState(false), [loadError, setLoadError] = useState("");
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
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
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const missing = survey.questions.find(q => q.required && !Number.isInteger(answers[q.id]));
    if (missing) { setError(t.required); document.getElementById(`question-${missing.id}`)?.focus(); return; }
    submitting.current = true; setBusy(true); setError("");
    try {
      const r = await fetch(`/api/student/surveys/${survey.id}/submit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: lang, answers }) });
      const body = await r.json();
      if (r.ok) { setDone(true); window.scrollTo({ top: 0 }); }
      else setError(body.code === "already_completed" ? t.duplicate : r.status === 429 ? t.limit : t.error);
    } catch { setError(t.error); }
    finally { submitting.current = false; setBusy(false); }
  }
  if (done) return <main className="container-main py-16"><section role="status" className="mx-auto max-w-3xl rounded-3xl border border-emerald-200 bg-white p-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-700"/><h1 className="mt-5 text-3xl font-bold">{t.success}</h1><p className="mt-4">{t.successText}</p></section></main>;
  return <main className="container-main py-8 sm:py-12"><div className="mx-auto max-w-3xl">
    <header className="rounded-3xl bg-gradient-to-br from-[#083b73] to-[#087d83] p-6 text-white sm:p-9"><p className="text-sm font-semibold text-cyan-100">2026/2027</p><h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{survey.title[lang]}</h1><p className="mt-5 leading-7 text-blue-50">{survey.description[lang]}</p><p className="mt-5 flex items-start gap-2 text-sm"><ShieldCheck className="shrink-0" size={19}/>{t.privacy}</p></header>
    {!ready ? <section role="status" className="mt-6 rounded-2xl border bg-white p-6"><p>{loadError || t.loading}</p>{loadError && <button type="button" onClick={() => setAttempt(a => a + 1)} className="mt-4 rounded-xl bg-blue-700 px-5 py-3 text-white">{t.retry}</button>}</section> : <form onSubmit={submit} noValidate className="mt-6 space-y-5">
      <div className="rounded-2xl border bg-white p-5"><p className="font-semibold">{t.instructions}</p><p className="mt-3 text-sm text-slate-600">{t.scale}</p><label htmlFor="survey-progress" className="mt-4 block text-sm">{t.progress}: {answered}/11</label><progress id="survey-progress" max={11} value={answered} className="mt-2 h-2 w-full accent-teal-600"/></div>
      {survey.questions.map((q, i) => <fieldset key={q.id} id={`question-${q.id}`} tabIndex={-1} disabled={busy} className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm focus:outline-2 focus:outline-blue-600 sm:p-6"><legend className="px-2 text-base font-semibold leading-7">{i + 1}. {q.prompt[lang]} {q.required ? <span aria-hidden="true" className="text-red-700">*</span> : <span className="text-sm font-normal text-slate-500">({t.optional})</span>}</legend>
        {q.question_type === "text" ? <><textarea aria-label={q.prompt[lang]} aria-describedby="comment-note" maxLength={3000} rows={5} value={answers[q.id] ?? ""} onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))} className="mt-3 w-full rounded-xl border border-slate-300 p-3 focus:outline-2 focus:outline-blue-600"/><p id="comment-note" className="mt-2 text-sm text-slate-500">{t.commentNote}</p></> : <div className="mt-3 grid gap-2">{q.options.map((option, index) => <label key={index} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-blue-600 ${answers[q.id] === index ? "border-teal-600 bg-teal-50 text-teal-950" : "border-slate-200 hover:bg-slate-50"}`}><input required name={q.id} type="radio" value={index} checked={answers[q.id] === index} onChange={() => setAnswers(a => ({ ...a, [q.id]: index }))} className="h-4 w-4 shrink-0 accent-teal-700"/><span>{option[lang]}</span></label>)}</div>}
      </fieldset>)}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{error}</p>}
      <button type="submit" disabled={busy} className="w-full rounded-2xl bg-emerald-700 px-6 py-4 text-lg font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">{busy ? t.sending : t.submit}</button>
    </form>}
  </div></main>;
}
