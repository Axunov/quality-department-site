"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const labels = {
  ru: {
    title: "Вход в админ-панель",
    subtitle: "Введите e-mail и пароль администратора",
    email: "Электронная почта",
    password: "Пароль",
    login: "Войти",
    loading: "Выполняется вход...",
    error: "Ошибка входа",
  },
  uz: {
    title: "Admin panelga kirish",
    subtitle: "Administrator e-mail manzili va parolini kiriting",
    email: "Elektron pochta",
    password: "Parol",
    login: "Kirish",
    loading: "Kirilmoqda...",
    error: "Kirish xatosi",
  },
  en: {
    title: "Admin login",
    subtitle: "Enter the administrator email and password",
    email: "Email",
    password: "Password",
    login: "Sign in",
    loading: "Signing in...",
    error: "Sign-in error",
  },
};

export default function AdminLoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const supabase = createClient();

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`${t.error}: ${error.message}`);
      setLoading(false);
      return;
    }

    router.replace(`/${currentLocale}/admin`);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 text-3xl text-white">
            🔐
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            {t.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="grid gap-2">
            <span className="font-semibold text-slate-700">
              {t.email}
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <label className="grid gap-2">
            <span className="font-semibold text-slate-700">
              {t.password}
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </label>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? t.loading : t.login}
          </button>

          {message && (
            <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}