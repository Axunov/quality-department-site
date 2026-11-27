"use client";

import { useState } from "react";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";
import { allowsAppealTemplates, appealHelp, appealReplyTemplates, type AppealLocale } from "@/lib/appealHelp";

const languages = { ru: "Русский", uz: "Özbekça", en: "English" } as const;
const labels = {
  ru: { title: "Помощник по ответам", select: "Шаблон ответа", empty: "Выберите шаблон", language: "Язык ответа", insert: "Вставить в редактор", keep: "В редакторе уже есть текст. Вы можете добавить шаблон в конец.", lead: "Проверьте черновик и дополните его перед отправкой. Помощник ничего не отправляет.", manual: "Подготовьте ответ вручную. Для этой категории или статуса шаблоны недоступны." },
  uz: { title: "Javob tayyorlash yordamchisi", select: "Javob andozasi", empty: "Andozani tanlang", language: "Javob tili", insert: "Tahrir maydoniga qo‘shish", keep: "Tahrir maydonida matn bor. Andozani matn oxiriga qo‘shish mumkin.", lead: "Yuborishdan oldin javobni tekshiring va to‘ldiring. Yordamchi hech narsa yubormaydi.", manual: "Javobni qo‘lda tayyorlang. Bu toifa yoki holat uchun andoza mavjud emas." },
  en: { title: "Reply assistant", select: "Reply template", empty: "Choose a template", language: "Reply language", insert: "Insert into editor", keep: "The editor already contains text. The template will be added at the end.", lead: "Review and complete the draft before sending. The assistant does not send replies.", manual: "Write the reply manually. Templates are unavailable for this category or status." },
};

const aiLabels = {
  ru: { generate: "Подготовить черновик с ИИ", busy: "Готовим черновик…", unavailable: "ИИ пока недоступен. Можно использовать шаблон или написать ответ вручную.", limit: "Лимит ИИ исчерпан. Используйте шаблон или попробуйте позже.", manual: "ИИ не подготовил подходящий черновик. Проверьте обращение и ответьте вручную.", sources: "Источники для проверки" },
  uz: { generate: "SI yordamida javob loyihasini tayyorlash", busy: "Javob loyihasi tayyorlanmoqda…", unavailable: "SI hozir mavjud emas. Andozadan foydalaning yoki javobni qo‘lda yozing.", limit: "SI so‘rovlari limiti tugadi. Andozadan foydalaning yoki keyinroq urinib ko‘ring.", manual: "SI mos javob loyihasini tayyorlamadi. Murojaatni tekshiring va qo‘lda javob bering.", sources: "Tekshirish uchun manbalar" },
  en: { generate: "Draft with AI", busy: "Preparing draft…", unavailable: "AI is currently unavailable. Use a template or write a reply manually.", limit: "The AI limit was reached. Use a template or try again later.", manual: "No suitable AI draft was generated. Review the appeal and write a reply manually.", sources: "Sources to review" },
};

export default function AppealReplyDraft({ appealId, locale, preferredLocale, category, status, hasReply, onInsert }: {
  appealId: string; locale: AppealLocale; preferredLocale: unknown; category: unknown; status: unknown; hasReply: boolean; onInsert: (text: string) => void;
}) {
  const [language, setLanguage] = useState<AppealLocale>(preferredLocale === "ru" || preferredLocale === "uz" || preferredLocale === "en" ? preferredLocale : locale);
  const [id, setId] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<"unavailable" | "limit" | "manual" | "">("");
  const [generated, setGenerated] = useState<{ draft: string; sourceIds: string[] } | null>(null);
  const t = labels[locale];
  const ui = (key: keyof typeof t) => locale === "uz" ? uzbekAlphabet(t[key]) : t[key];
  const choices = appealReplyTemplates.filter((template) => template.id === category);
  const draft = choices.find((template) => template.id === id);
  const localizeDraft = (value: string) => language === "uz" ? uzbekAlphabet(value) : value;

  const ai = (key: keyof typeof aiLabels.ru) => locale === "uz" ? uzbekAlphabet(aiLabels[locale][key]) : aiLabels[locale][key];
  async function generate() {
    if (busy) return;
    setBusy(true);
    setNotice("");
    setGenerated(null);
    try {
      const response = await fetch("/api/admin/appeal-draft", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appealId, locale: language }),
      });
      if (!response.ok) {
        setNotice(response.status === 429 ? "limit" : response.status === 422 ? "manual" : "unavailable");
        return;
      }
      setGenerated(await response.json());
    } catch {
      setNotice("unavailable");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-slate-900" aria-label={ui("title")}>
      <h3 className="font-black">{ui("title")}</h3>
      {allowsAppealTemplates(category, status) ? <>
        <p className="mt-1 text-sm text-slate-700">{ui("lead")}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="min-w-0 text-sm font-semibold">{ui("select")}
            <select value={id} onChange={(event) => setId(event.target.value)} className="mt-1 w-full rounded-lg border bg-white p-2">
              <option value="">{ui("empty")}</option>
              {choices.map((item) => <option key={item.id} value={item.id}>{localizeDraft(item.title[language])}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">{ui("language")}
            <select value={language} disabled={busy} onChange={(event) => { setLanguage(event.target.value as AppealLocale); setGenerated(null); setNotice(""); }} className="mt-1 w-full rounded-lg border bg-white p-2">
              {Object.entries(languages).map(([code, label]) => <option key={code} value={code} lang={code}>{label}</option>)}
            </select>
          </label>
        </div>
        {draft && <div className="mt-3">
          <p lang={language} className="rounded-xl bg-white p-3 text-sm">{localizeDraft(draft.body[language])}</p>
          {hasReply && <p className="mt-2 text-sm">{ui("keep")}</p>}
          <button type="button" onClick={() => { onInsert(localizeDraft(draft.body[language])); setId(""); }} className="mt-3 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-bold text-blue-900">{ui("insert")}</button>
        </div>}
        <button type="button" disabled={busy} onClick={() => void generate()} className="mt-3 rounded-lg bg-blue-700 px-3 py-2 text-sm font-bold text-white disabled:opacity-60">{ai(busy ? "busy" : "generate")}</button>
        {notice && <p role="status" className="mt-2 text-sm">{ai(notice)}</p>}
        {generated && <div className="mt-3 rounded-xl bg-white p-3 text-sm">
          <p lang={language} className="whitespace-pre-wrap">{localizeDraft(generated.draft)}</p>
          <p className="mt-3 font-bold">{ai("sources")}</p>
          <ul lang={language} className="mt-1 list-disc space-y-1 pl-5">
            {appealHelp.filter((item) => generated.sourceIds.includes(item.id)).map((item) => <li key={item.id}>{localizeDraft(item.question[language])}: {localizeDraft(item.answer[language])}</li>)}
          </ul>
          {hasReply && <p className="mt-2">{ui("keep")}</p>}
          <button type="button" onClick={() => { onInsert(localizeDraft(generated.draft)); setGenerated(null); }} className="mt-3 rounded-lg border border-blue-300 px-3 py-2 font-bold text-blue-900">{ui("insert")}</button>
        </div>}
      </> : <p className="mt-1 text-sm text-slate-700">{ui("manual")}</p>}
    </section>
  );
}
