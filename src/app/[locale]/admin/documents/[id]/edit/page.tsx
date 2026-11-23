"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { DocumentCoverField, useDocumentCover } from "@/components/admin/DocumentCoverField";
import { EditorialTranslation } from "@/components/admin/EditorialTranslation";
import { DocumentTextFields } from "@/components/admin/DocumentTextFields";
import { useDocumentTranslation } from "@/components/admin/useDocumentTranslation";

const labels = {
  ru: {
    title: "Редактирование документа",
    back: "Назад к документам",
    titleRu: "Название на русском",
    titleUz: "Название на узбекском",
    titleEn: "Название на английском",
    descriptionRu: "Описание на русском",
    descriptionUz: "Описание на узбекском",
    descriptionEn: "Описание на английском",
    category: "Категория",
    replaceFile: "Заменить основной файл",
    replacePreview: "Заменить обложку",
    currentFile: "Текущий файл",
    currentPreview: "Текущая обложка",
    published: "Опубликован",
    save: "Сохранить изменения",
    saving: "Сохранение...",
    loading: "Загрузка...",
    notFound: "Документ не найден",
    loadError: "Ошибка загрузки",
    uploadError: "Ошибка загрузки нового файла",
    previewUploadError: "Ошибка загрузки новой обложки",
    saveError: "Ошибка сохранения",
    saved: "Изменения сохранены",
  },
  uz: {
    title: "Hujjatni tahrirlaş",
    back: "Hujjatlarga qaytiş",
    titleRu: "Rus tilidagi nomi",
    titleUz: "Özbek tilidagi nomi",
    titleEn: "Ingliz tilidagi nomi",
    descriptionRu: "Rus tilidagi tavsif",
    descriptionUz: "Özbek tilidagi tavsif",
    descriptionEn: "Ingliz tilidagi tavsif",
    category: "Toifa",
    replaceFile: "Asosiy faylni almaştiriş",
    replacePreview: "Muqovani almaştiriş",
    currentFile: "Joriy fayl",
    currentPreview: "Joriy muqova",
    published: "E’lon qilingan",
    save: "Özgarişlarni saqlaş",
    saving: "Saqlanmoqda...",
    loading: "Yuklanmoqda...",
    notFound: "Hujjat topilmadi",
    loadError: "Yuklaşda xato",
    uploadError: "Yangi faylni yuklaşda xato",
    previewUploadError: "Yangi muqovani yuklaşda xato",
    saveError: "Saqlaşda xato",
    saved: "Özgarişlar saqlandi",
  },
  en: {
    title: "Edit document",
    back: "Back to documents",
    titleRu: "Russian title",
    titleUz: "Uzbek title",
    titleEn: "English title",
    descriptionRu: "Russian description",
    descriptionUz: "Uzbek description",
    descriptionEn: "English description",
    category: "Category",
    replaceFile: "Replace main file",
    replacePreview: "Replace cover",
    currentFile: "Current file",
    currentPreview: "Current cover",
    published: "Published",
    save: "Save changes",
    saving: "Saving...",
    loading: "Loading...",
    notFound: "Document not found",
    loadError: "Load error",
    uploadError: "New file upload error",
    previewUploadError: "New cover upload error",
    saveError: "Save error",
    saved: "Changes saved",
  },
};

function extractStoragePath(publicUrl?: string, bucket?: string) {
  if (!publicUrl || !bucket) return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(publicUrl.slice(index + marker.length));
}

export default function DocumentEditPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const locale = useLocale();
  const router = useRouter();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[currentLocale];
  const supabase = useMemo(() => createClient(), []);

  const [document, setDocument] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const translation = useDocumentTranslation(currentLocale, setMessage);
  const preview = useDocumentCover();

  useEffect(() => {
    async function loadDocument() {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setMessage(`${t.loadError}: ${error.message}`);
        setLoading(false);
        return;
      }

      setDocument(data);
      setLoading(false);
    }

    loadDocument();
  }, [id, t.loadError, supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!document || saving || translation.busy || preview.state === "busy") return;

    setSaving(true);
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const newFile = form.get("file") as File;
    const newPreview = preview.cover;

    const updates: Record<string, any> = {
      title_ru: String(form.get("title_ru") || "").trim(),
      title_uz: String(form.get("title_uz") || "").trim(),
      title_en: String(form.get("title_en") || "").trim(),
      description_ru: String(form.get("description_ru") || "").trim(),
      description_uz: String(form.get("description_uz") || "").trim(),
      description_en: String(form.get("description_en") || "").trim(),
      category: String(form.get("category") || "").trim(),
      published: form.get("published") === "on",
    };

    let uploadedFilePath: string | null = null;
    let uploadedPreviewPath: string | null = null;
    const stamp = `${Date.now()}-${crypto.randomUUID()}`;

    if (newFile && newFile.size > 0) {
      const ext = newFile.name.split(".").pop()?.toLowerCase() || "file";
      uploadedFilePath = `${stamp}.${ext}`;

      const { error } = await supabase.storage
        .from("documents")
        .upload(uploadedFilePath, newFile, { upsert: false });

      if (error) {
        setMessage(`${t.uploadError}: ${error.message}`);
        setSaving(false);
        return;
      }

      const { data } = supabase.storage.from("documents").getPublicUrl(uploadedFilePath);

      updates.file_url = data.publicUrl;
      updates.file_name = newFile.name;
      updates.file_type = newFile.type || ext;
      updates.preview_url = "";
      updates.file_size = newFile.size;
    }

    if (newPreview && newPreview.size > 0) {
      uploadedPreviewPath = `${stamp}-preview.jpg`;

      const { error } = await supabase.storage
        .from("document-previews")
        .upload(uploadedPreviewPath, newPreview, { upsert: false });

      if (error) {
        if (uploadedFilePath) {
          await supabase.storage.from("documents").remove([uploadedFilePath]);
        }
        setMessage(`${t.previewUploadError}: ${error.message}`);
        setSaving(false);
        return;
      }

      const { data } = supabase.storage.from("document-previews").getPublicUrl(uploadedPreviewPath);
      updates.preview_url = data.publicUrl;
    }

    const { error } = await supabase.from("documents").update(updates).eq("id", id);

    if (error) {
      if (uploadedFilePath) {
        await supabase.storage.from("documents").remove([uploadedFilePath]);
      }
      if (uploadedPreviewPath) {
        await supabase.storage.from("document-previews").remove([uploadedPreviewPath]);
      }

      setMessage(`${t.saveError}: ${error.message}`);
      setSaving(false);
      return;
    }

    if (uploadedFilePath) {
      const oldPath = extractStoragePath(document.file_url, "documents");
      if (oldPath) {
        await supabase.storage.from("documents").remove([oldPath]);
      }
    }

    if (uploadedFilePath) {
      const oldPreviewPath = extractStoragePath(document.preview_url, "document-previews");
      if (oldPreviewPath) {
        await supabase.storage.from("document-previews").remove([oldPreviewPath]);
      }
    }

    if (uploadedFilePath) {
      const input = formElement.elements.namedItem("file");
      if (input instanceof HTMLInputElement) input.value = "";
      void preview.select();
    }
    setMessage(t.saved);
    setSaving(false);

    const { data: refreshed } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (refreshed) setDocument(refreshed);
    router.refresh();
  }

  if (loading) return <div className="p-8 text-slate-500">{t.loading}</div>;
  if (!document) return <div className="p-8 text-red-600">{t.notFound}</div>;

  return (
    <div>
      <Link href="/admin/documents" className="inline-flex items-center font-bold text-blue-700">
        ← {t.back}
      </Link>

      <h1 className="mt-6 text-4xl font-black text-slate-900">{t.title}</h1>

      <form onSubmit={handleSubmit} className="mt-8 rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
        <fieldset disabled={saving || translation.busy} className="min-w-0">
        <EditorialTranslation locale={currentLocale} {...translation} />
        <DocumentTextFields source={translation.source} document={document} />

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">{t.category}</span>
            <input name="category" defaultValue={document.category || ""} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">{t.replaceFile}</span>
            <input name="file" type="file" onChange={e => void preview.select(e.currentTarget.files?.[0])} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" />
            <a href={document.file_url} target="_blank" rel="noreferrer" className="mt-2 block break-all text-sm font-semibold text-blue-700">
              {t.currentFile}: {document.file_name}
            </a>
          </label>

          <div>
            <DocumentCoverField locale={currentLocale} {...preview} />
            {preview.state === "idle" && document.preview_url && <img src={document.preview_url} alt={t.currentPreview} className="mt-3 h-28 w-full rounded-xl bg-slate-100 object-contain p-2" />}
          </div>
        </div>

        <label className="mt-6 flex items-center gap-3">
          <input name="published" type="checkbox" defaultChecked={document.published !== false} className="h-5 w-5" />
          <span className="font-bold text-slate-700">{t.published}</span>
        </label>

        <button type="submit" disabled={saving || translation.busy || preview.state === "busy"} className="mt-7 rounded-xl bg-blue-700 px-7 py-3.5 font-bold text-white transition hover:bg-blue-800 disabled:opacity-60">
          {saving ? t.saving : t.save}
        </button>

        </fieldset>
        {message && (
          <p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">{message}</p>
        )}
      </form>
    </div>
  );
}