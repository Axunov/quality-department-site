"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { accreditationUi } from "@/lib/accreditation/ui";
import type { Locale } from "@/lib/accreditation/specialData";

type Props = { projectCodes: string[]; locale: Locale; fallbackTotal?: number };
type Summary = { total:number; approved:number; review:number; revision:number; progress:number };

const empty:Summary={total:0,approved:0,review:0,revision:0,progress:0};

export default function ProjectProgress({projectCodes,locale,fallbackTotal=0}:Props){
  const t=accreditationUi[locale];
  const supabase=useMemo(()=>createClient(),[]);
  const [summary,setSummary]=useState<Summary>({...empty,total:fallbackTotal});

  useEffect(()=>{
    let active=true;
    async function load(){
      try{
        const {data:projects,error:pErr}=await supabase.from("accreditation_v3_projects").select("id,code").in("code",projectCodes);
        if(pErr || !projects?.length){ if(active)setSummary({...empty,total:fallbackTotal}); return; }
        const ids=projects.map((p:any)=>p.id);
        const {data,error}=await supabase.from("accreditation_v3_indicators").select("status,completion_percent").in("project_id",ids);
        if(error || !data){ if(active)setSummary({...empty,total:fallbackTotal}); return; }
        const total=data.length;
        const s:Summary={
          total,
          approved:data.filter((x:any)=>x.status==="approved").length,
          review:data.filter((x:any)=>x.status==="review").length,
          revision:data.filter((x:any)=>x.status==="revision").length,
          progress: total ? Math.round(data.reduce((a:number,x:any)=>a+Number(x.completion_percent||0),0)/total) : 0,
        };
        if(active)setSummary(s);
      }catch{ if(active)setSummary({...empty,total:fallbackTotal}); }
    }
    void load();
    const channel=supabase.channel(`accreditation-progress-${projectCodes.join('-')}`).on("postgres_changes",{event:"*",schema:"public",table:"accreditation_v3_indicators"},()=>void load()).subscribe();
    return()=>{active=false;void supabase.removeChannel(channel)};
  },[supabase,projectCodes.join("|"),fallbackTotal]);

  const cards=[[t.total,summary.total],[t.approved,summary.approved],[t.review,summary.review],[t.revision,summary.revision]];
  return <>
    <section className="mt-7 rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,.06)]">
      <div className="flex items-center justify-between gap-4"><div><div className="text-sm font-bold uppercase tracking-[.14em] text-blue-700">{t.readiness}</div><div className="mt-1 text-sm text-slate-500">{t.sourceNote}</div></div><div className="text-4xl font-black text-blue-800">{summary.progress}%</div></div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all" style={{width:`${summary.progress}%`}}/></div>
    </section>
    <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label,value])=><article key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-3xl font-black text-slate-900">{value}</div><div className="mt-1 text-sm text-slate-500">{label}</div></article>)}</section>
  </>;
}
