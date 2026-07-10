"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLocale } from "next-intl";

const labels = {
  ru: {
    title: "Файловый менеджер",
    subtitle: "Загрузка и управление документами сайта",
    add: "Добавить документ",
    chooseFile: "Выбрать и добавить документ",
    loading: "Загружается...",
    open: "Открыть",
    download: "Скачать",
    deleteConfirm: "Удалить документ?",
    empty: "Документы пока не добавлены",
    defaultCategory: "Документы",
  },
  uz: {
    title: "Fayl menejeri",
    subtitle: "Sayt hujjatlarini yuklash va boshqarish",
    add: "Hujjat qo‘shish",
    chooseFile: "Hujjatni tanlash va qo‘shish",
    loading: "Yuklanmoqda...",
    open: "Ochish",
    download: "Yuklab olish",
    deleteConfirm: "Hujjat o‘chirilsinmi?",
    empty: "Hozircha hujjatlar qo‘shilmagan",
    defaultCategory: "Hujjatlar",
  },
  en: {
    title: "File Manager",
    subtitle: "Upload and manage website documents",
    add: "Add document",
    chooseFile: "Choose and add document",
    loading: "Uploading...",
    open: "Open",
    download: "Download",
    deleteConfirm: "Delete this document?",
    empty: "No documents have been added yet",
    defaultCategory: "Documents",
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

export default function DocumentsAdmin() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const locale = useLocale();

const currentLocale: "ru" | "uz" | "en" =
  locale === "uz" || locale === "en" ? locale : "ru";

const t = labels[currentLocale];

  async function loadDocuments() {
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false });

    setDocuments(data || []);
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const file = form.get("file") as File;
    const previewFile = form.get("preview") as File;

    if (!file || file.size === 0) {
      setMessage("Выберите файл");
      setLoading(false);
      return;
    }

    const fileExt = file.name.split(".").pop() || "file";
    const fileName = `${Date.now()}-document.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    if (uploadError) {
      setMessage("Ошибка загрузки файла: " + uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from("documents").getPublicUrl(fileName);

    let previewUrl = "";

    if (previewFile && previewFile.size > 0) {
      const previewExt = previewFile.name.split(".").pop() || "jpg";
      const previewName = `${Date.now()}-preview.${previewExt}`;

      const { error: previewUploadError } = await supabase.storage
        .from("document-previews")
        .upload(previewName, previewFile);

      if (previewUploadError) {
        setMessage("Ошибка загрузки обложки: " + previewUploadError.message);
        setLoading(false);
        return;
      }

      const { data: previewData } = supabase.storage
        .from("document-previews")
        .getPublicUrl(previewName);

      previewUrl = previewData.publicUrl;
    }

    const { error } = await supabase.from("documents").insert({
      title_ru: String(form.get("title_ru") || ""),
      title_uz: String(form.get("title_uz") || ""),
      title_en: String(form.get("title_en") || ""),
      description_ru: String(form.get("description_ru") || ""),
      description_uz: String(form.get("description_uz") || ""),
      description_en: String(form.get("description_en") || ""),
      category: String(form.get("category") || "Документы"),
      file_url: data.publicUrl,
      file_name: file.name,
      file_type: file.type || fileExt,
      file_size: file.size,
      preview_url: previewUrl,
      published: true,
    });

    if (error) {
      setMessage("Ошибка сохранения: " + error.message);
      setLoading(false);
      return;
    }

    setMessage("Документ добавлен!");
    (event.target as HTMLFormElement).reset();
    setLoading(false);
    loadDocuments();
  }

  async function deleteDocument(id: string) {
    if (!confirm(t.deleteConfirm)) return;

    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) {
      alert("Ошибка удаления: " + error.message);
      return;
    }

    loadDocuments();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">{t.title}</h1>
        <p className="mt-2 text-slate-500">{t.subtitle}</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
  <h2 className="text-2xl font-bold text-slate-900">{t.add}</h2>

  <div className="mt-5 flex flex-wrap gap-3">
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        try {
          const picker = (window as any).showOpenFilePicker;

          if (!picker) {
            setMessage(
              currentLocale === "uz"
                ? "Brauzer fayl tanlash funksiyasini qo‘llab-quvvatlamaydi."
                : currentLocale === "en"
                  ? "This browser does not support the file picker."
                  : "Браузер не поддерживает системный выбор файла."
            );
            return;
          }

          const [fileHandle] = await picker({
            multiple: false,
            types: [
              {
                description: "Documents",
                accept: {
                  "application/pdf": [".pdf"],
                  "application/msword": [".doc"],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                  "application/vnd.ms-excel": [".xls"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                  "application/vnd.ms-powerpoint": [".ppt"],
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
                },
              },
            ],
          });

          const file = await fileHandle.getFile();

          const titleRu = prompt("Название RU") || file.name;
          const titleUz = prompt("Nomi UZ") || titleRu;
          const titleEn = prompt("Title EN") || titleRu;
          const category =
            prompt(
              currentLocale === "uz"
                ? "Toifa"
                : currentLocale === "en"
                  ? "Category"
                  : "Категория"
            ) || t.defaultCategory;

          const descriptionRu = prompt("Описание RU") || "";
          const descriptionUz = prompt("Tavsif UZ") || descriptionRu;
          const descriptionEn = prompt("Description EN") || descriptionRu;

          setLoading(true);
          setMessage("");

          const fileExt = file.name.split(".").pop()?.toLowerCase() || "file";
          const fileName = `${Date.now()}-document.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("documents")
            .upload(fileName, file);

          if (uploadError) {
            setMessage("Ошибка загрузки файла: " + uploadError.message);
            setLoading(false);
            return;
          }

          const { data: fileData } = supabase.storage
            .from("documents")
            .getPublicUrl(fileName);

          const { error } = await supabase.from("documents").insert({
            title_ru: titleRu,
            title_uz: titleUz,
            title_en: titleEn,
            description_ru: descriptionRu,
            description_uz: descriptionUz,
            description_en: descriptionEn,
            category,
            file_url: fileData.publicUrl,
            file_name: file.name,
            file_type: file.type || fileExt,
            file_size: file.size,
            preview_url: "",
            published: true,
          });

          if (error) {
            setMessage("Ошибка сохранения: " + error.message);
          } else {
            setMessage(
              currentLocale === "uz"
                ? "Hujjat qo‘shildi!"
                : currentLocale === "en"
                  ? "Document added!"
                  : "Документ добавлен!"
            );
            await loadDocuments();
          }

          setLoading(false);
        } catch (error: any) {
          setLoading(false);

          if (error?.name !== "AbortError") {
            setMessage(error?.message || "Не удалось выбрать файл");
          }
        }
      }}
      className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white disabled:opacity-60"
    >
      {loading ? t.loading : `+ ${t.chooseFile}`}
    </button>

    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        try {
          const picker = (window as any).showOpenFilePicker;

          if (!picker) {
            setMessage("Браузер не поддерживает системный выбор файла.");
            return;
          }

          const [previewHandle] = await picker({
            multiple: false,
            types: [
              {
                description: "Images",
                accept: {
                  "image/*": [".jpg", ".jpeg", ".png", ".webp"],
                },
              },
            ],
          });

          const previewFile = await previewHandle.getFile();

          const documentId = prompt(
            currentLocale === "uz"
              ? "Hujjat ID sini kiriting"
              : currentLocale === "en"
                ? "Enter document ID"
                : "Введите ID документа"
          );

          if (!documentId) return;

          setLoading(true);
          setMessage("");

          const previewExt =
            previewFile.name.split(".").pop()?.toLowerCase() || "jpg";
          const previewName = `${Date.now()}-preview.${previewExt}`;

          const { error: previewUploadError } = await supabase.storage
            .from("document-previews")
            .upload(previewName, previewFile);

          if (previewUploadError) {
            setMessage(
              "Ошибка загрузки обложки: " + previewUploadError.message
            );
            setLoading(false);
            return;
          }

          const { data: previewData } = supabase.storage
            .from("document-previews")
            .getPublicUrl(previewName);

          const { error } = await supabase
            .from("documents")
            .update({ preview_url: previewData.publicUrl })
            .eq("id", documentId);

          if (error) {
            setMessage("Ошибка сохранения обложки: " + error.message);
          } else {
            setMessage(
              currentLocale === "uz"
                ? "Muqova qo‘shildi!"
                : currentLocale === "en"
                  ? "Cover added!"
                  : "Обложка добавлена!"
            );
            await loadDocuments();
          }

          setLoading(false);
        } catch (error: any) {
          setLoading(false);

          if (error?.name !== "AbortError") {
            setMessage(error?.message || "Не удалось выбрать обложку");
          }
        }
      }}
      className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white disabled:opacity-60"
    >
      🖼️ {currentLocale === "uz"
        ? "Muqova qo‘shish"
        : currentLocale === "en"
          ? "Add cover"
          : "Добавить обложку"}
    </button>
  </div>

  {message && (
    <p className="mt-4 rounded-lg bg-slate-100 p-3">{message}</p>
  )}
</div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {documents.map((doc) => (
          <div key={doc.id} className="overflow-hidden rounded-2xl bg-white shadow">
            <div className="flex h-48 items-center justify-center bg-slate-100 text-6xl">
              {doc.preview_url ? (
                <img
                  src={doc.preview_url}
                  alt={doc.title_ru}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{getFileIcon(doc.file_name)}</span>
              )}
            </div>

            <div className="p-5">
              <p className="text-xs font-bold uppercase text-blue-700">
                {doc.category || t.defaultCategory}
              </p>

              <h3 className="mt-3 line-clamp-2 text-lg font-bold text-slate-900">
                {doc.title_ru}
              </h3>

              <p className="mt-2 text-sm text-slate-500">{doc.file_name}</p>
              <p className="mt-1 text-sm text-slate-500">
                {formatFileSize(doc.file_size)}
              </p>

              <div className="mt-5 flex gap-2">
                <a
                  href={doc.file_url}
                  target="_blank"
                  className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-700"
                >
                  👁 {t.open}
                </a>

                <a
                  href={doc.file_url}
                  download
                  className="flex-1 rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white"
                >
                 ⬇ {t.download}
                </a>

                <button
                  type="button"
                  onClick={() => deleteDocument(doc.id)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  🗑
                </button>
                {documents.length === 0 && (
                  <div className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500 shadow">
                 {t.empty}
                 </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}