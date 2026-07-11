"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

const languages = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
] as const;

type Locale = (typeof languages)[number]["code"];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, {
        locale: newLocale,
      });
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
      {languages.map((language) => {
        const isActive = locale === language.code;

        return (
          <button
            key={language.code}
            type="button"
            disabled={isPending}
            onClick={() => changeLanguage(language.code)}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
              isActive
                ? "bg-blue-700 text-white"
                : "text-slate-600 hover:bg-slate-100"
            } disabled:opacity-60`}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}