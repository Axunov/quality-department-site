"use client";

import { jsPDF } from "jspdf";
import { useCallback, useEffect, useMemo, useState } from "react";

type Item = { label: string; value: number };
type Question = { id: string; label: string; total: number; average: number | null; values: Item[] };
type Report = { key: string; title: string; total: number; average: number | null; byPeriod: Item[]; byCategory: Item[]; distributions: { label: string; values: Item[] }[]; questions: Question[] };
type Payload = { generatedAt: string; reports: Report[] };

const copy = {
  ru: { title: "Мониторинг опросов", lead: "Автоматическая аналитика по всем действующим анкетам.", refresh: "Обновить", pdf: "Скачать красивый PDF", total: "Всего ответов", average: "Средняя оценка", period: "Динамика по месяцам", categories: "Основное распределение", distribution: "Распределение ответов", loading: "Загрузка данных…", error: "Не удалось загрузить мониторинг.", empty: "Данных пока нет", generated: "Обновлено", all: "Все опросы", responses: "ответов", share: "доля", report: "Аналитический отчёт", pdfReady: "PDF подготовлен", questions: "По каждому вопросу", responseCount: "ответов", noData: "Данных пока нет" },
  uz: { title: "So‘rovnomalar monitoringi", lead: "Barcha amaldagi anketalar bo‘yicha avtomatik tahlil.", refresh: "Yangilash", pdf: "Chiroyli PDF yuklab olish", total: "Jami javoblar", average: "O‘rtacha baho", period: "Oylar bo‘yicha dinamika", categories: "Asosiy taqsimot", distribution: "Javoblar taqsimoti", loading: "Ma’lumotlar yuklanmoqda…", error: "Monitoringni yuklab bo‘lmadi.", empty: "Hozircha ma’lumot yo‘q", generated: "Yangilangan", all: "Barcha so‘rovnomalar", responses: "javob", share: "ulush", report: "Tahliliy hisobot", pdfReady: "PDF tayyorlandi", questions: "Har bir savol bo‘yicha", responseCount: "javob", noData: "Hozircha ma’lumot yo‘q" },
  en: { title: "Survey monitoring", lead: "Automatic analytics for all active questionnaires.", refresh: "Refresh", pdf: "Download styled PDF", total: "Total responses", average: "Average score", period: "Monthly trend", categories: "Main distribution", distribution: "Response distribution", loading: "Loading data…", error: "Could not load monitoring.", empty: "No data yet", generated: "Updated", all: "All surveys", responses: "responses", share: "share", report: "Analytical report", pdfReady: "PDF is ready", questions: "Results by question", responseCount: "responses", noData: "No data yet" },
} as const;

const colors = ["#0b4f8a", "#10a3a3", "#2f9e62", "#f2a93b", "#da5a65", "#6b62c5"];

type Copy = { [K in keyof typeof copy.ru]: string };

function topItems(items: Item[]) { return items.filter(item => item.value > 0).slice(0, 6); }

function DonutChart({ items, center, label, other }: { items: Item[]; center: string; label: string; other: string }) {
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
  return <div className="flex flex-col items-center gap-4 sm:flex-row"><div className="relative h-44 w-44 shrink-0 rounded-full" style={{ background: `conic-gradient(${stops})` }} role="img" aria-label={label}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner"><strong className="text-3xl font-black text-slate-900">{center}</strong><span className="mt-1 text-xs font-semibold text-slate-500">{label}</span></div></div><div className="min-w-0 flex-1 space-y-2">{visible.map((item, index) => <div key={item.label} className="flex items-center gap-2 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} /><span className="min-w-0 flex-1 truncate text-slate-600">{item.label}</span><b className="text-slate-900">{item.value}</b><span className="w-12 text-right text-xs text-slate-400">{total ? Math.round(item.value / total * 100) : 0}%</span></div>)}</div></div>;
}

function QuestionCard({ question, responses, noData }: { question: Question; responses: string; noData: string }) {
  const max = Math.max(1, ...question.values.map(item => item.value));
  return <section className="rounded-2xl border border-slate-100 bg-white p-4">
    <div className="flex items-start justify-between gap-3"><h3 className="text-sm font-bold leading-5 text-slate-800">{question.label}</h3>{question.average !== null && <b className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-sm text-blue-800">{question.average}</b>}</div>
    <p className="mt-1 text-xs text-slate-400">{question.total} {responses}</p>
    <div className="mt-4 space-y-2">{question.values.map((item, index) => <div key={item.label}><div className="flex justify-between gap-2 text-xs"><span className="truncate text-slate-600">{item.label}</span><b className="text-slate-800">{item.value}</b></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: String(Math.max(3, item.value / max * 100)) + "%", backgroundColor: colors[index % colors.length] }} /></div></div>)}{!question.values.length && <p className="text-sm text-slate-400">{noData}</p>}</div>
  </section>;
}
function BarChart({ items }: { items: Item[] }) {
  const visible = topItems(items);
  const max = Math.max(1, ...visible.map(item => item.value));
  return <div className="space-y-3">{visible.map((item, index) => <div key={item.label}><div className="mb-1 flex justify-between gap-3 text-sm"><span className="truncate text-slate-700">{item.label}</span><b className="text-slate-900">{item.value}</b></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${Math.max(2, item.value / max * 100)}%`, backgroundColor: colors[index % colors.length] }} /></div></div>)}</div>;
}

function drawWrapped(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, line: number) {
  const words = text.split(/\s+/);
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width > max && current) { ctx.fillText(current, x, y); y += line; current = word; } else current = next;
  }
  if (current) { ctx.fillText(current, x, y); y += line; }
  return y;
}

function drawPdfReport(report: Report, generatedAt: string, locale: string, t: Copy) {
  const W = 794, H = 1123, scale = 2;
  const canvas = document.createElement("canvas"); canvas.width = W * scale; canvas.height = H * scale;
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#f4f8fb"; ctx.fillRect(0, 0, W, H);
  const header = ctx.createLinearGradient(0, 0, W, 0); header.addColorStop(0, "#073b73"); header.addColorStop(1, "#087d83");
  ctx.fillStyle = header; ctx.fillRect(0, 0, W, 190);
  ctx.fillStyle = "#ffffff"; ctx.font = "700 20px Arial"; ctx.fillText(t.report, 44, 52);
  ctx.font = "700 30px Arial"; let y = drawWrapped(ctx, report.title, 44, 96, 650, 38);
  ctx.font = "400 14px Arial"; ctx.fillStyle = "rgba(255,255,255,.78)"; ctx.fillText(`${t.generated}: ${new Date(generatedAt).toLocaleString(locale)}`, 44, y + 12);
  ctx.fillStyle = "#ffffff"; ctx.font = "700 13px Arial"; ctx.fillText("QUALITY DEPARTMENT", 590, 52);
  y = 228;
  const cards = [[t.total, String(report.total), "#0b4f8a"], [t.average, report.average === null ? "—" : String(report.average), "#2f9e62"]];
  cards.forEach((card, index) => { const x = 44 + index * 220; ctx.beginPath(); ctx.fillStyle = "#ffffff"; ctx.roundRect(x, y, 196, 82, 16); ctx.fill(); ctx.fillStyle = "#687789"; ctx.font = "600 13px Arial"; ctx.fillText(card[0], x + 18, y + 27); ctx.fillStyle = card[2]; ctx.font = "700 31px Arial"; ctx.fillText(card[1], x + 18, y + 65); });
  y += 118;
  ctx.beginPath(); ctx.fillStyle = "#ffffff"; ctx.roundRect(44, y, 706, 310, 18); ctx.fill();
  ctx.fillStyle = "#172b4d"; ctx.font = "700 20px Arial"; ctx.fillText(t.categories, 70, y + 38);
  const items = topItems(report.byCategory), total = Math.max(1, items.reduce((sum, item) => sum + item.value, 0)); let cursor = 0;
  ctx.lineWidth = 28; ctx.lineCap = "butt";
  items.forEach((item, index) => { const start = -Math.PI / 2 + cursor / total * Math.PI * 2; cursor += item.value; const end = -Math.PI / 2 + cursor / total * Math.PI * 2; ctx.strokeStyle = colors[index % colors.length]; ctx.beginPath(); ctx.arc(210, y + 170, 92, start, end); ctx.stroke(); });
  ctx.fillStyle = "#172b4d"; ctx.font = "700 28px Arial"; ctx.textAlign = "center"; ctx.fillText(String(report.total), 210, y + 178); ctx.font = "600 12px Arial"; ctx.fillStyle = "#687789"; ctx.fillText(t.responses, 210, y + 199); ctx.textAlign = "left";
  items.forEach((item, index) => { const lx = 365, ly = y + 82 + index * 34; ctx.fillStyle = colors[index % colors.length]; ctx.fillRect(lx, ly - 11, 12, 12); ctx.fillStyle = "#394b61"; ctx.font = "500 14px Arial"; ctx.fillText(item.label.slice(0, 38), lx + 22, ly); ctx.font = "700 14px Arial"; ctx.fillText(`${item.value} (${Math.round(item.value / total * 100)}%)`, 665, ly); });
  y += 344;
  const sections = [[t.period, report.byPeriod], ...report.distributions.map(item => [item.label, item.values])];
  for (const section of sections) {
    if (!section[1].length) continue;
    ctx.beginPath(); ctx.fillStyle = "#ffffff"; ctx.roundRect(44, y, 706, 190, 18); ctx.fill();
    ctx.fillStyle = "#172b4d"; ctx.font = "700 18px Arial"; ctx.fillText(String(section[0]), 70, y + 34);
    const values = topItems(section[1] as Item[]), max = Math.max(1, ...values.map(item => item.value));
    values.forEach((item, index) => { const yy = y + 65 + index * 20; ctx.fillStyle = "#687789"; ctx.font = "500 11px Arial"; ctx.fillText(item.label.slice(0, 25), 70, yy); ctx.beginPath(); ctx.fillStyle = colors[index % colors.length]; ctx.roundRect(220, yy - 10, Math.max(4, 430 * item.value / max), 10, 5); ctx.fill(); ctx.fillStyle = "#172b4d"; ctx.font = "700 11px Arial"; ctx.fillText(String(item.value), 665, yy); });
    y += 208;
    if (y > 1020) break;
  }
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 595.28, 841.89, undefined, "FAST");
  const filled = report.questions.filter(q => q.total > 0);
  const questionChunks = Array.from({ length: Math.ceil(filled.length / 2) }, (_, index) => filled.slice(index * 2, index * 2 + 2));
  for (const chunk of questionChunks) {
    const qCanvas = document.createElement("canvas"); qCanvas.width = W * scale; qCanvas.height = H * scale;
    const qctx = qCanvas.getContext("2d"); if (!qctx) continue; qctx.scale(scale, scale);
    qctx.fillStyle = "#f4f8fb"; qctx.fillRect(0, 0, W, H);
    const qHeader = qctx.createLinearGradient(0, 0, W, 0); qHeader.addColorStop(0, "#073b73"); qHeader.addColorStop(1, "#087d83"); qctx.fillStyle = qHeader; qctx.fillRect(0, 0, W, 130);
    qctx.fillStyle = "#fff"; qctx.font = "700 22px Arial"; qctx.fillText(t.report, 44, 48); qctx.font = "700 24px Arial"; qctx.fillText(report.title.slice(0, 52), 44, 92);
    chunk.forEach((question, index) => {
      const cardY = 160 + index * 400; qctx.beginPath(); qctx.fillStyle = "#fff"; qctx.roundRect(44, cardY, 706, 360, 18); qctx.fill();
      qctx.fillStyle = "#172b4d"; qctx.font = "700 16px Arial"; drawWrapped(qctx, question.label, 68, cardY + 32, 620, 21);
      qctx.fillStyle = "#687789"; qctx.font = "600 12px Arial"; qctx.fillText(question.total + " " + t.responses + (question.average === null ? "" : " · " + t.average + ": " + question.average), 68, cardY + 96);
      const max = Math.max(1, ...question.values.map(item => item.value));
      question.values.forEach((item, itemIndex) => { const yy = cardY + 124 + itemIndex * 21; qctx.fillStyle = "#687789"; qctx.font = "500 11px Arial"; qctx.fillText(item.label.slice(0, 30), 68, yy); qctx.beginPath(); qctx.fillStyle = colors[itemIndex % colors.length]; qctx.roundRect(285, yy - 9, Math.max(4, 350 * item.value / max), 9, 4); qctx.fill(); qctx.fillStyle = "#172b4d"; qctx.font = "700 11px Arial"; qctx.fillText(String(item.value), 655, yy); });
    });
    doc.addPage(); doc.addImage(qCanvas.toDataURL("image/png"), "PNG", 0, 0, 595.28, 841.89, undefined, "FAST");
  }
  doc.save(`monitoring-${report.key}.pdf`);
}

export default function SurveyMonitoringDashboard({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = copy[lang];
  const units = { ru: { forms: "анкет", other: "Другие", note: "По каждому критерию оценки преподавателей сначала усредняются внутри анкеты. В распределении балл округляется до целого." }, uz: { forms: "anketa", other: "Boshqalar", note: "Har bir mezon bo‘yicha baholar anketa ichida o‘rtachalanadi va taqsimotda butun songa yaxlitlanadi." }, en: { forms: "forms", other: "Other", note: "Teacher ratings are averaged within each form, then rounded for the breakdown." } }[lang];
  const [payload, setPayload] = useState<Payload | null>(null);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const load = useCallback(async () => { setLoading(true); setFailed(false); try { const response = await fetch("/api/admin/monitoring?locale=" + lang, { cache: "no-store" }); if (!response.ok) throw new Error("load"); setPayload(await response.json()); } catch { setFailed(true); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  const reports = useMemo(() => payload?.reports.filter(report => selected === "all" || report.key === selected) || [], [payload, selected]);
  const total = reports.reduce((sum, report) => sum + report.total, 0);
  if (loading) return <div className="rounded-3xl bg-white p-10 text-center text-slate-500">{t.loading}</div>;
  if (failed || !payload) return <div className="rounded-3xl bg-white p-10 text-center text-red-700"><p>{t.error}</p><button onClick={() => void load()} className="mt-4 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">{t.refresh}</button></div>;
  return <div className="space-y-6">
    <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-700">Quality assurance</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{t.title}</h1><p className="mt-3 max-w-3xl text-slate-500">{t.lead}</p><p className="mt-2 text-xs text-slate-400">{t.generated}: {new Date(payload.generatedAt).toLocaleString(lang)}</p></div><div className="flex flex-wrap gap-3"><select value={selected} onChange={event => setSelected(event.target.value)} className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold"><option value="all">{t.all}</option>{payload.reports.map(report => <option key={report.key} value={report.key}>{report.title}</option>)}</select><button onClick={() => void load()} className="rounded-xl border border-blue-200 bg-white px-4 py-3 font-bold text-blue-800">{t.refresh}</button></div></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.total}</p><strong className="mt-2 block text-4xl font-black text-blue-700">{total}</strong></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.all}</p><strong className="mt-2 block text-4xl font-black text-cyan-700">{reports.length}</strong></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{t.average}</p><strong className="mt-2 block text-4xl font-black text-emerald-700">{reports.length === 1 ? reports[0].average ?? "—" : "—"}</strong></section></div>
    {!reports.length && <div className="rounded-2xl bg-white p-10 text-center text-slate-500">{t.empty}</div>}
    <div className="grid gap-6 xl:grid-cols-2">{reports.map(report => <article key={report.key} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm motion-safe:transition-shadow hover:shadow-md"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="text-2xl font-black text-slate-900">{report.title}</h2><p className="mt-2 text-sm text-slate-500">{t.total}: <b>{report.total}</b>{report.average !== null && <> · {t.average}: <b>{report.average}</b></>}</p></div><button onClick={() => drawPdfReport(report, payload.generatedAt, lang, t)} className="rounded-xl bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white">{t.pdf}</button></div><div className="mt-6 rounded-2xl bg-slate-50 p-4"><DonutChart items={report.byCategory} center={String(report.total)} label={units.forms} other={units.other} /></div><div className="mt-6 grid gap-6 md:grid-cols-2"><section><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.period}</h3>{report.byPeriod.length ? <BarChart items={report.byPeriod} /> : <p className="text-sm text-slate-400">{t.empty}</p>}</section><section><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.distribution}</h3>{report.distributions.length ? <BarChart items={report.distributions[0].values} /> : <p className="text-sm text-slate-400">{t.empty}</p>}</section></div>{report.key === "teacher" && <p className="mt-5 rounded-xl bg-cyan-50 p-4 text-sm text-cyan-950">{units.note}</p>}<section className="mt-6"><h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">{t.questions}</h3><div className="grid gap-3 md:grid-cols-2">{report.questions.filter(question => question.total > 0).map(question => <QuestionCard key={question.id} question={question} responses={units.forms} noData={t.noData} />)}</div></section></article>)}</div>
  </div>;
}
