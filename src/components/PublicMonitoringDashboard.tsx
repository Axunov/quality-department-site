"use client";

import { useEffect, useState } from "react";

type Item = { label: string; value: number };
type Question = { id: string; label: string; total: number; average: number | null; values: Item[] };
type Report = { key: string; title: string; total: number; average: number | null; byCategory: Item[]; questions: Question[] };
type Payload = { generatedAt: string; reports: Report[] };

const labels = {
  ru: { eyebrow: "Открытая аналитика", title: "Мониторинг качества образования", lead: "Обобщённые результаты опросов обновляются автоматически. Персональные данные и письменные ответы здесь не публикуются.", answers: "ответов", average: "Средняя оценка", questions: "Результаты по вопросам", loading: "Загрузка аналитики…", error: "Не удалось загрузить данные мониторинга.", empty: "Пока нет данных", updated: "Обновлено" },
  uz: { eyebrow: "Ochiq tahlil", title: "Ta’lim sifati monitoringi", lead: "So‘rovlarning umumlashtirilgan natijalari avtomatik yangilanadi. Shaxsiy ma’lumotlar va yozma javoblar e’lon qilinmaydi.", answers: "javob", average: "O‘rtacha baho", questions: "Savollar bo‘yicha natijalar", loading: "Tahlil yuklanmoqda…", error: "Monitoring ma’lumotlarini yuklab bo‘lmadi.", empty: "Hozircha ma’lumot yo‘q", updated: "Yangilangan" },
  en: { eyebrow: "Public analytics", title: "Education quality monitoring", lead: "Aggregated survey results update automatically. Personal data and written responses are not published here.", answers: "responses", average: "Average score", questions: "Results by question", loading: "Loading analytics…", error: "Could not load monitoring data.", empty: "No data yet", updated: "Updated" },
} as const;

const colors = ["#0b4f8a", "#10a3a3", "#2f9e62", "#f2a93b", "#da5a65", "#6b62c5"];

function Donut({ items, center, label }: { items: Item[]; center: string; label: string }) {
  const visible = items.filter(item => item.value > 0).slice(0, 6);
  const total = visible.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const stops = visible.length ? visible.map((item, index) => { const start = cursor / total * 100; cursor += item.value; return colors[index % colors.length] + " " + start + "% " + cursor / total * 100 + "%"; }).join(", ") : "#dbe6ef 0% 100%";
  return <div className="flex flex-col items-center gap-5 sm:flex-row"><div className="relative h-40 w-40 shrink-0 rounded-full" style={{ background: "conic-gradient(" + stops + ")" }}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner"><strong className="text-3xl font-black text-slate-900">{center}</strong><span className="text-xs font-semibold text-slate-500">{label}</span></div></div><div className="min-w-0 flex-1 space-y-2">{visible.map((item, index) => <div key={item.label} className="flex items-center gap-2 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} /><span className="min-w-0 flex-1 truncate text-slate-600">{item.label}</span><b>{item.value}</b><span className="w-10 text-right text-xs text-slate-400">{total ? Math.round(item.value / total * 100) : 0}%</span></div>)}</div></div>;
}

function QuestionCard({ question, empty }: { question: Question; empty: string }) {
  const values = question.values.slice(0, 8);
  const max = Math.max(1, ...values.map(item => item.value));
  return <article className="rounded-2xl border border-slate-100 bg-white p-4"><div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold leading-5 text-slate-800">{question.label}</h3>{question.average !== null && <b className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-sm text-blue-800">{question.average}</b>}</div><p className="mt-1 text-xs text-slate-400">{question.total} {empty === "Пока нет данных" ? "ответов" : ""}</p><div className="mt-4 space-y-2">{values.map((item, index) => <div key={item.label}><div className="flex justify-between gap-2 text-xs"><span className="truncate text-slate-600">{item.label}</span><b>{item.value}</b></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: String(Math.max(3, item.value / max * 100)) + "%", backgroundColor: colors[index % colors.length] }} /></div></div>)}{!values.length && <p className="text-sm text-slate-400">{empty}</p>}</div></article>;
}

export default function PublicMonitoringDashboard({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[lang];
  const [payload, setPayload] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { fetch("/api/monitoring", { cache: "no-store" }).then(response => { if (!response.ok) throw new Error("load"); return response.json(); }).then(setPayload).catch(() => setFailed(true)); }, []);
  if (!payload && !failed) return <main className="container-main py-16"><div className="rounded-3xl bg-white p-10 text-center text-slate-500">{t.loading}</div></main>;
  if (failed || !payload) return <main className="container-main py-16"><div className="rounded-3xl bg-white p-10 text-center text-red-700">{t.error}</div></main>;
  return <main className="container-main py-10 sm:py-16"><header className="mx-auto max-w-4xl text-center"><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-700">{t.eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{t.title}</h1><p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-500">{t.lead}</p><p className="mt-3 text-xs text-slate-400">{t.updated}: {new Date(payload.generatedAt).toLocaleString(lang)}</p></header><div className="mt-10 space-y-8">{payload.reports.map(report => <article key={report.key} className="rounded-[30px] bg-white p-5 shadow-xl sm:p-8"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{report.title}</h2><p className="mt-2 text-sm text-slate-500">{report.total} {t.answers}{report.average !== null && " · " + t.average + ": " + report.average}</p></div></div><div className="mt-6 rounded-2xl bg-slate-50 p-5"><Donut items={report.byCategory} center={String(report.total)} label={t.answers} /></div><h3 className="mt-8 text-xl font-black text-slate-900">{t.questions}</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{report.questions.map(question => <QuestionCard key={question.id} question={question} empty={t.empty} />)}</div></article>)}</div></main>;
}
