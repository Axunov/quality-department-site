import { getEmployees } from "@/services/employees.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

const labels = {
  ru: {
    label: "Сотрудники",
    title: "Сотрудники отдела",
    description:
      "Команда отдела контроля качества образования, обеспечивающая мониторинг, аналитику, сопровождение аккредитации и развитие внутренней системы качества.",

    heroCardLabel: "Команда отдела",
    heroCardTitle: "Профессиональная работа в сфере качества",
    heroCardItems: [
      "Мониторинг образовательного процесса",
      "Подготовка к аккредитации",
      "Аналитическая работа",
      "Обратная связь и развитие",
    ],
    heroStatus: "Открыты для взаимодействия",

    sectionLabel: "Наша команда",
    sectionTitle: "Специалисты отдела",
    sectionDescription:
      "Контактная информация, должности и график приёма сотрудников отдела контроля качества образования.",

    employeesCount: "Количество сотрудников",
    contactInformation: "Контактная информация",

    phone: "Телефон",
    email: "Электронная почта",
    telegram: "Telegram",
    room: "Кабинет",
    reception: "График приёма",
    empty: "Информация о сотрудниках пока не добавлена",
  },

  uz: {
    label: "Xodimlar",
    title: "Bo‘lim xodimlari",
    description:
      "Ta’lim jarayoni monitoringi, tahliliy faoliyat, akkreditatsiya jarayonlari va ichki sifat tizimini rivojlantirishni ta’minlovchi bo‘lim jamoasi.",

    heroCardLabel: "Bo‘lim jamoasi",
    heroCardTitle: "Sifat sohasidagi professional faoliyat",
    heroCardItems: [
      "Ta’lim jarayoni monitoringi",
      "Akkreditatsiyaga tayyorgarlik",
      "Tahliliy faoliyat",
      "Qayta aloqa va rivojlanish",
    ],
    heroStatus: "Hamkorlik uchun ochiqmiz",

    sectionLabel: "Bizning jamoa",
    sectionTitle: "Bo‘lim mutaxassislari",
    sectionDescription:
      "Ta’lim sifatini nazorat qilish bo‘limi xodimlarining lavozimlari, aloqa ma’lumotlari va qabul jadvali.",

    employeesCount: "Xodimlar soni",
    contactInformation: "Aloqa ma’lumotlari",

    phone: "Telefon",
    email: "Elektron pochta",
    telegram: "Telegram",
    room: "Xona",
    reception: "Qabul vaqti",
    empty: "Xodimlar haqida ma’lumot hozircha qo‘shilmagan",
  },

  en: {
    label: "Employees",
    title: "Department employees",
    description:
      "The team responsible for educational monitoring, analytics, accreditation support and development of the internal quality assurance system.",

    heroCardLabel: "Department team",
    heroCardTitle: "Professional work in quality assurance",
    heroCardItems: [
      "Educational process monitoring",
      "Accreditation preparation",
      "Analytical work",
      "Feedback and development",
    ],
    heroStatus: "Open to cooperation",

    sectionLabel: "Our team",
    sectionTitle: "Department specialists",
    sectionDescription:
      "Positions, contact details and reception schedules of the Education Quality Control Department employees.",

    employeesCount: "Number of employees",
    contactInformation: "Contact information",

    phone: "Phone",
    email: "Email",
    telegram: "Telegram",
    room: "Office",
    reception: "Reception hours",
    empty: "Employee information has not been added yet",
  },
};

function createTelegramUrl(value: string) {
  if (value.startsWith("http")) {
    return value;
  }

  return `https://t.me/${value.replace("@", "")}`;
}

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];
  const employees = await getEmployees();

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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                  {t.employeesCount}
                </p>

                <p className="mt-1 text-3xl font-black">{employees.length}</p>
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

      {/* Заголовок списка сотрудников */}
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

      {/* Сотрудники */}
      <section className="container-main pb-24 pt-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
          {employees.map((emp: any) => {
            const fullName = getLocalizedText(
              currentLocale,
              emp.full_name_ru || emp.fullname_ru,
              emp.full_name_uz || emp.fullname_uz,
              emp.full_name_en || emp.fullname_en
            );

            const position = getLocalizedText(
              currentLocale,
              emp.position_ru,
              emp.position_uz,
              emp.position_en
            );

            const department = getLocalizedText(
              currentLocale,
              emp.department_ru,
              emp.department_uz,
              emp.department_en
            );

            const reception = getLocalizedText(
              currentLocale,
              emp.reception_ru,
              emp.reception_uz,
              emp.reception_en
            );

            return (
              <article
                key={emp.id}
                className="group overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_70px_rgba(15,23,42,0.13)]"
              >
               {/* Фото сотрудника */}
<div className="relative h-[420px] overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 sm:h-[460px]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.12),transparent_50%)]" />

  {emp.photo_url ? (
    <img
      src={emp.photo_url}
      alt={fullName}
      className="relative h-full w-full object-contain object-center p-3 transition duration-500 group-hover:scale-[1.01]"
    />
  ) : (
    <div className="relative flex h-full items-center justify-center">
      <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-white text-slate-300 shadow-xl">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-20 w-20"
        >
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  )}

  {/* Должность внизу фото */}
  {position && (
    <div className="absolute inset-x-0 bottom-0 p-4">
      <div className="inline-flex max-w-full rounded-xl border border-white/20 bg-slate-950/75 px-4 py-2.5 text-white shadow-lg backdrop-blur-md">
        <p className="text-sm font-bold leading-5">
          {position}
        </p>
      </div>
    </div>
  )}
</div>
                
                {/* Основная информация */}
                <div className="p-7">
                  <h2 className="text-2xl font-black leading-tight text-slate-950">
                    {fullName}
                  </h2>

                  {department && (
                    <p className="mt-3 text-sm font-semibold leading-6 text-blue-700">
                      {department}
                    </p>
                  )}

                  <div className="mt-7 border-t border-slate-100 pt-6">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
                      {t.contactInformation}
                    </p>

                    <div className="mt-5 space-y-5">
                      {emp.room && (
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M4 21V3h12v18M16 8h4v13M8 7h4M8 11h4M8 15h4M2 21h20" />
                            </svg>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                              {t.room}
                            </p>

                            <p className="mt-1 font-semibold text-slate-700">
                              {emp.room}
                            </p>
                          </div>
                        </div>
                      )}

                      {reception && (
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 7v5l3 2" />
                            </svg>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                              {t.reception}
                            </p>

                            <p className="mt-1 whitespace-pre-line font-semibold leading-6 text-slate-700">
                              {reception}
                            </p>
                          </div>
                        </div>
                      )}

                      {emp.phone && (
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                            </svg>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                              {t.phone}
                            </p>

                            <a
                              href={`tel:${emp.phone}`}
                              className="mt-1 block font-semibold text-blue-700 transition hover:text-blue-900"
                            >
                              {emp.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {emp.email && (
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <rect x="3" y="5" width="18" height="14" rx="2" />
                              <path d="m3 7 9 6 9-6" />
                            </svg>
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                              {t.email}
                            </p>

                            <a
                              href={`mailto:${emp.email}`}
                              className="mt-1 block break-all font-semibold text-blue-700 transition hover:text-blue-900"
                            >
                              {emp.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {emp.telegram && (
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                              <path d="M22 2 11 13" />
                            </svg>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                              {t.telegram}
                            </p>

                            <a
                              href={createTelegramUrl(emp.telegram)}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 block font-semibold text-blue-700 transition hover:text-blue-900"
                            >
                              {emp.telegram}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {employees.length === 0 && (
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
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
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