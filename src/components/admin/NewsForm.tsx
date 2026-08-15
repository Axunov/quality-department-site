"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import RichTextEditor from "@/components/admin/RichTextEditor";

function makeSlug(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[а-яё]/gi, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `news-${Date.now()}`
  );
}

export default function NewsForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    const titleRu = String(form.get("title_ru") || "");
    const titleUz = String(form.get("title_uz") || "");
    const titleEn = String(form.get("title_en") || "");

    const textRu = String(form.get("text_ru") || "");
    const textUz = String(form.get("text_uz") || "");
    const textEn = String(form.get("text_en") || "");

    const category = String(form.get("category") || "Новости");

    const files = form.getAll("images") as File[];

    let imageUrl = "";
    const galleryUrls: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("news")
        .upload(fileName, file);

      if (uploadError) {
        setMessage("Ошибка загрузки фото: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("news").getPublicUrl(fileName);
      galleryUrls.push(data.publicUrl);
    }

    imageUrl = galleryUrls[0] || "";

    const slug = makeSlug(titleEn || titleRu || titleUz);

    const { error } = await supabase.from("news").insert({
      slug,
      title_ru: titleRu,
      title_uz: titleUz,
      title_en: titleEn,
      text_ru: textRu,
      text_uz: textUz,
      text_en: textEn,
      content_ru: textRu,
      content_uz: textUz,
      content_en: textEn,
      category,
      author: "Admin",
      image_url: imageUrl,
      gallery_urls: galleryUrls,
      published: true,
    });

    if (error) {
      setMessage("Ошибка сохранения: " + error.message);
    } else {
      setMessage("Новость успешно опубликована!");
      (event.target as HTMLFormElement).reset();
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 max-w-5xl rounded-2xl bg-white p-8 shadow"
    >
      <h2 className="mb-6 text-2xl font-bold">Новая новость</h2>

      <div className="space-y-5">
        <input
          name="title_ru"
          className="w-full rounded-lg border p-3"
          placeholder="Заголовок RU"
        />

        <input
          name="title_uz"
          className="w-full rounded-lg border p-3"
          placeholder="Заголовок UZ"
        />

        <input
          name="title_en"
          className="w-full rounded-lg border p-3"
          placeholder="Заголовок EN"
        />

        <div>
         <p className="mb-2 font-semibold">Текст новости RU</p>
         <RichTextEditor name="text_ru" />
        </div>

        <div>
        <p className="mb-2 font-semibold">Текст новости UZ</p>
        <RichTextEditor name="text_uz" />
        </div>

        <div>
        <p className="mb-2 font-semibold">Текст новости EN</p>
        <RichTextEditor name="text_en" />
        </div>

        <input
          name="category"
          className="w-full rounded-lg border p-3"
          placeholder="Категория, например: Новости"
        />

        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="w-full rounded-lg border p-3"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Публикуется..." : "Опубликовать"}
        </button>

        {message && (
          <p className="rounded-lg bg-slate-100 p-4 text-sm font-medium">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}