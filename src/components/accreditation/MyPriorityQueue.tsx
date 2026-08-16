"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/lib/accreditation/specialData";

type Row={id:string;code:string;status:string;due_date:string|null;project_code:string;overdue:boolean;days_left:number|null};
export default function MyPriorityQueue({locale:l}:{locale:Locale}){
 const s=useMemo(()=>createClient(),[]),[rows,setRows]=useState<Row[]>([]);const tx={ru:{title:"Что сделать в первую очередь",empty:"Срочных задач нет",overdue:"Просрочено",revision:"Исправить замечание",soon:"Срок приближается",open:"Открыть"},uz:{title:"Birinchi navbatdagi vazifalar",empty:"Shoshilinch vazifalar yo‘q",overdue:"Muddati o‘tgan",revision:"Izohni tuzatish",soon:"Muddat yaqin",open:"Ochish"},en:{title:"What to do first",empty:"No urgent tasks",overdue:"Overdue",revision:"Address reviewer feedback",soon:"Deadline approaching",open:"Open"}}[l];
 useEffect(()=>{let active=true;(async()=>{const{data:{user}}=await s.auth.getUser();if(!user)return;const{data}=await s.from("accreditation_v6_risk").select("id,code,status,due_date,project_code,overdue,days_left").eq("responsible_user_id",user.id);if(active)setRows(((data||[]) as Row[]).filter(x=>x.status==="revision"||x.overdue||(x.days_left!==null&&x.days_left<=7&&x.status!=="approved")).sort((a,b)=>Number(b.overdue)-Number(a.overdue)||(a.days_left??999)-(b.days_left??999)).slice(0,8))})();return()=>{active=false}},[s]);
 return <section className="rounded-[28px] border bg-white p-6 shadow-sm"><h2 className="text-xl font-black">{tx.title}</h2>{!rows.length?<p className="mt-3 text-slate-500">{tx.empty}</p>:<div className="mt-4 grid gap-3 md:grid-cols-2">{rows.map(x=><article key={x.id} className={`rounded-xl border p-4 ${x.overdue?"border-red-200 bg-red-50":x.status==="revision"?"border-amber-200 bg-amber-50":"border-orange-200 bg-orange-50"}`}><div className="flex items-center justify-between"><b>{x.code}</b><span className="text-xs font-bold">{x.overdue?tx.overdue:x.status==="revision"?tx.revision:tx.soon}</span></div><div className="mt-3 flex items-center justify-between text-sm"><span>{x.due_date||"—"}</span><Link href={`/accreditation/${x.project_code==="complex"?"complex":"special"}?scope=mine&q=${encodeURIComponent(x.code)}`} className="font-bold text-blue-700">{tx.open} →</Link></div></article>)}</div>}</section>;
}
