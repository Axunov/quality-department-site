import { Link } from "@/i18n/routing";

const labels = {
  ru: {
    title: "Инструменты администратора",
    subtitle:
      "Внутренние сервисы отдела контроля качества образования",
    dashboard: "Админ-панель",
    dashboardDesc: "Управление новостями, документами и сотрудниками",
    appeals: "Обращения",
    appealsDesc: "Просмотр и обработка поступивших обращений",
    monitoring: "Мониторинг",
    monitoringDesc: "Проведение мониторинга и размещение результатов",
    analytics: "Аналитика",
    analyticsDesc: "Аналитические данные, отчёты и показатели",
    open: "Открыть",
  },
  uz: {
    title: "Administrator vositalari",
    subtitle:
      "Ta’lim sifatini nazorat qilish bo‘limining ichki xizmatlari",
    dashboard: "Admin panel",
    dashboardDesc:
      "Yangiliklar, hujjatlar va xodimlarni boshqarish",
    appeals: "Murojaatlar",
    appealsDesc:
      "Kelib tushgan murojaatlarni ko‘rish va ko‘rib chiqish",
    monitoring: "Monitoring",
    monitoringDesc:
      "Monitoring o‘tkazish va natijalarni joylashtirish",
    analytics: "Tahlil",
    analyticsDesc:
      "Tahliliy ma’lumotlar, hisobotlar va ko‘rsatkichlar",
    open: "Ochish",
  },
  en: {
    title: "Administrator tools",
    subtitle:
      "Internal services of the Education Quality Control Department",
    dashboard: "Admin panel",
    dashboardDesc: "Manage news, documents and employees",
    appeals: "Appeals",
    appealsDesc: "View and process received appeals",
    monitoring: "Monitoring",
    monitoringDesc: "Conduct monitoring and publish results",
    analytics: "Analytics",
    analyticsDesc: "Analytical data, reports and indicators",
    open: "Open",
  },
};

export default async function AdminToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const tools = [
    {
      href: "/admin",
      icon: "⚙️",
      title: t.dashboard,
      description: t.dashboardDesc,
    },
    {
      href: "/admin/tools/appeals",
      icon: "📨",
      title: t.appeals,
      description: t.appealsDesc,
    },
    {
      href: "/admin/tools/monitoring",
      icon: "📋",
      title: t.monitoring,
      description: t.monitoringDesc,
    },
    {
      href: "/admin/tools/analytics",
      icon: "📊",
      title: t.analytics,
      description: t.analyticsDesc,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          {t.title}
        </h1>

        <p className="mt-2 text-slate-500">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-3xl bg-white p-7 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                {tool.icon}
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {tool.title}
                </h2>

                <p className="mt-2 leading-6 text-slate-500">
                  {tool.description}
                </p>

                <p className="mt-5 font-semibold text-blue-700">
                  {t.open} →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}