"use client";
import AccountGateway from "./AccountGateway";
import { learningLocale, learningQualityCopy } from "@/data/learningQualityCopy";
import { surveyText } from "@/lib/surveyI18n";


import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import AccessibilityToggle from "./AccessibilityToggle";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { catalogCopy } from "@/data/surveyCatalog";
import QuickSearch from "@/components/search/QuickSearch";
import { portalLocale, portalUI } from "@/data/portal";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const tr = (text: string) => surveyText(currentLocale, text);

  const t = useTranslations("Header");
  const pathname = usePathname();
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    let previous=window.scrollY,frame=0,directionAt=previous;
    const update=()=>{
      frame=0;
      const y=window.scrollY,element=headerRef.current;
      const changed=y-previous;
      if(y<=40||changed < -1||element?.matches(":focus-within")||element?.querySelector("details[open]")) {
        element?.removeAttribute("data-condensed");
        directionAt=y;
      } else if(y-directionAt>=12 && changed>0) {
        element?.setAttribute("data-condensed","true");
      }
      previous=y;
    };
    const queue=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener("scroll",queue,{passive:true});
    return ()=>{window.removeEventListener("scroll",queue);cancelAnimationFrame(frame);};
  },[]);

  const portalLabels = {
    ru: { services:"Сервисы", navigation:"Основная навигация", resources:"Ресурсы", quality: "Система качества", self: "Самооценка", monitoring: "Мониторинг", analytics: "Аналитика", open: "Открытые материалы", appeals: "Обращения", faq: "FAQ", survey: "Опрос студентов", employerSurvey: "Опрос работодателей", graduateSurvey: "Опрос выпускников", doctoralSurvey: "Опрос докторантов" },
    uz: { services:"Xizmatlar", navigation:"Asosiy menyu", resources:"Resurslar", quality: "Sifat tizimi", self: "Özini özi baholaş", monitoring: "Monitoring", analytics: "Tahlil", open: "Oçiq materiallar", appeals: "Murojaatlar", faq: "FAQ", survey: "Talabalar sörovi", employerSurvey: "Iş beruvçilar sörovi", graduateSurvey: "Bitiruvçilar sörovi", doctoralSurvey: "Doktorantlar sörovi" },
    en: { services:"Services", navigation:"Main navigation", resources:"Resources", quality: "Quality system", self: "Self-assessment", monitoring: "Monitoring", analytics: "Analytics", open: "Open resources", appeals: "Appeals", faq: "FAQ", survey: "Student survey", employerSurvey: "Employer survey", graduateSurvey: "Graduate survey", doctoralSurvey: "Doctoral survey" },
  } as const;
  const currentLocale = locale === "uz" || locale === "en" ? locale : "ru";
  const portal = portalLabels[currentLocale];
  const account = portalUI[portalLocale(locale)];
  const portalItems = [
    { href: "/self-assessment", label: portal.self },
    { href: "/open-data", label: portal.open },
    { href: "/faq", label: portal.faq },
    { href: "/surveys/teacher", label: portal.survey },
    { href: "/surveys/employers", label: portal.employerSurvey },
    { href: "/surveys/graduates", label: portal.graduateSurvey },
    { href: "/surveys/doctoral", label: portal.doctoralSurvey },
    { href: "/surveys/learning-quality", label: learningQualityCopy[learningLocale(locale)].menu },
  ];

  const navItems = [
  { href: "/", label: t("home") },
  { href: "/about", label: account.about },
  { href: "/documents", label: t("documents") },
  { href: "/analytics", label: portal.analytics },
  { href: "/surveys", label: catalogCopy[currentLocale].title },
  { href: "/appeals", label: portal.appeals },
  { href: "/monitoring", label: portal.monitoring },
  { href: "/employees", label: t("employees") },
  { href: "/news", label: t("news") },
  { href: "/accreditation", label: t("accreditation") },
  { href: "/contacts", label: t("contacts") },
  ];

  const main = navItems.slice(0,4);
  const services = navItems.filter(item => ["/surveys","/appeals","/monitoring","/accreditation"].includes(item.href));
  const resources = navItems.filter(item => ["/news","/employees","/contacts"].includes(item.href));
  const isActive = (href:string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  const sections = [[portal.services,services],[portal.quality,portalItems],[portal.resources,resources]] as const;

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="container-main">
        <div className="flex items-center justify-between gap-3 py-3 lg:gap-5 masthead-row">
          <Link href="/" locale={locale} className="flex min-w-0 items-center gap-3 lg:gap-4">
            <Image
              src="/images/logo.jpg"
              alt={tr("Логотип института")}
              width={48}
              height={48}
              priority
              className="h-10 w-10 shrink-0 rounded-full object-cover lg:h-12 lg:w-12"
            />

            <div className="min-w-0">
              <div className="max-w-[360px] text-sm font-bold leading-5 text-slate-900 sm:text-base">
                {t("title")}
              </div>
              <p className="mt-1 hidden max-w-[390px] truncate text-[11px] leading-4 text-slate-500 xl:block">
                {t("institute")}
              </p>
            </div>
          </Link>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <ThemeToggle/><AccessibilityToggle compact label={t("accessibility")}/><LanguageSwitcher/>
            <AccountGateway locale={locale}/>
          </div>

          <div className="flex items-center gap-2">
          <QuickSearch locale={locale} />
          <div className="lg:hidden"><ThemeToggle /></div>
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

        <nav aria-label={portal.navigation} className="hidden items-center flex-wrap justify-start gap-3 border-t border-slate-200 py-1.5 text-sm font-semibold lg:flex">
          {main.map((item) => {
            const active = isActive(item.href);
                       

            return (
              <Link
                key={item.href}
                href={item.href}
                locale={locale}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-xl px-2.5 transition xl:px-3 ${
                  active
                    ? "bg-[#0b3b78] text-white"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <details className="group relative" name="main-menu" onKeyDown={event=>{
            if(event.key==="Escape"&&event.currentTarget.open){
              event.currentTarget.open=false;event.currentTarget.querySelector("summary")?.focus();
            }
          }}>
            <summary className="cursor-pointer list-none rounded-xl px-3 py-3 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
              {portal.services} <span aria-hidden="true" className="ml-1">⌄</span>
            </summary>
            <div className="header-dropdown absolute left-0 top-full z-50 grid max-h-[65vh] w-[min(46rem,55vw)] grid-cols-3 gap-3 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
              {sections.map(([label,items])=><section key={label} aria-label={label}>
                <p className="px-2 py-2 text-xs font-bold uppercase tracking-wide text-cyan-700">{label}</p>
                {items.map(item=><Link key={item.href} href={item.href} aria-current={isActive(item.href)?"page":undefined} onClick={event=>event.currentTarget.closest("details")?.removeAttribute("open")} className="block rounded-lg px-2 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700">{item.label}</Link>)}
              </section>)}
            </div>
          </details>
        </nav>

        {menuOpen && (
          <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-100 py-4 lg:hidden">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <LanguageSwitcher />
              <AccountGateway locale={locale}/>
            </div>
            <nav aria-label={portal.navigation} className="grid gap-1 text-sm font-semibold">
              {main.map((item) => (
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
              {sections.map(([label,items])=><details key={label} className="rounded-xl border border-slate-200 px-2">
                <summary className="cursor-pointer px-2 py-3 font-bold">{label}</summary>
                <div className="grid pb-2">{items.map(item=><Link key={item.href} href={item.href} locale={locale} onClick={()=>setMenuOpen(false)} aria-current={isActive(item.href)?"page":undefined} className="rounded-lg px-2 py-2.5 text-slate-700 hover:bg-blue-50">{item.label}</Link>)}</div>
              </details>)}
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
