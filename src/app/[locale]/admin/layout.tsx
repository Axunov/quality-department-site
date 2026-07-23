"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import ThemeToggle from "@/components/layout/ThemeToggle";

const labels = {
  ru: {
    panel: "Админ-панель",
    subtitle: "Управление сайтом",
    tools: "Инструменты",
    dashboard: "Dashboard",
    news: "Новости",
    documents: "Документы",
    employees: "Сотрудники",
    site: "← На сайт",
  },
  uz: {
    panel: "Admin panel",
    subtitle: "Saytni boshqarish",
    tools: "Vositalar",
    dashboard: "Dashboard",
    news: "Yangiliklar",
    documents: "Hujjatlar",
    employees: "Xodimlar",
    site: "← Saytga qaytish",
  },
  en: {
    panel: "Admin Panel",
    subtitle: "Website management",
    tools: "Tools",
    dashboard: "Dashboard",
    news: "News",
    documents: "Documents",
    employees: "Employees",
    site: "← Back to site",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const isLoginPage = pathname === "/admin/login";

  const menuItems = [
    { href: "/admin", label: t.dashboard, icon: "📊" },
    { href: "/admin/news", label: t.news, icon: "📰" },
    { href: "/admin/documents", label: t.documents, icon: "📄" },
    { href: "/admin/employees", label: t.employees, icon: "👨‍🏫" },
    { href: "/admin/tools",  label: t.tools,  icon: "🛠️",},
  ];

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full bg-gradient-to-br from-[#083b73] via-[#063565] to-[#05243f] p-4 text-white md:sticky md:top-0 md:min-h-screen md:w-72 md:self-start md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
            <h1 className="text-2xl font-bold">{t.panel}</h1>
            <p className="mt-2 text-sm text-blue-100">{t.subtitle}</p>
            </div>
            <ThemeToggle />
          </div>

          <nav className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-8 md:block md:space-y-2">
            {menuItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 transition ${
                    active
                      ? "bg-white text-[#083b73]"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/"
              className="block rounded-xl bg-white/10 px-4 py-3 hover:bg-white/20 md:mt-8"
            >
              {t.site}
            </Link>
            <AdminLogoutButton />
          </nav>
        </aside>

        <section className="admin-content min-w-0 flex-1 p-4 sm:p-6 md:p-8 lg:p-10">{children}</section>
      </div>
    </main>
  );
}
