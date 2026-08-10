"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewsEditForm({ item }: { item: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    const { error } = await supabase
      .from("news")
      .update({
        title_ru: String(form.get("title_ru") || ""),
        title_uz: String(form.get("title_uz") || ""),
        title_en: String(form.get("title_en") || ""),
        text_ru: String(form.get("text_ru") || ""),
        text_uz: String(form.get("text_uz") || ""),
        text_en: String(form.get("text_en") || ""),
        content_ru: String(form.get("text_ru") || ""),
        content_uz: String(form.get("text_uz") || ""),
        content_en: String(form.get("text_en") || ""),
        category: String(form.get("category") || "Новости"),
      })
      .eq("id", item.id);

    if (error) {
      setMessage("Ошибка сохранения: " + error.message);
    } else {
      setMessage("Новость обновлена!");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-5xl rounded-2xl bg-white p-8 shadow"
    >
      <div className="space-y-5">
       <textarea name="title_ru" defaultValue={item.title_ru || ""} className="h-16 w-full rounded-lg border p-3" placeholder="Заголовок RU" />
<textarea name="title_uz" defaultValue={item.title_uz || ""} className="h-16 w-full rounded-lg border p-3" placeholder="Заголовок UZ" />
<textarea name="title_en" defaultValue={item.title_en || ""} className="h-16 w-full rounded-lg border p-3" placeholder="Заголовок EN" />

        <textarea name="text_ru" defaultValue={item.content_ru || item.text_ru || ""} className="h-36 w-full rounded-lg border p-3" placeholder="Текст RU" />
        <textarea name="text_uz" defaultValue={item.content_uz || item.text_uz || ""} className="h-36 w-full rounded-lg border p-3" placeholder="Текст UZ" />
        <textarea name="text_en" defaultValue={item.content_en || item.text_en || ""} className="h-36 w-full rounded-lg border p-3" placeholder="Текст EN" />

        <textarea name="category" defaultValue={item.category || ""} className="h-14 w-full rounded-lg border p-3" placeholder="Категория" />

        <button disabled={loading} className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white disabled:opacity-60">
          {loading ? "Сохраняется..." : "Сохранить изменения"}
        </button>

        {message && <p className="rounded-lg bg-slate-100 p-4 text-sm font-medium">{message}</p>}
      </div>
    </form>
  );
}