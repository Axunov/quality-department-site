"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function AccessibilityToggle({ label, compact = false }: { label: string; compact?: boolean }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("accessibility-mode") === "true";
    setEnabled(saved);
    document.documentElement.classList.toggle("accessibility-mode", saved);
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem("accessibility-mode", String(next));
    document.documentElement.classList.toggle("accessibility-mode", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className={compact ? "header-control" : "rounded px-2 py-1 text-sm transition hover:bg-slate-100"}
    >
      {compact ? <Eye aria-hidden="true" size={19}/> : label}
    </button>
  );
}
