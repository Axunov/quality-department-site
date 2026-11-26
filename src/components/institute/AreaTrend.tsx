"use client";

import { useId, useState } from "react";

export function AreaTrend({points,locale,label}:{points:readonly {label:string;value:number}[];locale:string;label:string}){
 const id=useId(), [hover,setHover]=useState<number|null>(null),[focus,setFocus]=useState<number|null>(null),[selected,setSelected]=useState<number|null>(null);
 if(points.length===0)return null;
 const active=hover??focus??selected??points.length-1;
 const peak=Math.max(1,...points.map(p=>p.value));
 const ticks=points.map((p,i)=>({x:points.length===1?160:12+i*296/(points.length-1),y:106-92*p.value/peak}));
 const line=ticks.map((p,i)=>(i?"L":"M")+p.x+" "+p.y).join(" ");
 const area=points.length>1?line+" L"+ticks.at(-1)?.x+" 106 L"+ticks[0].x+" 106 Z":"";
 const format=new Intl.NumberFormat(locale);
 return <div className="area-chart" aria-label={label}>
   <svg viewBox="0 0 320 118" className="area-plot" aria-hidden="true">
    <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--chart-blue)" stopOpacity=".36"/><stop offset="100%" stopColor="var(--chart-blue)" stopOpacity=".035"/></linearGradient></defs>
    {[14,60,106].map(y=><line key={y} x1="12" x2="308" y1={y} y2={y} className="area-guide"/>)}
    {!!area&&<path d={area} fill={`url(#${id})`}/>}
    <path d={line} fill="none" stroke="var(--chart-blue)" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
    {ticks.map(({x,y},i)=><g key={i} onPointerEnter={()=>setHover(i)} onPointerLeave={()=>setHover(null)} onClick={()=>setSelected(i)}>
     <circle cx={x} cy={y} r="11" fill="transparent"/>
     <circle cx={x} cy={y} r={active===i?5:3} fill="var(--chart-blue)" opacity={active===i?1:.45}/>
    </g>)}
   </svg>
   <div className="area-periods">{points.map((p,i)=><button type="button" key={p.label} aria-pressed={active===i} aria-label={p.label+": "+format.format(p.value)} onFocus={()=>setFocus(i)} onBlur={()=>setFocus(null)} onPointerEnter={()=>setHover(i)} onPointerLeave={()=>setHover(null)} onClick={()=>setSelected(i)}>{p.label}</button>)}</div>
   <p className="area-readout editorial-glass" aria-live="polite"><span>{points[active].label}</span><strong>{format.format(points[active].value)}</strong></p>
 </div>;
}
