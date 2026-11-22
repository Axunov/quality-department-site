import { ageBands,modes,type Staff,type Students } from "@/lib/institute/types";
import { analyticsCopy,departments,type Language } from "@/lib/institute/copy";
import titles from "@/lib/institute/programmeNames.json";

const names:Record<string,string>=titles;
const palette=["#185fba","#0f8b79","#7954b3","#8293a8"];
const ages={"under20":"< 20","20to24":"20–24","25to29":"25–29","30to39":"30–39","40to49":"40–49","50to59":"50–59","60plus":"60+"};
const sum=(values:number[])=>values.reduce((a,b)=>a+b,0);
const pct=(v:number,n:number,lang:Language)=>new Intl.NumberFormat(lang,{style:"percent",maximumFractionDigits:1}).format(n?v/n:0);

function Bars({ title,values,lang }: {title:string;values:[string,number][];lang:Language}){
  const total=sum(values.map(x=>x[1])),fmt=new Intl.NumberFormat(lang);
  return <section className="campus-card"><h3 className="text-xl font-bold">{title}</h3><ul className="mt-4 grid gap-3">{values.map(([label,count],i)=><li key={label}>
    <div className="flex justify-between gap-3 text-sm"><span>{label}</span><strong className="shrink-0">{fmt.format(count)} · {pct(count,total,lang)}</strong></div>
    <div className="mt-1 h-2 overflow-hidden rounded bg-slate-100" aria-hidden="true"><div className="h-full rounded" style={{width:`${total?100*count/total:0}%`,background:palette[i%palette.length]}} /></div>
  </li>)}</ul></section>;
}
function Metrics({ items }: {items:[string,number|string][]}){
  return <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([label,value])=><div className="campus-card" key={label}><dt className="text-sm font-semibold text-slate-600">{label}</dt><dd className="mt-2 text-3xl font-black">{value}</dd></div>)}</dl>;
}
const date=(v:string,l:Language)=>new Intl.DateTimeFormat(l,{dateStyle:"long",timeZone:"UTC"}).format(new Date(v+"T00:00:00Z"));

export function StudentCharts({ data,lang }: {data:Students;lang:Language}){
  const t=analyticsCopy[lang], f=new Intl.NumberFormat(lang), sm=modes.filter(m=>m!=="other"||data.modes[m]>0);
  const max=Math.max(1,...ageBands.map(a=>sum(sm.map(m=>data.age[a][m]))));
  const genders=Object.entries(data.gender).filter(([g,v])=>g!=="unknown"||v>0) as [keyof Students["gender"],number][];
  return <section id="students" className="scroll-mt-36 space-y-5">
    <header><h2 className="text-3xl font-black">{t.students}</h2><p className="mt-2 text-sm text-slate-600">{t.academicYear}: {data.year.replace("-","/")} · {t.date}: {date(data.asOf,lang)}</p></header>
    <Metrics items={[[t.total,f.format(data.total)],[t.programmes,f.format(data.programmes.length)],[t.bachelor,f.format(sum(data.programmes.filter(p=>p.level==="bachelor").flatMap(p=>Object.values(p.counts))))],[t.master,f.format(sum(data.programmes.filter(p=>p.level==="master").flatMap(p=>Object.values(p.counts))))]]}/>
    <div className="grid gap-4 lg:grid-cols-2"><Bars title={t.gender} values={genders.map(([g,v])=>[t[g],v])} lang={lang}/><Bars title={t.modes} values={sm.map(m=>[t[m],data.modes[m]])} lang={lang}/></div>
    <section className="campus-card">
      <h3 className="text-xl font-bold">{t.age}</h3>
      <ul className="mt-3 flex flex-wrap gap-4 text-sm">{sm.map((m)=><li key={m} className="flex items-center gap-2"><span style={{background:palette[modes.indexOf(m)]}} className="size-3 rounded-sm" aria-hidden="true"/>{t[m]}</li>)}</ul>
      <ul className="mt-4 grid gap-3">{ageBands.filter(a=>a!=="unknown"||sum(Object.values(data.age[a]))>0).map(a=><li key={a}>
        <div className="flex justify-between text-sm"><strong>{a==="unknown"?t.unknown:ages[a]}</strong><span>{f.format(sum(Object.values(data.age[a])))}</span></div>
        <div className="my-1 flex h-3 overflow-hidden rounded bg-slate-100" aria-hidden="true">{sm.map(m=><span key={m} style={{width:`${100*data.age[a][m]/max}%`,background:palette[modes.indexOf(m)]}} />)}</div>
        <p className="flex flex-wrap gap-x-4 text-xs text-slate-600">{sm.map(m=><span key={m}>{t[m]}: {f.format(data.age[a][m])}</span>)}</p>
      </li>)}</ul>
    </section>
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
  const t=analyticsCopy[lang], f=new Intl.NumberFormat(lang);
  const degrees=data.doctoral+data.candidates+data.otherDegree;
  return <section id="staff" className="scroll-mt-36 space-y-5">
    <header><h2 className="text-3xl font-black">{t.staff}</h2><p className="mt-2 text-sm text-slate-600">{t.date}: {date(data.asOf,lang)} · {t.positions}: {data.positions}</p></header>
    <Metrics items={[[t.staffTotal,f.format(data.total)],[t.degreeCount,f.format(degrees)],[t.degree,pct(degrees,data.total,lang)],[t.average,data.averageAge===null?"—":f.format(data.averageAge)+" "+t.asYears]]}/>
    <div className="grid gap-4 lg:grid-cols-2">
      <Bars title={t.degree} values={[[t.doctoral,data.doctoral],[t.candidate,data.candidates],...(data.otherDegree?[[t.otherDegree,data.otherDegree] as [string,number]]:[]),[t.noneDegree,data.unknownDegree]]} lang={lang}/>
      <Bars title={t.staffAge} values={ageBands.filter(a=>data.age[a]>0).map(a=>[a==="unknown"?t.unknown:ages[a],data.age[a]])} lang={lang}/>
    </div>
    <p className="text-sm text-slate-600">{t.ageCoverage}: {data.knownAge}/{data.total}</p>
    <section className="campus-card"><h3 className="text-xl font-bold">{t.departments}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{t.staffNote}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{data.departments.map(d=>{
        const count=d.doctoral+d.candidates+d.otherDegree;
        return <article key={d.key} className="rounded-xl border border-slate-200 p-4"><h4 className="font-bold">{departments[d.key]?.[lang]??t.other}</h4><p className="mt-1 text-sm">{t.staffTotal}: {d.total} · {t.degreeCount}: {count} ({pct(count,d.total,lang)})</p>
          <progress aria-label={t.degree} value={count} max={d.total} className="mt-2 h-2 w-full accent-blue-700"/><p className="mt-1 text-sm text-slate-600">DSc: {d.doctoral} · PhD: {d.candidates}{d.otherDegree>0&&` · ${t.otherDegree}: ${d.otherDegree}`}</p></article>;
      })}</div>
    </section>
  </section>;
}
