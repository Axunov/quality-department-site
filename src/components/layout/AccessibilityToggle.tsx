"use client";

import { useEffect, useState } from "react";

export default function AccessibilityToggle({ label }: { label: string }) {
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
      className="rounded px-2 py-1 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {label}
    </button>
  );
}
