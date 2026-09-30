import { useLocale } from "next-intl";
import { surveyText } from "@/lib/surveyI18n";
export default function MonitoringPage() {
  const currentLocale = useLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900">{tr("Мониторинг")}</h1>

      <p className="mt-2 text-slate-500">{tr("Проведение мониторинга качества образования и размещение результатов.")}</p>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow">
        <p className="text-slate-600">{tr("Здесь будут формы мониторинга, результаты проверок и публикация материалов.")}</p>
      </div>
    </div>
  );
}