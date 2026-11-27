"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { type AppealLocale } from "@/lib/appealHelp";
import { chatSuggestions, matchSiteTopic, siteChatAnswer } from "@/lib/publicSiteChat";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";

const labels = {
  ru: {title:"Помощник сайта", open:"Спросить", close:"Свернуть чат", intro:"Спросите, где найти опрос, документ или ответ на обращение.", privacy:"Не указывайте Ф.И.О., контакты, пароли и коды отслеживания.", question:"Ваш вопрос", placeholder:"Например: где посмотреть ответ?", send:"Спросить", loading:"Подбираю ответ…", fallback:"В справке нет подходящего ответа. Попробуйте выбрать тему ниже или напишите в отдел.", form:"Написать обращение", source:"Открыть нужный раздел", original:"Проверенная справка", clear:"Очистить чат"},
  uz: {title:"Sayt yordamchisi", open:"Savol berish", close:"Chatni yig‘ish", intro:"So‘rovnoma, hujjat yoki murojaat javobini qayerdan topishni so‘rang.", privacy:"F.I.Sh., aloqa ma’lumotlari, parol va kuzatuv kodini kiritmang.", question:"Savolingiz", placeholder:"Masalan: javobni qayerda ko‘raman?", send:"So‘rash", loading:"Javob qidirilmoqda…", fallback:"Ma’lumotnomada mos javob topilmadi. Quyidagi mavzulardan birini tanlang yoki bo‘limga murojaat yozing.", form:"Murojaat yozish", source:"Kerakli bo‘limni ochish", original:"Tekshirilgan ma’lumot", clear:"Chatni tozalash"},
  en: {title:"Site assistant", open:"Ask a question", close:"Collapse chat", intro:"Ask where to find a survey, a document, or a reply to an appeal.", privacy:"Do not enter names, contact details, passwords or tracking codes.", question:"Your question", placeholder:"For example: where can I see the reply?", send:"Ask", loading:"Looking for an answer…", fallback:"I could not find an answer in the site guidance. Choose a topic below or write to the department.", form:"Write an appeal", source:"Open the relevant section", original:"Verified guidance", clear:"Clear chat"},
};
type Answer = NonNullable<ReturnType<typeof siteChatAnswer>>;
type Message = {id:number; question: string; answer: Answer | null; generated?: string};

export default function PublicSiteChat({locale}: {locale:AppealLocale}) {
  const [open,setOpen] = useState(false);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState<Message[]>([]);
  const [pending,setPending] = useState<string|null>(null);
  const sequence = useRef(0);
  const active = useRef(false);
  const questionRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const t = (key: keyof typeof labels.ru) => locale==="uz" ? uzbekAlphabet(labels[locale][key]) : labels[locale][key];
  useEffect(()=>{if(open) questionRef.current?.focus();},[open]);
  useEffect(()=>{const node=threadRef.current;if(node)node.scrollTop=node.scrollHeight;},[messages,pending,open]);

  async function ask(value:string, selectedTopic?:string) {
    const question=value.trim().slice(0,300);
    if(!question || active.current) return;
    setInput("");
    const topic=selectedTopic ?? matchSiteTopic(question);
    const answer=siteChatAnswer(topic,locale);
    const id=++sequence.current;
    const append=(generated?:string)=>setMessages(prev=>[...prev.slice(-11),{id,question,answer,generated}]);
    if(!topic||!answer){append();return;}
    active.current=true;
    setPending(question);
    try {
      const r=await fetch("/api/public/site-chat",{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic,locale}),signal:AbortSignal.timeout(7500),
      });
      const data=r.ok?await r.json():null;
      append(data?.generated===true && typeof data.text==="string"? data.text : undefined);
    } catch { append(); }
    finally { active.current=false;setPending(null); }
  }
  function submit(event:FormEvent){event.preventDefault();void ask(input);}

  return <section className="mb-6 rounded-3xl border border-blue-200 bg-white p-4 text-slate-900 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" aria-labelledby="site-chat-title">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <h2 id="site-chat-title" className="flex items-center gap-2 text-xl font-black"><MessageCircle aria-hidden="true" className="size-5 text-blue-600 dark:text-blue-300"/>{t("title")}</h2>
        <p className="mt-1 text-slate-600 dark:text-slate-300">{t("intro")}</p>
      </div>
      <button type="button" className="rounded-xl bg-blue-700 px-4 py-2.5 font-bold text-white hover:bg-blue-800" aria-expanded={open} aria-controls="site-chat-body" onClick={()=>setOpen(!open)}>{t(open?"close":"open")}</button>
    </div>
    {open && <div id="site-chat-body" className="mt-4 space-y-3">
      <p id="site-chat-privacy" className="text-sm text-slate-600 dark:text-slate-300">{t("privacy")}</p>
      {(messages.length>0 || pending) && <div ref={threadRef} role="log" aria-live="polite" className="max-h-80 space-y-4 overflow-y-auto overscroll-contain rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
        {messages.map(({id,question,answer,generated})=><div key={id} className="space-y-2">
          <p className="ml-auto w-fit max-w-[90%] break-words rounded-2xl bg-blue-700 px-3 py-2 text-white">{question}</p>
          <div className="mr-auto max-w-[95%] rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
            <p>{generated??answer?.text??t("fallback")}</p>
            {generated && answer && <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold">{t("original")}</summary><p className="mt-1">{answer.text}</p></details>}
            <a className="mt-2 inline-block font-bold text-blue-700 underline underline-offset-4 dark:text-blue-300" href={answer?.href??"#appeal-form"}>{answer?t("source"):t("form")}</a>
          </div>
        </div>)}
        {pending && <div><p className="ml-auto w-fit max-w-[90%] break-words rounded-2xl bg-blue-700 px-3 py-2 text-white">{pending}</p><p className="mt-2 text-sm">{t("loading")}</p></div>}
      </div>}
      <div className="flex flex-wrap gap-2">{chatSuggestions.map(id=>{
        const item=siteChatAnswer(id,locale);
        return item && <button key={id} type="button" disabled={!!pending} className="rounded-full border border-blue-300 px-3 py-2 text-left text-sm font-semibold text-blue-900 hover:bg-blue-50 disabled:opacity-60 dark:text-blue-200 dark:hover:bg-slate-800" onClick={()=>void ask(item.title,id)}>{item.title}</button>;
      })}</div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <label className="min-w-0 flex-1"><span className="sr-only">{t("question")}</span><input ref={questionRef} value={input} onChange={e=>setInput(e.target.value)} maxLength={300} aria-describedby="site-chat-privacy" placeholder={t("placeholder")} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 focus-visible:outline-blue-600 dark:border-slate-600"/></label>
        <button type="submit" disabled={!!pending||!input.trim()} className="rounded-xl bg-blue-700 px-4 py-2.5 font-bold text-white disabled:opacity-50">{t("send")}</button>
      </form>
      {messages.length>0 && <button type="button" disabled={!!pending} className="text-sm font-semibold underline underline-offset-4" onClick={()=>setMessages([])}>{t("clear")}</button>}
    </div>}
  </section>;
}
