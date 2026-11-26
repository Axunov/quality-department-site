"use client";
import { useState, type ReactNode } from "react";
import { FilterRail } from "@/components/editorial/FilterRail";

const copy={ru:{all:"Все новости",group:"Категории новостей"},uz:{all:"Barça yangiliklar",group:"Yangiliklar toifalari"},en:{all:"All news",group:"News categories"}};
export function NewsCategoryFilter({locale,cards}:{locale:keyof typeof copy;cards:readonly {id:string;category:string;label:string;node:ReactNode}[]}){
 const [selected,setSelected]=useState("");
 const t=copy[locale];
 const categories=[...new Map(cards.map(x=>[x.category,x.label]))].sort((a,b)=>a[1].localeCompare(b[1],locale));
 return <>
  {categories.length>1&&<FilterRail label={t.group} value={selected} onChange={setSelected} items={[{id:"",label:t.all},...categories.map(([id,label])=>({id,label}))]}/>}
  <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
   {cards.filter(x=>!selected||x.category===selected).map(x=><div key={x.id} className="min-w-0">{x.node}</div>)}
  </div>
 </>;
}
