"use client";
import {useCallback,useEffect,useMemo,useState} from "react";
import {createClient} from "@/lib/supabase/client";
import type {Locale} from "@/lib/accreditation/specialData";

type N={id:string;kind:string;title_ru:string;title_uz:string;title_en:string;body_ru:string|null;body_uz:string|null;body_en:string|null;read_at:string|null;created_at:string};
export default function NotificationCenter({locale:l}:{locale:Locale}){
 const supabase=useMemo(()=>createClient(),[]),[rows,setRows]=useState<N[]>([]);
 const tx={ru:{title:"Уведомления",empty:"Новых уведомлений нет",read:"Отметить всё прочитанным"},uz:{title:"Bildirishnomalar",empty:"Yangi bildirishnomalar yo‘q",read:"Barchasini o‘qilgan deb belgilash"},en:{title:"Notifications",empty:"No new notifications",read:"Mark all as read"}}[l];
 const load=useCallback(async()=>{const{data:{user}}=await supabase.auth.getUser();if(!user)return;const{data}=await supabase.from("accreditation_v6_notifications").select("*").eq("user_id",user.id).order("created_at",{ascending:false}).limit(30);setRows((data||[]) as N[])},[supabase]);
 useEffect(()=>{void load();const c=supabase.channel("accreditation-notifications").on("postgres_changes",{event:"INSERT",schema:"public",table:"accreditation_v6_notifications"},()=>void load()).subscribe();return()=>{void supabase.removeChannel(c)}},[supabase,load]);
 async function markRead(){await supabase.rpc("accreditation_v6_mark_notifications_read",{notification_ids:null});void load()}
 const value=(n:N,k:"title"|"body")=>n[`${k}_${l}` as keyof N] as string|null;
 return <section className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-black text-slate-900">{tx.title}{rows.some(x=>!x.read_at)&&<span className="ml-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white">{rows.filter(x=>!x.read_at).length}</span>}</h2>{rows.some(x=>!x.read_at)&&<button onClick={()=>void markRead()} className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">{tx.read}</button>}</div><div className="mt-4 space-y-3">{!rows.length&&<p className="text-slate-500">{tx.empty}</p>}{rows.map(n=><article key={n.id} className={`rounded-xl border p-4 ${n.read_at?'border-slate-100 bg-slate-50':'border-blue-200 bg-blue-50'}`}><div className="flex items-start justify-between gap-4"><div><b className="text-slate-900">{value(n,"title")}</b><p className="mt-1 text-sm text-slate-600">{value(n,"body")}</p></div><time className="shrink-0 text-xs text-slate-400">{new Date(n.created_at).toLocaleDateString(l)}</time></div></article>)}</div></section>
}
