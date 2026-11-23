"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/accreditation/specialData";
import { projectLabel, responsibleLabel } from "@/lib/accreditation/localization";
import { indicatorHref } from "@/lib/accreditation/workspace";

type Risk = {
  id: string; code: string; project_code: string; status: string; completion_percent: number;
  responsible_label: string | null; full_name: string | null; responsible_user_id: string | null;
  due_date: string | null; overdue: boolean; days_left: number | null;
};

const copy = {
  ru: { admin:"Центр контроля индикаторов", director:"Готовность по ответственным", hint:"Откройте строку, чтобы увидеть её просроченные индикаторы, задачи на доработке и остальные позиции.", unit:"Ответственный", total:"Индикаторов", approved:"Принято", review:"На проверке", revision:"На доработке", overdue:"Просрочено", noDeadline:"Без срока", unassigned:"Не назначено", readiness:"Готовность", forecast:"Прогноз готовности", high:"Высокая готовность", needDates:"Нужны сроки", deliveryRisk:"Есть риск срыва", onTrack:"Темп контролируемый", search:"Найти подразделение или сотрудника", empty:"Подходящих данных нет.", loading:"Загружаем матрицу…", loadError:"Не удалось загрузить матрицу. Можно повторить запрос.", retry:"Повторить", all:"Все позиции", open:"Открыть индикатор", more:"Показать ещё", method:"Готовность — среднее значение процентов выполнения индикаторов. Просроченные и возвращённые задачи могут совпадать.", working:"В работе", draft:"Не начато" },
  uz: { admin:"Indikatorlar nazorat markazi", director:"Mas’ullar böyiça tayyorlik", hint:"Muddati ötgan, qayta işlaşga qaytarilgan va boşqa indikatorlarni köriş uçun qatorni oçing.", unit:"Mas’ul", total:"Indikatorlar", approved:"Qabul qilingan", review:"Tekşiruvda", revision:"Qayta işlaşda", overdue:"Muddati ötgan", noDeadline:"Muddatsiz", unassigned:"Biriktirilmagan", readiness:"Tayyorlik", forecast:"Tayyorlik prognozi", high:"Yuqori tayyorlik", needDates:"Muddatlar kerak", deliveryRisk:"Keçikiş xavfi bor", onTrack:"Sur’at nazoratda", search:"Bölinma yoki xodimni topiş", empty:"Mos ma’lumot topilmadi.", loading:"Matritsa yuklanmoqda…", loadError:"Matritsa yuklanmadi. Qayta urinib köring.", retry:"Qayta uriniş", all:"Barça indikatorlar", open:"Indikatorni oçiş", more:"Yana körsatiş", method:"Tayyorlik — indikatorlarning bajariliş foizlari örtaçasi. Muddati ötgan va qaytarilgan vazifalar bir-biriga mos kelişi mumkin.", working:"Jarayonda", draft:"Boşlanmagan" },
  en: { admin:"Indicator control centre", director:"Readiness by owner", hint:"Expand a row to see overdue indicators, tasks returned for revision, and other items.", unit:"Owner", total:"Indicators", approved:"Approved", review:"Under review", revision:"For revision", overdue:"Overdue", noDeadline:"No deadline", unassigned:"Unassigned", readiness:"Readiness", forecast:"Readiness forecast", high:"High readiness", needDates:"Deadlines needed", deliveryRisk:"Delivery risk", onTrack:"On track", search:"Find a unit or staff member", empty:"No matching data.", loading:"Loading the matrix…", loadError:"Could not load the matrix. Try again.", retry:"Retry", all:"All indicators", open:"Open indicator", more:"Show more", method:"Readiness is the average completion percentage across indicators. Overdue and returned indicators can overlap.", working:"In progress", draft:"Not started" },
} as const;

type Filter = "all" | "overdue" | "revision";
const pageSize = 15;

export default function AccreditationControlCenter({ locale:l, mode, projectCode="all" }: { locale:Locale; mode:"admin"|"director"; projectCode?:string }) {
  const s = useMemo(() => createClient(), []);
  const [rows,setRows] = useState<Risk[] | null>(null);
  const [loading,setLoading] = useState(true);
  const [q,setQ] = useState("");
  const [attempt,setAttempt] = useState(0);
  const [expanded,setExpanded] = useState<string | null>(null);
  const [filter,setFilter] = useState<Filter>("all");
  const [limit,setLimit] = useState(pageSize);
  const t = copy[l];
  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const {data,error} = await s.from("accreditation_v6_risk")
          .select("id,code,project_code,status,completion_percent,responsible_label,full_name,responsible_user_id,due_date,overdue,days_left")
          .order("id");
        if (active) setRows(error ? null : (data ?? []) as Risk[]);
      } catch { if (active) setRows(null); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [s,attempt]);

  const scopedRows = (rows ?? []).filter(row => projectCode === "all" || row.project_code === projectCode);
  const units = new Map<string, { unit: string; name: string | null; items: Risk[] }>();
  for (const row of scopedRows) {
    const key = JSON.stringify([row.responsible_label || "", row.responsible_user_id || ""]);
    const unit = units.get(key) ?? { unit:row.responsible_label ? responsibleLabel(row.responsible_label,l) : t.unassigned, name:row.full_name, items:[] };
    unit.items.push(row);
    units.set(key,unit);
  }

  const completion = (items: Risk[]) => items.length ? Math.round(items.reduce((sum,row)=>sum+Number(row.completion_percent || 0),0)/items.length) : 0;
  const grouped = [...units.entries()].map(([key, unit]) => ({
    key, ...unit, progress:completion(unit.items),
    overdue:unit.items.filter(row=>row.overdue).length,
    revision:unit.items.filter(row=>row.status === "revision").length,
    approved:unit.items.filter(row=>row.status === "approved").length,
  })).filter(unit=>`${unit.unit} ${unit.name || ""}`.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a,b)=>b.overdue-a.overdue || b.revision-a.revision || a.progress-b.progress || a.unit.localeCompare(b.unit,l));
  const progress = completion(scopedRows);
  const days = scopedRows.filter(row=>row.status !== "approved" && row.days_left !== null && row.days_left >= 0).map(row=>row.days_left ?? 0);
  const avgDays = days.length ? Math.round(days.reduce((sum,day)=>sum+day,0)/days.length) : null;
  const forecast = progress >= 90 ? t.high : avgDays === null ? t.needDates : avgDays < 14 ? t.deliveryRisk : t.onTrack;
  const statuses: Record<string,string> = { draft:t.draft, in_progress:t.working, review:t.review, revision:t.revision, approved:t.approved };
  const date = new Intl.DateTimeFormat(l,{dateStyle:"medium",timeZone:"UTC"});

  if (loading) return <section role="status" className="campus-card">{t.loading}</section>;
  if (!rows) return <section className="campus-card"><p role="alert">{t.loadError}</p><button type="button" className="campus-filter mt-3 w-fit" onClick={()=>{setLoading(true);setAttempt(v=>v+1);}}>{t.retry}</button></section>;

  return <section id="accreditation-matrix" className="campus-card scroll-mt-36">
    <h2 className="text-2xl font-black">{mode === "admin" ? t.admin : t.director}</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">{t.hint}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[[t.total,scopedRows.length],[t.overdue,scopedRows.filter(x=>x.overdue).length],[t.revision,scopedRows.filter(x=>x.status === "revision").length],[t.unassigned,scopedRows.filter(x=>!x.responsible_user_id).length],[t.noDeadline,scopedRows.filter(x=>x.status!=="approved"&&!x.due_date).length],[t.readiness,`${progress}%`]].map(([label,value])=><div key={label} className="rounded-xl border border-slate-200 p-4"><p className="text-sm font-semibold">{label}</p><strong className="mt-1 block text-2xl">{value}</strong></div>)}
    </div>
    {scopedRows.length > 0 && <p className="mt-3 text-sm text-slate-600">{t.forecast}: {forecast}. {t.method}</p>}
    <label className="mt-5 text-sm font-semibold">{t.search}<input type="search" value={q} maxLength={100} onChange={e=>setQ(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3"/></label>
    <div className="mt-4 grid gap-2">
      {grouped.map(unit => {
        const isOpen = expanded === unit.key;
        const items = isOpen ? unit.items.filter(row=>filter === "all" || (filter === "overdue" ? row.overdue : row.status === "revision")).sort((a,b)=>Number(b.overdue)-Number(a.overdue) || (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999") || a.code.localeCompare(b.code,l,{numeric:true})) : [];
        return <article key={unit.key} className="rounded-xl border border-slate-200 p-3 sm:p-4">
          <button type="button" aria-expanded={isOpen} className="flex w-full flex-wrap items-start justify-between gap-3 text-left" onClick={()=>{setExpanded(isOpen ? null : unit.key);setFilter(unit.overdue ? "overdue" : unit.revision ? "revision" : "all");setLimit(pageSize);}}>
            <span className="min-w-0 flex-1 break-words"><strong className="block">{unit.unit}</strong>{unit.name && <span className="block text-sm font-normal text-slate-600">{unit.name}</span>}</span>
            <span className="flex flex-wrap gap-x-3 gap-y-1 text-sm"><span>{t.overdue}: <b>{unit.overdue}</b></span><span>{t.revision}: <b>{unit.revision}</b></span><span>{t.readiness}: <b>{unit.progress}%</b></span><span aria-hidden="true">{isOpen ? "−" : "+"}</span></span>
          </button>
          {isOpen && <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.total}>
              {([["all",t.all,unit.items.length],["overdue",t.overdue,unit.overdue],["revision",t.revision,unit.revision]] as const).map(([key,label,count])=><button key={key} type="button" className="campus-filter" aria-pressed={key===filter} onClick={()=>{setFilter(key);setLimit(pageSize);}}>{label}: {count}</button>)}
            </div>
            {!items.length ? <p className="mt-3 text-sm">{t.empty}</p> : <ul className="mt-4 grid gap-2">
              {items.slice(0,limit).map(row=>{
                const href = indicatorHref(row.project_code,row.code);
                return <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                  <div className="min-w-0 break-words"><strong>{row.code}</strong><p>{projectLabel(row.project_code,l)} · {statuses[row.status] ?? row.status}</p><p className={row.overdue ? "font-bold text-red-700" : "text-slate-600"}>{row.due_date ? date.format(new Date(row.due_date+"T00:00:00Z")) : t.noDeadline}</p></div>
                  {href && <Link href={href} className="campus-filter font-semibold">{t.open}<span className="sr-only"> {row.code}</span></Link>}
                </li>;
              })}
            </ul>}
            {items.length > limit && <button type="button" className="campus-filter mt-3" onClick={()=>setLimit(value=>value+pageSize)}>{t.more}</button>}
          </div>}
        </article>;
      })}
      {!grouped.length && <p role="status" className="mt-3 text-sm text-slate-600">{t.empty}</p>}
    </div>
  </section>;
}
