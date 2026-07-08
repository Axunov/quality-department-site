import { PageHeader } from "@/components/common/PageHeader";
import { getDocuments } from "@/services/documents.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

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

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const documents = await getDocuments();

  return (
    <main>
      <PageHeader
        label="Документы"
        title="Документы"
        description="Нормативные документы, положения и материалы отдела"
      />

      <section className="container-main py-16">
        <div className="grid gap-7 md:grid-cols-3">
          {documents.map((doc: any) => {
            const title = getLocalizedText(
              locale,
              doc.title_ru,
              doc.title_uz,
              doc.title_en
            );

            const description = getLocalizedText(
              locale,
              doc.description_ru,
              doc.description_uz,
              doc.description_en
            );

            return (
              <article
                key={doc.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex h-56 items-center justify-center bg-slate-100 text-6xl">
                  {doc.preview_url ? (
                    <img
                      src={doc.preview_url}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{getFileIcon(doc.file_name)}</span>
                  )}
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {doc.category || "Документы"}
                  </span>

                  <h2 className="mt-5 line-clamp-2 text-xl font-bold text-slate-900">
                    {title}
                  </h2>

                  {description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {description}
                    </p>
                  )}

                  <p className="mt-4 text-sm text-slate-500">
                    {doc.file_name} · {formatFileSize(doc.file_size)}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-center font-semibold text-slate-700"
                    >
                      👁 Открыть
                    </a>

                    <a
                      href={doc.file_url}
                      download
                      className="flex-1 rounded-xl bg-blue-700 px-4 py-3 text-center font-semibold text-white"
                    >
                      ⬇ Скачать
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}