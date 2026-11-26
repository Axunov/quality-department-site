"use client";
import { useState } from "react";
import { UserRound } from "lucide-react";
import { normalizeUzbekSearch } from "@/lib/uzbekAlphabet";
import CopyContact from "./CopyContact";
import { employeesCopy } from "./employeesCopy";
import type { EditorialLocale } from "./EditorialPage";

export type DirectoryEntry={id:string;name:string;position:string;department:string;office:string;reception:string;phone:string;email:string;telegram:string;photo:string};
const ui={
 ru:{search:"Поиск по имени",dept:"Подразделение",position:"Должность",all:"Все",reset:"Сбросить фильтры",none:"Сотрудники не найдены. Измените запрос или фильтры."},
 uz:{search:"Ism böyiça qidiruv",dept:"Bölinma",position:"Lavozim",all:"Barçasi",reset:"Filtrlarni tozalaş",none:"Xodimlar topilmadi. Sörov yoki filtrlarni özgartiring."},
 en:{search:"Search by name",dept:"Department",position:"Position",all:"All",reset:"Clear filters",none:"No employees match. Change the query or filters."},
};
const normalize=(value:string,locale:EditorialLocale)=>locale==="uz"?normalizeUzbekSearch(value):value.normalize("NFKC").toLocaleLowerCase(locale).replace(/ё/g,"е").trim();
const options=(rows:string[],lang:EditorialLocale)=>[...new Set(rows.filter(Boolean))].sort((a,b)=>a.localeCompare(b,lang));

export default function EmployeeDirectory({people,locale}:{people:DirectoryEntry[];locale:EditorialLocale}){
 const [query,setQuery]=useState(""),[dept,setDept]=useState(""),[position,setPosition]=useState("");
 const t=employeesCopy[locale], f=ui[locale];
 const matches=people.filter(p=>(!dept||p.department===dept)&&(!position||p.position===position)&&normalize(p.name,locale).includes(normalize(query,locale)));
 if(!people.length)return <p className="editorial-lead">{t.empty}</p>;
 return <>
  <div className="directory-filters">
   <label>{f.search}<input type="search" value={query} onChange={e=>setQuery(e.target.value)} maxLength={100}/></label>
   <label>{f.dept}<select value={dept} onChange={e=>setDept(e.target.value)}><option value="">{f.all}</option>{options(people.map(p=>p.department),locale).map(x=><option key={x}>{x}</option>)}</select></label>
   <label>{f.position}<select value={position} onChange={e=>setPosition(e.target.value)}><option value="">{f.all}</option>{options(people.map(p=>p.position),locale).map(x=><option key={x}>{x}</option>)}</select></label>
  </div>
  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
   <p role="status" className="text-sm tabular-nums">{t.employeesCount}: {matches.length}</p>
   {(query||dept||position)&&<button type="button" className="editorial-link" onClick={()=>{setQuery("");setDept("");setPosition("");}}>{f.reset}</button>}
  </div>
  {matches.length===0&&<p className="editorial-lead">{f.none}</p>}
  <div className="directory-grid">{matches.map(person=><article key={person.id} className="directory-card">
   {person.photo?<img src={person.photo} alt="" loading="lazy" width={80} height={96}/>:<div className="directory-avatar"><UserRound aria-hidden="true"/></div>}
   <div className="min-w-0">
    <h3>{person.name||person.position}</h3>{person.position&&person.name&&<p>{person.position}</p>}{person.department&&<p className="directory-dept">{person.department}</p>}
    <dl className="directory-info">
    {person.office&&<div><dt>{t.room}</dt><dd>{person.office}</dd></div>}
    {person.reception&&<div><dt>{t.reception}</dt><dd className="whitespace-pre-line">{person.reception}</dd></div>}
    {person.phone&&<div><dt>{t.phone}</dt><dd><a href={"tel:"+person.phone.replace(/[^+\d]/g,"")}>{person.phone}</a><CopyContact label={t.phone} value={person.phone} locale={locale}/></dd></div>}
    {person.email&&<div><dt>{t.email}</dt><dd><a href={"mailto:"+person.email}>{person.email}</a><CopyContact label={t.email} value={person.email} locale={locale}/></dd></div>}
    {person.telegram&&<div><dt>{t.telegram}</dt><dd><a href={"https://t.me/"+person.telegram} target="_blank" rel="noopener noreferrer">@{person.telegram}</a></dd></div>}
    </dl>
   </div>
  </article>)}</div>
 </>;
}
