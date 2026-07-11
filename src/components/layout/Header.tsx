"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const locale = useLocale();

  const navItems = [
  { href: "/", label: t("home") },
  { href: "/about", label: t("about") },
  { href: "/employees", label: t("employees") },
  { href: "/news", label: t("news") },
  { href: "/documents", label: t("documents") },
  { href: "/accreditation", label: t("accreditation") },
  { href: "/contacts", label: t("contacts") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-[#083b73] text-white">
        <div className="container-main flex items-center justify-between py-2 text-xs">
          <div className="flex gap-6">
            <span>📍 {t("address")}</span>
            <span>☎ +998 90 322-26-29</span>
            <span>✉ quality@sbumiptk.uz</span>
          </div>

          <div className="hidden gap-4 md:flex">
            <span>Версия для слабовидящих</span>
            <span>|</span>
            <span>Поиск</span>
          </div>
        </div>
      </div>

      <div className="container-main">
        <div className="flex items-center justify-between gap-8 py-4">
          <Link href="/" locale={locale} className="flex items-center gap-4">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full object-cover"
            />

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                {t("title")}
              </h1>
              <p className="mt-1 max-w-[520px] text-xs leading-5 text-slate-600">
                {t("institute")}
              </p>
            </div>
          </Link>

          <LanguageSwitcher />
        </div>

        <nav className="flex items-center justify-center gap-2 border-t border-slate-100 py-3 text-sm font-semibold">
          {navItems.map((item) => {
            const active = pathname === item.href;
                       

            return (
              <Link
                key={item.href}
                href={item.href}
                locale={locale}
                className={`rounded-full px-4 py-2 transition ${
                  active
                    ? "bg-[#0b3b78] text-white"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}