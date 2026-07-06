import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function DocumentsPreview() {
  const t = useTranslations("DocumentsPreview");
  const docs = t.raw("items") as string[];

  return (
    <section className="py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="soft-label">Документы</p>
          <h2 className="mt-4 section-title">{t("title")}</h2>
        </div>

        <Link href="/documents" className="btn-secondary">
          Все документы →
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {docs.map((doc, index) => (
          <div
            key={doc}
            className="rounded-[28px] bg-white p-7 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
              {index === 0 ? "📕" : index === 1 ? "📘" : "📄"}
            </div>

            <h3 className="mt-6 text-xl font-bold leading-7 text-slate-900">
              {doc}
            </h3>

            <p className="mt-4 text-sm text-slate-500">
              PDF / DOCX · 2026
            </p>

            <button className="mt-6 rounded-xl bg-[#0b3b78] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800">
              {t("download")}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}