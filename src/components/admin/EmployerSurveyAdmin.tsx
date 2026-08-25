"use client";

import { useCallback, useEffect, useState } from "react";

type Locale = "ru" | "uz" | "en";
type Row = Record<string, unknown> & { id: string; created_at: string; organization_name: string; activity_area: string; respondent_position: string; recommendation_score: number; contact_name?: string; contact_phone?: string; contact_email?: string; locale: Locale };
type Stats = { total: number; today: number; week: number; averageRecommendation: number };

const labels = {
  ru: { title: "Опрос работодателей", subtitle: "Поступившие анкеты и сведения об участниках", total: "Всего анкет", today: "За 24 часа", week: "За 7 дней", score: "Средняя рекомендация", search: "Организация, сфера, должность или Ф.И.О.", all: "Все языки", from: "Дата от", to: "Дата до", export: "Экспорт CSV", loading: "Загрузка…", empty: "Анкеты не найдены", organization: "Организация", respondent: "Респондент", contacts: "Контакты", date: "Дата", details: "Основные результаты", page: "Страница", programmes: "Направления", readiness: "Готовность к сотрудничеству", recommendation: "Рекомендация" },
  uz: { title: "Ish beruvchilar so‘rovi", subtitle: "Kelib tushgan anketalar va ishtirokchilar haqida ma’lumot", total: "Jami anketalar", today: "24 soatda", week: "7 kunda", score: "O‘rtacha tavsiya", search: "Tashkilot, soha, lavozim yoki F.I.Sh.", all: "Barcha tillar", from: "Boshlanish sanasi", to: "Tugash sanasi", export: "CSV eksporti", loading: "Yuklanmoqda…", empty: "Anketalar topilmadi", organization: "Tashkilot", respondent: "Respondent", contacts: "Aloqa", date: "Sana", details: "Asosiy natijalar", page: "Sahifa", programmes: "Yo‘nalishlar", readiness: "Hamkorlikka tayyorlik", recommendation: "Tavsiya" },
  en: { title: "Employer survey", subtitle: "Submitted questionnaires and participant information", total: "Total responses", today: "Last 24 hours", week: "Last 7 days", score: "Average recommendation", search: "Organisation, sector, position or name", all: "All languages", from: "Date from", to: "Date to", export: "Export CSV", loading: "Loading…", empty: "No responses found", organization: "Organisation", respondent: "Respondent", contacts: "Contacts", date: "Date", details: "Key results", page: "Page", programmes: "Programmes", readiness: "Cooperation readiness", recommendation: "Recommendation" },
} as const;

function csvValue(value: unknown) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }

export default function EmployerSurveyAdmin({ locale }: { locale: string }) {
  const lang: Locale = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[lang];
  const [rows, setRows] = useState<Row[]>([]), [stats, setStats] = useState<Stats>({ total: 0, today: 0, week: 0, averageRecommendation: 0 });
  const [search, setSearch] = useState(""), [language, setLanguage] = useState(""), [from, setFrom] = useState(""), [to, setTo] = useState(""), [page, setPage] = useState(1), [total, setTotal] = useState(0), [loading, setLoading] = useState(true);
  const pageSize = 25;
  const load = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams({ page: String(page), pageSize: String(pageSize), search, locale: language, from, to });
    const response = await fetch(`/api/admin/employer-surveys?${query}`, { cache: "no-store" });
    if (response.ok) { const data = await response.json(); setRows(data.rows || []); setStats(data.stats); setTotal(data.total || 0); }
    setLoading(false);
  }, [page, search, language, from, to]);
  useEffect(() => { const timer = setTimeout(() => void load(), 250); return () => clearTimeout(timer); }, [load]);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  function exportCsv() {
    const columns = ["created_at", "organization_name", "activity_area", "respondent_position", "locale", "programmes", "graduates_count", "practice_rating", "programme_relevance", "hiring_readiness", "recommendation_score", "cooperation_readiness", "contact_name", "contact_phone", "contact_email"];
    const body = [columns.join(";"), ...rows.map(row => columns.map(key => csvValue(Array.isArray(row[key]) ? (row[key] as unknown[]).join(", ") : row[key])).join(";"))].join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + body], { type: "text/csv;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = "employer-survey-responses.csv"; a.click(); URL.revokeObjectURL(url);
  }
  return <div className="space-y-6"><header className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-black text-slate-900 sm:text-4xl">{t.title}</h1><p className="mt-2 text-slate-500">{t.subtitle}</p></div><button onClick={exportCsv} disabled={!rows.length} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white disabled:opacity-40">{t.export}</button></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[t.total, stats.total, "text-blue-700"], [t.today, stats.today, "text-cyan-700"], [t.week, stats.week, "text-violet-700"], [t.score, `${stats.averageRecommendation}/10`, "text-emerald-700"]].map(([label,value,color]) => <section key={String(label)} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><strong className={`mt-2 block text-3xl ${color}`}>{value}</strong></section>)}</div>
    <section className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-[1fr_180px_160px_160px]"><input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder={t.search} className="min-w-0 rounded-xl border p-3"/><select value={language} onChange={e => { setLanguage(e.target.value); setPage(1); }} className="rounded-xl border bg-white p-3"><option value="">{t.all}</option><option value="ru">Русский</option><option value="uz">O‘zbekcha</option><option value="en">English</option></select><label className="text-xs font-bold text-slate-500">{t.from}<input type="date" value={from} onChange={e => { setFrom(e.target.value); setPage(1); }} className="mt-1 w-full rounded-xl border p-2"/></label><label className="text-xs font-bold text-slate-500">{t.to}<input type="date" value={to} onChange={e => { setTo(e.target.value); setPage(1); }} className="mt-1 w-full rounded-xl border p-2"/></label></section>
    <div className="space-y-3">{loading && <p className="rounded-2xl bg-white p-8 text-center">{t.loading}</p>}{!loading && !rows.length && <p className="rounded-2xl bg-white p-8 text-center text-slate-500">{t.empty}</p>}{!loading && rows.map(row => <details key={row.id} className="rounded-2xl bg-white p-5 shadow-sm"><summary className="cursor-pointer list-none"><div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]"><div><b className="text-lg text-slate-900">{row.organization_name}</b><p className="text-sm text-slate-500">{row.activity_area}</p></div><div><span className="text-xs font-bold text-slate-400">{t.respondent}</span><p>{row.respondent_position}</p><p className="text-sm">{row.contact_name || "—"}</p></div><div><span className="text-xs font-bold text-slate-400">{t.contacts}</span><p className="text-sm">{row.contact_phone || "—"}</p><p className="text-sm">{row.contact_email || "—"}</p></div><div className="text-right"><b>{row.recommendation_score}/10</b><p className="text-xs text-slate-500">{new Date(row.created_at).toLocaleString(lang)}</p></div></div></summary><div className="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2"><p><b>{t.programmes}:</b> {Array.isArray(row.programmes) ? row.programmes.join(", ") : "—"}</p><p><b>{t.readiness}:</b> {String(row.cooperation_readiness || "—")}</p><p><b>{t.recommendation}:</b> {row.recommendation_score}/10</p><p><b>{t.details}:</b> {String(row.proposals || row.demanded_competencies || "—")}</p></div></details>)}</div>
    <div className="flex justify-end gap-3"><button disabled={page <= 1} onClick={() => setPage(value => value - 1)} className="rounded-xl bg-white px-4 py-2 disabled:opacity-40">←</button><span className="p-2">{t.page} {page}/{pages}</span><button disabled={page >= pages} onClick={() => setPage(value => value + 1)} className="rounded-xl bg-white px-4 py-2 disabled:opacity-40">→</button></div>
  </div>;
}
