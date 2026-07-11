"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";

const labels = {
  ru: {
    title: "Файловый менеджер",
    subtitle: "Загрузка и управление документами сайта",
    addTitle: "Добавить документ",
    titleRu: "Название на русском",
    titleUz: "Название на узбекском",
    titleEn: "Название на английском",
    descriptionRu: "Описание на русском",
    descriptionUz: "Описание на узбекском",
    descriptionEn: "Описание на английском",
    category: "Категория",
    file: "Основной файл",
    preview: "Обложка документа",
    save: "Сохранить документ",
    saving: "Сохранение...",
    search: "Поиск документов...",
    open: "Открыть",
    download: "Скачать",
    edit: "Редактировать",
    delete: "Удалить",
    deleteConfirm: "Удалить документ?",
    empty: "Документы пока не добавлены",
    defaultCategory: "Документы",
    requiredFile: "Выберите основной файл",
    requiredTitle: "Укажите название документа",
    uploadError: "Ошибка загрузки файла",
    previewUploadError: "Ошибка загрузки обложки",
    saveError: "Ошибка сохранения",
    saved: "Документ добавлен",
    deleteError: "Ошибка удаления",
  },
  uz: {
    title: "Fayl menejeri",
    subtitle: "Sayt hujjatlarini yuklash va boshqarish",
    addTitle: "Hujjat qo‘shish",
    titleRu: "Rus tilidagi nomi",
    titleUz: "O‘zbek tilidagi nomi",
    titleEn: "Ingliz tilidagi nomi",
    descriptionRu: "Rus tilidagi tavsif",
    descriptionUz: "O‘zbek tilidagi tavsif",
    descriptionEn: "Ingliz tilidagi tavsif",
    category: "Toifa",
    file: "Asosiy fayl",
    preview: "Hujjat muqovasi",
    save: "Hujjatni saqlash",
    saving: "Saqlanmoqda...",
    search: "Hujjatlarni qidirish...",
    open: "Ochish",
    download: "Yuklab olish",
    edit: "Tahrirlash",
    delete: "O‘chirish",
    deleteConfirm: "Hujjat o‘chirilsinmi?",
    empty: "Hozircha hujjatlar qo‘shilmagan",
    defaultCategory: "Hujjatlar",
    requiredFile: "Asosiy faylni tanlang",
    requiredTitle: "Hujjat nomini kiriting",
    uploadError: "Faylni yuklashda xato",
    previewUploadError: "Muqovani yuklashda xato",
    saveError: "Saqlashda xato",
    saved: "Hujjat qo‘shildi",
    deleteError: "O‘chirishda xato",
  },
  en: {
    title: "File Manager",
    subtitle: "Upload and manage website documents",
    addTitle: "Add document",
    titleRu: "Russian title",
    titleUz: "Uzbek title",
    titleEn: "English title",
    descriptionRu: "Russian description",
    descriptionUz: "Uzbek description",
    descriptionEn: "English description",
    category: "Category",
    file: "Main file",
    preview: "Document cover",
    save: "Save document",
    saving: "Saving...",
    search: "Search documents...",
    open: "Open",
    download: "Download",
    edit: "Edit",
    delete: "Delete",
    deleteConfirm: "Delete this document?",
    empty: "No documents have been added yet",
    defaultCategory: "Documents",
    requiredFile: "Choose the main file",
    requiredTitle: "Enter a document title",
    uploadError: "File upload error",
    previewUploadError: "Cover upload error",
    saveError: "Save error",
    saved: "Document added",
    deleteError: "Delete error",
  },
};

function formatFileSize(size?: number) {
  if (!size) return "—";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function getFileIcon(fileName?: string) {
  const ext = fileName?.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "📕";
  if (["doc", "docx"].includes(ext || "")) return "🟦";
  if (["xls", "xlsx"].includes(ext || "")) return "🟩";
  if (["ppt", "pptx"].includes(ext || "")) return "🟧";
  return "📄";
}

function extractStoragePath(publicUrl?: string, bucket?: string) {
  if (!publicUrl || !bucket) return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(publicUrl.slice(index + marker.length));
}

export default function DocumentsAdmin() {
  const locale = useLocale();
  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[currentLocale];

  const [documents, setDocuments] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function loadDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setDocuments(data || []);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return documents;

    return documents.filter((doc) =>
      [doc.title_ru, doc.title_uz, doc.title_en, doc.category, doc.file_name]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [documents, search]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const file = form.get("file") as File;
    const previewFile = form.get("preview") as File;
    const titleRu = String(form.get("title_ru") || "").trim();
    const titleUz = String(form.get("title_uz") || "").trim();
    const titleEn = String(form.get("title_en") || "").trim();

    if (!file || file.size === 0) {
      setMessage(t.requiredFile);
      setLoading(false);
      return;
    }

    if (!titleRu && !titleUz && !titleEn) {
      setMessage(t.requiredTitle);
      setLoading(false);
      return;
    }

    const stamp = `${Date.now()}-${crypto.randomUUID()}`;
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "file";
    const filePath = `${stamp}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file, { upsert: false });

    if (uploadError) {
      setMessage(`${t.uploadError}: ${uploadError.message}`);
      setLoading(false);
      return;
    }

    const { data: fileData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    let previewUrl = "";

    if (previewFile && previewFile.size > 0) {
      const previewExt =
        previewFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const previewPath = `${stamp}-preview.${previewExt}`;

      const { error: previewUploadError } = await supabase.storage
        .from("document-previews")
        .upload(previewPath, previewFile, { upsert: false });

      if (previewUploadError) {
        await supabase.storage.from("documents").remove([filePath]);
        setMessage(`${t.previewUploadError}: ${previewUploadError.message}`);
        setLoading(false);
        return;
      }

      const { data: previewData } = supabase.storage
        .from("document-previews")
        .getPublicUrl(previewPath);

      previewUrl = previewData.publicUrl;
    }

    const { error } = await supabase.from("documents").insert({
      title_ru: titleRu,
      title_uz: titleUz,
      title_en: titleEn,
      description_ru: String(form.get("description_ru") || "").trim(),
      description_uz: String(form.get("description_uz") || "").trim(),
      description_en: String(form.get("description_en") || "").trim(),
      category:
        String(form.get("category") || "").trim() || t.defaultCategory,
      file_url: fileData.publicUrl,
      file_name: file.name,
      file_type: file.type || fileExt,
      file_size: file.size,
      preview_url: previewUrl,
      published: true,
    });

    if (error) {
      await supabase.storage.from("documents").remove([filePath]);
      const previewPath = extractStoragePath(previewUrl, "document-previews");
      if (previewPath) {
        await supabase.storage.from("document-previews").remove([previewPath]);
      }

      setMessage(`${t.saveError}: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage(t.saved);
    formElement.reset();
    await loadDocuments();
    setLoading(false);
  }

  async function deleteDocument(doc: any) {
    if (!confirm(t.deleteConfirm)) return;

    setMessage("");

    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", doc.id);

    if (error) {
      setMessage(`${t.deleteError}: ${error.message}`);
      return;
    }

    const filePath = extractStoragePath(doc.file_url, "documents");
    const previewPath = extractStoragePath(doc.preview_url, "document-previews");

    if (filePath) {
      await supabase.storage.from("documents").remove([filePath]);
    }

    if (previewPath) {
      await supabase.storage.from("document-previews").remove([previewPath]);
    }

    await loadDocuments();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900">{t.title}</h1>
        <p className="mt-2 text-slate-500">{t.subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
      >
        <h2 className="text-2xl font-black text-slate-900">{t.addTitle}</h2>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <input name="title_ru" placeholder={t.titleRu} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <input name="title_uz" placeholder={t.titleUz} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <input name="title_en" placeholder={t.titleEn} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />

          <textarea name="description_ru" placeholder={t.descriptionRu} className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <textarea name="description_uz" placeholder={t.descriptionUz} className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          <textarea name="description_en" placeholder={t.descriptionEn} className="min-h-28 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">{t.category}</span>
            <input name="category" defaultValue={t.defaultCategory} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">{t.file}</span>
            <input name="file" type="file" required accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">{t.preview}</span>
            <input name="preview" type="file" accept="image/jpeg,image/png,image/webp" className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
          </label>
        </div>

        <button type="submit" disabled={loading} className="mt-7 rounded-xl bg-blue-700 px-7 py-3.5 font-bold text-white transition hover:bg-blue-800 disabled:opacity-60">
          {loading ? t.saving : t.save}
        </button>

        {message && (
          <p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">{message}</p>
        )}
      </form>

      <div className="mt-8">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.search} className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none focus:border-blue-500" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <article key={doc.id} className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
            <div className="flex h-56 items-center justify-center bg-slate-100 text-6xl">
              {doc.preview_url ? (
                <img src={doc.preview_url} alt={doc.title_ru || doc.file_name} className="h-full w-full object-contain p-3" />
              ) : (
                <span>{getFileIcon(doc.file_name)}</span>
              )}
            </div>

            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">{doc.category || t.defaultCategory}</p>
              <h3 className="mt-3 line-clamp-2 text-xl font-black text-slate-900">{doc.title_ru || doc.title_uz || doc.title_en}</h3>
              <p className="mt-3 break-all text-sm text-slate-500">{doc.file_name}</p>
              <p className="mt-1 text-sm text-slate-500">{formatFileSize(doc.file_size)}</p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href={doc.file_url} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-100 px-3 py-2.5 text-center text-sm font-bold text-slate-700">{t.open}</a>
                <a href={doc.file_url} download={doc.file_name || true} className="rounded-lg bg-blue-700 px-3 py-2.5 text-center text-sm font-bold text-white">{t.download}</a>
                <Link href={`/admin/documents/${doc.id}/edit`} className="rounded-lg bg-amber-500 px-3 py-2.5 text-center text-sm font-bold text-white">{t.edit}</Link>
                <button type="button" onClick={() => deleteDocument(doc)} className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-bold text-white">{t.delete}</button>
              </div>
            </div>
          </article>
        ))}

        {filteredDocuments.length === 0 && (
          <div className="col-span-full rounded-[26px] bg-white p-12 text-center text-slate-500 shadow-sm">{t.empty}</div>
        )}
      </div>
    </div>
  );
}