import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { accreditationSections } from "@/lib/accreditation/config";
import IndicatorWorkspace from "@/components/accreditation/IndicatorWorkspace";

type Props = { params: Promise<{ locale: string; section: string }> };
type Locale = "ru" | "uz" | "en";

const sectionData = {
  institutional: {
    stats: [["Общая готовность", "0%"], ["Рабочие группы", "12"], ["Материалы на проверке", "0"], ["На доработке", "0"]],
    heading: "Готовность подразделений",
    rows: [
      ["Учебный отдел", "С. Хошимов"],
      ["Отдел кадров", "А. Усмонов"],
      ["Библиотека", "Д. Сайфуллаева"],
      ["Международный отдел", "А. Баходиров"],
      ["Отдел контроля качества образования", "Ф. Рустамов"],
    ],
  },
  "self-assessment": {
    stats: [["Главы отчёта", "0"], ["Готово", "0"], ["На проверке", "0"], ["На доработке", "0"]],
    heading: "Разделы отчёта по самооценке",
    rows: [
      ["1. Управление и стратегия", "Рабочая группа №1"],
      ["2. Обеспечение качества", "Отдел качества"],
      ["3. Образовательная деятельность", "Учебный отдел"],
      ["4. Кадровый потенциал", "Отдел кадров"],
      ["5. Наука и инновации", "Научный блок"],
    ],
  },
  indicators: {
    stats: [["Всего индикаторов", "272"], ["Выполнено", "0"], ["На проверке", "0"], ["На доработке", "0"]],
    heading: "Индикаторы качества",
    rows: [],
  },
  documents: {
    stats: [["Всего документов", "0"], ["Нормативные", "0"], ["Внутренние", "0"], ["На проверке", "0"]],
    heading: "Категории документов",
    rows: [
      ["Законы и указы", "Юрисконсульт"],
      ["Постановления и приказы", "Секретариат"],
      ["ГОС и образовательные стандарты", "Учебный отдел"],
      ["Документы Агентства", "Отдел качества"],
      ["Внутренние положения", "Подразделения"],
    ],
  },
  "working-groups": {
    stats: [["Рабочих групп", "12"], ["Задач", "0"], ["Выполнено", "0"], ["Просрочено", "0"]],
    heading: "Рабочие группы",
    rows: [
      ["Стратегическое развитие", "К. Олимов"],
      ["Образовательная деятельность", "С. Хошимов"],
      ["Кадровый потенциал", "А. Усмонов"],
      ["Международное сотрудничество", "А. Баходиров"],
      ["Внутренняя система качества", "Ф. Рустамов"],
    ],
  },
} as const;

export default async function AccreditationSectionPage({ params }: Props) {
  const { locale, section } = await params;
  const currentLocale: Locale = locale === "uz" || locale === "en" ? locale : "ru";
  const item = accreditationSections.find((entry) => entry.slug === section);
  const data = sectionData[section as keyof typeof sectionData];
  if (!item || !data) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/accreditation" className="text-sm font-semibold text-blue-700 hover:underline">← Назад к аккредитации</Link>

        <section className="mt-6 rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-12">
          <div className="text-5xl">{item.icon}</div>
          <h1 className="mt-5 max-w-4xl text-3xl font-bold md:text-5xl">{item.title[currentLocale]}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{item.description[currentLocale]}</p>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-slate-950">{value}</div>
              <div className="mt-1 text-sm text-slate-500">{label}</div>
            </article>
          ))}
        </section>

        {section === "indicators" ? (
          <IndicatorWorkspace />
        ) : (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-slate-950">{data.heading}</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead className="border-b border-slate-200 text-sm text-slate-500">
                  <tr><th className="pb-3">Наименование</th><th className="pb-3">Ответственный</th><th className="pb-3">Готовность</th><th className="pb-3">Статус</th></tr>
                </thead>
                <tbody>
                  {data.rows.map(([name, owner]) => (
                    <tr key={name} className="border-b border-slate-100 last:border-0">
                      <td className="py-4 font-semibold text-slate-900">{name}</td>
                      <td className="py-4 text-slate-600">{owner}</td>
                      <td className="py-4 text-slate-700">0%</td>
                      <td className="py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Не начато</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
