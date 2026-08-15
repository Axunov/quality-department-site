import { PageHeader } from "@/components/common/PageHeader";
import { NewsGallery } from "@/components/news/NewsGallery";
import { Link } from "@/i18n/routing";
import { getNewsBySlug } from "@/services/news.service";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import sanitizeHtml from "sanitize-html";

const labels = {
  ru: {
    news: "Новости",
    author: "Отдел контроля качества образования",
    notice:
      "Материал опубликован отделом контроля качества образования для информирования студентов, преподавателей, сотрудников института и заинтересованных сторон.",
    back: "← Назад к новостям",
    locale: "ru-RU",
  },
  uz: {
    news: "Yangiliklar",
    author: "Ta’lim sifatini nazorat qilish bo‘limi",
    notice:
      "Material talabalar, professor-o‘qituvchilar, institut xodimlari va manfaatdor tomonlarni xabardor qilish maqsadida e’lon qilindi.",
    back: "← Yangiliklarga qaytish",
    locale: "uz-UZ",
  },
  en: {
    news: "News",
    author: "Education Quality Control Department",
    notice:
      "This material was published to inform students, faculty, institute staff and other stakeholders.",
    back: "← Back to news",
    locale: "en-US",
  },
};

function getLabels(locale: string) {
  return labels[locale === "uz" || locale === "en" ? locale : "ru"];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};

  const title = getLocalizedText(locale, item.title_ru, item.title_uz, item.title_en);
  const description = sanitizeHtml(
    getLocalizedText(locale, item.text_ru, item.text_uz, item.text_en),
    { allowedTags: [], allowedAttributes: {} }
  ).slice(0, 180);

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: item.image_url ? [item.image_url] : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getLabels(locale);
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

  const safeText = sanitizeHtml(text, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
    ],
    allowedAttributes: { a: ["href", "title", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  });

  const images =
    item.gallery_urls?.length
      ? item.gallery_urls
      : item.image_url
      ? [item.image_url]
      : [];

  return (
    <main>
      <PageHeader
        label={item.category || t.news}
        title={title}
        description={`${new Date(item.created_at).toLocaleDateString(t.locale)} · ${
          item.author === "Admin" ? t.author : item.author || t.author
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
          dangerouslySetInnerHTML={{ __html: safeText }}
          />

          <p className="mt-6 leading-8 text-slate-700">
            {t.notice}
          </p>

          <div className="mt-10">
            <Link href="/news" className="btn-secondary">
              {t.back}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
