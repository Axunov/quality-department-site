import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { accreditationSections } from "@/lib/accreditation/config";
import IndicatorWorkspace from "@/components/accreditation/IndicatorWorkspace";
import AccreditationProgress from "@/components/accreditation/AccreditationProgress";

type Props = { params: Promise<{ locale: string; section: string }> };
type Locale = "ru" | "uz" | "en";

const common = {
  ru: { back: "Назад к аккредитации", status: "Статус", owner: "Ответственный", actions: "Действия", notStarted: "Не начато" },
  uz: { back: "Akkreditatsiyaga qaytish", status: "Holat", owner: "Mas’ul", actions: "Amallar", notStarted: "Boshlanmagan" },
  en: { back: "Back to accreditation", status: "Status", owner: "Owner", actions: "Actions", notStarted: "Not started" },
};

const sectionData = {
  institutional: {
    heading: "Готовность подразделений",
    rows: [
      ["Учебный отдел", "С. Хошимов"],
      ["Отдел кадров", "А. Усмонов"],
      ["Библиотека", "Д. Сайфуллаева"],
      ["Международный отдел", "А. Баходиров"],
      ["Отдел качества", "Ф. Рустамов"],
    ],
    blocks: [
      ["Дорожная карта", "Контроль ключевых этапов подготовки института к внешней оценке."],
      ["Сводный мониторинг", "Прогресс появляется только по фактически загруженным и проверенным материалам."],
      ["Журнал замечаний", "Все замечания и возвраты на доработку сохраняются в истории."],
    ],
  },
  "self-assessment": {
    heading: "Разделы отчёта по самооценке",
    rows: [
      ["1. Управление и стратегия", "Рабочая группа №1"],
      ["2. Обеспечение качества", "Отдел качества"],
      ["3. Образовательная деятельность", "Учебный отдел"],
      ["4. Кадровый потенциал", "Отдел кадров"],
      ["5. Наука и инновации", "Научный отдел"],
    ],
    blocks: [
      ["Редактор глав", "Подготовка текста отчёта, выводов, сильных сторон и зон улучшения."],
      ["Доказательная база", "Документы прикрепляются к конкретным индикаторам и выводам."],
      ["Внутренняя проверка", "Проверка текста, цифр и подтверждающих материалов."],
    ],
  },
  documents: {
    heading: "Категории документов",
    rows: [
      ["Законы и указы", "Юрисконсульт"],
      ["Постановления и приказы", "Секретариат"],
      ["ГОС и образовательные стандарты", "Учебный отдел"],
      ["Документы Агентства", "Отдел качества"],
      ["Внутренние положения", "Подразделения"],
    ],
    blocks: [
      ["Поиск", "По названию, номеру, дате, категории и ответственному подразделению."],
      ["Версионность", "Хранение текущей и предыдущих редакций документов."],
      ["Связь с индикаторами", "Один документ может подтверждать несколько индикаторов."],
    ],
  },
  "working-groups": {
    heading: "Рабочие группы",
    rows: [
      ["Стратегическое развитие", "К. Олимов"],
      ["Образовательная деятельность", "С. Хошимов"],
      ["Кадровый потенциал", "А. Усмонов"],
      ["Международное сотрудничество", "А. Баходиров"],
      ["Внутренняя система качества", "Ф. Рустамов"],
    ],
    blocks: [
      ["Состав группы", "Руководитель, участники и персональная ответственность."],
      ["Задачи и сроки", "Контроль дорожной карты и просроченных поручений."],
      ["Документы группы", "Материалы, протоколы и доказательства группы."],
    ],
  },
} as const;

export default async function AccreditationSectionPage({ params }: Props) {
  const { locale, section } = await params;
  const currentLocale: Locale = locale === "uz" || locale === "en" ? locale : "ru";
  const item = accreditationSections.find((entry) => entry.slug === section);
  if (!item) notFound();
  const t = common[currentLocale];

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/accreditation" className="text-sm font-semibold text-blue-700 hover:underline">← {t.back}</Link>

        <section className="mt-6 rounded-3xl bg-slate-950 p-8 text-white shadow-xl md:p-12">
          <div className="text-5xl">{item.icon}</div>
          <h1 className="mt-5 max-w-4xl text-3xl font-bold md:text-5xl">{item.title[currentLocale]}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{item.description[currentLocale]}</p>
        </section>

        <AccreditationProgress />

        {section === "indicators" ? (
          <IndicatorWorkspace />
        ) : (
          <>
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-slate-950">{sectionData[section as keyof typeof sectionData]?.heading}</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="border-b border-slate-200 text-sm text-slate-500">
                    <tr><th className="pb-3">Наименование</th><th className="pb-3">{t.owner}</th><th className="pb-3">Прогресс</th><th className="pb-3">{t.status}</th><th className="pb-3">{t.actions}</th></tr>
                  </thead>
                  <tbody>
                    {(sectionData[section as keyof typeof sectionData]?.rows || []).map(([name, owner]) => (
                      <tr key={name} className="border-b border-slate-100 last:border-0">
                        <td className="py-4 font-semibold text-slate-900">{name}</td>
                        <td className="py-4 text-slate-600">{owner}</td>
                        <td className="py-4 font-semibold text-slate-700">0%</td>
                        <td className="py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{t.notStarted}</span></td>
                        <td className="py-4"><span className="text-sm text-slate-400">—</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-3">
              {(sectionData[section as keyof typeof sectionData]?.blocks || []).map(([title, text]) => (
                <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-950">{title}</h2>
                  <p className="mt-3 text-slate-600">{text}</p>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
