"use client";
import { useLocale } from "next-intl";
import { surveyText } from "@/lib/surveyI18n";


import { newsMediaCopy } from "@/lib/newsMediaCopy";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsDeleteButton({ id }: { id: string }) {
  const currentLocale = useLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    const ok = confirm(tr("Удалить эту новость?"));
    if (!ok) return;

    if (busy) return;
    setBusy(true);
    try {
      const response = await fetch("/api/admin/news", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!response.ok) throw new Error();
      router.refresh();
    } catch { alert(newsMediaCopy(currentLocale).saveError); }
    finally { setBusy(false); }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >{tr("Удалить")}</button>
  );
}