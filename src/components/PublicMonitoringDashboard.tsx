"use client";

import { AnimatedNumber, SkeletonGrid } from "@/components/editorial/MotionPrimitives";
import { AreaTrend } from "@/components/institute/AreaTrend";
import { Link } from "@/i18n/routing";
import { catalogCopy, reports } from "@/data/surveyCatalog";
import { monitoringFormat } from "@/lib/monitoringFormat";
import type { SurveyMonitoringPayload as Payload, MonitoringQuestion as Question, MonitoringItem as Item } from "@/lib/surveyMonitoring";
import { useEffect, useState } from "react";

const labels = {
  ru: { eyebrow: "Открытая аналитика", title: "Мониторинг качества образования", lead: "Обобщённые результаты опросов обновляются автоматически. Персональные данные и письменные ответы здесь не публикуются.", answers: "ответов", average: "Средняя оценка", questions: "Результаты по вопросам", loading: "Загрузка аналитики…", error: "Не удалось загрузить данные мониторинга.", empty: "Пока нет данных", updated: "Обновлено" },
  uz: { eyebrow: "Oçiq tahlil", title: "Ta’lim sifati monitoringi", lead: "Sörovlarning umumlaştirilgan natijalari avtomatik yangilanadi. Şaxsiy ma’lumotlar va yozma javoblar e’lon qilinmaydi.", answers: "javob", average: "Örtaça baho", questions: "Savollar böyiça natijalar", loading: "Tahlil yuklanmoqda…", error: "Monitoring ma’lumotlarini yuklab bölmadi.", empty: "Hozirça ma’lumot yöq", updated: "Yangilangan" },
  en: { eyebrow: "Public analytics", title: "Education quality monitoring", lead: "Aggregated survey results update automatically. Personal data and written responses are not published here.", answers: "responses", average: "Average score", questions: "Results by question", loading: "Loading analytics…", error: "Could not load monitoring data.", empty: "No data yet", updated: "Updated" },
} as const;

const colors = ["#326de0", "#087f72", "#a46e21", "#8053bc", "#ae5262", "#64768d"];

function Donut({ items, center, label, locale }: { items: Item[]; center: string; label: string; locale: string }) {
  const fmt = monitoringFormat(locale);
  const visible = items.filter(item => item.value > 0);
  const total = visible.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const stops = visible.length ? visible.map((item, index) => { const start = cursor / total * 100; cursor += item.value; return colors[index % colors.length] + " " + start + "% " + cursor / total * 100 + "%"; }).join(", ") : "#dbe6ef 0% 100%";
  return <div className="flex flex-col items-center gap-5 sm:flex-row"><div className="relative ring-8 ring-blue-100/60 h-40 w-40 shrink-0 rounded-full" style={{ background: "conic-gradient(" + stops + ")" }}><div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner"><strong className="text-3xl font-black text-slate-900">{center}</strong><span className="text-xs font-semibold text-slate-500">{label}</span></div></div><div className="min-w-0 flex-1 space-y-2">{visible.map((item, index) => <div key={item.label} className="flex items-center gap-2 text-sm"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} /><span className="min-w-0 flex-1 break-words text-slate-600">{item.label}</span><b>{fmt.number(item.value)}</b><span className="w-10 text-right text-xs text-slate-400">{fmt.percent(total ? item.value / total : 0)}</span></div>)}</div></div>;
}

function QuestionCard({ question, responses, locale }: { question: Question; responses: string; locale: string }) {
  const fmt = monitoringFormat(locale);
  return <details className="group rounded-2xl border border-slate-200 bg-white p-4 motion-safe:transition-shadow hover:shadow-md">
    <summary className="flex cursor-pointer flex-wrap items-start gap-3 font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600">
      <span className="min-w-44 flex-1 break-words">{question.label}</span><span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-800">{responses}: {fmt.number(question.total)}</span>
      <span aria-hidden="true" className="text-blue-800 motion-safe:transition-transform group-open:rotate-45">+</span>
    </summary>
    <div className="mt-4 space-y-3">
      {question.values.map((item, index) => {
        const share = 100 * item.value / question.total;
        return <div key={item.label}>
          <div className="flex justify-between gap-3 text-sm"><span className="break-words">{item.label}</span><b className="shrink-0">{fmt.number(item.value)} · {fmt.percent(share / 100)}</b></div>
          <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-full rounded-full motion-safe:transition-[width]" style={{ width: share + "%", backgroundColor: colors[index % colors.length] }} /></div>
        </div>;
      })}
    </div>
  </details>;
}

const countsCopy = {
  ru: { forms:"Получено анкет", evaluations:"Оценок преподавателей", answers:"Анкет по вопросу", monthly:"Анкеты по месяцам", all:"За всё время", noDate:"Месяцы поступления не указаны", scope:"Во всех диаграммах показаны данные по выбранному опросу за всё время. В процентах по каждому вопросу учитываются только анкеты с ответом на этот вопрос." },
  uz: { forms:"Qabul qilingan anketalar", evaluations:"Öqituvçilarga berilgan baholar", answers:"Savolga javob bergan anketalar", monthly:"Oylar böyiça anketalar", all:"Barça davr", noDate:"Anketalar kelgan oylar körsatilmagan", scope:"Diagrammalar tanlangan sörovning barça davrdagi ma’lumotlarini körsatadi. Har bir savol foizida faqat şu savolga javob berilgan anketalar hisobga olinadi." },
  en: { forms:"Forms received", evaluations:"Teacher evaluations", answers:"Forms answering this question", monthly:"Forms by month", all:"All time", noDate:"Submission months are unavailable", scope:"Charts show all-time data for the selected survey. Each question’s percentages count only forms that answered that question." },
} as const;

export default function PublicMonitoringDashboard({ locale, initialReport }: { locale: string; initialReport?: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[lang];
  const counts = countsCopy[lang];
  const fmt = monitoringFormat(lang);
  const ui = {
    ru: { select: "Выберите опрос", forms: "Анкеты", languages: "Языки анкет", method: "По каждому критерию сначала усредняются оценки преподавателей внутри одной анкеты. Для диаграммы этот балл округляется до целого. «Не могу оценить» не входит в средний балл.", retry: "Повторить" },
    uz: { select: "Sörovni tanlang", forms: "Anketalar", languages: "Anketa tillari", method: "Har bir mezon uçun avval bitta anketadagi öqituvçi baholari örtaçasi hisoblanadi. Diagrammada u butun songa yaxlitlanadi. «Baholay olmayman» örtaça ballga kiritilmaydi.", retry: "Qayta uriniş" },
    en: { select: "Select a survey", forms: "Forms", languages: "Survey languages", method: "For each criterion, teacher scores are averaged within each form and rounded for the breakdown. ‘Unable to assess’ is excluded from the mean score.", retry: "Retry" },
  }[lang];
  const [payload, setPayload] = useState<Payload | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string>(reports.find(key => key === initialReport) ?? "teacher");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/monitoring/" + lang, { signal: controller.signal }).then(response => {
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
      {payload && <p className="mt-5 text-sm text-cyan-100">{t.updated}: {fmt.date(payload.generatedAt)}</p>}
      <Link href="/surveys" className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-white/50 px-4 text-sm font-bold">{catalogCopy[lang].catalog}</Link>
    </header>
    {!payload && (failed?<p className="editorial-surface mt-6 p-5" role="status">{t.error}<button type="button" className="ms-4 underline" onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{ui.retry}</button></p>:<SkeletonGrid label={t.loading}/>)}
    {!!payload && <nav aria-label={ui.select} className="mt-6 flex flex-wrap gap-2">
      {payload.reports.map(item => <button type="button" key={item.key} aria-pressed={selected === item.key} onClick={() => setSelected(item.key)} className="campus-filter font-bold">{item.title}</button>)}
    </nav>}
    {report && <article key={report.key} className="mt-6 rounded-[30px] border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{report.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{counts.all}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="campus-card"><dt className="text-sm font-bold">{counts.forms}</dt><dd className="mt-1 text-3xl font-black"><AnimatedNumber value={report.total} locale={lang}/></dd></div>
        {typeof report.teacherEvaluations === "number" && <div className="campus-card"><dt className="text-sm font-bold">{counts.evaluations}</dt><dd className="mt-1 text-3xl font-black"><AnimatedNumber value={report.teacherEvaluations} locale={lang}/></dd></div>}
      </dl>
      {report.total > 0 ? <>
        <p className="mt-5 text-sm leading-6 text-slate-600">{counts.scope}</p>
        <section className="mt-5 campus-card">
          <h3 className="font-bold">{counts.monthly}</h3>
          {report.byPeriod.length>0?<AreaTrend label={counts.monthly} locale={lang}
            points={[...report.byPeriod].sort((a,b)=>a.label.localeCompare(b.label)).map(row=>({label:fmt.month(row.label),value:row.value}))}/>:<p className="mt-3 text-sm text-slate-600">{counts.noDate}</p>}
        </section>
        <section className="mt-5 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
          <h3 className="mb-5 font-bold text-blue-900">{ui.languages}</h3>
          <Donut items={report.byCategory} center={fmt.number(report.total)} label={ui.forms} locale={lang} />
        </section>
        {report.key === "teacher" && <p className="mt-6 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-950">{ui.method}</p>}
        {!!questions.length && <><h3 className="mt-7 text-xl font-black">{t.questions}</h3><div className="mt-4 grid items-start gap-3 lg:grid-cols-2">{questions.map(question => <QuestionCard key={question.id} question={question} responses={counts.answers} locale={lang} />)}</div></>}
      </> : <p className="mt-5 text-slate-600">{t.empty}</p>}
    </article>}
  </main>;
}
