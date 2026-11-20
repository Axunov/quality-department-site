"use client";

import type { SurveyMonitoringPayload as Payload, MonitoringQuestion as Question, MonitoringItem as Item } from "@/lib/surveyMonitoring";
import { useEffect, useState } from "react";

const labels = {
  ru: { eyebrow: "Открытая аналитика", title: "Мониторинг качества образования", lead: "Обобщённые результаты опросов обновляются автоматически. Персональные данные и письменные ответы здесь не публикуются.", answers: "ответов", average: "Средняя оценка", questions: "Результаты по вопросам", loading: "Загрузка аналитики…", error: "Не удалось загрузить данные мониторинга.", empty: "Пока нет данных", updated: "Обновлено" },
  uz: { eyebrow: "Ochiq tahlil", title: "Ta’lim sifati monitoringi", lead: "So‘rovlarning umumlashtirilgan natijalari avtomatik yangilanadi. Shaxsiy ma’lumotlar va yozma javoblar e’lon qilinmaydi.", answers: "javob", average: "O‘rtacha baho", questions: "Savollar bo‘yicha natijalar", loading: "Tahlil yuklanmoqda…", error: "Monitoring ma’lumotlarini yuklab bo‘lmadi.", empty: "Hozircha ma’lumot yo‘q", updated: "Yangilangan" },
  en: { eyebrow: "Public analytics", title: "Education quality monitoring", lead: "Aggregated survey results update automatically. Personal data and written responses are not published here.", answers: "responses", average: "Average score", questions: "Results by question", loading: "Loading analytics…", error: "Could not load monitoring data.", empty: "No data yet", updated: "Updated" },
} as const;

const colors = ["#0b4f8a", "#10a3a3", "#2f9e62", "#f2a93b", "#da5a65", "#6b62c5"];

function Donut({ items, center, label }: { items: Item[]; center: string; label: string }) {
  const visible = items.filter(item => item.value > 0);
  const total = visible.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const stops = visible.length ? visible.map((item, index) => { const start = cursor / total * 100; cursor += item.value; return colors[index % colors.length] + " " + start + "% " + cursor / total * 100 + "%"; }).join(", ") : "#dbe6ef 0% 100%";
  return <div className="flex flex-col items-center gap-5 sm:flex-row"><div className="relative ring-8 ring-blue-100/60 h-40 w-40 shrink-0 rounded-full" style={{ background: "conic-gradient(" + stops + ")" }}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner"><strong className="text-3xl font-black text-slate-900">{center}</strong><span className="text-xs font-semibold text-slate-500">{label}</span></div></div><div className="min-w-0 flex-1 space-y-2">{visible.map((item, index) => <div key={item.label} className="flex items-center gap-2 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} /><span className="min-w-0 flex-1 break-words text-slate-600">{item.label}</span><b>{item.value}</b><span className="w-10 text-right text-xs text-slate-400">{total ? Math.round(item.value / total * 100) : 0}%</span></div>)}</div></div>;
}

function QuestionCard({ question, responses, locale }: { question: Question; responses: string; locale: string }) {
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  return <details className="group rounded-2xl border border-slate-200 bg-white p-4 motion-safe:transition-shadow hover:shadow-md">
    <summary className="flex cursor-pointer items-start gap-3 font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600">
      <span className="flex-1">{question.label}</span><span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-800">{question.total} {responses}</span>
      <span aria-hidden="true" className="text-blue-800 motion-safe:transition-transform group-open:rotate-45">+</span>
    </summary>
    <div className="mt-4 space-y-3">
      {question.values.map((item, index) => {
        const share = 100 * item.value / question.total;
        return <div key={item.label}>
          <div className="flex justify-between gap-3 text-sm"><span className="break-words">{item.label}</span><b className="shrink-0">{item.value} · {number.format(share)}%</b></div>
          <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full motion-safe:transition-[width]" style={{ width: share + "%", backgroundColor: colors[index % colors.length] }} /></div>
        </div>;
      })}
    </div>
  </details>;
}

export default function PublicMonitoringDashboard({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[lang];
  const ui = {
    ru: { select: "Выберите опрос", forms: "анкет", languages: "Языки анкет", method: "По каждому критерию сначала усредняются оценки преподавателей внутри одной анкеты. Для диаграммы этот балл округляется до целого. «Не могу оценить» не входит в средний балл.", retry: "Повторить" },
    uz: { select: "So‘rovni tanlang", forms: "anketa", languages: "Anketa tillari", method: "Har bir mezon uchun avval bitta anketadagi o‘qituvchi baholari o‘rtachasi hisoblanadi. Diagrammada u butun songa yaxlitlanadi. «Baholay olmayman» o‘rtacha ballga kiritilmaydi.", retry: "Qayta urinish" },
    en: { select: "Select a survey", forms: "forms", languages: "Survey languages", method: "For each criterion, teacher scores are averaged within each form and rounded for the breakdown. ‘Unable to assess’ is excluded from the mean score.", retry: "Retry" },
  }[lang];
  const [payload, setPayload] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState("teacher");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/monitoring?locale=" + lang, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("load");
      return response.json();
    }).then(setPayload).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [lang, attempt]);
  const report = payload?.reports.find(item => item.key === selected);
  const questions = report?.questions.filter(q => q.total > 0) ?? [];
  return <main className="container-main py-8 sm:py-14">
    <header className="rounded-[32px] bg-gradient-to-br from-[#083b73] via-[#14538a] to-[#087d83] p-7 text-white shadow-lg sm:p-12">
      <p className="text-sm font-bold uppercase tracking-widest text-cyan-100">{t.eyebrow}</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl text-blue-50">{t.lead}</p>
      {payload && <p className="mt-5 text-xs text-cyan-100">{t.updated}: {new Date(payload.generatedAt).toLocaleString(lang, { timeZone: "Asia/Tashkent" })}</p>}
    </header>
    {!payload && <p className="mt-6 rounded-2xl bg-white p-5" role="status">{failed ? t.error : t.loading}{failed && <button type="button" className="ms-4 underline" onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{ui.retry}</button>}</p>}
    {!!payload && <nav aria-label={ui.select} className="mt-6 flex flex-wrap gap-2">
      {payload.reports.map(item => <button type="button" key={item.key} aria-pressed={selected === item.key} onClick={() => setSelected(item.key)} className={"rounded-full border px-4 py-2 text-sm font-bold motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 " + (selected === item.key ? "border-blue-800 bg-blue-800 text-white" : "border-blue-100 bg-white text-blue-900 hover:bg-blue-50")}>{item.title}</button>)}
    </nav>}
    {report && <article key={report.key} className="mt-6 rounded-[30px] border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{report.title}</h2>
      {report.total > 0 ? <>
        <section className="mt-5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
          <h3 className="mb-5 font-bold text-blue-900">{ui.languages}</h3>
          <Donut items={report.byCategory} center={String(report.total)} label={ui.forms} />
        </section>
        {report.key === "teacher" && <p className="mt-6 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-950">{ui.method}</p>}
        {!!questions.length && <><h3 className="mt-7 text-xl font-black">{t.questions}</h3><div className="mt-4 grid items-start gap-3 lg:grid-cols-2">{questions.map(question => <QuestionCard key={question.id} question={question} responses={ui.forms} locale={lang} />)}</div></>}
      </> : <p className="mt-5 text-slate-600">{t.empty}</p>}
    </article>}
  </main>;
}
