"use client";

import { useEffect } from "react";

export function HomeMotion() {
 useEffect(()=>{
   const home=document.querySelector<HTMLElement>(".home-modern"),hero=home?.querySelector<HTMLElement>(".home-hero");
   if(!home||!hero)return;
   const preference=matchMedia("(prefers-reduced-motion: reduce)");
   const pointer=matchMedia("(hover: hover) and (pointer: fine)");
   const blocked=()=>preference.matches||document.documentElement.classList.contains("accessibility-mode");
   const reveals=home.querySelectorAll<HTMLElement>("[data-reveal]");
   const observer="IntersectionObserver" in window?new IntersectionObserver(entries=>{
     for(const entry of entries)if(entry.isIntersecting){if(!blocked())entry.target.classList.add("reveal-seen");observer?.unobserve(entry.target);}
   },{threshold:.13}):null;
   reveals.forEach(target=>observer?.observe(target));
   let frame=0;
   const update=()=>{frame=0;if(blocked()){hero.style.removeProperty("--campus-drift");return;}
     const r=hero.getBoundingClientRect();if(r.bottom>0)hero.style.setProperty("--campus-drift",Math.min(hero.clientWidth<640?7:18,Math.max(0,-r.top*.065))+"px");
   };
   const queue=()=>{if(!frame)frame=requestAnimationFrame(update);};
   const spotlight=(event:PointerEvent)=>{
     if(blocked()||!pointer.matches||!(event.target instanceof Element))return;
     const card=event.target.closest<HTMLElement>("[data-spotlight]");if(!card)return;
     const r=card.getBoundingClientRect();
     card.style.setProperty("--spot-x",(event.clientX-r.left)+"px");
     card.style.setProperty("--spot-y",(event.clientY-r.top)+"px");
   };
   const mode=new MutationObserver(queue);mode.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
   window.addEventListener("scroll",queue,{passive:true});
   preference.addEventListener("change",queue);
   home.addEventListener("pointermove",spotlight,{passive:true});
   queue();
   return ()=>{mode.disconnect();observer?.disconnect();cancelAnimationFrame(frame);window.removeEventListener("scroll",queue);preference.removeEventListener("change",queue);home.removeEventListener("pointermove",spotlight);hero.style.removeProperty("--campus-drift");};
 },[]);
 return null;
}
