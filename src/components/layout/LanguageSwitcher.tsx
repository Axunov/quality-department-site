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
      router.replace(pathname + window.location.search + window.location.hash, {
        locale: newLocale,
      });
    });
  };

  return (
    <div className="language-switcher" data-active={Math.max(0,languages.findIndex(x=>x.code===locale))}>
      <span className="language-pill" aria-hidden="true"/>
      {languages.map((language) => {
        const isActive = locale === language.code;

        return (
          <button
            key={language.code}
            type="button"
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={language.label}
            onClick={() => changeLanguage(language.code)}
            className="language-option"
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}
