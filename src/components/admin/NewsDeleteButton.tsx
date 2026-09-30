"use client";
import { useLocale } from "next-intl";
import { surveyText } from "@/lib/surveyI18n";


import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewsDeleteButton({ id }: { id: string }) {
  const currentLocale = useLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(tr("Удалить эту новость?"));
    if (!ok) return;

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      alert(tr("Ошибка удаления: ") + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >{tr("Удалить")}</button>
  );
}