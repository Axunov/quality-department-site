"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/accreditation/specialData";
import {responsibleLabel} from "@/lib/accreditation/localization";

type Risk = {
  id:string; project_code:string; status:string; completion_percent:number;
  responsible_label:string|null; full_name:string|null; responsible_user_id:string|null;
  due_date:string|null; overdue:boolean; days_left:number|null;
};

export default function AccreditationControlCenter({locale:l,mode}:{locale:Locale;mode:"admin"|"director"}){
  const s=useMemo(()=>createClient(),[]),[rows,setRows]=useState<Risk[]>([]),[loading,setLoading]=useState(true),[q,setQ]=useState("");
  const tx={
    ru:{title:mode==="admin"?"Центр контроля 272 индикаторов":"Управленческая матрица",hint:"Цвет показывает готовность подразделения. Нажмите строку для детализации в зоне риска.",unit:"Ответственный",total:"Всего",approved:"Принято",review:"Проверка",revision:"Возврат",work:"В работе",draft:"Не начато",deadline:"Без срока",unassigned:"Не назначено",overload:"Перегружены",forecast:"Прогноз готовности",search:"Найти подразделение или сотрудника",empty:"Данные не найдены"},
    uz:{title:mode==="admin"?"272 indikator nazorat markazi":"Boshqaruv matritsasi",hint:"Rang bo‘linmaning tayyorligini ko‘rsatadi. Xavf zonasida batafsil ko‘rish mumkin.",unit:"Mas’ul",total:"Jami",approved:"Qabul",review:"Tekshiruv",revision:"Qaytarilgan",work:"Jarayonda",draft:"Boshlanmagan",deadline:"Muddatsiz",unassigned:"Biriktirilmagan",overload:"Ortiqcha yuklama",forecast:"Tayyorlik prognozi",search:"Bo‘linma yoki xodimni topish",empty:"Ma’lumot topilmadi"},
    en:{title:mode==="admin"?"272-indicator control centre":"Management matrix",hint:"Colour shows unit readiness. Use the risk zone for indicator-level detail.",unit:"Owner",total:"Total",approved:"Approved",review:"Review",revision:"Returned",work:"In progress",draft:"Not started",deadline:"No deadline",unassigned:"Unassigned",overload:"Overloaded",forecast:"Readiness forecast",search:"Find unit or employee",empty:"No data found"}
  }[l];
  useEffect(()=>{let active=true;(async()=>{const {data}=await s.from("accreditation_v6_risk").select("id,project_code,status,completion_percent,responsible_label,full_name,responsible_user_id,due_date,overdue,days_left");if(active){setRows((data||[]) as Risk[]);setLoading(false)}})();return()=>{active=false}},[s]);
  const grouped=useMemo(()=>{const map=new Map<string,Risk[]>();for(const r of rows){const key=r.full_name||responsibleLabel(r.responsible_label,l)||tx.unassigned;map.set(key,[...(map.get(key)||[]),r])}return [...map].map(([name,list])=>({name,list,total:list.length,approved:list.filter(x=>x.status==="approved").length,review:list.filter(x=>x.status==="review").length,revision:list.filter(x=>x.status==="revision").length,work:list.filter(x=>x.status==="in_progress").length,draft:list.filter(x=>x.status==="draft").length,noDeadline:list.filter(x=>!x.due_date&&x.status!=="approved").length,progress:Math.round(list.reduce((a,x)=>a+Number(x.completion_percent||0),0)/Math.max(1,list.length))})).filter(x=>x.name.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.progress-b.progress||b.total-a.total)},[rows,q,tx.unassigned]);
  const assigned=rows.filter(x=>x.responsible_user_id),unassigned=rows.length-assigned.length,noDeadline=rows.filter(x=>!x.due_date&&x.status!=="approved").length,overloaded=grouped.filter(x=>x.total>20).length;
  const progress=rows.length?Math.round(rows.reduce((a,x)=>a+Number(x.completion_percent||0),0)/rows.length):0;
  const dated=rows.filter(x=>x.due_date&&x.status!=="approved"),days=dated.map(x=>x.days_left).filter((x):x is number=>x!==null&&x>=0),avgDays=days.length?Math.round(days.reduce((a,b)=>a+b,0)/days.length):null;
  const forecast=progress>=90?(l==="ru"?"Высокая готовность":l==="uz"?"Yuqori tayyorlik":"High readiness"):avgDays===null?(l==="ru"?"Нужны сроки":l==="uz"?"Muddatlar kerak":"Deadlines required"):avgDays<14?(l==="ru"?"Есть риск срыва":l==="uz"?"Kechikish xavfi bor":"Delivery risk"):l==="ru"?"Темп контролируемый":l==="uz"?"Sur’at nazoratda":"On track";
  const heat=(n:number)=>n>=80?"bg-emerald-50 text-emerald-800":n>=50?"bg-amber-50 text-amber-900":"bg-red-50 text-red-800";
  if(loading)return <section className="h-64 animate-pulse rounded-[28px] bg-slate-100"/>;
  return <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-2xl font-black text-slate-900">{tx.title}</h2><p className="mt-1 text-sm text-slate-500">{tx.hint}</p></div><div className={`rounded-2xl px-5 py-3 ${heat(progress)}`}><b className="text-3xl">{progress}%</b><p className="text-xs font-bold">{tx.forecast}: {forecast}</p></div></div>
  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[tx.total,rows.length,"text-blue-800"],[tx.unassigned,unassigned,"text-violet-700"],[tx.deadline,noDeadline,"text-orange-700"],[tx.overload,overloaded,"text-red-700"]].map(([a,b,c])=><article key={String(a)} className="rounded-xl bg-slate-50 p-4"><b className={`text-3xl ${c}`}>{b}</b><p className="text-sm text-slate-500">{a}</p></article>)}</div>
  <input value={q} onChange={e=>setQ(e.target.value)} placeholder={tx.search} className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"/>
  <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="border-b text-xs uppercase text-slate-500"><tr><th className="pb-3">{tx.unit}</th><th>{tx.total}</th><th>{tx.approved}</th><th>{tx.review}</th><th>{tx.revision}</th><th>{tx.work}</th><th>{tx.draft}</th><th>{tx.deadline}</th><th>%</th></tr></thead><tbody>{grouped.map(x=><tr key={x.name} className="border-b border-slate-100"><td className="max-w-sm py-3 pr-4 font-semibold">{x.name}</td><td>{x.total}</td><td className="text-emerald-700">{x.approved}</td><td className="text-amber-700">{x.review}</td><td className="text-red-700">{x.revision}</td><td>{x.work}</td><td>{x.draft}</td><td className={x.noDeadline?"font-bold text-orange-700":""}>{x.noDeadline}</td><td><span className={`inline-block min-w-16 rounded-lg px-2 py-1 text-center font-black ${heat(x.progress)}`}>{x.progress}%</span></td></tr>)}</tbody></table>{!grouped.length&&<p className="p-6 text-center text-slate-500">{tx.empty}</p>}</div></section>;
}
