"use client";

import { Moon, Sun } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const labels = {
  ru: { dark: "Включить тёмную тему", light: "Включить светлую тему" },
  uz: { dark: "Tungi mavzuni yoqish", light: "Yorug‘ mavzuni yoqish" },
  en: { dark: "Enable dark theme", light: "Enable light theme" },
};

export default function ThemeToggle() {
  const locale = useLocale();
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={dark ? labels[current].light : labels[current].dark}
      title={dark ? labels[current].light : labels[current].dark}
    >
      {dark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
