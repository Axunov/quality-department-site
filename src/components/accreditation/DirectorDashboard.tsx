"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/accreditation/specialData";
import { accreditationUi } from "@/lib/accreditation/ui";
import { positionKeyLabel } from "@/lib/accreditation/localization";
import { registryHref } from "@/lib/accreditation/workspace";
import DirectorOperations from "./DirectorOperations";
import AccreditationControlCenter from "./AccreditationControlCenter";
import DirectorV7Insights from "./DirectorV7Insights";
import PasswordChangeGate from "./PasswordChangeGate";

type ProjectRow = { project_code:string; name_ru:string; name_uz:string; name_en:string; total:number; approved:number; review:number; revision:number; progress:number };
type Profile = { role:string; full_name:string; position_key:string; job_title:string; must_change_password:boolean; is_active:boolean };
const copy = {
  ru:{ scope:"Проект аккредитации", all:"Общая сводка", projects:"Готовность по проектам", matrix:"Ответственные", operations:"Зона риска и журнал", trends:"Динамика", open:"Открыть реестр", overdue:"Просроченные", returned:"На доработке", explanation:"Готовность проекта — средний процент выполнения его индикаторов. В общей сводке проекты взвешены по числу индикаторов.", noProjects:"В этой области пока нет индикаторов.", denied:"Доступ к кабинету директора не назначен.", loading:"Загружаем сводку…", failed:"Не удалось загрузить сводку.", retry:"Повторить" },
  uz:{ scope:"Akkreditatsiya loyihasi", all:"Umumiy ko‘rinish", projects:"Loyihalar bo‘yicha tayyorlik", matrix:"Mas’ullar", operations:"Xavf zonasi va jurnal", trends:"Dinamika", open:"Reyestrni ochish", overdue:"Muddati o‘tganlar", returned:"Qayta ishlashda", explanation:"Loyiha tayyorligi — uning indikatorlari bajarilishining o‘rtacha foizi. Umumiy hisobotda loyihalar indikatorlar soni bo‘yicha hisoblanadi.", noProjects:"Bu sohada hozircha indikatorlar yo‘q.", denied:"Direktor kabinetiga kirish huquqi berilmagan.", loading:"Hisobot yuklanmoqda…", failed:"Hisobot yuklanmadi.", retry:"Qayta urinish" },
  en:{ scope:"Accreditation project", all:"Combined overview", projects:"Readiness by project", matrix:"Owners", operations:"Risk and activity log", trends:"Trends", open:"Open register", overdue:"Overdue", returned:"For revision", explanation:"Project readiness is the average completion percentage across its indicators. The combined overview weights each project by its number of indicators.", noProjects:"No indicators are available in this scope yet.", denied:"Director dashboard access has not been assigned.", loading:"Loading the overview…", failed:"Could not load the overview.", retry:"Retry" },
} as const;

export default function DirectorDashboard({ locale:l }: { locale:Locale }) {
  const t = accreditationUi[l], ui = copy[l];
  const supabase = useMemo(()=>createClient(),[]);
  const [profile,setProfile] = useState<Profile | null>(null);
  const [rows,setRows] = useState<ProjectRow[]>([]);
  const [scope,setScope] = useState("all");
  const [loading,setLoading] = useState(true);
  const [failed,setFailed] = useState(false);
  const [attempt,setAttempt] = useState(0);

  useEffect(()=>{
    let active = true, request = 0;
    async function load() {
      const version = ++request;
      const current = () => active && version === request;
      try {
        const {data:{user},error:authError} = await supabase.auth.getUser();
        if(!user){if(current())location.href=`/${l}/accreditation/login`;return;}
        if(authError) throw authError;
        const {data:p,error:profileError} = await supabase.from("accreditation_v3_profiles")
          .select("role,full_name,position_key,job_title,must_change_password,is_active").eq("user_id",user.id).maybeSingle();
        if(profileError) throw profileError;
        if(!current()) return;
        if(!p||p.role!=="director"||!p.is_active){setProfile(null);setRows([]);setFailed(false);return;}
        const {data,error} = await supabase.from("accreditation_v3_project_progress")
          .select("project_code,name_ru,name_uz,name_en,total,approved,review,revision,progress").order("project_code");
        if(error) throw error;
        if(current()){setProfile(p as Profile);setRows((data ?? []) as ProjectRow[]);setFailed(false);}
      } catch { if(current())setFailed(true); }
      finally { if(current())setLoading(false); }
    }
    void load();
    const channel = supabase.channel("director-accreditation-v3").on("postgres_changes",{event:"*",schema:"public",table:"accreditation_v3_indicators"},()=>void load()).subscribe();
    return ()=>{active=false;void supabase.removeChannel(channel);};
  },[supabase,l,attempt]);

  if (loading) return <p className="campus-card" role="status">{ui.loading}</p>;
  if (failed) return <section className="campus-card"><p role="alert">{ui.failed}</p><button type="button" className="campus-filter mt-3 w-fit" onClick={()=>{setLoading(true);setAttempt(x=>x+1);}}>{ui.retry}</button></section>;
  if (!profile) return <p role="alert" className="rounded-xl bg-red-50 p-5 text-red-800">{ui.denied}</p>;

  const selected = rows.some(row=>row.project_code===scope) ? scope : "all";
  const scoped = rows.filter(row=>selected==="all"||row.project_code===selected);
  const sum = (field:"total"|"approved"|"review"|"revision")=>scoped.reduce((n,row)=>n+Number(row[field]||0),0);
  const total=sum("total"), progress=total?Math.round(scoped.reduce((n,row)=>n+row.progress*row.total,0)/total):0;
  const projectName = (row:ProjectRow)=>row[`name_${l}`] || row.name_ru || row.project_code;

  return <div className="space-y-6">
    <PasswordChangeGate locale={l} required={Boolean(profile.must_change_password)}/>
    <header className="campus-banner">
      <p className="section-eyebrow">{positionKeyLabel(profile.position_key,profile.job_title,l)}</p>
      <h1 className="mt-2 text-3xl font-black sm:text-4xl">{t.director}</h1>
      <p className="mt-3">{profile.full_name}</p>
      <nav className="mt-5 flex flex-wrap gap-2" aria-label={t.director}>
        {[["#accreditation-projects",ui.projects],["#accreditation-matrix",ui.matrix],["#accreditation-operations",ui.operations],["#accreditation-trends",ui.trends]].map(([href,label])=><a key={href} href={href} className="campus-filter">{label}</a>)}
      </nav>
    </header>

    <section id="accreditation-projects" className="scroll-mt-36">
      <label className="block text-sm font-bold">{ui.scope}<select value={selected} onChange={event=>setScope(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3">
        <option value="all">{ui.all}</option>{rows.map(row=><option key={row.project_code} value={row.project_code}>{projectName(row)}</option>)}
      </select></label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[[t.readiness,`${progress}%`],[t.total,total],[t.approved,sum("approved")],[t.review,sum("review")],[t.revision,sum("revision")]].map(([label,value])=><article key={label} className="campus-card"><strong className="text-3xl">{value}</strong><p className="mt-1 text-sm text-slate-600">{label}</p></article>)}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{ui.explanation}</p>
      <h2 className="mt-5 text-xl font-black">{ui.projects}</h2>
      {!scoped.length && <p className="campus-card mt-3">{ui.noProjects}</p>}
      <div className="mt-3 grid gap-3 xl:grid-cols-2">
        {scoped.map(row=>{
          const href=registryHref(row.project_code);
          const overdue=registryHref(row.project_code,{deadline:"overdue"});
          const revision=registryHref(row.project_code,{status:"revision"});
          return <article key={row.project_code} className="campus-card">
            <div className="flex items-start justify-between gap-3"><h3 className="min-w-0 break-words font-bold">{projectName(row)}</h3><strong className="text-xl">{row.progress}%</strong></div>
            <progress aria-label={t.readiness} value={row.progress} max={100} className="mt-3 h-2 w-full accent-blue-600"/>
            <p className="mb-4 mt-3 text-sm text-slate-600">{t.total}: {row.total} · {t.approved}: {row.approved} · {t.revision}: {row.revision}</p>
            <div className="mt-auto flex flex-wrap gap-2">
              {href&&<Link href={href} className="campus-filter">{ui.open}</Link>}
              {overdue&&<Link href={overdue} className="campus-filter">{ui.overdue}</Link>}
              {revision&&<Link href={revision} className="campus-filter">{ui.returned}</Link>}
            </div>
          </article>;
        })}
      </div>
    </section>
    <AccreditationControlCenter key={selected} locale={l} mode="director" projectCode={selected}/>
    <div id="accreditation-operations" className="scroll-mt-36"><DirectorOperations key={selected} locale={l} projectCode={selected}/></div>
    <div id="accreditation-trends" className="scroll-mt-36"><DirectorV7Insights locale={l} projectCode={selected}/></div>
  </div>;
}
