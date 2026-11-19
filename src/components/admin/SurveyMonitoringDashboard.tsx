"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Item = { label: string; value: number };
type Report = { key: string; title: string; total: number; average: number | null; byPeriod: Item[]; byCategory: Item[]; distributions: { label: string; values: Item[] }[] };
type Payload = { generatedAt: string; reports: Report[] };

const copy = {
  ru: { title: "Мониторинг опросов", lead: "Автоматическая сводка данных по всем действующим анкетам.", refresh: "Обновить", pdf: "Скачать PDF", total: "Всего ответов", average: "Средняя оценка", period: "Динамика по месяцам", categories: "Распределение", distribution: "Ответы и показатели", loading: "Загрузка данных…", error: "Не удалось загрузить мониторинг.", empty: "Данных пока нет", generated: "Обновлено", all: "Все опросы" },
  uz: { title: "So‘rovnomalar monitoringi", lead: "Barcha amaldagi so‘rovnomalar bo‘yicha ma’lumotlarning avtomatik jamlanmasi.", refresh: "Yangilash", pdf: "PDF yuklab olish", total: "Jami javoblar", average: "O‘rtacha baho", period: "Oylar bo‘yicha dinamika", categories: "Taqsimot", distribution: "Javoblar va ko‘rsatkichlar", loading: "Ma’lumotlar yuklanmoqda…", error: "Monitoringni yuklab bo‘lmadi.", empty: "Hozircha ma’lumot yo‘q", generated: "Yangilangan", all: "Barcha so‘rovnomalar" },
  en: { title: "Survey monitoring", lead: "An automatic summary of data from all active questionnaires.", refresh: "Refresh", pdf: "Download PDF", total: "Total responses", average: "Average score", period: "Monthly trend", categories: "Distribution", distribution: "Answers and indicators", loading: "Loading data…", error: "Could not load monitoring.", empty: "No data yet", generated: "Updated", all: "All surveys" },
} as const;

function BarChart({ items }: { items: Item[] }) {
  const max = Math.max(1, ...items.map(item => item.value));
  return <div className="space-y-3">{items.slice(0, 12).map(item => <div key={item.label}><div className="mb-1 flex justify-between gap-3 text-sm"><span className="truncate text-slate-700">{item.label}</span><b className="text-slate-900">{item.value}</b></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${Math.max(2, item.value / max * 100)}%` }} /></div></div>)}</div>;
}

export default function SurveyMonitoringDashboard({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = copy[lang];
  const [payload, setPayload] = useState<Payload | null>(null);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/admin/monitoring", { cache: "no-store" });
      if (!response.ok) throw new Error("load");
      setPayload(await response.json());
    } catch { setFailed(true); } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const reports = useMemo(() => payload?.reports.filter(report => selected === "all" || report.key === selected) || [], [payload, selected]);
  const total = reports.reduce((sum, report) => sum + report.total, 0);

  if (loading) return <div className="rounded-3xl bg-white p-10 text-center text-slate-500">{t.loading}</div>;
  if (failed || !payload) return <div className="rounded-3xl bg-white p-10 text-center text-red-700"><p>{t.error}</p><button onClick={() => void load()} className="mt-4 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">{t.refresh}</button></div>;

  return <div className="space-y-6">
    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-700">Quality assurance</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{t.title}</h1><p className="mt-3 max-w-3xl text-slate-500">{t.lead}</p><p className="mt-2 text-xs text-slate-400">{t.generated}: {new Date(payload.generatedAt).toLocaleString(lang)}</p></div><div className="flex flex-wrap gap-3"><select value={selected} onChange={event => setSelected(event.target.value)} className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold"><option value="all">{t.all}</option>{payload.reports.map(report => <option key={report.key} value={report.key}>{report.title}</option>)}</select><button onClick={() => void load()} className="rounded-xl border border-blue-200 bg-white px-4 py-3 font-bold text-blue-800">{t.refresh}</button></div></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.total}</p><strong className="mt-2 block text-4xl font-black text-blue-700">{total}</strong></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.all}</p><strong className="mt-2 block text-4xl font-black text-cyan-700">{reports.length}</strong></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.average}</p><strong className="mt-2 block text-4xl font-black text-emerald-700">{reports.length === 1 ? reports[0].average ?? "—" : "—"}</strong></section></div>
    {!reports.length && <div className="rounded-2xl bg-white p-10 text-center text-slate-500">{t.empty}</div>}
    <div className="grid gap-6 xl:grid-cols-2">{reports.map(report => <article key={report.key} className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="text-2xl font-black text-slate-900">{report.title}</h2><p className="mt-2 text-sm text-slate-500">{t.total}: <b>{report.total}</b>{report.average !== null && <> · {t.average}: <b>{report.average}</b></>}</p></div><a href={`/api/admin/monitoring/pdf?kind=${encodeURIComponent(report.key)}`} className="rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white">{t.pdf}</a></div><section><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.period}</h3>{report.byPeriod.length ? <BarChart items={report.byPeriod} /> : <p className="text-sm text-slate-400">{t.empty}</p>}</section><section><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.categories}</h3>{report.byCategory.length ? <BarChart items={report.byCategory} /> : <p className="text-sm text-slate-400">{t.empty}</p>}</section>{report.distributions.map(distribution => <section key={distribution.label}><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{distribution.label}</h3><BarChart items={distribution.values} /></section>)}</article>)}</div>
  </div>;
}
