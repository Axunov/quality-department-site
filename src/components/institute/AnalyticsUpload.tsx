"use client";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { analyticsCopy,type Language } from "@/lib/institute/copy";
import type { Snapshot } from "@/lib/institute/types";

const copy={
 ru:{title:"Обновление аналитики HEMIS",lead:"Загрузите свежую выгрузку «Talabalar» или «Lavozimlar» в формате XLSX (до 2 МБ). Сначала проверьте итоги, затем опубликуйте. Исходная таблица и персональные данные не сохраняются.",file:"Файл Excel",preview:"Проверить файл",publish:"Опубликовать сводку",working:"Обработка…",success:"Сводка опубликована",open:"Открыть аналитику",type:"Набор данных",errors:{file:"Нужен корректный файл XLSX до 2 МБ.",columns:"В файле не найдены обязательные столбцы выгрузки HEMIS.",date:"Проверьте дату среза.",year:"Укажите учебный год в формате 2026-2027.",duplicates:"Найдены дубли или противоречивые записи. Проверьте выгрузку.",empty:"Нет данных для выбранного набора и периода.",programmes:"Не удалось распознать шифр направления.",session:"Войдите как администратор и подтвердите MFA.",save:"Не удалось сохранить сводку. Публичные данные не изменились.",old:"Уже опубликован более свежий срез."}},
 uz:{title:"HEMIS tahlilini yangilash",lead:"«Talabalar» yoki «Lavozimlar» XLSX faylini yuklang (2 MB gacha). Natijalarni tekshiring, keyin e’lon qiling. Manba jadvali va shaxsiy ma’lumotlar saqlanmaydi.",file:"Excel fayli",preview:"Faylni tekshirish",publish:"Natijani e’lon qilish",working:"Qayta ishlanmoqda…",success:"Natija e’lon qilindi",open:"Tahlilni ochish",type:"Ma’lumotlar turi",errors:{file:"2 MB gacha bo‘lgan to‘g‘ri XLSX fayli kerak.",columns:"HEMIS uchun zarur ustunlar topilmadi.",date:"Holat sanasini tekshiring.",year:"O‘quv yilini 2026-2027 shaklida kiriting.",duplicates:"Takroriy yoki zid yozuvlar topildi.",empty:"Tanlangan davr uchun ma’lumot yo‘q.",programmes:"Yo‘nalish shifri aniqlanmadi.",session:"Administrator hisobiga kiring va MFA ni tasdiqlang.",save:"Natija saqlanmadi. Ochiq ma’lumot o‘zgarmadi.",old:"Yangiroq ma’lumot allaqachon e’lon qilingan."}},
 en:{title:"Update HEMIS analytics",lead:"Upload a Talabalar or Lavozimlar XLSX export (up to 2 MB). Check the totals before publishing. The original file and personal details are not retained.",file:"Excel file",preview:"Check file",publish:"Publish snapshot",working:"Processing…",success:"Snapshot published",open:"Open analytics",type:"Data set",errors:{file:"Use a valid XLSX file up to 2 MB.",columns:"Required HEMIS columns were not found.",date:"Check the snapshot date.",year:"Use the academic-year format 2026-2027.",duplicates:"Duplicate or conflicting records were found.",empty:"No data for this data set and period.",programmes:"A programme code could not be recognised.",session:"Sign in as an administrator and complete MFA.",save:"The snapshot could not be saved. Public data has not changed.",old:"A more recent snapshot is already published."}},
} as const;
export default function AnalyticsUpload({lang,today,initialYear}:{lang:Language;today:string;initialYear:string}){
 const t=copy[lang], a=analyticsCopy[lang];
 const [kind,setKind]=useState<"students"|"staff">("students"),[asOf,setAsOf]=useState(today),[year,setYear]=useState(initialYear),[file,setFile]=useState<File|null>(null);
 const [state,setState]=useState<Snapshot|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState(""),[published,setPublished]=useState(false);
 const reset=()=>{setState(null);setPublished(false);setError("");};
 async function submit(publish:boolean){
  if(!file||busy||publish&&!state)return;
  setBusy(true);setError("");
  try{
   const body=new FormData();body.set("file",file);body.set("kind",kind);body.set("asOf",asOf);body.set("year",year);body.set("action",publish?"publish":"preview");
   const response=await fetch("/api/admin/institute-analytics",{method:"POST",body});
   const result=await response.json();
   if(!response.ok){setError(t.errors[result.error as keyof typeof t.errors]??t.errors.save);return;}
   setState(result.payload);setPublished(publish);
  } catch{setError(t.errors.save);} finally{setBusy(false);}
 }
 return <main className="mx-auto max-w-5xl space-y-5">
  <header className="campus-banner"><h1 className="text-3xl font-black">{t.title}</h1><p className="mt-3 max-w-2xl">{t.lead}</p></header>
  <form onSubmit={e=>{e.preventDefault();void submit(false);}} className="campus-card gap-4">
   <label className="text-sm font-bold">{t.type}<select className="mt-2 w-full rounded-xl border bg-white p-3" value={kind} disabled={busy} onChange={e=>{reset();setKind(e.target.value==="staff"?"staff":"students");}}>
    <option value="students">{a.students}</option><option value="staff">{a.staff}</option></select></label>
   <div className="grid gap-4 sm:grid-cols-2">
    <label className="text-sm font-bold">{a.date}<input type="date" required max={today} value={asOf} disabled={busy} className="mt-2 w-full rounded-xl border bg-white p-3" onChange={e=>{reset();setAsOf(e.target.value);}} /></label>
    {kind==="students"&&<label className="text-sm font-bold">{a.academicYear}<input required type="text" pattern="[0-9]{4}-[0-9]{4}" value={year} disabled={busy} className="mt-2 w-full rounded-xl border bg-white p-3" onChange={e=>{reset();setYear(e.target.value);}} /></label>}
   </div>
   <label className="text-sm font-bold">{t.file}<input type="file" accept=".xlsx" required disabled={busy} onChange={e=>{reset();setFile(e.target.files?.[0]??null);}} className="mt-2 block w-full rounded-xl border bg-white p-3" /></label>
   <button type="submit" className="campus-filter w-fit font-bold" disabled={busy}>{busy?t.working:t.preview}</button>
   {error&&<p role="alert" className="rounded-xl bg-red-50 p-3 font-semibold text-red-700">{error}</p>}
  </form>
  {state&&<section className="campus-card gap-3" aria-live="polite">
   <h2 className="font-bold">{state.kind==="students"?a.students:a.staff}</h2>
   <p>{a.date}: {state.asOf} · {a.all}: <strong>{state.total}</strong></p>
   {state.kind==="students"?<p>{a.programmes}: {state.programmes.length} · {a.excluded}: {state.excluded}</p>:<p>{a.positions}: {state.positions} · {a.degreeCount}: {state.candidates+state.doctoral+state.otherDegree} · {a.average}: {state.averageAge??"—"}</p>}
   {published?<p className="font-bold text-emerald-700">{t.success} · <Link href="/analytics" className="underline">{t.open}</Link></p>:<button type="button" className="w-fit rounded-xl bg-blue-700 px-4 py-3 font-bold text-white" disabled={busy} onClick={()=>void submit(true)}>{busy?t.working:t.publish}</button>}
  </section>}
 </main>;
}
