import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function NewsPreview() {
  const t = useTranslations("NewsPreview");
  const news = t.raw("items") as string[];

  return (
    <section className="container-main py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="soft-label">Новости</p>
          <h2 className="mt-4 section-title">{t("title")}</h2>
        </div>

        <Link href="/news" className="btn-secondary">
          Все новости →
        </Link>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {news.map((item, index) => (
          <article
            key={item}
            className="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] text-5xl text-white">
              {index === 0 ? "📊" : index === 1 ? "🏛️" : "📝"}
            </div>

            <div className="p-6">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {index === 0 ? "Мониторинг" : index === 1 ? "Аккредитация" : "Опросы"}
              </span>

              <h3 className="mt-5 text-xl font-bold leading-7 text-slate-900">
                {item}
              </h3>

              <p className="mt-3 text-sm text-slate-500">{t("date")}</p>

              <Link href="/news" className="mt-5 inline-block font-semibold text-blue-700">
                Читать подробнее →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}