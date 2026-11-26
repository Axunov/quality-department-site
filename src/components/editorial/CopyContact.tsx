"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { EditorialLocale } from "./EditorialPage";

const copy={
 ru:{copy:"Скопировать",ok:"Скопировано",error:"Не удалось скопировать. Выделите значение и скопируйте вручную."},
 uz:{copy:"Nusxa oliş",ok:"Nusxa olindi",error:"Nusxa olinmadi. Qiymatni belgilab, qölda nusxalang."},
 en:{copy:"Copy",ok:"Copied",error:"Could not copy. Select the value and copy it manually."},
};

export default function CopyContact({value,locale,label}:{value:string;locale:EditorialLocale;label:string}){
 const t=copy[locale], [state,setState]=useState<"idle"|"done"|"error">("idle");
 return <span className="inline-flex flex-wrap items-center gap-2">
  <button type="button" className="contact-copy" aria-label={t.copy+": "+label} title={t.copy} onClick={async()=>{
   try{await navigator.clipboard.writeText(value);setState("done");}catch{setState("error");}
  }}>{state==="done"?<Check size={16} aria-hidden="true"/>:<Copy size={16} aria-hidden="true"/>}</button>
  <span role="status" className={state!=="idle"?"text-xs":"sr-only"}>{state==="done"?t.ok:state==="error"?t.error:""}</span>
 </span>;
}
