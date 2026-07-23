import { Link } from "@/i18n/routing";

const labels = {
  ru: {
    label: "Аккредитация",
    title: "Аккредитация и обеспечение качества образования",
    description:
      "Информация о комплексной и специальной аккредитации, самооценке, нормативных документах, индикаторах качества и деятельности рабочих групп.",

    heroCardLabel: "Система аккредитации",
    heroCardTitle: "Основные направления подготовки",
    heroCardItems: [
      "Комплексная государственная аккредитация",
      "Специальная аккредитация программ",
      "Самооценка и доказательная база",
      "Мониторинг индикаторов качества",
    ],
    heroStatus: "Подготовка осуществляется системно",

    sectionLabel: "Ключевые направления",
    sectionTitle: "Аккредитационная деятельность",
    sectionDescription:
      "Работа включает организацию самооценки, подготовку документов, взаимодействие с рабочими группами и контроль исполнения мероприятий.",

    details: "Подробнее",

    sections: [
      {
        title: "Комплексная государственная аккредитация",
        description:
          "Подготовка института к комплексной государственной аккредитации, координация рабочих групп и сопровождение процедуры.",
        href: "/documents",
      },
      {
        title: "Специальная аккредитация",
        description:
          "Подготовка образовательных программ к специальной аккредитации в соответствии с требованиями Национального агентства.",
        href: "/documents",
      },
      {
        title: "Самооценка",
        description:
          "Формирование отчёта по самооценке, анализ показателей и сбор подтверждающей доказательной базы.",
        href: "/analytics",
      },
      {
        title: "Индикаторы качества",
        description:
          "Мониторинг выполнения критериев, анализ результатов и контроль исполнения мероприятий.",
        href: "/monitoring",
      },
      {
        title: "Нормативные документы",
        description:
          "Законы, постановления, государственные образовательные стандарты и внутренние документы института.",
        href: "/documents",
      },
      {
        title: "Рабочие группы",
        description:
          "Ответственные лица, распределение обязанностей и контроль исполнения утверждённой дорожной карты.",
        href: "/employees",
      },
    ],

    progressLabel: "Текущий статус",
    progressTitle: "Состояние подготовки к аккредитации",
    progressDescription:
      "Ключевые показатели организации работ по подготовке института и образовательных программ.",

    stats: [
      {
        value: "12",
        label: "Рабочих групп",
      },
      {
        value: "150+",
        label: "Подготовленных документов",
      },
      {
        value: "100%",
        label: "Ответственных назначено",
      },
      {
        value: "24/7",
        label: "Мониторинг выполнения",
      },
    ],

    processLabel: "Организация работы",
    processTitle: "Этапы подготовки",
    processDescription:
      "Подготовка к аккредитации осуществляется последовательно — от анализа требований до контроля реализации корректирующих мероприятий.",

    stages: [
      {
        number: "01",
        title: "Анализ требований",
        description:
          "Изучение критериев, индикаторов, нормативных документов и требований аккредитационного органа.",
      },
      {
        number: "02",
        title: "Самооценка",
        description:
          "Оценка текущего состояния, определение сильных сторон, рисков и зон для совершенствования.",
      },
      {
        number: "03",
        title: "Подготовка доказательств",
        description:
          "Сбор, систематизация и проверка документов, подтверждающих соответствие установленным требованиям.",
      },
      {
        number: "04",
        title: "Контроль исполнения",
        description:
          "Мониторинг выполнения мероприятий, устранение недостатков и подготовка к внешней оценке.",
      },
    ],

    ctaTitle: "Документы по аккредитации",
    ctaDescription:
      "Ознакомьтесь с нормативными материалами, внутренними положениями и документами по подготовке к аккредитации.",
    ctaButton: "Перейти к документам",
  },

  uz: {
    label: "Akkreditatsiya",
    title: "Akkreditatsiya va ta’lim sifatini ta’minlash",
    description:
      "Kompleks va maxsus akkreditatsiya, o‘zini o‘zi baholash, me’yoriy hujjatlar, sifat indikatorlari hamda ishchi guruhlar faoliyati haqidagi ma’lumotlar.",

    heroCardLabel: "Akkreditatsiya tizimi",
    heroCardTitle: "Tayyorgarlikning asosiy yo‘nalishlari",
    heroCardItems: [
      "Kompleks davlat akkreditatsiyasi",
      "Ta’lim dasturlarining maxsus akkreditatsiyasi",
      "O‘zini o‘zi baholash va dalillar bazasi",
      "Sifat indikatorlari monitoringi",
    ],
    heroStatus: "Tayyorgarlik tizimli ravishda olib borilmoqda",

    sectionLabel: "Asosiy yo‘nalishlar",
    sectionTitle: "Akkreditatsiya faoliyati",
    sectionDescription:
      "Faoliyat o‘zini o‘zi baholashni tashkil etish, hujjatlarni tayyorlash, ishchi guruhlar bilan hamkorlik va tadbirlar ijrosini nazorat qilishni qamrab oladi.",

    details: "Batafsil",

    sections: [
      {
        title: "Kompleks davlat akkreditatsiyasi",
        description:
          "Institutni kompleks davlat akkreditatsiyasiga tayyorlash, ishchi guruhlarni muvofiqlashtirish va jarayonni kuzatib borish.",
        href: "/documents",
      },
      {
        title: "Maxsus akkreditatsiya",
        description:
          "Ta’lim dasturlarini Milliy agentlik talablariga muvofiq maxsus akkreditatsiyaga tayyorlash.",
        href: "/documents",
      },
      {
        title: "O‘zini o‘zi baholash",
        description:
          "O‘zini o‘zi baholash hisobotini shakllantirish, ko‘rsatkichlarni tahlil qilish va dalillar bazasini yig‘ish.",
        href: "/analytics",
      },
      {
        title: "Sifat indikatorlari",
        description:
          "Mezonlar bajarilishini monitoring qilish, natijalarni tahlil qilish va tadbirlar ijrosini nazorat qilish.",
        href: "/monitoring",
      },
      {
        title: "Me’yoriy hujjatlar",
        description:
          "Qonunlar, qarorlar, davlat ta’lim standartlari va institutning ichki hujjatlari.",
        href: "/documents",
      },
      {
        title: "Ishchi guruhlar",
        description:
          "Mas’ul shaxslar, vazifalarni taqsimlash va tasdiqlangan yo‘l xaritasi ijrosini nazorat qilish.",
        href: "/employees",
      },
    ],

    progressLabel: "Joriy holat",
    progressTitle: "Akkreditatsiyaga tayyorgarlik holati",
    progressDescription:
      "Institut va ta’lim dasturlarini akkreditatsiyaga tayyorlash bo‘yicha asosiy tashkiliy ko‘rsatkichlar.",

    stats: [
      {
        value: "12",
        label: "Ishchi guruh",
      },
      {
        value: "150+",
        label: "Tayyorlangan hujjat",
      },
      {
        value: "100%",
        label: "Mas’ullar tayinlangan",
      },
      {
        value: "24/7",
        label: "Ijro monitoringi",
      },
    ],

    processLabel: "Ishni tashkil etish",
    processTitle: "Tayyorgarlik bosqichlari",
    processDescription:
      "Akkreditatsiyaga tayyorgarlik talablarni tahlil qilishdan boshlab, tuzatish tadbirlarining bajarilishini nazorat qilishgacha bo‘lgan izchil jarayondir.",

    stages: [
      {
        number: "01",
        title: "Talablarni tahlil qilish",
        description:
          "Mezonlar, indikatorlar, me’yoriy hujjatlar va akkreditatsiya organi talablarini o‘rganish.",
      },
      {
        number: "02",
        title: "O‘zini o‘zi baholash",
        description:
          "Joriy holatni baholash, kuchli jihatlar, xavflar va takomillashtirish yo‘nalishlarini aniqlash.",
      },
      {
        number: "03",
        title: "Dalillarni tayyorlash",
        description:
          "Belgilangan talablarga muvofiqlikni tasdiqlovchi hujjatlarni yig‘ish, tizimlashtirish va tekshirish.",
      },
      {
        number: "04",
        title: "Ijro nazorati",
        description:
          "Tadbirlar bajarilishini monitoring qilish, kamchiliklarni bartaraf etish va tashqi baholashga tayyorlanish.",
      },
    ],

    ctaTitle: "Akkreditatsiya hujjatlari",
    ctaDescription:
      "Akkreditatsiyaga tayyorgarlik bo‘yicha me’yoriy materiallar, ichki nizomlar va hujjatlar bilan tanishing.",
    ctaButton: "Hujjatlarga o‘tish",
  },

  en: {
    label: "Accreditation",
    title: "Accreditation and education quality assurance",
    description:
      "Information on institutional and programme accreditation, self-evaluation, regulatory documents, quality indicators and working groups.",

    heroCardLabel: "Accreditation system",
    heroCardTitle: "Key areas of preparation",
    heroCardItems: [
      "Institutional state accreditation",
      "Programme accreditation",
      "Self-evaluation and evidence base",
      "Quality indicator monitoring",
    ],
    heroStatus: "Preparation is carried out systematically",

    sectionLabel: "Key areas",
    sectionTitle: "Accreditation activities",
    sectionDescription:
      "The work includes organising self-evaluation, preparing documents, coordinating working groups and monitoring the implementation of activities.",

    details: "Learn more",

    sections: [
      {
        title: "Institutional state accreditation",
        description:
          "Preparation of the institute for institutional state accreditation, coordination of working groups and support of the procedure.",
        href: "/documents",
      },
      {
        title: "Programme accreditation",
        description:
          "Preparation of educational programmes for accreditation in accordance with the requirements of the National Agency.",
        href: "/documents",
      },
      {
        title: "Self-evaluation",
        description:
          "Preparation of the self-evaluation report, analysis of indicators and collection of supporting evidence.",
        href: "/analytics",
      },
      {
        title: "Quality indicators",
        description:
          "Monitoring compliance with criteria, analysing results and controlling implementation of planned measures.",
        href: "/monitoring",
      },
      {
        title: "Regulatory documents",
        description:
          "Laws, resolutions, state educational standards and internal institutional documents.",
        href: "/documents",
      },
      {
        title: "Working groups",
        description:
          "Responsible persons, distribution of duties and control over implementation of the approved roadmap.",
        href: "/employees",
      },
    ],

    progressLabel: "Current status",
    progressTitle: "Accreditation preparation status",
    progressDescription:
      "Key organisational indicators for preparing the institute and its educational programmes for accreditation.",

    stats: [
      {
        value: "12",
        label: "Working groups",
      },
      {
        value: "150+",
        label: "Prepared documents",
      },
      {
        value: "100%",
        label: "Responsible persons appointed",
      },
      {
        value: "24/7",
        label: "Implementation monitoring",
      },
    ],

    processLabel: "Work organisation",
    processTitle: "Preparation stages",
    processDescription:
      "Accreditation preparation is organised as a consistent process from analysing requirements to monitoring corrective actions.",

    stages: [
      {
        number: "01",
        title: "Requirements analysis",
        description:
          "Review of criteria, indicators, regulatory documents and the requirements of the accreditation body.",
      },
      {
        number: "02",
        title: "Self-evaluation",
        description:
          "Assessment of the current situation and identification of strengths, risks and areas for improvement.",
      },
      {
        number: "03",
        title: "Evidence preparation",
        description:
          "Collection, organisation and verification of documents confirming compliance with established requirements.",
      },
      {
        number: "04",
        title: "Implementation control",
        description:
          "Monitoring planned activities, addressing weaknesses and preparing for external evaluation.",
      },
    ],

    ctaTitle: "Accreditation documents",
    ctaDescription:
      "Review regulatory materials, internal policies and documents related to accreditation preparation.",
    ctaButton: "View documents",
  },
};

const sectionIcons = [
  "M4 21h16M6 21V9m12 12V9M3 9l9-6 9 6M9 13h6M9 17h6",
  "M12 3 3 8l9 5 9-5-9-5ZM5 11v5c0 2 3.1 4 7 4s7-2 7-4v-5",
  "M6 2h9l4 4v16H6V2ZM14 2v5h5M9 12h6M9 16h6",
  "M4 19V9m5 10V5m5 14v-7m5 7V3",
  "M5 3h14v18H5V3ZM9 7h6M9 11h6M9 15h4",
  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
];

export default async function AccreditationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  return (
    <main className="overflow-hidden bg-[#f7f9fc]">
      {/* Главный экран */}
      <section
        className="relative isolate min-h-[620px] overflow-hidden bg-[#061b33] text-white"
        style={{
          backgroundImage: "url('/images/institute.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,29,59,0.98)_0%,rgba(5,48,91,0.94)_45%,rgba(6,77,105,0.64)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031326]/90 via-transparent to-[#061b33]/20" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(45,212,191,0.28),transparent_30%)]" />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute -bottom-48 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="container-main grid min-h-[620px] items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
              </span>

              {t.label}
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
              {t.title}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-blue-50/90 sm:text-lg">
              {t.description}
            </p>

            <Link
              href="/documents"
              className="group mt-10 inline-flex items-center rounded-2xl bg-white px-7 py-4 font-bold text-[#073b70] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]"
            >
              {t.ctaButton}

              <span className="ml-3 transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-white/[0.11] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                      {t.heroCardLabel}
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold">
                      {t.heroCardTitle}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-6 w-6"
                    >
                      <path d="M12 3 4.5 6v5.2c0 4.6 3.2 8.8 7.5 9.8 4.3-1 7.5-5.2 7.5-9.8V6L12 3Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {t.heroCardItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                        ✓
                      </span>

                      <span className="font-semibold text-blue-50">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {t.heroStatus}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f9fc] to-transparent" />
      </section>

      {/* Основные направления */}
      <section className="container-main py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-700">
              {t.sectionLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.sectionTitle}
            </h2>
          </div>

          <p className="max-w-2xl leading-8 text-slate-600 lg:justify-self-end">
            {t.sectionDescription}
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {t.sections.map((item, index) => (
            <article
              key={item.title}
              className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)]"
            >
              <div className="absolute right-5 top-3 text-6xl font-black text-slate-100 transition group-hover:text-blue-50">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b4b8f] to-[#0b7b88] text-white shadow-lg shadow-blue-900/15">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    <path d={sectionIcons[index]} />
                  </svg>
                </div>

                <h3 className="mt-7 text-2xl font-black leading-tight text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href={item.href}
                  className="inline-flex items-center font-extrabold text-blue-700 transition hover:text-blue-900"
                >
                  {t.details}

                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Этапы */}
      <section className="bg-[#061b33] py-24 text-white">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-300">
              {t.processLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              {t.processTitle}
            </h2>

            <p className="mt-5 leading-8 text-blue-50/75">
              {t.processDescription}
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.stages.map((stage) => (
              <article
                key={stage.number}
                className="rounded-[28px] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.10]"
              >
                <span className="text-sm font-black tracking-[0.18em] text-cyan-300">
                  {stage.number}
                </span>

                <h3 className="mt-5 text-xl font-extrabold">
                  {stage.title}
                </h3>

                <p className="mt-4 leading-7 text-blue-50/70">
                  {stage.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Переход к документам */}
      <section className="container-main py-24">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-[#0b4b8f] to-[#087d83] px-8 py-12 text-white shadow-[0_24px_70px_rgba(11,75,143,0.22)] sm:px-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {t.ctaTitle}
              </h2>

              <p className="mt-4 leading-7 text-blue-50/85">
                {t.ctaDescription}
              </p>
            </div>

            <Link
              href="/documents"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-7 py-4 font-extrabold text-[#0b4b8f] shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {t.ctaButton}

              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
