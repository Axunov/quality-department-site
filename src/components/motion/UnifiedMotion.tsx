"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const reduced = () => matchMedia(reducedQuery).matches || document.documentElement.classList.contains("accessibility-mode");

function useViewportEffect(onUpdate: () => void, observeSize = false) {
 useEffect(() => {
   let frame = 0;
   const queue = () => {
     if (!frame) frame = requestAnimationFrame(() => { frame = 0; onUpdate(); });
   };
   const media = matchMedia(reducedQuery);
   const observer = new MutationObserver(queue);
   observer.observe(document.documentElement, { attributes:true, attributeFilter:["class"] });
   const resize = observeSize && typeof ResizeObserver !== "undefined" ? new ResizeObserver(queue) : null;
   resize?.observe(document.body);
   media.addEventListener("change",queue);
   window.addEventListener("scroll",queue,{passive:true});
   window.addEventListener("resize",queue,{passive:true});
   queue();
   return () => {
     cancelAnimationFrame(frame); observer.disconnect(); resize?.disconnect();
     media.removeEventListener("change",queue);
     window.removeEventListener("scroll",queue); window.removeEventListener("resize",queue);
   };
 },[onUpdate,observeSize]);
}

export function ScrollProgressBar(){
 const node=useRef<HTMLDivElement>(null);
 useViewportEffect(()=>{
   const el=node.current;
   if(!el)return;
   const range=document.documentElement.scrollHeight-window.innerHeight;
   const progress=range>0?Math.max(0,Math.min(1,window.scrollY/range)):0;
   el.style.setProperty("--qd-scroll",String(progress));
 },true);
 return <div ref={node} className="qd-scroll-progress" aria-hidden="true"/>;
}

export function ParallaxFrame({range=16,children,className=""}:{range?:number;children:ReactNode;className?:string}){
 const node=useRef<HTMLDivElement>(null);
 useViewportEffect(()=>{
   const el=node.current, parent=el?.parentElement;
   if(!el||!parent||reduced()){el?.style.removeProperty("--qd-drift");return;}
   const bounds=parent.getBoundingClientRect();
   if(bounds.bottom<=0||bounds.top>=window.innerHeight)return;
   const limit=Math.min(24,Math.max(0,range))*(parent.clientWidth<640?.45:1);
   el.style.setProperty("--qd-drift",Math.min(limit,Math.max(0,-bounds.top*.065))+"px");
 });
 return <div ref={node} className={`qd-parallax ${className}`}>{children}</div>;
}

export function Reveal({delayMs=0,children,className=""}:{delayMs?:number;children:ReactNode;className?:string}){
 const node=useRef<HTMLDivElement>(null);
 useEffect(()=>{
   const el=node.current;
   if(!el||!("IntersectionObserver" in window))return;
   const observer=new IntersectionObserver(([entry])=>{
     if(!entry?.isIntersecting)return;
     if(!reduced()){
       el.style.animationDelay=Math.min(360,Math.max(0,delayMs))+"ms";
       el.dataset.seen="true";
     }
     observer.disconnect();
   },{threshold:.1});
   observer.observe(el);
   return ()=>observer.disconnect();
 },[delayMs]);
 return <div ref={node} className={`qd-reveal ${className}`}>{children}</div>;
}

export function SpotlightCard({as="div",id,labelledBy,children,className=""}:{as?:"section"|"div";id?:string;labelledBy?:string;children:ReactNode;className?:string}){
 const Element=as;
 return <Element id={id} aria-labelledby={labelledBy} className={`qd-spotlight ${className}`} onPointerMove={event=>{
   if(event.pointerType!=="mouse"||reduced())return;
   const el=event.currentTarget, bounds=el.getBoundingClientRect();
   el.style.setProperty("--qd-x",event.clientX-bounds.left+"px");
   el.style.setProperty("--qd-y",event.clientY-bounds.top+"px");
 }}>{children}</Element>;
}

export function AnimatedCounter({value,locale,digits=0,suffix=""}:{value:number;locale:string;digits?:number;suffix?:string}){
 const ref=useRef<HTMLSpanElement>(null), [tick,setTick]=useState<{target:number;value:number}|null>(null);
 const options:Intl.NumberFormatOptions={maximumFractionDigits:digits};
 if(suffix==="%")options.style="percent";
 const format=new Intl.NumberFormat(locale,options);
 const render=(v:number)=>suffix==="%"?format.format(v/100):format.format(v)+suffix;
 useEffect(()=>{
   const el=ref.current;
   if(!el||reduced()||!Number.isFinite(value)||!("IntersectionObserver" in window))return;
   let frame=0,start:number|undefined;
   const observer=new IntersectionObserver(([entry])=>{
     if(!entry?.isIntersecting)return;
     observer.disconnect();
     const animate=(now:number)=>{
       if(reduced()){setTick(null);return;}
       start??=now;
       const f=Math.min(1,(now-start)/1000);
       setTick(f===1?null:{target:value,value:value*(1-Math.pow(1-f,3))});
       if(f<1)frame=requestAnimationFrame(animate);
     };
     frame=requestAnimationFrame(animate);
   },{threshold:.4});
   observer.observe(el);
   return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
 },[value]);
 return <span ref={ref} className="qd-tabular editorial-number">
   <span className="sr-only">{render(value)}</span><span aria-hidden="true">{render(tick?.target===value?tick.value:value)}</span>
 </span>;
}

export function SkeletonGrid({label}:{label:string}){
 return <div role="status" className="editorial-skeleton-grid mt-6">
   <span className="sr-only">{label}</span>
   {[0,1,2].map(i=><div key={i} className="editorial-surface skeleton-card" aria-hidden="true"><i className="qd-skeleton"/><i className="qd-skeleton"/><i className="qd-skeleton"/></div>)}
 </div>;
}
