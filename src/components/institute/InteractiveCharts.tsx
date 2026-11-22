"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Language } from "@/lib/institute/copy";

export const CHART_COLORS = ["#3476df", "#087f72", "#8053bc", "#64768d"];
export type Series = { label: string; color: string };
export type Slice = Series & { value: number };
export type ChartRow = { label: string; values: number[] };

const copy = {
  ru: { tip: "Наведите, нажмите или выберите элемент клавишей Tab", total: "Всего", details: "Данные выбранного элемента", empty: "Нет данных",  programmes: "Количество студентов по направлениям", modes: "Форма обучения", all: "Все формы", rest: "Показать все направления", fewer: "Показать первые восемь" },
  uz: { tip: "Ustiga olib boring, bosing yoki Tab tugmasi bilan tanlang", total: "Jami", details: "Tanlangan element ma’lumotlari", empty: "Ma’lumot yo‘q",  programmes: "Yo‘nalishlar bo‘yicha talabalar soni", modes: "Ta’lim shakli", all: "Barcha shakllar", rest: "Barcha yo‘nalishlarni ko‘rsatish", fewer: "Birinchi sakkiztasini ko‘rsatish" },
  en: { tip: "Hover, tap, or use Tab to explore", total: "Total", details: "Selected data", empty: "No data",  programmes: "Students by programme", modes: "Study mode", all: "All modes", rest: "Show all programmes", fewer: "Show the first eight" },
};

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
const number = (v: number, lang: Language) => new Intl.NumberFormat(lang).format(v);
const percent = (v: number, total: number, lang: Language) => new Intl.NumberFormat(lang, { style:"percent", maximumFractionDigits:1 }).format(total ? v / total : 0);

function useSelection(fallback: number) {
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const toggle = (i: number) => setPinned(v => v === i ? null : i);
  const keyboard = (e: KeyboardEvent) => {
    if (e.key === "Escape") { setPinned(null); setHover(null); setFocus(null); }
  };
  return {
    active: hover ?? focus ?? pinned ?? fallback,
    hover: (i: number) => ({ onPointerEnter: () => setHover(i), onPointerLeave: () => setHover(null), onClick: () => toggle(i) }),
    control: (i: number) => ({
      onPointerEnter: () => setHover(i), onPointerLeave: () => setHover(null),
      onFocus: () => setFocus(i), onBlur: () => setFocus(null),
      onClick: () => toggle(i), onKeyDown: keyboard, "aria-pressed": pinned === i,
    }),
  };
}

function ChartHeader({ title, lang, children }: { title: string; lang: Language; children?:ReactNode }) {
  return <div className="institute-chart-header"><div><h3 className="text-xl font-bold">{title}</h3><p className="institute-chart-hint">{copy[lang].tip}</p></div>{children}</div>;
}

export function DonutChart({ title, slices, lang }: { title: string; slices: Slice[]; lang: Language }) {
  const total = sum(slices.map(s => s.value)), id = useId();
  const selection = useSelection(slices.findIndex(s => s.value > 0));
  const selected = slices[selection.active];
  let offset = 0;
  const spin = slices.map(s => {
    const length = total ? s.value / total * 100 : 0;
    const start = offset; offset += length;
    return { ...s, start, length };
  });
  return <section className="campus-card institute-chart">
    <ChartHeader title={title} lang={lang} />
    <div className="institute-donut-layout">
      <div className="institute-donut">
        <svg viewBox="0 0 180 180" aria-hidden="true">
          <circle cx="90" cy="90" r="68" stroke="var(--campus-line)" strokeWidth="15" fill="none" />
          {spin.map((slice, i) => slice.length > 0 && <circle key={slice.label} cx="90" cy="90" r="68" pathLength="100"
            fill="none" stroke={slice.color} strokeWidth="15" strokeDasharray={`${slice.length === 100 ? 100 : Math.max(.25,slice.length - .7)} 100`} strokeDashoffset={-slice.start}
            transform="rotate(-90 90 90)" data-active={i === selection.active} className="institute-donut-slice" {...selection.hover(i)} />)}
        </svg>
        <div className="institute-donut-center" aria-hidden="true"><strong>{number(selected?.value ?? total,lang)}</strong><span>{selected ? percent(selected.value,total,lang) : copy[lang].total}</span></div>
      </div>
      <div className="institute-legend" aria-label={title}>
        {slices.map((slice,i) => <button key={slice.label} type="button" data-active={i===selection.active} aria-describedby={i===selection.active ? id : undefined} {...selection.control(i)}>
          <i style={{ background: slice.color }} aria-hidden="true"/><span>{slice.label}</span><strong>{number(slice.value,lang)}</strong>
        </button>)}
      </div>
    </div>
    <div className="institute-chart-readout" id={id}>
      <span>{selected?.label ?? copy[lang].empty}</span>
      <strong>{selected ? `${number(selected.value,lang)} / ${number(total,lang)} · ${percent(selected.value,total,lang)}` : "—"}</strong>
    </div>
  </section>;
}

export function StackChart({ title, rows, series, lang, percentage = false, headingAction }: {
  title: string; rows: ChartRow[]; series: Series[]; lang: Language; percentage?: boolean; headingAction?: ReactNode;
}) {
  const id = useId();
  const selection = useSelection(0);
  const selected = rows[selection.active] ?? rows[0];
  const max = Math.max(1,...rows.map(r=>sum(r.values)));
  return <section className="campus-card institute-chart">
    <ChartHeader title={title} lang={lang}>{headingAction}</ChartHeader>
    <ul className="institute-series" aria-label={title}>
      {series.map(s=><li key={s.label}><i style={{background:s.color}} aria-hidden="true"/>{s.label}</li>)}
    </ul>
    <div className="institute-chart-rows">
      {rows.map((row,i)=>{
        const total = sum(row.values);
        return <button type="button" key={row.label} className="institute-chart-row" data-active={row===selected}
          aria-describedby={row===selected ? id : undefined}
          aria-label={[row.label,...series.map((s,j)=>`${s.label}: ${number(row.values[j],lang)}`)].join("; ")}
          {...selection.control(i)}>
          <span>{row.label}</span><span className="institute-bar-track" aria-hidden="true">
            {row.values.map((v,j)=><i key={j} style={{ background:series[j].color, width:`${v/(percentage ? Math.max(1,total) : max)*100}%` }} />)}
          </span><strong>{percentage ? percent(total-row.values[row.values.length-1],total,lang) : number(total,lang)}</strong>
        </button>;
      })}
    </div>
    <div className="institute-chart-readout institute-chart-readout-stack" id={id} aria-label={copy[lang].details}>
      {selected ? <><span><strong>{selected.label}</strong> · {copy[lang].total}: {number(sum(selected.values),lang)}</span>
        <ul>{series.map((s,i)=><li key={s.label}><i style={{background:s.color}} aria-hidden="true"/>{s.label}: <strong>{number(selected.values[i],lang)}</strong></li>)}</ul></> : copy[lang].empty}
    </div>
  </section>;
}

export function ProgrammeChart({ rows, series, lang }: { rows:ChartRow[]; series:Series[]; lang:Language }) {
  const t = copy[lang], [mode,setMode] = useState(-1), [all,setAll] = useState(false);
  const total = (row: ChartRow) => mode < 0 ? sum(row.values) : row.values[mode];
  const sorted = [...rows].filter(r=>total(r)>0).sort((a,b)=>total(b)-total(a)||a.label.localeCompare(b.label,lang));
  const shown = (all ? sorted : sorted.slice(0,8)).map(row=>mode < 0 ? row : {...row,values:[row.values[mode]]});
  return <div className="space-y-3">
    <StackChart key={mode} lang={lang} title={t.programmes} rows={shown} series={mode<0?series:[series[mode]]}
      headingAction={<label className="institute-chart-filter"><span>{t.modes}</span>
        <select value={mode} className="campus-filter" onChange={e=>{setMode(Number(e.target.value));setAll(false);}}>
          <option value={-1}>{t.all}</option>{series.map((s,i)=><option value={i} key={s.label}>{s.label}</option>)}
        </select></label>}/>
    {sorted.length>8&&<button type="button" className="campus-filter font-bold" aria-expanded={all} onClick={()=>setAll(v=>!v)}>{all?t.fewer:t.rest}</button>}
  </div>;
}
