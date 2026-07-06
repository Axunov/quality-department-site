"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const languages = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full bg-blue-50 p-1 text-sm font-bold text-blue-800">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathname}
          locale={lang.code}
          className={
            locale === lang.code
              ? "rounded-full bg-blue-700 px-3 py-2 text-white"
              : "rounded-full px-3 py-2 hover:bg-white"
          }
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}