import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import SiteChrome from "@/components/layout/SiteChrome";
import type { Metadata } from "next";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const metadataByLocale = {
  ru: {
    title: "Отдел контроля качества образования",
    description: "Официальный сайт отдела контроля качества образования СБУМИПТК",
  },
  uz: {
    title: "Ta’lim sifatini nazorat qilish bo‘limi",
    description: "Ta’lim sifatini nazorat qilish bo‘limining rasmiy sayti",
  },
  en: {
    title: "Education Quality Control Department",
    description: "Official website of the Education Quality Control Department",
  },
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const meta = metadataByLocale[current];

  return {
    metadataBase: new URL("https://qualitydepartment.netlify.app"),
    title: { default: meta.title, template: `%s | ${meta.title}` },
    description: meta.description,
    applicationName: meta.title,
    alternates: {
      languages: { ru: "/ru", uz: "/uz", en: "/en", "x-default": "/ru" },
    },
    openGraph: {
      type: "website",
      siteName: meta.title,
      title: meta.title,
      description: meta.description,
      locale: current,
      images: ["/images/institute.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) 
{
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteChrome>{children}</SiteChrome>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
