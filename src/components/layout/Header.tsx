"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import AccessibilityToggle from "./AccessibilityToggle";
import ThemeToggle from "./ThemeToggle";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const portalLabels = {
    ru: { quality: "Система качества", self: "Самооценка", monitoring: "Мониторинг", analytics: "Аналитика", open: "Открытые материалы", appeals: "Обращения", faq: "FAQ" },
    uz: { quality: "Sifat tizimi", self: "O‘zini o‘zi baholash", monitoring: "Monitoring", analytics: "Tahlil", open: "Ochiq materiallar", appeals: "Murojaatlar", faq: "FAQ" },
    en: { quality: "Quality system", self: "Self-assessment", monitoring: "Monitoring", analytics: "Analytics", open: "Open resources", appeals: "Appeals", faq: "FAQ" },
  } as const;
  const currentLocale = locale === "uz" || locale === "en" ? locale : "ru";
  const portal = portalLabels[currentLocale];
  const portalItems = [
    { href: "/self-assessment", label: portal.self },
    { href: "/monitoring", label: portal.monitoring },
    { href: "/analytics", label: portal.analytics },
    { href: "/open-data", label: portal.open },
    { href: "/appeals", label: portal.appeals },
    { href: "/faq", label: portal.faq },
  ];

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
    <header className="site-header sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="bg-[#083b73] text-white">
        <div className="container-main flex items-center justify-between gap-3 py-2 text-xs">
          <div className="flex min-w-0 items-center gap-4">
            <span className="hidden truncate md:inline">📍 {t("address")}</span>
            <a className="whitespace-nowrap hover:underline" href="tel:+998903222629">
              ☎ +998 90 322-26-29
            </a>
            <a className="hidden hover:underline sm:inline" href="mailto:quality@sbumiptk.uz">
              ✉ quality@sbumiptk.uz
            </a>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <AccessibilityToggle label={t("accessibility")} />
            <span aria-hidden="true">|</span>
            <Link href="/search" className="flex items-center gap-1 rounded px-2 py-1 hover:bg-white/10">
              <Search aria-hidden="true" size={14} />
              {t("search")}
            </Link>
          </div>
        </div>
      </div>

      <div className="container-main">
        <div className="flex items-center justify-between gap-3 py-3 lg:gap-8 lg:py-4">
          <Link href="/" locale={locale} className="flex min-w-0 items-center gap-3 lg:gap-4">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={72}
              height={72}
              priority
              className="h-14 w-14 shrink-0 rounded-full object-cover lg:h-[72px] lg:w-[72px]"
            />

            <div className="min-w-0">
              <div className="text-sm font-extrabold leading-5 text-slate-900 sm:text-base lg:text-xl">
                {t("title")}
              </div>
              <p className="mt-1 hidden max-w-[520px] text-xs leading-5 text-slate-600 md:block">
                {t("institute")}
              </p>
            </div>
          </Link>

          <div className="hidden lg:block"><LanguageSwitcher /></div>

          <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-[#0b3b78] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("closeMenu") : t("menu")}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          </div>
        </div>

        <nav className="hidden items-center justify-center gap-2 border-t border-slate-100 py-3 text-sm font-semibold lg:flex">
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
          <details className="group relative">
            <summary className="cursor-pointer list-none rounded-full px-4 py-2 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
              {portal.quality} <span aria-hidden="true" className="ml-1">⌄</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+.6rem)] z-50 grid min-w-64 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
              {portalItems.map((item) => <Link key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-700">{item.label}</Link>)}
            </div>
          </details>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-100 py-4 lg:hidden">
            <div className="mb-4 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link href="/search" onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700" aria-label={t("search")}>
                <Search aria-hidden="true" size={18} />
              </Link>
            </div>
            <nav className="grid gap-1 text-sm font-semibold">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 ${pathname === item.href ? "bg-[#0b3b78] text-white" : "text-slate-700 hover:bg-blue-50"}`}
                >
                  {item.label}
                </Link>
              ))}
              <p className="px-4 pb-1 pt-4 text-xs font-black uppercase tracking-[.18em] text-cyan-700">{portal.quality}</p>
              {portalItems.map((item) => (
                <Link key={item.href} href={item.href} locale={locale} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-slate-700 hover:bg-blue-50">{item.label}</Link>
              ))}
            </nav>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <AccessibilityToggle label={t("accessibility")} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
