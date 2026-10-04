"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { LayoutDashboard, Newspaper, FileText, Users, ClipboardList, Building2, GraduationCap, FlaskConical, Mail, ListChecks, Landmark, ShieldCheck, Wrench, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const labels = {
  ru: {
    panel: "Админ-панель",
    subtitle: "Управление сайтом",
    tools: "Инструменты",
    dashboard: "Обзор",
    news: "Новости",
    documents: "Документы",
    employees: "Сотрудники",
    surveys: "Опрос студентов",
    employerSurveys: "Опрос работодателей",
    graduateSurveys: "Опрос выпускников",
    doctoralSurveys: "Опрос докторантов",
    studentAppeals: "Обращения студентов",
    hemisQuiz: "Тест HEMIS",
    accreditation: "Аккредитация",
    security: "Безопасность",
    site: "← На сайт",
  },
  uz: {
    panel: "Admin panel",
    subtitle: "Saytni boshqarish",
    tools: "Vositalar",
    dashboard: "Umumiy ko‘rinish",
    news: "Yangiliklar",
    documents: "Hujjatlar",
    employees: "Xodimlar",
    surveys: "Talabalar so‘rovi",
    employerSurveys: "Ish beruvchilar so‘rovi",
    graduateSurveys: "Bitiruvchilar so‘rovi",
    doctoralSurveys: "Doktorantlar so‘rovi",
    studentAppeals: "Talabalar murojaatlari",
    hemisQuiz: "HEMIS testi",
    accreditation: "Akkreditatsiya",
    security: "Xavfsizlik",
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
    surveys: "Student survey",
    employerSurveys: "Employer survey",
    graduateSurveys: "Graduate survey",
    doctoralSurveys: "Doctoral survey",
    studentAppeals: "Student appeals",
    hemisQuiz: "HEMIS test",
    accreditation: "Accreditation",
    security: "Security",
    site: "← Back to site",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [unreadAppeals, setUnreadAppeals] = useState(0);
  const locale = useLocale();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/mfa";
  useEffect(() => {
    if (isLoginPage) return;
    const load = async () => { const response = await fetch("/api/admin/appeal-notifications", { cache: "no-store" }); if (response.ok) setUnreadAppeals((await response.json()).unread || 0); };
    void load(); const timer = window.setInterval(load, 60_000); return () => window.clearInterval(timer);
  }, [isLoginPage, pathname]);

  const menuItems = [
    { href: "/admin", label: t.dashboard, icon: LayoutDashboard },
    { href: "/admin/news", label: t.news, icon: Newspaper },
    { href: "/admin/documents", label: t.documents, icon: FileText },
    { href: "/admin/employees", label: t.employees, icon: Users },
    { href: "/admin/surveys/teacher", label: t.surveys, icon: ClipboardList },
    { href: "/admin/surveys/employers", label: t.employerSurveys, icon: Building2 },
    { href: "/admin/surveys/graduates", label: t.graduateSurveys, icon: GraduationCap },
    { href: "/admin/surveys/doctoral", label: t.doctoralSurveys, icon: FlaskConical },
    { href: "/admin/tools/appeals", label: t.studentAppeals, icon: Mail, badge: unreadAppeals },
    { href: "/admin/hemis-quiz", label: t.hemisQuiz, icon: ListChecks },
    { href: "/admin/accreditation", label: t.accreditation, icon: Landmark },
    { href: "/admin/security", label: t.security, icon: ShieldCheck },
    { href: "/admin/tools",  label: t.tools,  icon: Wrench,},
  ];

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <main className="admin-shell min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row">
        <aside className="admin-sidebar w-full border-b border-slate-200 bg-white p-4 text-slate-900 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:self-start md:overflow-y-auto md:border-r md:border-b-0">
          <div className="flex items-start justify-between gap-3">
            <div>
            <h1 className="text-lg font-bold">{t.panel}</h1>
            <p className="mt-1 text-xs text-slate-500">{t.subtitle}</p>
            </div>
            <div className="flex gap-1"><ThemeToggle/><button type="button" className="header-control md:hidden" onClick={()=>setNavigationOpen(v=>!v)} aria-expanded={navigationOpen} aria-controls="admin-navigation" aria-label={t.tools}>{navigationOpen?<X size={18}/>:<Menu size={18}/>}</button></div>
          </div>

          <nav id="admin-navigation" className={`${navigationOpen ? "grid" : "hidden"} mt-5 gap-1 md:block md:space-y-1`}>
            {menuItems.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={()=>setNavigationOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-blue-50 font-semibold text-blue-800"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={17} className="shrink-0"/>
                  {item.label}
                  {Boolean(item.badge) && <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-black text-white">{item.badge}</span>}
                </Link>
              );
            })}

            <Link
              href="/"
              className="block rounded-lg bg-slate-100 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-200 md:mt-6"
            >
              {t.site}
            </Link>
            <AdminLogoutButton />
          </nav>
        </aside>

        <section className="admin-content min-w-0 flex-1"><div className="admin-topbar"><p className="text-sm font-semibold text-slate-600">{menuItems.filter(x=>x.href==='/admin'?pathname===x.href:pathname===x.href||pathname.startsWith(`${x.href}/`)).sort((a,b)=>b.href.length-a.href.length)[0]?.label || t.panel}</p><LanguageSwitcher/></div><div className="p-4 sm:p-6 lg:p-8">{children}</div></section>
      </div>
    </main>
  );
}
