"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
import { type AppealLocale } from "@/lib/appealHelp";
import { chatSuggestions, matchSiteTopic, siteChatAnswer } from "@/lib/publicSiteChat";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";

const labels = {
  ru: {title:"Помощник сайта", open:"Спросить помощника", close:"Свернуть чат", intro:"Спросите, где найти опрос, документ или ответ на обращение.", privacy:"Не указывайте Ф.И.О., контакты, пароли и коды отслеживания.", question:"Ваш вопрос", placeholder:"Например: где посмотреть ответ?", send:"Спросить", loading:"Подбираю ответ…", fallback:"В справке нет подходящего ответа. Попробуйте выбрать тему ниже или напишите в отдел.", form:"Написать обращение", source:"Открыть нужный раздел", original:"Проверенная справка", clear:"Очистить чат"},
  uz: {title:"Sayt yordamchisi", open:"Yordamchiga savol berish", close:"Chatni yig‘ish", intro:"So‘rovnoma, hujjat yoki murojaat javobini qayerdan topishni so‘rang.", privacy:"F.I.Sh., aloqa ma’lumotlari, parol va kuzatuv kodini kiritmang.", question:"Savolingiz", placeholder:"Masalan: javobni qayerda ko‘raman?", send:"So‘rash", loading:"Javob qidirilmoqda…", fallback:"Ma’lumotnomada mos javob topilmadi. Quyidagi mavzulardan birini tanlang yoki bo‘limga murojaat yozing.", form:"Murojaat yozish", source:"Kerakli bo‘limni ochish", original:"Tekshirilgan ma’lumot", clear:"Chatni tozalash"},
  en: {title:"Site assistant", open:"Ask the assistant", close:"Collapse chat", intro:"Ask where to find a survey, a document, or a reply to an appeal.", privacy:"Do not enter names, contact details, passwords or tracking codes.", question:"Your question", placeholder:"For example: where can I see the reply?", send:"Ask", loading:"Looking for an answer…", fallback:"I could not find an answer in the site guidance. Choose a topic below or write to the department.", form:"Write an appeal", source:"Open the relevant section", original:"Verified guidance", clear:"Clear chat"},
};
type Answer = NonNullable<ReturnType<typeof siteChatAnswer>>;
type Message = {id:number; question: string; answer: Answer | null; generated?: string};

export default function PublicSiteChat({locale}: {locale:AppealLocale}) {
  const [open,setOpen] = useState(false);
  const [tipDismissed,setTipDismissed] = useState(false);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState<Message[]>([]);
  const [pending,setPending] = useState<string|null>(null);
  const sequence = useRef(0);
  const active = useRef(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const t = (key: keyof typeof labels.ru) => locale==="uz" ? uzbekAlphabet(labels[locale][key]) : labels[locale][key];
  useEffect(()=>{if(open) headingRef.current?.focus({preventScroll:true});},[open]);
  function closeChat(restoreFocus = true) {
    setOpen(false);
    setTipDismissed(true);
    if(restoreFocus) launcherRef.current?.focus({preventScroll:true});
  }
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

  return <div
    className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3"
    onKeyDown={event=>{
      if(event.key!=="Escape")return;
      event.preventDefault();
      event.stopPropagation();
      if(open)closeChat();
      else setTipDismissed(true);
    }}
  >
    <div className="group relative order-2" onPointerLeave={()=>setTipDismissed(false)} onBlur={()=>setTipDismissed(false)}>
      <button
        ref={launcherRef}
        type="button"
        aria-label={t(open?"close":"open")}
        aria-expanded={open}
        aria-controls={open?"site-chat-body":undefined}
        aria-describedby={!open && !tipDismissed?"site-chat-tooltip":undefined}
        className="grid size-14 place-items-center rounded-full border border-white/30 bg-blue-700 text-white shadow-lg ring-1 ring-slate-900/10 transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        onClick={()=>{if(open)closeChat();else setOpen(true);}}
      >
        {open?<X aria-hidden="true" className="size-6"/>:<MessageCircle aria-hidden="true" className="size-6"/>}
      </button>
      {!open && !tipDismissed && <div id="site-chat-tooltip" role="tooltip" className="invisible absolute right-full top-1/2 w-max max-w-[min(17rem,calc(100vw-6rem))] -translate-y-1/2 pr-2 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="rounded-xl bg-slate-900 px-3 py-2 text-white shadow-lg dark:bg-slate-100 dark:text-slate-900">
          <p className="text-sm font-bold">{t("open")}</p>
          <p className="mt-0.5 text-xs leading-relaxed">{t("intro")}</p>
        </div>
      </div>}
    </div>
    {open && <section id="site-chat-body" aria-labelledby="site-chat-title"
      className="max-h-[min(36rem,calc(100dvh-max(1rem,env(safe-area-inset-bottom))-5.25rem))] w-[min(26rem,calc(100vw-max(1rem,env(safe-area-inset-left))-max(1rem,env(safe-area-inset-right))))] overflow-y-auto overscroll-contain rounded-2xl border border-blue-200 bg-white text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-2 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
        <div className="min-w-0">
          <h2 ref={headingRef} tabIndex={-1} id="site-chat-title" className="text-lg font-black">{t("title")}</h2>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{t("intro")}</p>
        </div>
        <button type="button" aria-label={t("close")} onClick={()=>closeChat()} className="grid size-10 shrink-0 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-blue-600 dark:text-slate-200 dark:hover:bg-slate-800"><X aria-hidden="true" className="size-5"/></button>
      </div>
      <div className="space-y-3 p-4">
      <p id="site-chat-privacy" className="text-sm text-slate-600 dark:text-slate-300">{t("privacy")}</p>
      {(messages.length>0 || pending) && <div ref={threadRef} role="log" aria-live="polite" className="max-h-80 space-y-4 overflow-y-auto overscroll-contain rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
        {messages.map(({id,question,answer,generated})=><div key={id} className="space-y-2">
          <p className="ml-auto w-fit max-w-[90%] break-words rounded-2xl bg-blue-700 px-3 py-2 text-white">{question}</p>
          <div className="mr-auto max-w-[95%] rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
            <p>{generated??answer?.text??t("fallback")}</p>
            {generated && answer && <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold">{t("original")}</summary><p className="mt-1">{answer.text}</p></details>}
            <a className="mt-2 inline-block font-bold text-blue-700 underline underline-offset-4 dark:text-blue-300" href={answer?.href??"#appeal-form"} onClick={()=>closeChat(false)}>{answer?t("source"):t("form")}</a>
          </div>
        </div>)}
        {pending && <div><p className="ml-auto w-fit max-w-[90%] break-words rounded-2xl bg-blue-700 px-3 py-2 text-white">{pending}</p><p className="mt-2 text-sm">{t("loading")}</p></div>}
      </div>}
      <div className="flex flex-wrap gap-2">{chatSuggestions.map(id=>{
        const item=siteChatAnswer(id,locale);
        return item && <button key={id} type="button" disabled={!!pending} className="rounded-full border border-blue-300 px-3 py-2 text-left text-sm font-semibold text-blue-900 hover:bg-blue-50 disabled:opacity-60 dark:text-blue-200 dark:hover:bg-slate-800" onClick={()=>void ask(item.title,id)}>{item.title}</button>;
      })}</div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <label className="min-w-0 flex-1"><span className="sr-only">{t("question")}</span><input value={input} onChange={e=>setInput(e.target.value)} maxLength={300} aria-describedby="site-chat-privacy" placeholder={t("placeholder")} className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 focus-visible:outline-blue-600 dark:border-slate-600"/></label>
        <button type="submit" disabled={!!pending||!input.trim()} className="rounded-xl bg-blue-700 px-4 py-2.5 font-bold text-white disabled:opacity-50">{t("send")}</button>
      </form>
      {messages.length>0 && <button type="button" disabled={!!pending} className="text-sm font-semibold underline underline-offset-4" onClick={()=>setMessages([])}>{t("clear")}</button>}
      </div>
    </section>}
  </div>;
}
