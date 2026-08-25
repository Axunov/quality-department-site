"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

type Survey = { id:string; title_ru:string; title_uz:string; title_en:string; description_ru:string|null; description_uz:string|null; description_en:string|null; ends_at:string|null };
const copy = {
  ru: { title:"Опросы студентов", lead:"Выберите доступный опрос. Регистрация и личный кабинет не требуются.", anonymous:"Ответы отправляются анонимно: анкета не запрашивает Ф.И.О. или Student ID.", open:"Пройти опрос", empty:"Сейчас нет доступных опросов.", deadline:"Доступен до", error:"Не удалось загрузить список опросов." },
  uz: { title:"Talabalar so‘rovlari", lead:"Mavjud so‘rovni tanlang. Ro‘yxatdan o‘tish va shaxsiy kabinet talab qilinmaydi.", anonymous:"Javoblar anonim yuboriladi: so‘rov F.I.Sh. yoki Student ID ni so‘ramaydi.", open:"So‘rovdan o‘tish", empty:"Hozircha mavjud so‘rovlar yo‘q.", deadline:"Amal qilish muddati", error:"So‘rovlar ro‘yxatini yuklab bo‘lmadi." },
  en: { title:"Student surveys", lead:"Choose an available survey. Registration and an account are not required.", anonymous:"Answers are submitted anonymously: the survey does not request a name or Student ID.", open:"Take survey", empty:"There are no available surveys now.", deadline:"Available until", error:"The survey list could not be loaded." },
} as const;

export default function PublicStudentSurveys({ locale }:{ locale:string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru", t = copy[lang];
  const [rows,setRows] = useState<Survey[]>([]), [loading,setLoading] = useState(true), [error,setError] = useState(false);
  useEffect(() => { void fetch("/api/student/surveys").then(async response => { if (!response.ok) throw new Error(); const body = await response.json(); setRows(body.surveys || []); }).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  return <main className="container-main py-10 sm:py-14"><div className="mx-auto max-w-4xl"><header className="rounded-[30px] bg-gradient-to-br from-[#083b73] to-[#087d83] p-7 text-white sm:p-10"><h1 className="text-3xl font-black sm:text-4xl">{t.title}</h1><p className="mt-3 text-blue-50">{t.lead}</p></header><p className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-cyan-950">{t.anonymous}</p>{loading&&<p className="py-12 text-center font-bold text-slate-500">…</p>}{error&&<p className="mt-6 rounded-2xl bg-red-50 p-5 text-center font-bold text-red-700">{t.error}</p>}<div className="mt-6 grid gap-4">{rows.map(survey=><article key={survey.id} className="rounded-3xl border bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6"><div><h2 className="text-xl font-black">{survey[`title_${lang}`]}</h2>{survey[`description_${lang}`]&&<p className="mt-2 text-slate-600">{survey[`description_${lang}`]}</p>}{survey.ends_at&&<p className="mt-3 text-sm font-semibold text-slate-500">{t.deadline}: {new Date(survey.ends_at).toLocaleDateString(lang)}</p>}</div><Link href={`/surveys/student/${survey.id}`} className="mt-5 inline-flex shrink-0 rounded-xl bg-blue-700 px-5 py-3 font-black text-white sm:mt-0">{t.open}</Link></article>)}</div>{!loading&&!error&&!rows.length&&<p className="mt-6 rounded-2xl bg-white p-8 text-center text-slate-500">{t.empty}</p>}</div></main>;
}
