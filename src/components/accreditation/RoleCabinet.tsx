"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Role = "department_head" | "quality_office" | "administrator" | "director";
type Profile = { full_name: string; job_title: string | null; role: Role; department_id: string | null };
type Indicator = { id:string; code:string; title:string; responsible_name:string|null; completion_percent:number; status:string; department_id:string|null };

const labels: Record<string,string> = { draft:"Не начато", in_progress:"В работе", review:"На проверке", revision:"На доработке", approved:"Принято" };

export default function RoleCabinet({ mode }: { mode: "department" | "admin" | "director" }) {
  const supabase = useMemo(() => createClient(), []);
  const [profile,setProfile] = useState<Profile|null>(null);
  const [items,setItems] = useState<Indicator[]>([]);
  const [summary,setSummary] = useState<any>(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => { void load(); }, []);

  async function load(){
    setLoading(true);
    const { data:{ user } } = await supabase.auth.getUser();
    if(!user){ setLoading(false); return; }
    const { data:p } = await supabase.from("accreditation_profiles").select("full_name,job_title,role,department_id").eq("user_id",user.id).maybeSingle();
    setProfile(p as Profile|null);
    let query = supabase.from("accreditation_indicators").select("id,code,title,responsible_name,completion_percent,status,department_id").order("code");
    if(mode === "department" && p?.department_id) query = query.eq("department_id",p.department_id);
    if(mode === "admin") query = query.in("status",["review","revision"]);
    const { data:i } = await query;
    setItems((i||[]) as Indicator[]);
    if(mode === "director") {
      const { data:d } = await supabase.from("accreditation_director_dashboard").select("*").maybeSingle();
      setSummary(d);
    }
    setLoading(false);
  }

  if(loading) return <div className="p-8">Загрузка кабинета...</div>;
  if(!profile) return <div className="rounded-2xl bg-amber-50 p-6 text-amber-900">Войдите в систему. После входа администратор должен назначить Вам роль и подразделение.</div>;

  const title = mode === "department" ? "Кабинет руководителя подразделения" : mode === "admin" ? "Проверка материалов аккредитации" : "Кабинет директора";

  return <div className="space-y-6">
    <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white">
      <p className="text-sm font-semibold uppercase tracking-wider">{profile.job_title || profile.role}</p>
      <h1 className="mt-2 text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-blue-50">{profile.full_name}</p>
    </section>

    {mode === "director" && summary && <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[["Готовность",`${summary.completion_percent}%`],["Всего",summary.total_indicators],["На проверке",summary.under_review],["Просрочено",summary.overdue]].map(([a,b])=><article key={a} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="text-3xl font-bold">{b}</div><div className="text-sm text-slate-500">{a}</div></article>)}
    </section>}

    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">{mode === "admin" ? "Материалы на проверке" : "Индикаторы"}</h2><span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">{items.length}</span></div>
      <div className="mt-5 space-y-3">
        {items.length===0 && <p className="rounded-xl bg-slate-50 p-5 text-slate-500">Нет доступных материалов.</p>}
        {items.map(x=><article key={x.id} className="rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div><div className="text-sm font-bold text-blue-700">{x.code}</div><h3 className="mt-1 font-bold text-slate-900">{x.title}</h3><p className="mt-1 text-sm text-slate-500">Ответственный: {x.responsible_name || "не назначен"}</p></div>
            <div className="text-right"><div className="font-bold">{x.completion_percent}%</div><div className="text-sm text-slate-500">{labels[x.status] || x.status}</div></div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {mode === "department" && <a href="/ru/accreditation/indicators" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">Открыть и загрузить ответ</a>}
            {mode === "admin" && <a href="/ru/accreditation/indicators" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Проверить материал</a>}
            {mode === "director" && <a href="/ru/accreditation/indicators" className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Посмотреть</a>}
          </div>
        </article>)}
      </div>
    </section>
  </div>;
}
