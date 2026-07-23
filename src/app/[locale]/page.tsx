import { getNews } from "@/services/news.service";
import { getDocuments } from "@/services/documents.service";
import { Link } from "@/i18n/routing";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { ServiceHub } from "@/components/home/ServiceHub";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const labels = {
  ru: {
    badge: "Отдел контроля качества образования",
    heroTitle: "Качество образования — основа устойчивого развития",
    heroDescription:
      "Отдел осуществляет внутренний мониторинг качества образования, координирует процессы аккредитации, анализирует образовательную деятельность и содействует её постоянному совершенствованию.",
    aboutButton: "Об отделе",
    documentsButton: "Документы",
    dashboardTitle: "Система обеспечения качества",
    dashboardStatus: "Работает непрерывно",
    dashboardMonitoring: "Внутренний мониторинг",
    dashboardAccreditation: "Аккредитация",
    dashboardAnalytics: "Аналитика и обратная связь",

    directionsLabel: "Основные направления",
    directionsTitle: "Системная работа над качеством образования",
    directionsDescription:
      "Деятельность отдела объединяет мониторинг, аналитику, аккредитацию и постоянное совершенствование образовательного процесса.",
    details: "Подробнее",

    monitoring: "Мониторинг качества",
    monitoringDesc:
      "Изучение состояния образовательного процесса, анализ результатов и подготовка обоснованных рекомендаций.",

    accreditation: "Аккредитация",
    accreditationDesc:
      "Организация подготовки института и образовательных программ к государственной и международной аккредитации.",

    surveys: "Обратная связь",
    surveysDesc:
      "Проведение опросов студентов, преподавателей, работодателей и других заинтересованных сторон.",

    improvement: "Совершенствование",
    improvementDesc:
      "Разработка предложений по повышению эффективности образовательной и управленческой деятельности.",

    newsLabel: "Информационный центр",
    newsTitle: "Последние новости",
    newsDescription:
      "Новости, мероприятия и объявления отдела контроля качества образования.",
    allNews: "Все новости",
    readMore: "Подробнее",
    noNews: "Новости пока не добавлены",

    documentsLabel: "Нормативная база",
    documentsTitle: "Актуальные документы",
    documentsDescription:
      "Положения, нормативные материалы и документы отдела.",
    allDocuments: "Все документы",
    openDocument: "Открыть документ",
    noDocuments: "Документы пока не добавлены",

    newsCount: "Новостей",
    documentsCount: "Документов",

    defaultNewsCategory: "Новости",
    defaultDocumentCategory: "Документы",
  },

  uz: {
    badge: "Ta’lim sifatini nazorat qilish bo‘limi",
    heroTitle: "Ta’lim sifati — barqaror rivojlanish asosi",
    heroDescription:
      "Bo‘lim ta’lim sifatining ichki monitoringini amalga oshiradi, akkreditatsiya jarayonlarini muvofiqlashtiradi, ta’lim faoliyatini tahlil qiladi va uni muntazam takomillashtirishga ko‘maklashadi.",
    aboutButton: "Bo‘lim haqida",
    documentsButton: "Hujjatlar",
    dashboardTitle: "Sifatni ta’minlash tizimi",
    dashboardStatus: "Uzluksiz faoliyat yuritadi",
    dashboardMonitoring: "Ichki monitoring",
    dashboardAccreditation: "Akkreditatsiya",
    dashboardAnalytics: "Tahlil va qayta aloqa",

    directionsLabel: "Asosiy yo‘nalishlar",
    directionsTitle: "Ta’lim sifati bo‘yicha tizimli faoliyat",
    directionsDescription:
      "Bo‘lim faoliyati monitoring, tahlil, akkreditatsiya va ta’lim jarayonini doimiy takomillashtirishni birlashtiradi.",
    details: "Batafsil",

    monitoring: "Sifat monitoringi",
    monitoringDesc:
      "Ta’lim jarayoni holatini o‘rganish, natijalarni tahlil qilish va asoslangan tavsiyalar tayyorlash.",

    accreditation: "Akkreditatsiya",
    accreditationDesc:
      "Institut va ta’lim dasturlarini davlat hamda xalqaro akkreditatsiyaga tayyorlash ishlarini tashkil etish.",

    surveys: "Qayta aloqa",
    surveysDesc:
      "Talabalar, o‘qituvchilar, ish beruvchilar va boshqa manfaatdor tomonlar o‘rtasida so‘rovlar o‘tkazish.",

    improvement: "Takomillashtirish",
    improvementDesc:
      "Ta’lim va boshqaruv faoliyati samaradorligini oshirish bo‘yicha takliflar ishlab chiqish.",

    newsLabel: "Axborot markazi",
    newsTitle: "So‘nggi yangiliklar",
    newsDescription:
      "Ta’lim sifatini nazorat qilish bo‘limining yangiliklari, tadbirlari va e’lonlari.",
    allNews: "Barcha yangiliklar",
    readMore: "Batafsil",
    noNews: "Hozircha yangiliklar qo‘shilmagan",

    documentsLabel: "Me’yoriy baza",
    documentsTitle: "Dolzarb hujjatlar",
    documentsDescription:
      "Bo‘lim nizomlari, me’yoriy materiallari va hujjatlari.",
    allDocuments: "Barcha hujjatlar",
    openDocument: "Hujjatni ochish",
    noDocuments: "Hozircha hujjatlar qo‘shilmagan",

    newsCount: "Yangiliklar",
    documentsCount: "Hujjatlar",

    defaultNewsCategory: "Yangiliklar",
    defaultDocumentCategory: "Hujjatlar",
  },

  en: {
    badge: "Education Quality Control Department",
    heroTitle: "Quality education is the foundation of sustainable development",
    heroDescription:
      "The department conducts internal monitoring of education quality, coordinates accreditation processes, analyses educational activities and supports their continuous improvement.",
    aboutButton: "About the department",
    documentsButton: "Documents",
    dashboardTitle: "Quality assurance system",
    dashboardStatus: "Continuously operating",
    dashboardMonitoring: "Internal monitoring",
    dashboardAccreditation: "Accreditation",
    dashboardAnalytics: "Analytics and feedback",

    directionsLabel: "Key areas",
    directionsTitle: "A systematic approach to education quality",
    directionsDescription:
      "The department combines monitoring, analytics, accreditation and continuous improvement of the educational process.",
    details: "Learn more",

    monitoring: "Quality monitoring",
    monitoringDesc:
      "Assessment of the educational process, analysis of results and preparation of evidence-based recommendations.",

    accreditation: "Accreditation",
    accreditationDesc:
      "Coordination of institutional and programme preparation for state and international accreditation.",

    surveys: "Feedback",
    surveysDesc:
      "Surveys of students, teachers, employers and other interested parties.",

    improvement: "Continuous improvement",
    improvementDesc:
      "Development of proposals to improve educational and administrative effectiveness.",

    newsLabel: "Information centre",
    newsTitle: "Latest news",
    newsDescription:
      "News, events and announcements from the Education Quality Control Department.",
    allNews: "All news",
    readMore: "Read more",
    noNews: "No news has been added yet",

    documentsLabel: "Regulatory framework",
    documentsTitle: "Current documents",
    documentsDescription:
      "Regulations, reference materials and documents of the department.",
    allDocuments: "All documents",
    openDocument: "Open document",
    noDocuments: "No documents have been added yet",

    newsCount: "News",
    documentsCount: "Documents",

    defaultNewsCategory: "News",
    defaultDocumentCategory: "Documents",
  },
};

function formatFileSize(size?: number | null) {
  if (!size) return "";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const [news, documents] = await Promise.all([getNews(), getDocuments()]);

  const dateLocale =
    currentLocale === "uz"
      ? "uz-UZ"
      : currentLocale === "en"
        ? "en-US"
        : "ru-RU";

  const directions = [
    {
      number: "01",
      icon: "M4 19V9m6 10V5m6 14v-7m4 7H2",
      title: t.monitoring,
      description: t.monitoringDesc,
    },
    {
      number: "02",
      icon: "m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      title: t.accreditation,
      description: t.accreditationDesc,
    },
    {
      number: "03",
      icon: "M8 10h8M8 14h5m8-2a9 9 0 1 1-3.8-7.35L21 3v6h-6",
      title: t.surveys,
      description: t.surveysDesc,
    },
    {
      number: "04",
      icon: "M3 17 9 11l4 4 8-9M15 6h6v6",
      title: t.improvement,
      description: t.improvementDesc,
    },
  ];

  const featuredNews = news[0];
  const secondaryNews = news.slice(1, 3);

  const getNewsTitle = (item: any) =>
    getLocalizedText(
      currentLocale,
      item.title_ru,
      item.title_uz,
      item.title_en
    );

  const getNewsText = (item: any) =>
    getLocalizedText(
      currentLocale,
      item.content_ru || item.text_ru,
      item.content_uz || item.text_uz,
      item.content_en || item.text_en
    );

  return (
    <main id="main-content" className="public-main overflow-hidden bg-[#f7f9fc]">
      {/* Hero */}
      <section
        className="relative isolate min-h-[720px] overflow-hidden bg-[#061b33] text-white"
        style={{
          backgroundImage: "url('/images/institute.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,29,59,0.98)_0%,rgba(5,48,91,0.94)_42%,rgba(6,77,105,0.68)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#031326]/90 via-transparent to-[#061b33]/20" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_18%,rgba(45,212,191,0.28),transparent_30%)]" />

        <div className="container-main grid min-h-[720px] items-center gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
              </span>
              {t.badge}
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[68px]">
              {t.heroTitle}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-blue-50/90 sm:text-lg">
              {t.heroDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center rounded-2xl bg-white px-7 py-4 font-bold text-[#073b70] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]"
              >
                {t.aboutButton}
                <span className="ml-3 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/documents"
                className="inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                {t.documentsButton}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-white/[0.11] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.30)] backdrop-blur-2xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                      Quality System
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold">
                      {t.dashboardTitle}
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

                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {t.dashboardStatus}
                </div>

                <div className="mt-6 space-y-3">
                  {[t.dashboardMonitoring, t.dashboardAccreditation, t.dashboardAnalytics].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                          ✓
                        </span>
                        <span className="font-semibold text-blue-50">{item}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Link
                    href="/news"
                    className="rounded-2xl bg-white/[0.08] p-4 transition hover:bg-white/[0.14]"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      {t.newsCount}
                    </p>
                    <p className="mt-2 text-3xl font-black">{news.length}</p>
                  </Link>

                  <Link
                    href="/documents"
                    className="rounded-2xl bg-white/[0.08] p-4 transition hover:bg-white/[0.14]"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      {t.documentsCount}
                    </p>
                    <p className="mt-2 text-3xl font-black">
                      {documents.length}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f7f9fc] to-transparent" />
      </section>

      <ServiceHub locale={currentLocale} />

      {/* Statistics */}
      <section className="relative z-10 -mt-12 pb-8">
        <div className="container-main">
          <div className="grid overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:grid-cols-2">
            <Link
              href="/news"
              className="group flex items-center justify-between border-b border-slate-200 p-7 transition duration-300 hover:bg-blue-50/70 md:border-b-0 md:border-r lg:p-9"
            >
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                  {t.newsCount}
                </p>
                <p className="mt-3 text-5xl font-black tracking-tight text-[#0b4b8f]">
                  {news.length}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-700 transition duration-300 group-hover:translate-x-1 group-hover:bg-blue-100">
                →
              </div>
            </Link>

            <Link
              href="/documents"
              className="group flex items-center justify-between p-7 transition duration-300 hover:bg-cyan-50/70 lg:p-9"
            >
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                  {t.documentsCount}
                </p>
                <p className="mt-3 text-5xl font-black tracking-tight text-[#087d83]">
                  {documents.length}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-2xl text-cyan-700 transition duration-300 group-hover:translate-x-1 group-hover:bg-cyan-100">
                →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="container-main py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-700">
              {t.directionsLabel}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              {t.directionsTitle}
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end">
            {t.directionsDescription}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {directions.map((direction) => (
            <article
              key={direction.number}
              className="group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-8 shadow-[0_14px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_55px_rgba(15,23,42,0.10)]"
            >
              <div className="absolute right-6 top-4 text-7xl font-black text-slate-100 transition duration-300 group-hover:text-blue-50">
                {direction.number}
              </div>

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b4b8f] to-[#0b7b88] text-white shadow-lg shadow-blue-900/15">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    <path d={direction.icon} />
                  </svg>
                </div>

                <h3 className="mt-7 text-2xl font-extrabold text-slate-950">
                  {direction.title}
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-slate-600">
                  {direction.description}
                </p>

                <Link
                  href="/about"
                  className="mt-7 inline-flex items-center font-bold text-blue-700"
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

      {/* News */}
      <section className="bg-white py-24">
        <div className="container-main">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-blue-700">
                {t.newsLabel}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                {t.newsTitle}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                {t.newsDescription}
              </p>
            </div>

            <Link
              href="/news"
              className="group inline-flex items-center font-bold text-blue-700"
            >
              {t.allNews}
              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {featuredNews ? (
            <div className="mt-12 grid gap-7 lg:grid-cols-[1.35fr_0.65fr]">
              <article className="group relative min-h-[500px] overflow-hidden rounded-[34px] bg-slate-900">
                {featuredNews.image_url ? (
                  <img
                    src={featuredNews.image_url}
                    alt={getNewsTitle(featuredNews)}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0b4b8f] to-[#0b7b88]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-white/15 px-3 py-1.5 font-bold backdrop-blur">
                      {featuredNews.category || t.defaultNewsCategory}
                    </span>
                    <span className="text-blue-100">
                      {new Date(featuredNews.created_at).toLocaleDateString(
                        dateLocale
                      )}
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-3xl text-2xl font-black leading-tight sm:text-4xl">
                    {getNewsTitle(featuredNews)}
                  </h3>

                  {getNewsText(featuredNews) && (
                    <p className="mt-4 line-clamp-2 max-w-2xl leading-7 text-blue-50/85">
                      {getNewsText(featuredNews)}
                    </p>
                  )}

                  <Link
                    href={`/news/${featuredNews.slug}`}
                    className="mt-6 inline-flex items-center font-bold"
                  >
                    {t.readMore}
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>

              <div className="grid gap-7">
                {secondaryNews.map((item: any) => (
                  <article
                    key={item.id}
                    className="group grid min-h-[235px] overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50 sm:grid-cols-[0.42fr_0.58fr] lg:grid-cols-1 xl:grid-cols-[0.42fr_0.58fr]"
                  >
                    <div className="min-h-[190px] overflow-hidden bg-slate-200">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={getNewsTitle(item)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-700 to-cyan-600 text-5xl text-white">
                          📰
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center p-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                        {item.category || t.defaultNewsCategory}
                      </div>
                      <h3 className="mt-3 line-clamp-3 text-xl font-extrabold leading-snug text-slate-950">
                        {getNewsTitle(item)}
                      </h3>
                      <p className="mt-3 text-sm text-slate-500">
                        {new Date(item.created_at).toLocaleDateString(dateLocale)}
                      </p>
                      <Link
                        href={`/news/${item.slug}`}
                        className="mt-5 inline-flex items-center font-bold text-blue-700"
                      >
                        {t.readMore}
                        <span className="ml-2 transition group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12 rounded-[30px] bg-slate-50 p-14 text-center text-slate-500">
              {t.noNews}
            </div>
          )}
        </div>
      </section>

      {/* Documents */}
      <section className="container-main py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-700">
              {t.documentsLabel}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t.documentsTitle}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              {t.documentsDescription}
            </p>
          </div>

          <Link
            href="/documents"
            className="group inline-flex items-center font-bold text-blue-700"
          >
            {t.allDocuments}
            <span className="ml-2 transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {documents.slice(0, 3).map((document: any) => {
            const title = getLocalizedText(
              currentLocale,
              document.title_ru,
              document.title_uz,
              document.title_en
            );

            return (
              <article
                key={document.id}
                className="group flex min-h-[285px] flex-col rounded-[30px] border border-slate-200/80 bg-white p-7 shadow-[0_14px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_22px_55px_rgba(15,23,42,0.10)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-7 w-7"
                    >
                      <path d="M6 2h8l4 4v16H6V2Z" />
                      <path d="M14 2v5h5M9 13h6M9 17h4" />
                    </svg>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    {document.category || t.defaultDocumentCategory}
                  </span>
                </div>

                <h3 className="mt-6 line-clamp-3 text-xl font-extrabold leading-snug text-slate-950">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {[document.file_name, formatFileSize(document.file_size)]
                    .filter(Boolean)
                    .join(" · ")}
                </p>

                <div className="mt-auto pt-7">
                  <a
                    href={document.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-bold text-blue-700"
                  >
                    {t.openDocument}
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            );
          })}

          {documents.length === 0 && (
            <div className="col-span-full rounded-[30px] bg-white p-14 text-center text-slate-500 shadow-sm">
              {t.noDocuments}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
