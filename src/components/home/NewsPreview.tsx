import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

export async function NewsPreview({ locale }: { locale: string }) {
  const news = await getNews();
  const latestNews = news.slice(0, 3);

  return (
    <section className="container-main py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="soft-label">Новости</p>
          <h2 className="mt-4 section-title">Последние новости</h2>
        </div>

        <Link href="/news" className="btn-secondary">
          Все новости →
        </Link>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {latestNews.map((item, index) => {
          const title = getLocalizedText(
            locale,
            item.title_ru,
            item.title_uz,
            item.title_en
          );

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              {item.image_url ? (
  <img
    src={item.image_url}
    alt={title}
    className="h-48 w-full object-cover"
  />
) : (
  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] text-5xl text-white">
    {index === 0 ? "📊" : index === 1 ? "🏛️" : "📝"}
  </div>
)}

              <div className="p-6">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {item.category || "Новости"}
                </span>

                <h3 className="mt-5 text-xl font-bold leading-7 text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  {new Date(item.created_at).toLocaleDateString("ru-RU")}
                </p>

                <Link
                  href={`/news/${item.slug}`}
                  className="mt-5 inline-block font-semibold text-blue-700"
                >
                  Читать подробнее →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}