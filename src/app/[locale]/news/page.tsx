import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

const labels = {
  ru: {
    label: "Новости",
    title: "Новости и объявления",
    description:
      "Актуальная информация о деятельности отдела контроля качества образования, мероприятиях, мониторинге и аккредитационных процессах.",

    heroCardLabel: "Информационный центр",
    heroCardTitle: "Главные направления публикаций",
    heroCardItems: [
      "Новости отдела",
      "Объявления и мероприятия",
      "Мониторинг качества",
      "Аккредитационные процессы",
    ],
    heroStatus: "Информация регулярно обновляется",

    sectionLabel: "Последние публикации",
    sectionTitle: "Актуальные новости",
    sectionDescription:
      "Следите за событиями, объявлениями и результатами работы отдела контроля качества образования.",

    newsCount: "Количество публикаций",
    readMore: "Читать подробнее",
    defaultCategory: "Новости",
    empty: "Новости пока не добавлены",
  },

  uz: {
    label: "Yangiliklar",
    title: "Yangiliklar va e’lonlar",
    description:
      "Ta’lim sifatini nazorat qilish bo‘limi faoliyati, tadbirlar, monitoring va akkreditatsiya jarayonlari haqidagi dolzarb ma’lumotlar.",

    heroCardLabel: "Axborot markazi",
    heroCardTitle: "Nashrlarning asosiy yo‘nalishlari",
    heroCardItems: [
      "Bo‘lim yangiliklari",
      "E’lonlar va tadbirlar",
      "Sifat monitoringi",
      "Akkreditatsiya jarayonlari",
    ],
    heroStatus: "Ma’lumotlar muntazam yangilanadi",

    sectionLabel: "So‘nggi nashrlar",
    sectionTitle: "Dolzarb yangiliklar",
    sectionDescription:
      "Ta’lim sifatini nazorat qilish bo‘limining tadbirlari, e’lonlari va faoliyat natijalarini kuzatib boring.",

    newsCount: "Nashrlar soni",
    readMore: "Batafsil o‘qish",
    defaultCategory: "Yangiliklar",
    empty: "Hozircha yangiliklar qo‘shilmagan",
  },

  en: {
    label: "News",
    title: "News and announcements",
    description:
      "Current information about the activities of the Education Quality Control Department, events, monitoring and accreditation processes.",

    heroCardLabel: "Information centre",
    heroCardTitle: "Key publication areas",
    heroCardItems: [
      "Department news",
      "Announcements and events",
      "Quality monitoring",
      "Accreditation processes",
    ],
    heroStatus: "Information is updated regularly",

    sectionLabel: "Latest publications",
    sectionTitle: "Current news",
    sectionDescription:
      "Follow events, announcements and the results of the Education Quality Control Department’s activities.",

    newsCount: "Number of publications",
    readMore: "Read more",
    defaultCategory: "News",
    empty: "No news has been added yet",
  },
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];
  const news = await getNews();

  const dateLocale =
    currentLocale === "uz"
      ? "uz-UZ"
      : currentLocale === "en"
        ? "en-US"
        : "ru-RU";

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
          {/* Левая часть */}
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

            <div className="mt-10 inline-flex items-center gap-5 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                  <path d="M7 7h10M7 11h10M7 15h6" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                  {t.newsCount}
                </p>

                <p className="mt-1 text-3xl font-black">{news.length}</p>
              </div>
            </div>
          </div>

          {/* Правая карточка */}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M4 5h16v14H4z" />
                      <path d="M8 9h8M8 13h5" />
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

                      <span className="font-semibold text-blue-50">
                        {item}
                      </span>
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

      {/* Заголовок раздела */}
      <section className="container-main pb-8 pt-20">
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
      </section>

      {/* Новости */}
      <section className="container-main pb-24 pt-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item: any) => {
            const title = getLocalizedText(
              currentLocale,
              item.title_ru,
              item.title_uz,
              item.title_en
            );

            const text = getLocalizedText(
              currentLocale,
              item.content_ru || item.text_ru,
              item.content_uz || item.text_uz,
              item.content_en || item.text_en
            );

            return (
              <article
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_70px_rgba(15,23,42,0.13)]"
              >
                {/* Изображение */}
                <div className="relative h-[250px] overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-600">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-20 w-20 opacity-80"
                      >
                        <path d="M4 5h16v14H4z" />
                        <path d="M8 9h8M8 13h5M8 17h8" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex rounded-full border border-white/20 bg-slate-950/60 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
                      {item.category || t.defaultCategory}
                    </span>
                  </div>
                </div>

                {/* Содержание */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-blue-700"
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4M8 3v4M3 10h18" />
                    </svg>

                    <span>
                      {new Date(item.created_at).toLocaleDateString(dateLocale)}
                    </span>
                  </div>

                  <h2 className="mt-5 line-clamp-2 text-2xl font-black leading-tight text-slate-950">
                    {title}
                  </h2>

                  {text && (
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                      {text}
                    </p>
                  )}

                  <div className="mt-auto pt-7">
                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-flex items-center font-extrabold text-blue-700 transition hover:text-blue-900"
                    >
                      {t.readMore}

                      <span className="ml-2 transition group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {news.length === 0 && (
            <div className="col-span-full rounded-[32px] border border-slate-200 bg-white p-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 9h8M8 13h5" />
                </svg>
              </div>

              <p className="mt-5 text-slate-500">{t.empty}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}