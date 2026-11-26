"use client";

import { useEffect, useRef, useState } from "react";

function motionBlocked() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("accessibility-mode");
}

export function AnimatedNumber({value,locale,digits=0}:{value:number;locale:string;digits?:number}){
  const ref=useRef<HTMLSpanElement>(null);
  const [visible,setVisible]=useState(value);
  const format=new Intl.NumberFormat(locale,{maximumFractionDigits:digits});
  useEffect(()=>{
    const el=ref.current;
    if(!el||motionBlocked()||!("IntersectionObserver" in window))return;
    let frame=0,start:number|undefined;
    const observer=new IntersectionObserver(entries=>{
      if(!entries[0]?.isIntersecting)return;
      observer.disconnect();
      const animate=(now:number)=>{
        if(motionBlocked()){setVisible(value);return;}
        start??=now;
        const f=Math.min(1,(now-start)/1200);
        setVisible(value*(1-Math.pow(1-f,3)));
        if(f<1)frame=requestAnimationFrame(animate);
      };
      frame=requestAnimationFrame(animate);
    },{threshold:.45});
    observer.observe(el);
    return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
  },[value]);
  return <span ref={ref} className="editorial-number"><span className="sr-only">{format.format(value)}</span><span aria-hidden="true">{format.format(visible)}</span></span>;
}

export function SkeletonGrid({label}:{label:string}){
  return <div role="status" className="editorial-skeleton-grid mt-6">
   <span className="sr-only">{label}</span>
   {[0,1,2].map(i=><div key={i} className="editorial-surface skeleton-card" aria-hidden="true"><i/><i/><i/></div>)}
  </div>;
}
