"use client";

import { monitoringFormat } from "@/lib/monitoringFormat";
import { useCallback, useEffect, useMemo, useState } from "react";

type Item = { label: string; value: number };
type Question = { id: string; label: string; total: number; average: number | null; values: Item[] };
type Report = { key: string; title: string; total: number; average: number | null; byPeriod: Item[]; byCategory: Item[]; distributions: { label: string; values: Item[] }[]; questions: Question[] };
type Payload = { generatedAt: string; reports: Report[] };

const copy = {
  ru: { eyebrow: "Обеспечение качества образования", department: "Отдел обеспечения качества образования", groups: "Учебные группы", languages: "Языки анкет", filter: "Выберите опрос", title: "Мониторинг опросов", lead: "Автоматическая аналитика по всем действующим анкетам.", refresh: "Обновить", pdf: "Скачать PDF", total: "Всего анкет", average: "Средняя оценка", period: "Динамика по месяцам", categories: "Основное распределение", distribution: "Распределение ответов", loading: "Загрузка данных…", error: "Не удалось загрузить мониторинг.", empty: "Данных пока нет", generated: "Обновлено", all: "Все опросы", responses: "ответов", share: "доля", report: "Аналитический отчёт", pdfReady: "PDF подготовлен", questions: "По каждому вопросу", responseCount: "ответов", noData: "Данных пока нет" },
  uz: { eyebrow: "Ta’lim sifatini ta’minlaş", department: "Ta’lim sifatini ta’minlaş bölimi", groups: "Öquv guruhlari", languages: "Anketa tillari", filter: "Sörovni tanlang", title: "Sörovnomalar monitoringi", lead: "Barça amaldagi anketalar böyiça avtomatik tahlil.", refresh: "Yangilaş", pdf: "PDF yuklab oliş", total: "Jami anketalar", average: "Örtaça baho", period: "Oylar böyiça dinamika", categories: "Asosiy taqsimot", distribution: "Javoblar taqsimoti", loading: "Ma’lumotlar yuklanmoqda…", error: "Monitoringni yuklab bölmadi.", empty: "Hozirça ma’lumot yöq", generated: "Yangilangan", all: "Barça sörovnomalar", responses: "javob", share: "uluş", report: "Tahliliy hisobot", pdfReady: "PDF tayyorlandi", questions: "Har bir savol böyiça", responseCount: "javob", noData: "Hozirça ma’lumot yöq" },
  en: { eyebrow: "Education quality assurance", department: "Education Quality Assurance Department", groups: "Study groups", languages: "Survey languages", filter: "Select a survey", title: "Survey monitoring", lead: "Automatic analytics for all active questionnaires.", refresh: "Refresh", pdf: "Download PDF", total: "Total forms", average: "Average score", period: "Monthly trend", categories: "Main distribution", distribution: "Response distribution", loading: "Loading data…", error: "Could not load monitoring.", empty: "No data yet", generated: "Updated", all: "All surveys", responses: "responses", share: "share", report: "Analytical report", pdfReady: "PDF is ready", questions: "Results by question", responseCount: "responses", noData: "No data yet" },
} as const;

const colors = ["#0b4f8a", "#10a3a3", "#2f9e62", "#f2a93b", "#da5a65", "#6b62c5"];

type Copy = { [K in keyof typeof copy.ru]: string };

function topItems(items: Item[]) { return items.filter(item => item.value > 0).slice(0, 6); }

function DonutChart({ items, center, label, other, locale }: { items: Item[]; center: string; label: string; other: string; locale: string }) {
  const fmt = monitoringFormat(locale);
  const positive = items.filter(item => item.value > 0);
  const rest = positive.slice(5).reduce((sum, item) => sum + item.value, 0);
  const visible = positive.length > 6 ? [...positive.slice(0, 5), { label: other, value: rest }] : positive;
  const total = visible.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const stops = visible.length ? visible.map((item, index) => {
    const start = cursor / total * 100;
    cursor += item.value;
    return `${colors[index % colors.length]} ${start}% ${cursor / total * 100}%`;
  }).join(", ") : "#dbe6ef 0% 100%";
  return <div className="flex flex-col items-center gap-4 sm:flex-row"><div className="relative h-44 w-44 shrink-0 rounded-full" style={{ background: `conic-gradient(${stops})` }} role="img" aria-label={label}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner"><strong className="text-3xl font-black text-slate-900">{center}</strong><span className="mt-1 text-xs font-semibold text-slate-500">{label}</span></div></div><div className="min-w-0 flex-1 space-y-2">{visible.map((item, index) => <div key={item.label} className="flex items-center gap-2 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} /><span className="min-w-0 flex-1 truncate text-slate-600">{item.label}</span><b className="text-slate-900">{item.value}</b><span className="w-12 text-right text-xs text-slate-400">{fmt.percent(total ? item.value / total : 0)}</span></div>)}</div></div>;
}

function QuestionCard({ question, responses, noData, locale }: { question: Question; responses: string; noData: string; locale: string }) {
  const max = Math.max(1, ...question.values.map(item => item.value));
  return <section className="rounded-2xl border border-slate-100 bg-white p-4">
    <div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold leading-5 text-slate-800">{question.label}</h3>{question.average !== null && <b className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-sm text-blue-800">{monitoringFormat(locale).number(question.average)}</b>}</div>
    <p className="mt-1 text-xs text-slate-400">{responses}: {monitoringFormat(locale).number(question.total)}</p>
    <div className="mt-4 space-y-2">{question.values.map((item, index) => <div key={item.label}><div className="flex justify-between gap-2 text-xs"><span className="truncate text-slate-600">{item.label}</span><b className="text-slate-800">{item.value}</b></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: String(Math.max(3, item.value / max * 100)) + "%", backgroundColor: colors[index % colors.length] }} /></div></div>)}{!question.values.length && <p className="text-sm text-slate-400">{noData}</p>}</div>
  </section>;
}
function BarChart({ items }: { items: Item[] }) {
  const visible = topItems(items);
  const max = Math.max(1, ...visible.map(item => item.value));
  return <div className="space-y-3">{visible.map((item, index) => <div key={item.label}><div className="mb-1 flex justify-between gap-3 text-sm"><span className="truncate text-slate-700">{item.label}</span><b className="text-slate-900">{item.value}</b></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${Math.max(2, item.value / max * 100)}%`, backgroundColor: colors[index % colors.length] }} /></div></div>)}</div>;
}

export default function SurveyMonitoringDashboard({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = copy[lang];
  const fmt = monitoringFormat(lang);
  const units = { ru: { forms: "Анкеты", other: "Другие", note: "По каждому критерию оценки преподавателей сначала усредняются внутри анкеты. В распределении балл округляется до целого." }, uz: { forms: "Anketalar", other: "Boşqalar", note: "Har bir mezon böyiça baholar anketa içida örtaçalanadi va taqsimotda butun songa yaxlitlanadi." }, en: { forms: "Forms", other: "Other", note: "Teacher ratings are averaged within each form, then rounded for the breakdown." } }[lang];
  const [payload, setPayload] = useState<Payload | null>(null);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [pdfError,setPdfError]=useState(false);
  const [printing,setPrinting]=useState(false);
  async function download(report:Report,generatedAt:string){
    if(printing)return;
    setPrinting(true);setPdfError(false);
    try{
      const [{jsPDF},{layOutReport},response]=await Promise.all([import("jspdf"),import("@/lib/monitoringPdf"),fetch("/DejaVuSans.ttf")]);
      if(!response.ok)throw new Error();
      const bytes=new Uint8Array(await response.arrayBuffer());
      let binary="";for(let i=0;i<bytes.length;i+=0x4000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x4000));
      layOutReport(new jsPDF({unit:"mm",format:"a4"}),btoa(binary),report,generatedAt,lang).save(`monitoring-${report.key}-${lang}.pdf`);
    } catch{setPdfError(true);} finally{setPrinting(false);}
  }
  const load = useCallback(async () => { setLoading(true); setFailed(false); try { const response = await fetch("/api/admin/monitoring/" + lang, { cache: "no-store" }); if (!response.ok) throw new Error("load"); setPayload(await response.json()); } catch { setFailed(true); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  const reports = useMemo(() => payload?.reports.filter(report => selected === "all" || report.key === selected) || [], [payload, selected]);
  const total = reports.reduce((sum, report) => sum + report.total, 0);
  if (loading) return <div className="rounded-3xl bg-white p-10 text-center text-slate-500">{t.loading}</div>;
  if (failed || !payload) return <div className="rounded-3xl bg-white p-10 text-center text-red-700"><p>{t.error}</p><button onClick={() => void load()} className="mt-4 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">{t.refresh}</button></div>;
  return <div className="space-y-6">
    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-700">{t.eyebrow}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{t.title}</h1><p className="mt-3 max-w-3xl text-slate-500">{t.lead}</p><p className="mt-2 text-xs text-slate-400">{t.generated}: {fmt.date(payload.generatedAt)}</p></div><div className="flex flex-wrap gap-3"><select aria-label={t.filter} value={selected} onChange={event => setSelected(event.target.value)} className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold"><option value="all">{t.all}</option>{payload.reports.map(report => <option key={report.key} value={report.key}>{report.title}</option>)}</select><button onClick={() => void load()} className="rounded-xl border border-blue-200 bg-white px-4 py-3 font-bold text-blue-800">{t.refresh}</button></div></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.total}</p><strong className="mt-2 block text-4xl font-black text-blue-700">{total}</strong></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.all}</p><strong className="mt-2 block text-4xl font-black text-cyan-700">{reports.length}</strong></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.average}</p><strong className="mt-2 block text-4xl font-black text-emerald-700">{reports.length === 1 && reports[0].average !== null ? fmt.number(reports[0].average) : "—"}</strong></section></div>
    {pdfError&&<p role="alert" className="rounded-xl bg-red-50 p-4">{t.error}</p>}
    {!reports.length && <div className="rounded-2xl bg-white p-10 text-center text-slate-500">{t.empty}</div>}
    <div className="grid gap-6 xl:grid-cols-2">{reports.map(report => <article key={report.key} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm motion-safe:transition-shadow hover:shadow-md"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="text-2xl font-black text-slate-900">{report.title}</h2><p className="mt-2 text-sm text-slate-500">{t.total}: <b>{report.total}</b>{report.average !== null && <> · {t.average}: <b>{fmt.number(report.average)}</b></>}</p></div><button disabled={printing} onClick={() => void download(report,payload.generatedAt)} className="rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white">{t.pdf}</button></div><div className="mt-6 rounded-2xl bg-slate-50 p-4"><h3 className="mb-4 text-sm font-bold text-blue-900">{report.key === "teacher" ? t.groups : t.languages}</h3><DonutChart items={report.byCategory} center={String(report.total)} label={units.forms} other={units.other} locale={lang} /></div><div className="mt-6 grid gap-6 md:grid-cols-2"><section><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.period}</h3>{report.byPeriod.length ? <BarChart items={report.byPeriod.map(item => ({ ...item, label: fmt.month(item.label) }))} /> : <p className="text-sm text-slate-400">{t.empty}</p>}</section><section><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.distribution}</h3>{report.distributions.length ? <BarChart items={report.distributions[0].values} /> : <p className="text-sm text-slate-400">{t.empty}</p>}</section></div>{report.key === "teacher" && <p className="mt-5 rounded-xl bg-cyan-50 p-4 text-sm text-cyan-950">{units.note}</p>}<section className="mt-6"><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.questions}</h3><div className="grid gap-3 md:grid-cols-2">{report.questions.filter(question => question.total > 0).map(question => <QuestionCard key={question.id} question={question} responses={units.forms} noData={t.noData} locale={lang} />)}</div></section></article>)}</div>
  </div>;
}
