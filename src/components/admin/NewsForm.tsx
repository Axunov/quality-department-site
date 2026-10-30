"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { surveyText } from "@/lib/surveyI18n";
import { getNewsMedia, type NewsMedia } from "@/lib/newsMedia";
import { newsMediaCopy } from "@/lib/newsMediaCopy";
import type { NewsItem } from "@/services/news.service";
import RichTextEditor from "@/components/admin/RichTextEditor";
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

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || uploading) return;
    const element = event.currentTarget;
    const form = new FormData(element);
    const fields = Object.fromEntries(["title_ru", "title_uz", "title_en", "text_ru", "text_uz", "text_en", "category"].map(key => [key, String(form.get(key) || "")]));
    if (![fields.title_ru, fields.title_uz, fields.title_en].some(title => title.trim())) { setMessage(t.titleRequired); return; }
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/admin/news", { method: item ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, ...(item ? { id: item.id } : {}), media_items: media }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error === "session" ? t.session : result.error === "titleRequired" ? t.titleRequired : t.saveError);
      setMessage(t.saved);
      if (!item) { element.reset(); setMedia([]); setEditorKey(key => key + 1); }
      router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : t.saveError); }
    finally { setSaving(false); }
  }

  return <form onSubmit={submit} className="mx-auto mt-8 max-w-5xl rounded-2xl bg-white p-4 shadow sm:p-8" aria-busy={saving || uploading}>
    {!item && <h2 className="mb-6 text-2xl font-bold">{t.new}</h2>}
    <fieldset disabled={saving} className="min-w-0 space-y-5">
      {(["ru", "uz", "en"] as const).map(lang => <div key={lang} className="space-y-3"><label className="block font-semibold">{tr(`Заголовок ${lang.toUpperCase()}`)}<input name={`title_${lang}`} defaultValue={item?.[`title_${lang}`] || ""} maxLength={500} className="mt-2 w-full rounded-lg border p-3" /></label><div><p className="mb-2 font-semibold">{tr(`Текст новости ${lang.toUpperCase()}`)}</p><RichTextEditor key={`${lang}-${editorKey}`} name={`text_${lang}`} initialContent={item?.[`content_${lang}`] || item?.[`text_${lang}`] || ""} /></div></div>)}
      <label className="block font-semibold">{tr("Категория")}<input name="category" defaultValue={item?.category || ""} maxLength={100} className="mt-2 w-full rounded-lg border p-3" /></label>
      <NewsMediaEditor items={media} setItems={setMedia} locale={locale} disabled={saving} onBusy={setUploading} />
      <button disabled={saving || uploading} className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white disabled:opacity-50">{saving ? t.saving : item ? t.save : t.publish}</button>
    </fieldset>
    {message && <p role="status" className="mt-4 rounded-lg bg-slate-100 p-4 text-sm font-medium">{message}</p>}
  </form>;
}
