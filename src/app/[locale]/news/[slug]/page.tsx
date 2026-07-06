import { PageHeader } from "@/components/common/PageHeader";
import { news } from "@/data/news";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = news.find((newsItem) => newsItem.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        label={item.category}
        title={item.title}
        description={`${item.date} · ${item.author}`}
      />

      <section className="container-main py-16">
        <article className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
          <div className="mb-8 flex h-72 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] text-7xl text-white">
            📰
          </div>

          <p className="leading-8 text-slate-700">{item.text}</p>

          <p className="mt-6 leading-8 text-slate-700">
            Данный материал опубликован отделом контроля качества образования и
            предназначен для информирования студентов, преподавателей, сотрудников
            института и заинтересованных сторон.
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
