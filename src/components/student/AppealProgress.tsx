import { appealStatusLabel } from "@/lib/studentAppealI18n";

const stages=["submitted","in_review","answered","completed"] as const;
const progress:Record<string,number>={submitted:0,registered:0,assigned:1,in_review:1,clarification:1,answered:2,completed:3};
export default function AppealProgress({locale,status}:{locale:string;status:string}){
 const current=progress[status];
 if(current===undefined)return null;
 return <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
  {stages.map((stage,i)=><li key={stage} aria-current={i===current?"step":undefined} className={`min-w-0 break-words rounded-lg border p-2 text-xs font-semibold ${i===current?"border-blue-700 bg-blue-700 text-white":i<current?"border-blue-200 bg-white text-blue-900":"border-slate-200 bg-white text-slate-700"}`}>
    <span aria-hidden="true" className="block tabular-nums">{i+1}</span>{appealStatusLabel(locale,i===current?status:stage)}
  </li>)}
 </ol>;
}
