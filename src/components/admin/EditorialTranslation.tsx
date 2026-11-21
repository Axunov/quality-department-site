"use client";

import { Languages } from "lucide-react";

export const editorialLanguages = ["ru", "uz", "en"] as const;
export type EditorialLanguage = typeof editorialLanguages[number];
const names = { ru: "Русский", uz: "O‘zbekcha", en: "English" };
export const editorialCopy = {
  ru: { source: "Язык оригинала", translate: "Перевести на два языка", busy: "Переводим…", privacy: "На перевод в Google отправляются только заголовок и текст. Проверьте результат перед публикацией.", other: "Другие языковые версии", ready: "Переводы добавлены в пустые поля. Их можно отредактировать.", invalid: "Введите заголовок на языке оригинала.", unconfigured: "Автоперевод ещё не подключён. Можно заполнить переводы вручную.", failed: "Не удалось перевести. Повторите попытку или заполните поля вручную.", size: "Текст слишком длинный для автоперевода. Переведите его частями.", cover: "Обложка из файла", coverBusy: "Готовим обложку…", coverHint: "Для PDF берётся первая страница. Для Office используется встроенная миниатюра, если она есть.", noCover: "Миниатюра недоступна. Для обложки с первой страницей загрузите PDF." },
  uz: { source: "Asl matn tili", translate: "Ikki tilga tarjima qilish", busy: "Tarjima qilinmoqda…", privacy: "Google’ga faqat sarlavha va matn yuboriladi. E’lon qilishdan oldin tarjimani tekshiring.", other: "Boshqa tillardagi versiyalar", ready: "Tarjimalar bo‘sh maydonlarga qo‘shildi. Ularni tahrirlash mumkin.", invalid: "Sarlavhani asl tilda kiriting.", unconfigured: "Avtomatik tarjima hali ulanmagan. Tarjimalarni qo‘lda kiritish mumkin.", failed: "Tarjima qilib bo‘lmadi. Qayta urinib ko‘ring yoki maydonlarni qo‘lda to‘ldiring.", size: "Matn avtomatik tarjima uchun juda uzun. Uni qismlarga bo‘lib tarjima qiling.", cover: "Fayldan olingan muqova", coverBusy: "Muqova tayyorlanmoqda…", coverHint: "PDF faylning birinchi sahifasi olinadi. Office faylida ichki miniatyura bo‘lsa, u ishlatiladi.", noCover: "Miniatyura mavjud emas. Birinchi sahifani muqova qilish uchun PDF yuklang." },
  en: { source: "Original language", translate: "Translate into two languages", busy: "Translating…", privacy: "Only the title and text are sent to Google for translation. Review the result before publishing.", other: "Other language versions", ready: "Translations were added to empty fields and can be edited.", invalid: "Enter a title in the original language.", unconfigured: "Automatic translation is not configured yet. You can enter translations manually.", failed: "Translation failed. Try again or fill in the fields manually.", size: "The text is too long for automatic translation. Translate it in parts.", cover: "Cover from file", coverBusy: "Preparing the cover…", coverHint: "PDFs use the first page. Office files use the embedded thumbnail when available.", noCover: "No thumbnail available. Upload a PDF to use its first page as the cover." },
} as const;

export function editorialLanguage(locale: string): EditorialLanguage { return locale === "uz" || locale === "en" ? locale : "ru"; }

export function hasEditorialContent(value: string) {
  return Boolean(value.replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").trim());
}

export async function getEditorialTranslations(source: EditorialLanguage, title: string, content: string, format: "text" | "html") {
  if (!title.trim()) throw new Error("invalid");
  const response = await fetch("/api/admin/translate", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source, title, content, format }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.translations as Partial<Record<EditorialLanguage, {title: string; content: string}>>;
}

export function translationError(error: unknown, t: typeof editorialCopy[EditorialLanguage]) {
  const code = error instanceof Error ? error.message : "";
  return code === "unconfigured" || code === "invalid" || code === "size" ? t[code] : t.failed;
}

export function EditorialTranslation({ locale, source, setSource, busy, translate }: {locale: EditorialLanguage; source: EditorialLanguage; setSource: (language: EditorialLanguage) => void; busy: boolean; translate: (form: HTMLFormElement) => void }) {
  const t = editorialCopy[locale];
  return <div className="editorial-tools">
    <div className="flex flex-wrap items-end gap-3">
      <label className="grid gap-1 text-sm font-semibold">{t.source}<select value={source} onChange={e => setSource(editorialLanguage(e.target.value))} className="rounded-lg border border-slate-300 bg-transparent p-2">
        {editorialLanguages.map(language => <option key={language} value={language}>{names[language]}</option>)}
      </select></label>
      <button type="button" disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-teal-800 px-4 py-2 font-semibold text-white hover:bg-teal-900 disabled:opacity-60" onClick={e => {const form = e.currentTarget.form; if (form) translate(form);}}>
        <Languages size={18} aria-hidden="true" />{busy ? t.busy : t.translate}
      </button>
    </div>
    <p className="mt-3 text-sm opacity-85">{t.privacy}</p>
  </div>;
}
