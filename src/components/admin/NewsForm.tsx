"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { surveyText } from "@/lib/surveyI18n";
import { getNewsMedia, type NewsMedia } from "@/lib/newsMedia";
import { newsMediaCopy } from "@/lib/newsMediaCopy";
import type { NewsItem } from "@/services/news.service";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { EditorialTranslation, editorialCopy, editorialLanguage, editorialLanguages, getEditorialTranslations, hasEditorialContent, translationError, type EditorialLanguage } from "./EditorialTranslation";
import EditorialPreview, { publicationCopy } from "./EditorialPreview";
import NewsMediaEditor from "@/components/admin/NewsMediaEditor";

export default function NewsForm({ item }: { item?: NewsItem }) {
  const locale = useLocale();
  const t = newsMediaCopy(locale);
  const tr = (text: string) => surveyText(locale, text);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState<NewsMedia[]>(() => item ? getNewsMedia(item) : []);
  const [editorKey, setEditorKey] = useState(0);
  const language = editorialLanguage(locale);
  const labels = editorialCopy[language];
  const publication = publicationCopy[language];
  const [source, setSource] = useState(language);
  const [translating, setTranslating] = useState(false);
  const [expanded, setExpanded] = useState(Boolean(item));
  const [translatedBodies, setTranslatedBodies] = useState<Partial<Record<EditorialLanguage, { html: string; revision: number }>>>({});

  async function translate(form: HTMLFormElement) {
    if (saving || translating) return;
    const data = new FormData(form);
    const title = String(data.get(`title_${source}`) || "");
    const body = String(data.get(`text_${source}`) || "");
    setTranslating(true); setMessage("");
    try {
      const result = await getEditorialTranslations(source, title, hasEditorialContent(body) ? body : "", "html");
      const bodies: Partial<Record<EditorialLanguage, string>> = {};
      for (const lang of editorialLanguages) {
        const translated = result[lang];
        if (!translated) continue;
        const titleField = form.elements.namedItem(`title_${lang}`);
        const textField = form.elements.namedItem(`text_${lang}`);
        if (titleField instanceof HTMLInputElement && !titleField.value.trim()) titleField.value = translated.title;
        if (textField instanceof HTMLInputElement && !hasEditorialContent(textField.value) && translated.content) bodies[lang] = translated.content;
      }
      setTranslatedBodies(previous => {
        const next = { ...previous };
        for (const lang of editorialLanguages) {
          if (bodies[lang]) next[lang] = { html: bodies[lang], revision: (previous[lang]?.revision || 0) + 1 };
        }
        return next;
      });
      form.querySelectorAll<HTMLDetailsElement>("[data-news-language]").forEach(panel => { panel.open = true; });
      setExpanded(true);
      setMessage(labels.ready);
    } catch (error) { setMessage(translationError(error, labels)); }
    finally { setTranslating(false); }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || uploading || translating) return;
    const element = event.currentTarget;
    const form = new FormData(element);
    const fields = Object.fromEntries(["title_ru", "title_uz", "title_en", "text_ru", "text_uz", "text_en", "category"].map(key => [key, String(form.get(key) || "")]));
    if (![fields.title_ru, fields.title_uz, fields.title_en].some(title => title.trim())) { setMessage(t.titleRequired); return; }
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/admin/news", { method: item ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, published: form.get("published") === "yes", ...(item ? { id: item.id } : {}), media_items: media }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error === "session" ? t.session : result.error === "titleRequired" ? t.titleRequired : t.saveError);
      setMessage(t.saved);
      if (!item) { element.reset(); setMedia([]); setTranslatedBodies({}); setExpanded(false); setEditorKey(key => key + 1); }
      router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : t.saveError); }
    finally { setSaving(false); }
  }

  return <form onSubmit={submit} className="mx-auto mt-8 max-w-5xl editorial-form p-4 sm:p-8" aria-busy={saving || uploading || translating}>
    {!item && <h2 className="mb-6 text-2xl font-bold">{t.new}</h2>}
    <fieldset disabled={saving || translating} className="min-w-0 space-y-5">
      <EditorialTranslation locale={language} source={source} setSource={setSource} busy={translating} translate={translate} />
      {editorialLanguages.map(lang => <details key={lang} open={source === lang || expanded || undefined} data-news-language={lang} className="editorial-fields">
        <summary className="cursor-pointer font-semibold">{({ ru: "Русский", uz: "O‘zbekcha", en: "English" })[lang]}</summary>
        <label className="mt-4 block text-sm font-semibold">{tr(`Заголовок ${lang.toUpperCase()}`)}<input name={`title_${lang}`} defaultValue={item?.[`title_${lang}`] || ""} maxLength={500} className="mt-2 w-full rounded-lg border p-3" /></label>
        <div className="mt-3"><p className="mb-2 text-sm font-semibold">{tr(`Текст новости ${lang.toUpperCase()}`)}</p><RichTextEditor key={`${lang}-${editorKey}-${translatedBodies[lang]?.revision || 0}`} name={`text_${lang}`} initialContent={translatedBodies[lang]?.html || item?.[`content_${lang}`] || item?.[`text_${lang}`] || ""} /></div>
      </details>)}
      <label className="block font-semibold">{tr("Категория")}<input name="category" defaultValue={item?.category || ""} maxLength={100} className="mt-2 w-full rounded-lg border p-3" /></label>
      <NewsMediaEditor items={media} setItems={setMedia} locale={locale} disabled={saving} onBusy={setUploading} />
      <EditorialPreview key={editorKey} locale={language} field="text" />
      <label className="block text-sm font-semibold">{publication.status}<select name="published" className="ml-2 rounded-xl border bg-white p-3" defaultValue={item?.published ? "yes" : "no"}><option value="no">{publication.draft}</option><option value="yes">{publication.published}</option></select></label>
      <button disabled={saving || uploading} className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white disabled:opacity-50">{saving ? t.saving : publication.save}</button>
    </fieldset>
    {message && <p role="status" className="mt-4 rounded-lg bg-slate-100 p-4 text-sm font-medium">{message}</p>}
  </form>;
}
