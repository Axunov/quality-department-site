import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const news = await getNews();

  return (
    <main>
      <PageHeader
        label="Новости"
        title="Новости"
        description="Последние новости и объявления института"
      />

      <section className="container-main py-16">
        <div className="grid gap-7 md:grid-cols-3">
          {news.map((item: any) => {
            const title = getLocalizedText(
              locale,
              item.title_ru,
              item.title_uz,
              item.title_en
            );

            const text = getLocalizedText(
              locale,
              item.text_ru,
              item.text_uz,
              item.text_en
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
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] text-5xl text-white">
                    📰
                  </div>
                )}

                <div className="p-6">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {item.category || "Новости"}
                  </span>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {text}
                  </p>

                  <p className="mt-4 text-xs text-slate-500">
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
    </main>
  );
}