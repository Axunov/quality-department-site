"use client";

import { useEffect, useRef } from "react";

export function FilterRail<T extends string>({items,value,onChange,label}:{items:readonly {id:T;label:string}[];value:T;onChange:(value:T)=>void;label:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
   const root=ref.current;if(!root)return;
   const locate=()=>{
     const active=root.querySelector<HTMLElement>('[aria-pressed="true"]');if(!active)return;
     root.style.setProperty("--pill-x",active.offsetLeft+"px");
     root.style.setProperty("--pill-y",active.offsetTop+"px");
     root.style.setProperty("--pill-w",active.offsetWidth+"px");
     root.style.setProperty("--pill-h",active.offsetHeight+"px");
     root.dataset.ready="true";
   };
   locate(); if(!("ResizeObserver" in window))return;
   const resize=new ResizeObserver(locate);
   resize.observe(root);
   root.querySelectorAll("button").forEach(b=>resize.observe(b));
   return ()=>resize.disconnect();
 },[items,value]);
 return <div className="filter-rail" ref={ref} role="group" aria-label={label}>
   <span className="filter-pill" aria-hidden="true"/>
   {items.map(item=><button key={item.id} aria-pressed={item.id===value} type="button" onClick={()=>onChange(item.id)}>{item.label}</button>)}
 </div>;
}
