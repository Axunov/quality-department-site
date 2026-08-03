"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Indicator = {
  id: string;
  code: string;
  title: string;
  responsible_name: string | null;
  completion_percent: number;
  status: "draft" | "in_progress" | "review" | "revision" | "approved";
  deadline: string | null;
};

type DocumentRow = {
  id: string;
  indicator_id: string;
  file_name: string;
  storage_path: string;
  version: number;
  status: Indicator["status"];
  created_at: string;
};

const statusText: Record<Indicator["status"], string> = {
  draft: "Не начато",
  in_progress: "В работе",
  review: "На проверке",
  revision: "На доработке",
  approved: "Принято",
};

const statusClass: Record<Indicator["status"], string> = {
  draft: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-50 text-blue-700",
  review: "bg-amber-50 text-amber-800",
  revision: "bg-red-50 text-red-700",
  approved: "bg-emerald-50 text-emerald-700",
};

export default function IndicatorWorkspace() {
  const supabase = useMemo(() => createClient(), []);
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});

  async function loadData() {
    setLoading(true);
    const [{ data: indicatorData, error: indicatorError }, { data: documentData, error: documentError }] =
      await Promise.all([
        supabase
          .from("accreditation_indicators")
          .select("id,code,title,responsible_name,completion_percent,status,deadline")
          .order("code"),
        supabase
          .from("accreditation_documents")
          .select("id,indicator_id,file_name,storage_path,version,status,created_at")
          .order("created_at", { ascending: false }),
      ]);

    if (indicatorError || documentError) {
      setMessage(indicatorError?.message || documentError?.message || "Ошибка загрузки данных");
    } else {
      setIndicators((indicatorData || []) as Indicator[]);
      setDocuments((documentData || []) as DocumentRow[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function uploadFile(indicator: Indicator, file: File) {
    setBusyId(indicator.id);
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setMessage("Для загрузки материала необходимо войти в систему.");
      setBusyId(null);
      return;
    }

    const existingVersions = documents
      .filter((document) => document.indicator_id === indicator.id)
      .map((document) => document.version);
    const version = existingVersions.length ? Math.max(...existingVersions) + 1 : 1;
    const safeName = file.name.replace(/[^a-zA-Z0-9а-яА-ЯёЁ._-]+/g, "-");
    const storagePath = `${indicator.id}/v${version}-${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("accreditation-evidence")
      .upload(storagePath, file, { upsert: false });

    if (uploadError) {
      setMessage(`Ошибка загрузки: ${uploadError.message}`);
      setBusyId(null);
      return;
    }

    const { error: insertError } = await supabase.from("accreditation_documents").insert({
      indicator_id: indicator.id,
      uploaded_by: user.id,
      file_name: file.name,
      storage_path: storagePath,
      mime_type: file.type || null,
      file_size: file.size,
      version,
      status: "in_progress",
    });

    if (insertError) {
      setMessage(`Файл загружен, но запись не сохранена: ${insertError.message}`);
      setBusyId(null);
      return;
    }

    await supabase
      .from("accreditation_indicators")
      .update({ status: "in_progress", completion_percent: 25 })
      .eq("id", indicator.id);

    setMessage(`Файл «${file.name}» прикреплён к индикатору ${indicator.code}.`);
    await loadData();
    setBusyId(null);
  }

  async function submitForReview(indicator: Indicator) {
    const hasFile = documents.some((document) => document.indicator_id === indicator.id);
    if (!hasFile) {
      setMessage("Сначала загрузите файл-ответ по этому индикатору.");
      return;
    }

    setBusyId(indicator.id);
    const { error } = await supabase
      .from("accreditation_indicators")
      .update({ status: "review", completion_percent: 75, submitted_at: new Date().toISOString() })
      .eq("id", indicator.id);

    setMessage(error ? error.message : `Индикатор ${indicator.code} отправлен на проверку.`);
    await loadData();
    setBusyId(null);
  }

  async function review(indicator: Indicator, decision: "revision" | "approved") {
    const comment = comments[indicator.id]?.trim() || "Без дополнительного комментария";
    setBusyId(indicator.id);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      setMessage("Для проверки необходимо войти в систему.");
      setBusyId(null);
      return;
    }

    const { error: reviewError } = await supabase.from("accreditation_reviews").insert({
      indicator_id: indicator.id,
      reviewer_id: user.id,
      decision,
      comment,
    });

    if (reviewError) {
      setMessage(reviewError.message);
      setBusyId(null);
      return;
    }

    const { error: updateError } = await supabase
      .from("accreditation_indicators")
      .update({
        status: decision,
        completion_percent: decision === "approved" ? 100 : 50,
        approved_at: decision === "approved" ? new Date().toISOString() : null,
      })
      .eq("id", indicator.id);

    setMessage(
      updateError
        ? updateError.message
        : decision === "approved"
          ? `Индикатор ${indicator.code} принят.`
          : `Индикатор ${indicator.code} возвращён на доработку.`
    );
    await loadData();
    setBusyId(null);
  }

  async function openDocument(document: DocumentRow) {
    const { data, error } = await supabase.storage
      .from("accreditation-evidence")
      .createSignedUrl(document.storage_path, 300);

    if (error || !data?.signedUrl) {
      setMessage(error?.message || "Не удалось открыть документ.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (loading) {
    return <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">Загрузка индикаторов...</div>;
  }

  return (
    <section className="mt-8 space-y-5">
      {message && <div className="rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">{message}</div>}

      {indicators.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">Индикаторы пока не загружены</h2>
          <p className="mt-2 text-slate-600">После импорта все индикаторы появятся здесь со статусом «Не начато» и прогрессом 0%.</p>
        </div>
      )}

      {indicators.map((indicator) => {
        const indicatorDocuments = documents.filter((document) => document.indicator_id === indicator.id);
        return (
          <article key={indicator.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-lg bg-slate-950 px-3 py-1 text-sm font-bold text-white">{indicator.code}</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass[indicator.status]}`}>
                    {statusText[indicator.status]}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-slate-950">{indicator.title}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Ответственный: {indicator.responsible_name || "не назначен"}
                  {indicator.deadline ? ` · Срок: ${indicator.deadline}` : ""}
                </p>
              </div>

              <div className="min-w-44">
                <div className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>Готовность</span><span>{indicator.completion_percent}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-700" style={{ width: `${indicator.completion_percent}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
                  {busyId === indicator.id ? "Обработка..." : "Загрузить файл-ответ"}
                  <input
                    type="file"
                    className="hidden"
                    disabled={busyId === indicator.id}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void uploadFile(indicator, file);
                      event.currentTarget.value = "";
                    }}
                  />
                </label>

                <button
                  type="button"
                  disabled={busyId === indicator.id || indicator.status === "approved"}
                  onClick={() => void submitForReview(indicator)}
                  className="rounded-xl bg-amber-100 px-4 py-2.5 text-sm font-semibold text-amber-900 disabled:opacity-50"
                >
                  Отправить на проверку
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {indicatorDocuments.length === 0 ? (
                  <p className="text-sm text-slate-500">Файл-ответ ещё не загружен.</p>
                ) : (
                  indicatorDocuments.map((document) => (
                    <div key={document.id} className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{document.file_name}</div>
                        <div className="text-xs text-slate-500">Версия {document.version} · {new Date(document.created_at).toLocaleString("ru-RU")}</div>
                      </div>
                      <button type="button" onClick={() => void openDocument(document)} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                        Открыть
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {indicator.status === "review" && (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <label className="block text-sm font-semibold text-amber-950">Комментарий проверяющего</label>
                <textarea
                  rows={3}
                  value={comments[indicator.id] || ""}
                  onChange={(event) => setComments((current) => ({ ...current, [indicator.id]: event.target.value }))}
                  placeholder="Укажите замечание или основание для принятия"
                  className="mt-2 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 outline-none focus:border-amber-500"
                />
                <div className="mt-3 flex flex-wrap gap-3">
                  <button type="button" disabled={busyId === indicator.id} onClick={() => void review(indicator, "approved")} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
                    Принять
                  </button>
                  <button type="button" disabled={busyId === indicator.id} onClick={() => void review(indicator, "revision")} className="rounded-xl bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-700 disabled:opacity-50">
                    Отправить на доработку
                  </button>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
