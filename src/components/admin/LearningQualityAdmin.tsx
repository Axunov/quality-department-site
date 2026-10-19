"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import survey from "@/data/learningQualitySurvey.json";
import { learningLocale, learningQualityCopy } from "@/data/learningQualityCopy";
import { learningStats, safeCsvCell, type LearningResponse } from "@/lib/learningQuality";

const languageNames = { ru: ["Русский", "Узбекский", "Английский"], uz: ["Rus tili", "O‘zbek tili", "Ingliz tili"], en: ["Russian", "Uzbek", "English"] };
export default function LearningQualityAdmin({locale}:{locale:string}) {
  const lang = learningLocale(locale), t = learningQualityCopy[lang];
  const [rows, setRows] = useState<LearningResponse[]>([]), [error, setError] = useState("");
  const [loading, setLoading] = useState(true), [from, setFrom] = useState(""), [to, setTo] = useState(""), [filter, setFilter] = useState("");
  const [page, setPage] = useState(1), [refresh, setRefresh] = useState(0);
  const load = useCallback(async (signal: AbortSignal) => {
    try {
      const r = await fetch(`/api/admin/learning-quality?${new URLSearchParams({from,to,locale:filter})}`, { cache: "no-store", signal });
      if (!r.ok) throw new Error();
      const result = await r.json();
      if (!signal.aborted) { setRows(result.rows); setError(""); }
    } catch { if (!signal.aborted) setError(t.adminError); }
    finally { if (!signal.aborted) setLoading(false); }
  }, [from,to,filter,t.adminError]);
  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    const timer = setInterval(() => { if (document.visibilityState === "visible") void load(controller.signal); }, 30000);
    return () => { controller.abort(); clearInterval(timer); };
  }, [load,refresh]);
  const stats = useMemo(() => learningStats(rows), [rows]);
  const commentId = survey.questions[11].id;
  const comments = rows.filter(r => typeof r.answers[commentId] === "string" && String(r.answers[commentId]).trim());
  const pages = Math.max(1, Math.ceil(comments.length/20)), currentPage = Math.min(page,pages);
  const cutoff = new Date(); cutoff.setUTCDate(cutoff.getUTCDate()-6);
  const week = rows.filter(r => r.submitted_on >= cutoff.toISOString().slice(0,10)).length;
  function exportCsv() {
    const headings = [t.date,t.language,...survey.questions.map(q => q.prompt[lang])];
    const body = [headings, ...rows.map(row => [row.submitted_on,row.locale,...survey.questions.map(q => {
      const v = row.answers[q.id];
      return q.question_type === "text" ? v ?? "" : typeof v === "number" ? q.options[v]?.[lang] ?? "" : "";
    })])].map(row => row.map(safeCsvCell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF"+body],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url;link.download=`learning-quality-2026-2027-${lang}.csv`;link.click();URL.revokeObjectURL(url);
  }
  return <div className="space-y-6"><header><p className="text-sm font-semibold text-teal-700">{t.monitoring}</p><h1 className="mt-2 text-3xl font-bold">{survey.title[lang]}</h1><p className="mt-3 text-sm text-slate-500">{t.auto}</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => setRefresh(v=>v+1)} className="rounded-xl border bg-white px-4 py-3">{t.refresh}</button><button onClick={exportCsv} disabled={!rows.length || !!error} className="rounded-xl bg-emerald-700 px-4 py-3 text-white disabled:opacity-50">{t.export}</button></div></header>
    <section className="grid gap-3 rounded-2xl bg-white p-5 sm:grid-cols-3"><label>{t.from}<input type="date" value={from} onChange={e=>{setFrom(e.target.value);setPage(1)}} className="mt-2 block w-full rounded-xl border p-3"/></label><label>{t.to}<input type="date" value={to} onChange={e=>{setTo(e.target.value);setPage(1)}} className="mt-2 block w-full rounded-xl border p-3"/></label><label>{t.language}<select value={filter} onChange={e=>{setFilter(e.target.value);setPage(1)}} className="mt-2 block w-full rounded-xl border bg-white p-3"><option value="">{t.all}</option>{["ru","uz","en"].map((code,index)=><option key={code} value={code}>{languageNames[lang][index]}</option>)}</select></label></section>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
    {loading ? <p role="status">{t.loading}</p> : <><p className="text-sm text-slate-500">{t.overview}</p><div className="grid gap-4 sm:grid-cols-3">{[[t.total,rows.length],[t.week,week],[t.comments,comments.length]].map(([label,count])=><section key={label} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-600">{label}</p><strong className="mt-2 block text-3xl text-blue-700">{count}</strong></section>)}</div>
    {!rows.length && <p className="rounded-2xl bg-white p-6">{t.empty}</p>}
    <h2 className="text-2xl font-bold">{t.distribution}</h2><p className="text-sm text-slate-500">{t.denominator}</p>
    <div className="grid gap-5 xl:grid-cols-2">{stats.map((stat,i)=><section key={stat.id} className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="font-semibold leading-7">{i+1}. {survey.questions[i].prompt[lang]}</h3><div className="mt-5 space-y-3">{stat.counts.map((count,index)=>{const percent=stat.total?count/stat.total*100:0;return <div key={index}><div className="flex justify-between gap-3 text-sm"><span>{survey.questions[i].options[index][lang]}</span><span className="shrink-0 tabular-nums">{count} · {percent.toFixed(1)}%</span></div><div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${i===10?'bg-slate-500':index===4?'bg-slate-400':index<2?'bg-teal-600':'bg-amber-500'}`} style={{width:`${percent}%`}}/></div></div>})}</div>{i<10&&<p className="mt-4 border-t pt-3 text-sm font-semibold">{t.positive}: {stat.total?((stat.counts[0]+stat.counts[1])/stat.total*100).toFixed(1):"0.0"}%</p>}</section>)}</div>
    <section><h2 className="text-2xl font-bold">{t.comments} ({comments.length})</h2><div className="mt-4 space-y-3">{comments.slice((currentPage-1)*20,currentPage*20).map(row=><article key={row.id} className="rounded-2xl bg-white p-5 shadow-sm"><p className="whitespace-pre-wrap break-words">{String(row.answers[commentId])}</p><p className="mt-3 text-xs text-slate-500">{row.submitted_on} · {row.locale.toUpperCase()}</p></article>)}</div>{pages>1&&<nav aria-label={t.commentsPage} className="mt-4 flex items-center gap-4"><button disabled={currentPage===1} onClick={()=>setPage(currentPage-1)} className="rounded-xl border p-3 disabled:opacity-40">{t.previous}</button><span>{currentPage}/{pages}</span><button disabled={currentPage===pages} onClick={()=>setPage(currentPage+1)} className="rounded-xl border p-3 disabled:opacity-40">{t.next}</button></nav>}</section></>}
  </div>;
}
