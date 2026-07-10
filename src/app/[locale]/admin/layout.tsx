"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

const labels = {
  ru: {
    panel: "Админ-панель",
    subtitle: "Управление сайтом",
    dashboard: "Dashboard",
    news: "Новости",
    documents: "Документы",
    employees: "Сотрудники",
    site: "← На сайт",
  },
  uz: {
    panel: "Admin panel",
    subtitle: "Saytni boshqarish",
    dashboard: "Dashboard",
    news: "Yangiliklar",
    documents: "Hujjatlar",
    employees: "Xodimlar",
    site: "← Saytga qaytish",
  },
  en: {
    panel: "Admin Panel",
    subtitle: "Website management",
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
  const t = labels[locale as "ru" | "uz" | "en"] || labels.ru;

  const menuItems = [
  { href: "/admin", label: t.dashboard, icon: "📊" },
  { href: "/admin/news", label: t.news, icon: "📰" },
  { href: "/admin/documents", label: t.documents, icon: "📄" },
  { href: "/admin/employees", label: t.employees, icon: "👨‍🏫" },
      ];
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="min-h-screen w-72 bg-[#083b73] p-6 text-white">
          <div>
            <h1 className="text-2xl font-bold">{t.panel}</h1>
            <p className="mt-2 text-sm text-blue-100">
              {t.subtitle}
            </p>
          </div>

          <nav className="mt-8 space-y-2">
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
              className="mt-8 block rounded-xl bg-white/10 px-4 py-3 hover:bg-white/20"
            >
               {t.site}
            </Link>
          </nav>
        </aside>

        <section className="flex-1 p-8">{children}</section>
      </div>
    </main>
  );
}