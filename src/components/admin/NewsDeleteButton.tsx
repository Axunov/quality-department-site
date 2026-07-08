"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewsDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Удалить эту новость?");
    if (!ok) return;

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      alert("Ошибка удаления: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
    >
      Удалить
    </button>
  );
}