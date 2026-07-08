import { PageHeader } from "@/components/common/PageHeader";
import { NewsGallery } from "@/components/news/NewsGallery";
import { Link } from "@/i18n/routing";
import { getNewsBySlug } from "@/services/news.service";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  const title = getLocalizedText(
    locale,
    item.title_ru,
    item.title_uz,
    item.title_en
  );

  const text = getLocalizedText(
    locale,
    item.content_ru || item.text_ru,
    item.content_uz || item.text_uz,
    item.content_en || item.text_en
  );

  const images =
    item.gallery_urls?.length
      ? item.gallery_urls
      : item.image_url
      ? [item.image_url]
      : [];

  return (
    <main>
      <PageHeader
        label={item.category || "Новости"}
        title={title}
        description={`${new Date(item.created_at).toLocaleDateString("ru-RU")} · ${
          item.author || "Администратор"
        }`}
      />

      <section className="container-main py-16">
        <article className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
          {images.length > 0 ? (
            <NewsGallery title={title} images={images} />
          ) : (
            <div className="mb-8 flex h-72 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] text-7xl text-white">
              📰
            </div>
          )}

          <div
          className="prose max-w-none leading-8 text-slate-700"
          dangerouslySetInnerHTML={{ __html: text }}
          />

          <p className="mt-6 leading-8 text-slate-700">
            Данный материал опубликован отделом контроля качества образования и
            предназначен для информирования студентов, преподавателей,
            сотрудников института и заинтересованных сторон.
          </p>

          <div className="mt-10">
            <Link href="/news" className="btn-secondary">
              ← Назад к новостям
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}