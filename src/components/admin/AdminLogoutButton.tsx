"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const labels = {
  ru: {
    logout: "Выйти",
    loading: "Выход...",
    error: "Ошибка выхода",
  },
  uz: {
    logout: "Chiqish",
    loading: "Chiqilmoqda...",
    error: "Chiqish xatosi",
  },
  en: {
    logout: "Sign out",
    loading: "Signing out...",
    error: "Sign-out error",
  },
};

export default function AdminLogoutButton() {
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  async function handleLogout() {
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(`${t.error}: ${error.message}`);
      setLoading(false);
      return;
    }

    router.replace(`/${currentLocale}/admin/login`);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="mt-3 block w-full rounded-xl bg-red-500/90 px-4 py-3 text-left font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
    >
      🚪 {loading ? t.loading : t.logout}
    </button>
  );
}