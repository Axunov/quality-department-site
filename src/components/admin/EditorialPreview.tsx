"use client";
import { useState } from "react";
import { editorialLanguages,type EditorialLanguage } from "./EditorialTranslation";

const previewCopy={
 ru:{open:"Предпросмотр текста",close:"Закрыть предпросмотр",empty:"Заголовок или текст на этом языке не заполнены.",format:"Текстовый предпросмотр"},
 uz:{open:"Matnni oldindan köriş",close:"Körişni yopiş",empty:"Bu tilda sarlavha yoki matn kiritilmagan.",format:"Matnni köriş"},
 en:{open:"Preview text",close:"Close preview",empty:"A title or body is missing in this language.",format:"Text preview"},
} as const;
export const publicationCopy={
 ru:{status:"Статус публикации",draft:"Черновик",published:"Опубликовано",save:"Сохранить"},
 uz:{status:"Naşr holati",draft:"Qoralama",published:"E’lon qilingan",save:"Saqlaş"},
 en:{status:"Publication status",draft:"Draft",published:"Published",save:"Save"},
} as const;

function plain(input:string){
 return input.replace(/<br\b[^>]*>|<\/(?:p|li|div|h[1-6])\s*>/gi,"\n").replace(/<[^>]*>/g,"")
 .replace(/&(?:amp|lt|gt|quot|nbsp|#39);/g,key=>({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&nbsp;":" ","&#39;":"'"}[key]??key)).trim();
}

export default function EditorialPreview({locale,field}:{locale:EditorialLanguage;field:"text"|"description"}){
 const a=previewCopy[locale], [language,setLanguage]=useState(locale);
 const [snapshot,setSnapshot]=useState<Partial<Record<EditorialLanguage,{title:string;body:string}>>|null>(null);
 const details=snapshot?.[language];
 return <div className="my-4">
  <button type="button" aria-expanded={!!snapshot} className="campus-filter font-bold" onClick={e=>{
   if(snapshot){setSnapshot(null);return;}
   const form=e.currentTarget.form;if(!form)return;
   const data=new FormData(form);
   setSnapshot(Object.fromEntries(editorialLanguages.map(l=>[l,{title:String(data.get(`title_${l}`)??"").trim(),body:field==="text"?plain(String(data.get(`text_${l}`)??"")):String(data.get(`description_${l}`)??"").trim()}])));
  }}>{snapshot?a.close:a.open}</button>
  {details&&<section className="campus-card mt-3" aria-label={a.format}>
   <p className="text-sm font-bold">{a.format}</p>
   <div className="my-2 flex flex-wrap gap-2">{editorialLanguages.map(l=><button type="button" key={l} onClick={()=>setLanguage(l)} aria-pressed={l===language} className="campus-filter">{l.toUpperCase()}{(!snapshot?.[l]?.title||!snapshot?.[l]?.body)&&" · !"}</button>)}</div>
   <div lang={language}>{(!details.title||!details.body)&&<p className="mb-3 text-sm text-amber-700">{a.empty}</p>}
    <h3 className="text-xl font-bold">{details.title}</h3><p className="mt-2 whitespace-pre-wrap break-words">{details.body}</p>
   </div>
  </section>}
 </div>;
}
