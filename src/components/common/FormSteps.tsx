import { Check } from "lucide-react";
const copy={ru:{step:"Шаг",of:"из",hint:"Ответы сохраняются при переходе между шагами и при ошибке отправки. Не закрывайте вкладку до подтверждения."},uz:{step:"Bosqiç",of:"/",hint:"Bosqiçlar örtasida ötganda va yuboriş xatosida javoblar saqlanadi. Tasdiq kelmagunça oynani yopmang."},en:{step:"Step",of:"of",hint:"Answers are kept as you move between steps and if submission fails. Keep this tab open until confirmation."}};
export function JourneyProgress({value,max,label}:{value:number;max:number;label:string}){
 const ratio=max>0?Math.min(1,Math.max(0,value/max)):0;
 return <><progress className="sr-only" max={max} value={value} aria-label={label}/><div className="journey-meter" aria-hidden="true"><span style={{width:`${ratio*100}%`}}/></div></>;
}
export default function FormSteps({locale,steps,current,help}:{locale:string;steps:readonly string[];current:number;help?:string}){
 const t=copy[locale==='uz'||locale==='en'?locale:'ru'];return <section className="form-journey" aria-label={`${t.step} ${current+1} ${t.of} ${steps.length}`}><div className="flex items-center justify-between gap-3 text-sm"><strong>{steps[current]}</strong><span className="text-slate-500">{t.step} {current+1} {t.of} {steps.length}</span></div><JourneyProgress max={steps.length} value={current+1} label={steps[current]}/><ol className="journey-labels">{steps.map((label,i)=><li key={label} aria-current={i===current?'step':undefined} className={i<=current?'is-reached':''}><span>{i<current?<Check size={12}/>:i+1}</span>{label}</li>)}</ol><p className="mt-4 text-xs leading-5 text-slate-500">{help ?? t.hint}</p></section>;
}
