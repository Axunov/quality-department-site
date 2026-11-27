"use client";

import { useState } from "react";
import { uzbekAlphabet } from "@/lib/uzbekAlphabet";
import { allowsAppealTemplates, appealReplyTemplates, type AppealLocale } from "@/lib/appealHelp";

const languages = { ru: "Русский", uz: "Özbekça", en: "English" } as const;
const labels = {
  ru: { title: "Помощник по ответам", select: "Шаблон ответа", empty: "Выберите шаблон", language: "Язык ответа", insert: "Вставить в редактор", keep: "В редакторе уже есть текст. Вы можете добавить шаблон в конец.", lead: "Проверьте черновик и дополните его перед отправкой. Помощник ничего не отправляет.", manual: "Подготовьте ответ вручную. Для этой категории или статуса шаблоны недоступны." },
  uz: { title: "Javob tayyorlash yordamchisi", select: "Javob andozasi", empty: "Andozani tanlang", language: "Javob tili", insert: "Tahrir maydoniga qo‘shish", keep: "Tahrir maydonida matn bor. Andozani matn oxiriga qo‘shish mumkin.", lead: "Yuborishdan oldin javobni tekshiring va to‘ldiring. Yordamchi hech narsa yubormaydi.", manual: "Javobni qo‘lda tayyorlang. Bu toifa yoki holat uchun andoza mavjud emas." },
  en: { title: "Reply assistant", select: "Reply template", empty: "Choose a template", language: "Reply language", insert: "Insert into editor", keep: "The editor already contains text. The template will be added at the end.", lead: "Review and complete the draft before sending. The assistant does not send replies.", manual: "Write the reply manually. Templates are unavailable for this category or status." },
};

export default function AppealReplyDraft({ locale, preferredLocale, category, status, hasReply, onInsert }: {
  locale: AppealLocale; preferredLocale: unknown; category: unknown; status: unknown; hasReply: boolean; onInsert: (text: string) => void;
}) {
  const [language, setLanguage] = useState<AppealLocale>(preferredLocale === "ru" || preferredLocale === "uz" || preferredLocale === "en" ? preferredLocale : locale);
  const [id, setId] = useState("");
  const t = labels[locale];
  const ui = (key: keyof typeof t) => locale === "uz" ? uzbekAlphabet(t[key]) : t[key];
  const choices = appealReplyTemplates.filter((template) => template.id === category);
  const draft = choices.find((template) => template.id === id);
  const localizeDraft = (value: string) => language === "uz" ? uzbekAlphabet(value) : value;

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
            <select value={language} onChange={(event) => setLanguage(event.target.value as AppealLocale)} className="mt-1 w-full rounded-lg border bg-white p-2">
              {Object.entries(languages).map(([code, label]) => <option key={code} value={code} lang={code}>{label}</option>)}
            </select>
          </label>
        </div>
        {draft && <div className="mt-3">
          <p lang={language} className="rounded-xl bg-white p-3 text-sm">{localizeDraft(draft.body[language])}</p>
          {hasReply && <p className="mt-2 text-sm">{ui("keep")}</p>}
          <button type="button" onClick={() => { onInsert(localizeDraft(draft.body[language])); setId(""); }} className="mt-3 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-bold text-blue-900">{ui("insert")}</button>
        </div>}
      </> : <p className="mt-1 text-sm text-slate-700">{ui("manual")}</p>}
    </section>
  );
}
