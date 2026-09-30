import { getLocale } from "next-intl/server";
import { surveyText } from "@/lib/surveyI18n";
import NewsEditForm from "@/components/admin/NewsEditForm";
import { getNewsBySlug } from "@/services/news.service";
import { notFound } from "next/navigation";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const currentLocale = await getLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="container-main py-16">
      <h1 className="text-4xl font-bold">{tr("Редактировать новость")}</h1>
      <NewsEditForm item={item} />
    </main>
  );
}