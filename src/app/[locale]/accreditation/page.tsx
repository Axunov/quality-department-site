import { Link } from "@/i18n/routing";
import { accreditationSections } from "@/lib/accreditation/config";
import AccreditationProgress from "@/components/accreditation/AccreditationProgress";

type Props = {
  params: Promise<{ locale: string }>;
};

const departments = [
  { name: "Учебный отдел", owner: "С. Хошимов" },
  { name: "Отдел кадров", owner: "А. Усмонов" },
  { name: "Библиотека", owner: "Д. Сайфуллаева" },
  { name: "Международный отдел", owner: "А. Баходиров" },
  { name: "Отдел качества", owner: "Ф. Рустамов" },
];

const copy = {
  ru: {
    eyebrow: "Аккредитация",
    title: "Единая система подготовки к государственной аккредитации",
    description:
      "Мониторинг подразделений и рабочих групп, подготовка самооценки, контроль индикаторов, хранение доказательной базы и возврат материалов на доработку.",
    sections: "Рабочие разделы",
    open: "Открыть раздел",
    departments: "Текущая готовность подразделений",
    notice: "Все подразделения начинают с 0%. Процент будет увеличиваться только по фактически загруженным, отправленным на проверку и принятым материалам.",
    notStarted: "Не начато",
  },
  uz: {
    eyebrow: "Akkreditatsiya",
    title: "Davlat akkreditatsiyasiga tayyorgarlikning yagona tizimi",
    description:
      "Bo‘linmalar va ishchi guruhlar monitoringi, o‘zini o‘zi baholash, indikatorlar nazorati, dalillar bazasi va materiallarni qayta ishlashga qaytarish.",
    sections: "Ishchi bo‘limlar",
    open: "Bo‘limni ochish",
    departments: "Bo‘linmalarning joriy tayyorgarligi",
    notice: "Barcha bo‘linmalar 0% dan boshlaydi. Foiz faqat materiallar yuklangan, tekshiruvga yuborilgan va qabul qilinganidan keyin oshadi.",
    notStarted: "Boshlanmagan",
  },
  en: {
    eyebrow: "Accreditation",
    title: "Unified institutional accreditation preparation system",
    description:
      "Department and working-group monitoring, self-assessment, indicator control, evidence storage and revision workflows.",
    sections: "Workspace sections",
    open: "Open section",
    departments: "Current department readiness",
    notice: "Every department starts at 0%. Progress increases only when evidence is uploaded, submitted and approved.",
    notStarted: "Not started",
  },
};

export default async function AccreditationPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale === "uz" || locale === "en" ? locale : "ru";
  const t = copy[currentLocale];

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 px-6 py-10 text-white shadow-xl md:px-12 md:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-100">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            {t.description}
          </p>
        </section>

        <AccreditationProgress />

        <section className="mt-10">
          <h2 className="text-3xl font-bold text-slate-950">{t.sections}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {accreditationSections.map((section) => (
              <Link
                key={section.slug}
                href={`/accreditation/${section.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >
                <div className="text-4xl">{section.icon}</div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {section.title[currentLocale]}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {section.description[currentLocale]}
                </p>
                <div className="mt-6 font-semibold text-blue-700">
                  {t.open} →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">{t.departments}</h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-500">{t.notice}</p>
            </div>
            <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
              {departments.length} подразделений
            </div>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {departments.map((department) => (
              <article key={department.name} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-950">{department.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{department.owner}</p>
                    <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {t.notStarted}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">0%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-0 rounded-full bg-blue-600" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
