import type { ReactNode } from "react";
import { AnimatedCounter } from "@/components/motion/UnifiedMotion";
import { ageBands,modes,type Staff,type Students } from "@/lib/institute/types";
import { analyticsCopy,departments,type Language } from "@/lib/institute/copy";
import { CHART_COLORS, DonutChart, ProgrammeChart, StackChart } from "./InteractiveCharts";
import titles from "@/lib/institute/programmeNames.json";

const names:Record<string,string>=titles;
const palette=CHART_COLORS;
const ages={"under20":"< 20","20to24":"20–24","25to29":"25–29","30to39":"30–39","40to49":"40–49","50to59":"50–59","60plus":"60+"};
const sum=(values:number[])=>values.reduce((a,b)=>a+b,0);

function Metrics({ items,lang }: {items:[string,ReactNode][];lang:Language}){
  return <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([label,value])=><div className="campus-card" key={label}><dt className="text-sm font-semibold text-slate-600">{label}</dt><dd className="mt-2 text-3xl font-black">{typeof value==="number"?<AnimatedCounter value={value} locale={lang}/>:value}</dd></div>)}</dl>;
}
const date=(v:string,l:Language)=>new Intl.DateTimeFormat(l,{dateStyle:"long",timeZone:"UTC"}).format(new Date(v+"T00:00:00Z"));

export function StudentCharts({ data,lang }: {data:Students;lang:Language}){
  const t=analyticsCopy[lang], f=new Intl.NumberFormat(lang), sm=modes.filter(m=>m!=="other"||data.modes[m]>0);
  const series=sm.map(m=>({label:t[m],color:palette[modes.indexOf(m)]}));
  const genders=Object.entries(data.gender).filter(([g,v])=>g!=="unknown"||v>0) as [keyof Students["gender"],number][];
  return <section id="students" className="scroll-mt-36 space-y-5">
    <header><h2 className="text-3xl font-black">{t.students}</h2><p className="mt-2 text-sm text-slate-600">{t.academicYear}: {data.year.replace("-","/")} · {t.date}: {date(data.asOf,lang)}</p></header>
    <Metrics lang={lang} items={[[t.total,data.total],[t.programmes,data.programmes.length],[t.bachelor,sum(data.programmes.filter(p=>p.level==="bachelor").flatMap(p=>Object.values(p.counts)))],[t.master,sum(data.programmes.filter(p=>p.level==="master").flatMap(p=>Object.values(p.counts)))]]}/>
    <div className="grid gap-4 lg:grid-cols-2">
      <DonutChart title={t.gender} slices={genders.map(([g,value],i)=>({label:t[g],value,color:palette[i]}))} lang={lang}/>
      <DonutChart title={t.modes} slices={series.map((item,i)=>({...item,value:data.modes[sm[i]]}))} lang={lang}/>
    </div>
    <StackChart title={t.age} rows={ageBands.filter(a=>a!=="unknown"||sum(Object.values(data.age[a]))>0).map(a=>({label:a==="unknown"?t.unknown:ages[a],values:sm.map(m=>data.age[a][m])}))} series={series} lang={lang}/>
    <ProgrammeChart rows={data.programmes.map(p=>({label:`${p.code} · ${names[p.level+":"+p.code]??t[p.level]}`,values:sm.map(m=>p.counts[m])}))} series={series} lang={lang}/>
    <section className="campus-card">
      <h3 className="text-xl font-bold">{t.programmes}</h3><p className="mt-2 text-sm text-slate-600">{t.programmeNote}</p>
      <dl className="mt-3 flex flex-wrap gap-3 text-sm">{sm.map(m=><div key={m} className="rounded-lg border border-slate-200 px-3 py-2"><dt>{t[m]}</dt><dd><strong>{data.programmes.filter(p=>p.counts[m]>0).length}</strong> · {f.format(data.modes[m])} {t.total.toLowerCase()}</dd></div>)}</dl>
      <div className="mt-4 overflow-x-auto"><table className="min-w-[34rem] w-full text-left text-sm">
        <thead className="border-b border-slate-200"><tr><th scope="col" className="p-2">{t.code}</th><th scope="col" className="p-2">{t.all}</th>{sm.map(m=><th scope="col" key={m} className="p-2">{t[m]}</th>)}</tr></thead>
        <tbody>{data.programmes.map(p=><tr key={p.level+p.code} className="border-b border-slate-200/70"><th scope="row" className="p-2 font-normal"><strong>{p.code}</strong><span className="ml-2 text-sm text-slate-600">{t[p.level]}</span>{names[p.level+":"+p.code]&&<span lang="uz" className="block">{names[p.level+":"+p.code]}</span>}</th><td className="p-2 font-bold">{f.format(sum(Object.values(p.counts)))}</td>{sm.map(m=><td key={m} className="p-2">{f.format(p.counts[m])}</td>)}</tr>)}</tbody>
      </table></div>
    </section>
    {!!data.excluded&&<p className="text-sm text-slate-600">{t.excluded}: {data.excluded}</p>}
  </section>;
}
export function StaffCharts({ data,lang }: {data:Staff;lang:Language}){
  const t=analyticsCopy[lang];
  const degrees=data.doctoral+data.candidates+data.otherDegree;
  return <section id="staff" className="scroll-mt-36 space-y-5">
    <header><h2 className="text-3xl font-black">{t.staff}</h2><p className="mt-2 text-sm text-slate-600">{t.date}: {date(data.asOf,lang)} · {t.positions}: {data.positions}</p></header>
    <Metrics lang={lang} items={[[t.staffTotal,data.total],[t.degreeCount,degrees],[t.degree,<AnimatedCounter value={data.total?100*degrees/data.total:0} locale={lang} suffix="%" digits={1}/>],[t.average,data.averageAge===null?"—":<><AnimatedCounter value={data.averageAge} locale={lang} digits={1}/> {t.asYears}</>]]}/>
    <div className="grid gap-4 lg:grid-cols-2">
      <DonutChart title={t.degree} slices={[{label:t.doctoral,value:data.doctoral,color:palette[2]},{label:t.candidate,value:data.candidates,color:palette[0]},...(data.otherDegree?[{label:t.otherDegree,value:data.otherDegree,color:palette[1]}]:[]),{label:t.noneDegree,value:data.unknownDegree,color:palette[3]}]} lang={lang}/>
      <StackChart title={t.staffAge} rows={ageBands.filter(a=>data.age[a]>0).map(a=>({label:a==="unknown"?t.unknown:ages[a],values:[data.age[a]]}))} series={[{label:t.staffTotal,color:palette[0]}]} lang={lang}/>
    </div>
    <p className="text-sm text-slate-600">{t.ageCoverage}: {data.knownAge}/{data.total}</p>
    <StackChart title={t.departments} rows={data.departments.map(d=>({label:departments[d.key]?.[lang]??t.other,values:[d.doctoral,d.candidates,d.otherDegree,d.total-d.doctoral-d.candidates-d.otherDegree]}))} series={[{label:t.doctoral,color:palette[2]},{label:t.candidate,color:palette[0]},{label:t.otherDegree,color:palette[1]},{label:t.noneDegree,color:palette[3]}]} percentage lang={lang}/>
    <p className="text-sm leading-6 text-slate-600">{t.staffNote}</p>
  </section>;
}
