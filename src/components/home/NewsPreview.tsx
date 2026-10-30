import { NewsCover } from "@/components/news/NewsCover";
import { NewsViews } from "@/components/news/NewsViews";
import { getLocale } from "next-intl/server";
import { surveyText } from "@/lib/surveyI18n";
import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

export async function NewsPreview({ locale }: { locale: string }) {
  const currentLocale = await getLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  const news = await getNews();
  const latestNews = news.slice(0, 3);

  return (
    <section className="container-main py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="soft-label">{tr("Новости")}</p>
          <h2 className="mt-4 section-title">{tr("Последние новости")}</h2>
        </div>

        <Link href="/news" className="btn-secondary">{tr("Все новости →")}</Link>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {latestNews.map((item) => {
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
              <Link href={`/news/${item.slug}`} aria-label={title}><NewsCover item={item} title={title} locale={locale} /></Link>

              <div className="p-6">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {tr(item.category || "Новости")}
                </span>

                <h3 className="mt-5 text-xl font-bold leading-7 text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  {new Date(item.created_at).toLocaleDateString(locale)}
                </p>

                <NewsViews id={item.id} count={item.view_count} locale={locale} />
                <Link
                  href={`/news/${item.slug}`}
                  className="mt-5 inline-block font-semibold text-blue-700"
                >{tr("Читать подробнее →")}</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}