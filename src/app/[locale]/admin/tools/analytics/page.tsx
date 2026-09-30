import { useLocale } from "next-intl";
import { surveyText } from "@/lib/surveyI18n";
export default function AnalyticsPage() {
  const currentLocale = useLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900">{tr("Аналитика")}</h1>

      <p className="mt-2 text-slate-500">{tr("Аналитические показатели деятельности отдела.")}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">{tr("Мониторинги")}</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">{tr("Обращения")}</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">0</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">{tr("Отчёты")}</p>
          <p className="mt-3 text-4xl font-bold text-blue-700">0</p>
        </div>
      </div>
    </div>
  );
}