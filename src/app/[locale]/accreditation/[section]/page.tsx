import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { accreditationSections } from "@/lib/accreditation/config";

type Props = { params: Promise<{ locale: string; section: string }> };
type Locale = "ru" | "uz" | "en";

const common = {
  ru: { back: "Назад к аккредитации", open: "Открыть", status: "Статус", owner: "Ответственный", deadline: "Срок", actions: "Действия" },
  uz: { back: "Akkreditatsiyaga qaytish", open: "Ochish", status: "Holat", owner: "Mas’ul", deadline: "Muddat", actions: "Amallar" },
  en: { back: "Back to accreditation", open: "Open", status: "Status", owner: "Owner", deadline: "Deadline", actions: "Actions" },
};

const sectionData = {
  institutional: {
    stats: [["Общая готовность", "81%"], ["Рабочие группы", "12"], ["Просрочено", "3"], ["На доработке", "4"]],
    heading: "Готовность подразделений",
    rows: [
      ["Учебный отдел", "С. Хошимов", "84%", "На проверке"],
      ["Отдел кадров", "А. Усмонов", "92%", "В работе"],
      ["Библиотека", "Д. Сайфуллаева", "100%", "Утверждено"],
      ["Международный отдел", "А. Баходиров", "61%", "На доработке"],
      ["Отдел качества", "Ф. Рустамов", "88%", "На проверке"],
    ],
    blocks: [
      ["Дорожная карта", "Контроль ключевых этапов подготовки института к внешней оценке."],
      ["Сводный мониторинг", "Прогресс подразделений, просроченные задачи и проблемные зоны."],
      ["Журнал замечаний", "Все замечания экспертов и внутренней проверки с контролем устранения."],
    ],
  },
  "self-assessment": {
    stats: [["Главы отчёта", "8"], ["Готово", "5"], ["На проверке", "2"], ["На доработке", "1"]],
    heading: "Разделы отчёта по самооценке",
    rows: [
      ["1. Управление и стратегия", "Рабочая группа №1", "100%", "Утверждено"],
      ["2. Обеспечение качества", "Отдел качества", "88%", "На проверке"],
      ["3. Образовательная деятельность", "Учебный отдел", "82%", "На проверке"],
      ["4. Кадровый потенциал", "Отдел кадров", "70%", "В работе"],
      ["5. Наука и инновации", "Научный отдел", "55%", "На доработке"],
    ],
    blocks: [
      ["Редактор глав", "Подготовка текста отчёта, выводов, сильных сторон и зон улучшения."],
      ["Доказательная база", "Привязка документов и ссылок к каждому выводу отчёта."],
      ["Внутренняя проверка", "Проверка согласованности текста, цифр и подтверждающих материалов."],
    ],
  },
  indicators: {
    stats: [["Всего индикаторов", "272"], ["Выполнено", "184"], ["На проверке", "46"], ["На доработке", "18"]],
    heading: "Индикаторы качества",
    rows: [
      ["2.1. Внутренняя система качества", "Отдел качества", "95%", "На проверке"],
      ["3.4. Образовательные программы", "Учебный отдел", "80%", "В работе"],
      ["5.2. Кадровый потенциал", "Отдел кадров", "92%", "Утверждено"],
      ["7.3. Международное сотрудничество", "Международный отдел", "60%", "На доработке"],
      ["9.1. Материально-техническая база", "Операционный блок", "74%", "В работе"],
    ],
    blocks: [
      ["Фильтры", "По главе, подразделению, ответственному, сроку и статусу."],
      ["Контроль исполнения", "Процент выполнения и автоматическое выявление просрочки."],
      ["Экспорт", "Выгрузка текущего состояния в Excel и аналитический отчёт."],
    ],
  },
  documents: {
    stats: [["Всего документов", "150+"], ["Нормативные", "38"], ["Внутренние", "74"], ["На проверке", "12"]],
    heading: "Категории документов",
    rows: [
      ["Законы и указы", "Юрисконсульт", "24 документа", "Актуально"],
      ["Постановления и приказы", "Секретариат", "31 документ", "Актуально"],
      ["ГОС и образовательные стандарты", "Учебный отдел", "19 документов", "На проверке"],
      ["Документы Агентства", "Отдел качества", "16 документов", "Актуально"],
      ["Внутренние положения", "Подразделения", "60 документов", "На доработке"],
    ],
    blocks: [
      ["Поиск", "По названию, номеру, дате, категории и ответственному подразделению."],
      ["Версионность", "Хранение актуальной и предыдущих редакций документов."],
      ["Связь с индикаторами", "Один документ может подтверждать несколько индикаторов."],
    ],
  },
  "working-groups": {
    stats: [["Рабочих групп", "12"], ["Задач", "96"], ["Выполнено", "71"], ["Просрочено", "6"]],
    heading: "Рабочие группы",
    rows: [
      ["Стратегическое развитие", "К. Олимов", "90%", "В работе"],
      ["Образовательная деятельность", "С. Хошимов", "84%", "На проверке"],
      ["Кадровый потенциал", "А. Усмонов", "92%", "Утверждено"],
      ["Международное сотрудничество", "А. Баходиров", "61%", "На доработке"],
      ["Внутренняя система качества", "Ф. Рустамов", "88%", "На проверке"],
    ],
    blocks: [
      ["Состав группы", "Руководитель, участники и распределение персональной ответственности."],
      ["Задачи и сроки", "Контроль дорожной карты и просроченных поручений."],
      ["Документы группы", "Все материалы, протоколы и доказательства в одном рабочем пространстве."],
    ],
  },
} as const;

export default async function AccreditationSectionPage({ params }: Props) {
  const { locale, section } = await params;
  const currentLocale: Locale = locale === "uz" || locale === "en" ? locale : "ru";
  const item = accreditationSections.find((entry) => entry.slug === section);
  const data = sectionData[section as keyof typeof sectionData];
  if (!item || !data) notFound();
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

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-slate-950">{value}</div>
              <div className="mt-1 text-sm text-slate-500">{label}</div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-950">{data.heading}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-slate-200 text-sm text-slate-500">
                <tr><th className="pb-3">Наименование</th><th className="pb-3">{t.owner}</th><th className="pb-3">Прогресс / объём</th><th className="pb-3">{t.status}</th><th className="pb-3">{t.actions}</th></tr>
              </thead>
              <tbody>
                {data.rows.map(([name, owner, progress, status]) => (
                  <tr key={name} className="border-b border-slate-100 last:border-0">
                    <td className="py-4 font-semibold text-slate-900">{name}</td>
                    <td className="py-4 text-slate-600">{owner}</td>
                    <td className="py-4 text-slate-700">{progress}</td>
                    <td className="py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{status}</span></td>
                    <td className="py-4"><button type="button" disabled className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 disabled:opacity-70">{t.open}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {data.blocks.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-slate-600">{text}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
