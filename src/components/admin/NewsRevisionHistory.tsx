"use client";
import { useState } from "react";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";
import type { EditorialLanguage } from "./EditorialTranslation";

const copy={
 ru:{title:"История редакций",load:"Показать редакции",loading:"Загрузка…",empty:"Ранних редакций пока нет.",error:"Не удалось открыть историю. Попробуйте ещё раз.",draft:"Черновик",published:"Опубликовано"},
 uz:{title:"Tahrirlar tarixi",load:"Oldingi tahrirlarni körsatiş",loading:"Yuklanmoqda…",empty:"Hozirça oldingi tahrirlar yöq.",error:"Tarixni oçib bölmadi. Qayta urinib köring.",draft:"Qoralama",published:"E’lon qilingan"},
 en:{title:"Revision history",load:"Show revisions",loading:"Loading…",empty:"No earlier revisions yet.",error:"Could not load the history. Try again.",draft:"Draft",published:"Published"},
};
type Revision={id:number;archivedAt:string;published:boolean;titles:Record<EditorialLanguage,string>;bodies:Record<EditorialLanguage,string>};
export default function NewsRevisionHistory({id,locale}:{id:string;locale:EditorialLanguage}){
 const t=copy[locale];
 const [rows,setRows]=useState<Revision[]|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(false);
 async function load(){
   if(busy)return;setBusy(true);setError(false);
   try{
     const response=await fetch("/api/admin/news/revisions?id="+encodeURIComponent(id),{cache:"no-store"});
     if(!response.ok)throw Error();
     setRows((await response.json()).revisions);
   }catch{setError(true);}finally{setBusy(false);}
 }
 const format=new Intl.DateTimeFormat(locale,{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Tashkent"});
 return <section className="campus-card gap-3" aria-label={t.title}>
  <h2 className="font-bold">{t.title}</h2><button type="button" disabled={busy} className="campus-filter w-fit" onClick={()=>void load()}>{busy?t.loading:t.load}</button>
  {error&&<p role="alert">{t.error}</p>}
  {rows?.length===0&&<p role="status">{t.empty}</p>}
  {rows?.map(row=><details key={row.id} className="rounded-xl border p-3">
   <summary className="cursor-pointer"><time dateTime={row.archivedAt}>{format.format(new Date(row.archivedAt))}</time> · {row.published?t.published:t.draft}</summary>
   {(["ru","uz","en"] as const).filter(l=>row.titles[l]||row.bodies[l]).map(l=>{
    const value=row.bodies[l];
    return <div key={l} lang={l} className="mt-3 border-t pt-3"><p className="text-sm font-bold">{l.toUpperCase()} · {l==="uz"?uzbekAlphabet(row.titles[l]):row.titles[l]}</p><p className="mt-1 max-h-48 overflow-auto whitespace-pre-line break-words text-sm">{l==="uz"?uzbekAlphabet(value):value}</p></div>;
   })}
  </details>)}
 </section>;
}
