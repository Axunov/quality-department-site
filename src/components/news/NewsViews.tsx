"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const labels = { ru: "Просмотры", uz: "Ko‘rishlar", en: "Views" };

export function NewsViews({ id, count = 0, locale, track = false }: {
  id: string; count?: number; locale: string; track?: boolean;
}) {
  const [views, setViews] = useState(count);
  const language = locale === "uz" || locale === "en" ? locale : "ru";
  useEffect(() => {
    if (!track) return;
    let active = true;
    // Only a visible article records a view, never a prefetched card.
    const record = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", record);
      void fetch(`/api/news/${encodeURIComponent(id)}/view`, { method: "POST" })
        .then(async response => response.ok ? response.json() : null)
        .then(data => { if (active && Number.isSafeInteger(data?.count)) setViews(data.count); })
        .catch(() => {});
    };
    record();
    if (document.visibilityState !== "visible") document.addEventListener("visibilitychange", record);
    return () => { active = false; document.removeEventListener("visibilitychange", record); };
  }, [id, track]);
  const formatted = new Intl.NumberFormat(language).format(views);
  return <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-teal-700 dark:text-teal-300" title={labels[language]} aria-label={`${labels[language]}: ${formatted}`}>
    <Eye size={16} aria-hidden="true" /><span className="tabular-nums">{formatted}</span>
  </span>;
}
