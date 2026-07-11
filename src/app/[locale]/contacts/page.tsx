import { Link } from "@/i18n/routing";

const labels = {
  ru: {
    label: "Контакты",
    title: "Контакты отдела",
    description:
      "Адрес, телефон, электронная почта, график работы и контактная информация отдела контроля качества образования.",

    heroCardLabel: "Связь с отделом",
    heroCardTitle: "Мы открыты для обращений",
    heroCardItems: [
      "Консультации по вопросам качества",
      "Вопросы аккредитации",
      "Предложения и обратная связь",
      "Приём сотрудников и студентов",
    ],
    heroStatus: "Обращения принимаются в рабочее время",

    sectionLabel: "Контактная информация",
    sectionTitle: "Как с нами связаться",
    sectionDescription:
      "Вы можете обратиться в отдел лично, по телефону, электронной почте или через электронную приёмную.",

    address: "Адрес",
    addressValue:
      "Ташкентская область, Кибрайский район, Корамурт 1",

    phone: "Телефон",
    phoneValue: "+998 90 322-26-29",

    email: "Электронная почта",
    emailValue: "quality@sbumiptk.uz",

    workSchedule: "График работы",
    workScheduleValue: "Понедельник — пятница, 09:00–18:00",

    reception: "Приём посетителей",
    receptionValue:
      "Приём осуществляется по предварительной договорённости",

    employees: "Ответственные сотрудники",
    employeeOne: "Рустамов Фархад Нурматович",
    employeeTwo: "Эшметова Дилафруз",

    call: "Позвонить",
    write: "Написать",
    employeesButton: "Сотрудники отдела",

    mapLabel: "Местоположение",
    mapTitle: "Карта расположения",
    mapDescription:
      "Институт расположен в Кибрайском районе Ташкентской области.",

    receptionLabel: "Обращения",
    receptionTitle: "Электронная приёмная",
    receptionDescription:
      "Для направления обращения, предложения или вопроса воспользуйтесь электронной приёмной института.",
    receptionButton: "Перейти в приёмную",
  },

  uz: {
    label: "Aloqa",
    title: "Bo‘lim bilan bog‘lanish",
    description:
      "Ta’lim sifatini nazorat qilish bo‘limining manzili, telefon raqami, elektron pochtasi, ish vaqti va aloqa ma’lumotlari.",

    heroCardLabel: "Bo‘lim bilan aloqa",
    heroCardTitle: "Murojaatlar uchun ochiqmiz",
    heroCardItems: [
      "Ta’lim sifati bo‘yicha maslahatlar",
      "Akkreditatsiya masalalari",
      "Takliflar va qayta aloqa",
      "Xodimlar va talabalarni qabul qilish",
    ],
    heroStatus: "Murojaatlar ish vaqtida qabul qilinadi",

    sectionLabel: "Aloqa ma’lumotlari",
    sectionTitle: "Biz bilan qanday bog‘lanish mumkin",
    sectionDescription:
      "Bo‘limga shaxsan, telefon, elektron pochta yoki elektron qabulxona orqali murojaat qilishingiz mumkin.",

    address: "Manzil",
    addressValue:
      "Toshkent viloyati, Qibray tumani, Qoramurt 1",

    phone: "Telefon",
    phoneValue: "+998 90 322-26-29",

    email: "Elektron pochta",
    emailValue: "quality@sbumiptk.uz",

    workSchedule: "Ish vaqti",
    workScheduleValue: "Dushanba — juma, 09:00–18:00",

    reception: "Fuqarolar qabuli",
    receptionValue:
      "Qabul oldindan kelishilgan holda amalga oshiriladi",

    employees: "Mas’ul xodimlar",
    employeeOne: "Rustamov Farhad Nurmatovich",
    employeeTwo: "Eshmetova Dilafruz",

    call: "Qo‘ng‘iroq qilish",
    write: "Xat yozish",
    employeesButton: "Bo‘lim xodimlari",

    mapLabel: "Joylashuv",
    mapTitle: "Joylashuv xaritasi",
    mapDescription:
      "Institut Toshkent viloyatining Qibray tumanida joylashgan.",

    receptionLabel: "Murojaatlar",
    receptionTitle: "Elektron qabulxona",
    receptionDescription:
      "Murojaat, taklif yoki savol yuborish uchun institutning elektron qabulxonasidan foydalaning.",
    receptionButton: "Qabulxonaga o‘tish",
  },

  en: {
    label: "Contacts",
    title: "Department contacts",
    description:
      "Address, telephone number, email, working hours and contact details of the Education Quality Control Department.",

    heroCardLabel: "Contact the department",
    heroCardTitle: "We are open to enquiries",
    heroCardItems: [
      "Education quality consultations",
      "Accreditation matters",
      "Proposals and feedback",
      "Reception of staff and students",
    ],
    heroStatus: "Enquiries are accepted during working hours",

    sectionLabel: "Contact information",
    sectionTitle: "How to contact us",
    sectionDescription:
      "You can contact the department in person, by telephone, email or through the electronic reception service.",

    address: "Address",
    addressValue:
      "Koramurt 1, Kibray district, Tashkent region",

    phone: "Phone",
    phoneValue: "+998 90 322-26-29",

    email: "Email",
    emailValue: "quality@sbumiptk.uz",

    workSchedule: "Working hours",
    workScheduleValue: "Monday — Friday, 09:00–18:00",

    reception: "Visitor reception",
    receptionValue:
      "Reception is available by prior arrangement",

    employees: "Responsible employees",
    employeeOne: "Farhad Nurmatovich Rustamov",
    employeeTwo: "Dilafruz Eshmetova",

    call: "Call",
    write: "Send email",
    employeesButton: "Department employees",

    mapLabel: "Location",
    mapTitle: "Location map",
    mapDescription:
      "The institute is located in the Kibray district of Tashkent region.",

    receptionLabel: "Enquiries",
    receptionTitle: "Electronic reception",
    receptionDescription:
      "Use the institute’s electronic reception service to submit an enquiry, proposal or question.",
    receptionButton: "Open reception service",
  },
};

const contactIcons = {
  address: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),

  phone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),

  email: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),

  schedule: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const mapQuery = encodeURIComponent(t.addressValue);

  const contactItems = [
    {
      key: "address",
      label: t.address,
      value: t.addressValue,
      icon: contactIcons.address,
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      key: "phone",
      label: t.phone,
      value: t.phoneValue,
      icon: contactIcons.phone,
      iconClass: "bg-emerald-50 text-emerald-700",
      href: `tel:${t.phoneValue.replace(/\s/g, "")}`,
    },
    {
      key: "email",
      label: t.email,
      value: t.emailValue,
      icon: contactIcons.email,
      iconClass: "bg-violet-50 text-violet-700",
      href: `mailto:${t.emailValue}`,
    },
    {
      key: "schedule",
      label: t.workSchedule,
      value: t.workScheduleValue,
      icon: contactIcons.schedule,
      iconClass: "bg-cyan-50 text-cyan-700",
    },
  ];

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

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`tel:${t.phoneValue.replace(/\s/g, "")}`}
                className="group inline-flex items-center rounded-2xl bg-white px-7 py-4 font-bold text-[#073b70] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]"
              >
                {t.call}
                <span className="ml-3 transition group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href={`mailto:${t.emailValue}`}
                className="inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                {t.write}
              </a>
            </div>
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
                    {contactIcons.phone}
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

      {/* Контакты и карта */}
      <section className="container-main pb-24 pt-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="space-y-7">
              {contactItems.map((item) => (
                <div key={item.key} className="flex items-start gap-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.iconClass}`}
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      {item.label}
                    </p>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-2 block break-words text-base font-bold leading-7 text-slate-800 transition hover:text-blue-700"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-base font-bold leading-7 text-slate-800">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                {t.reception}
              </p>

              <p className="mt-3 leading-7 text-slate-700">
                {t.receptionValue}
              </p>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                {t.employees}
              </p>

              <div className="mt-4 space-y-2 text-slate-700">
                <p className="font-bold">{t.employeeOne}</p>
                <p className="font-bold">{t.employeeTwo}</p>
              </div>

              <Link
                href="/employees"
                className="group mt-7 inline-flex items-center font-extrabold text-blue-700"
              >
                {t.employeesButton}
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-100 p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
                {t.mapLabel}
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-950">
                {t.mapTitle}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {t.mapDescription}
              </p>
            </div>

            <iframe
              title={t.mapTitle}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[470px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Электронная приёмная */}
      <section className="container-main pb-24">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-[#0b4b8f] to-[#087d83] px-8 py-12 text-white shadow-[0_24px_70px_rgba(11,75,143,0.22)] sm:px-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-cyan-200">
                {t.receptionLabel}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                {t.receptionTitle}
              </h2>

              <p className="mt-4 leading-7 text-blue-50/85">
                {t.receptionDescription}
              </p>
            </div>

            <Link
              href="/appeals"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-7 py-4 font-extrabold text-[#0b4b8f] shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              {t.receptionButton}
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}