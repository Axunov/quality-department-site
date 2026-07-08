"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
    if (!confirm("Удалить документ?")) return;

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
        <h1 className="text-4xl font-bold text-slate-900">Файловый менеджер</h1>
        <p className="mt-2 text-slate-500">
          Загрузка и управление документами сайта
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900">Добавить документ</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input name="title_ru" className="rounded-xl border p-3" placeholder="Название RU" />
          <input name="title_uz" className="rounded-xl border p-3" placeholder="Название UZ" />
          <input name="title_en" className="rounded-xl border p-3" placeholder="Название EN" />
          <input name="category" className="rounded-xl border p-3" placeholder="Категория" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input name="description_ru" className="rounded-xl border p-3" placeholder="Описание RU" />
          <input name="description_uz" className="rounded-xl border p-3" placeholder="Описание UZ" />
          <input name="description_en" className="rounded-xl border p-3" placeholder="Описание EN" />
        </div>

        <p className="mt-5 font-semibold text-slate-700">Файл документа</p>
        <input
          name="file"
          type="file"
          className="mt-2 w-full rounded-xl border p-3"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        />

        <p className="mt-5 font-semibold text-slate-700">
          Обложка / титульная страница
        </p>
        <input
          name="preview"
          type="file"
          className="mt-2 w-full rounded-xl border p-3"
          accept="image/*"
        />

        <button
          disabled={loading}
          className="mt-4 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Загружается..." : "+ Добавить документ"}
        </button>

        {message && <p className="mt-4 rounded-lg bg-slate-100 p-3">{message}</p>}
      </form>

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
                {doc.category || "Документы"}
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
                  👁 Открыть
                </a>

                <a
                  href={doc.file_url}
                  download
                  className="flex-1 rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  ⬇ Скачать
                </a>

                <button
                  type="button"
                  onClick={() => deleteDocument(doc.id)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}