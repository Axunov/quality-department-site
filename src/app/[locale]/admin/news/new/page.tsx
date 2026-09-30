import { useLocale } from "next-intl";
import { surveyText } from "@/lib/surveyI18n";
import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  const currentLocale = useLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  return (
    <main className="container-main py-16">
      <h1 className="text-4xl font-bold">{tr("Добавить новость")}</h1>
      <NewsForm />
    </main>
  );
}