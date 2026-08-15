"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";

type Question = { id: number; text: string; options: string[] };
type QuizData = { profile: { full_name: string; department: string; position: string }; attempts: { score: number; passed: boolean; created_at: string }[]; passScore: number; total: number; questions: Question[] };
type Result = { score: number; total: number; percent: number; passed: boolean; details: { id: number; selectedIndex: number; correctIndex: number; correct: boolean; explanation: string }[] };

export default function HemisQuiz() {
  const router = useRouter();
  const [data, setData] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(true);

  useEffect(() => { void (async () => { const response = await fetch("/api/teacher/quiz", { cache: "no-store" }); if (response.status === 401) { router.replace("/teacher/login"); return; } setData(await response.json()); setBusy(false); })(); }, [router]);

  async function submit() {
    if (!data || Object.keys(answers).length !== data.questions.length) { setMessage("Ответьте на все вопросы перед отправкой."); return; }
    setBusy(true); setMessage("");
    const response = await fetch("/api/teacher/quiz", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers }) });
    const body = await response.json(); setBusy(false);
    if (!response.ok) { setMessage(body.message || "Не удалось проверить тест."); return; }
    setResult(body); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function logout() { await fetch("/api/teacher/logout", { method: "POST" }); router.replace("/teacher/login"); router.refresh(); }
  function restart() { setAnswers({}); setResult(null); setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" }); }

  if (busy && !data) return <main className="container-main py-20 text-center font-bold text-slate-600">Загружаем тест…</main>;
  if (!data) return null;

  const best = data.attempts.length ? Math.max(...data.attempts.map((item) => item.score)) : null;
  return <main className="container-main py-8 sm:py-12">
    <header className="rounded-[30px] bg-gradient-to-br from-[#083b73] to-[#087d83] p-6 text-white shadow-xl sm:p-9">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-100">Проверка цифровых компетенций</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">Знание функций HEMIS</h1><p className="mt-3 text-blue-50">{data.profile.full_name} · {data.profile.department}</p></div><button onClick={logout} className="self-start rounded-xl bg-white/15 px-4 py-2 text-sm font-bold hover:bg-white/25">Выйти</button></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><Stat label="Вопросов" value={data.total} /><Stat label="Проходной балл" value={`${data.passScore}/${data.total}`} /><Stat label="Лучший результат" value={best === null ? "—" : `${best}/${data.total}`} /></div>
    </header>

    {result && <section className={`mt-7 rounded-[28px] border p-7 text-center ${result.passed ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}><div className="text-5xl">{result.passed ? "✓" : "↻"}</div><h2 className="mt-3 text-3xl font-black">{result.passed ? "Тест успешно пройден" : "Рекомендуется пройти тест повторно"}</h2><p className="mt-3 text-xl font-bold">{result.score} из {result.total} · {result.percent}%</p><button onClick={restart} className="mt-5 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white">Пройти ещё раз</button></section>}

    <div className="mt-7 space-y-5">{data.questions.map((question, index) => { const detail = result?.details.find((item) => item.id === question.id); return <fieldset key={question.id} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7" disabled={Boolean(result)}><legend className="sr-only">Вопрос {index + 1}</legend><p className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Вопрос {index + 1} из {data.total}</p><h2 className="mt-2 text-lg font-bold leading-7 text-slate-950 sm:text-xl">{question.text}</h2><div className="mt-5 grid gap-3">{question.options.map((option, optionIndex) => { const selected = answers[String(question.id)] === optionIndex; const correct = detail?.correctIndex === optionIndex; const wrong = Boolean(detail && selected && !detail.correct); return <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${correct ? "border-emerald-400 bg-emerald-50" : wrong ? "border-red-300 bg-red-50" : selected ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}><input type="radio" name={`question-${question.id}`} checked={selected} onChange={() => setAnswers((current) => ({ ...current, [String(question.id)]: optionIndex }))} className="mt-1" /><span><b className="mr-2">{String.fromCharCode(65 + optionIndex)}.</b>{option}</span></label>; })}</div>{detail && <p className={`mt-4 rounded-xl p-4 text-sm font-semibold ${detail.correct ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>{detail.explanation}</p>}</fieldset>; })}</div>

    {!result && <div className="sticky bottom-4 mt-7 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:flex sm:items-center sm:justify-between"><p className="font-semibold text-slate-600">Отвечено: {Object.keys(answers).length} из {data.total}</p><button onClick={submit} disabled={busy} className="mt-3 w-full rounded-xl bg-blue-700 px-7 py-3.5 font-black text-white hover:bg-blue-800 disabled:opacity-60 sm:mt-0 sm:w-auto">{busy ? "Проверяем…" : "Завершить и узнать результат"}</button></div>}
    {message && <p className="mt-4 rounded-xl bg-red-50 p-4 text-center font-semibold text-red-700">{message}</p>}
  </main>;
}

function Stat({ label, value }: { label: string; value: string | number }) { return <div className="rounded-2xl bg-white/12 p-4"><p className="text-sm text-blue-100">{label}</p><p className="mt-1 text-2xl font-black">{value}</p></div>; }
