"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import {
  readStudentPortalToken,
  saveStudentPortalToken,
} from "@/lib/studentPortal";

const content = {
  ru: {
    eyebrow: "Кабинет студента",
    title: "Вход в личный кабинет",
    description:
      "Введите выданный вам Student ID. После входа вы увидите доступные опросы и их статус.",
    label: "Student ID",
    hint: "Формат: STU-0001",
    button: "Войти",
    loading: "Проверяем…",
    privacy:
      "Student ID используется только для входа и учёта участия. Ответы анкет хранятся отдельно и остаются анонимными.",
    error: "Не удалось войти. Проверьте Student ID и попробуйте ещё раз.",
  },
  uz: {
    eyebrow: "Talaba kabineti",
    title: "Shaxsiy kabinetga kirish",
    description:
      "Sizga berilgan Student ID raqamini kiriting. Kabinetda mavjud so‘rovlar va ularning holatini ko‘rasiz.",
    label: "Student ID",
    hint: "Format: STU-0001",
    button: "Kirish",
    loading: "Tekshirilmoqda…",
    privacy:
      "Student ID faqat kirish va ishtirokni hisobga olish uchun ishlatiladi. So‘rov javoblari alohida saqlanadi va anonim qoladi.",
    error: "Kirish amalga oshmadi. Student ID ni tekshirib, qayta urinib ko‘ring.",
  },
  en: {
    eyebrow: "Student portal",
    title: "Sign in to your account",
    description:
      "Enter your assigned Student ID to see available surveys and their status.",
    label: "Student ID",
    hint: "Format: STU-0001",
    button: "Sign in",
    loading: "Checking…",
    privacy:
      "Your Student ID is used only for sign-in and participation tracking. Survey answers are stored separately and remain anonymous.",
    error: "Unable to sign in. Check your Student ID and try again.",
  },
} as const;

export default function StudentLogin({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[lang];
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [studentId, setStudentId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (readStudentPortalToken()) {
      router.replace("/student");
    }
  }, [router]);

  async function login(event: FormEvent) {
    event.preventDefault();
    if (!studentId.trim()) return;
    setBusy(true);
    setMessage("");

    const { data, error } = await supabase.rpc("student_portal_login", {
      p_student_identifier: studentId.trim().toUpperCase(),
    });
    const session = data?.[0] as { portal_token?: string } | undefined;

    if (error || !session?.portal_token) {
      setMessage(t.error);
      setBusy(false);
      return;
    }

    saveStudentPortalToken(session.portal_token);
    router.replace("/student");
  }

  return (
    <main className="container-main py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-br from-[#083b73] to-[#087d83] p-7 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[.2em] text-cyan-100">
              {t.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-black sm:text-5xl">{t.title}</h1>
            <p className="mt-4 max-w-xl leading-7 text-blue-50">{t.description}</p>
          </div>

          <form onSubmit={login} className="p-6 sm:p-10">
            <label className="block font-bold text-slate-800">
              {t.label}
              <input
                autoFocus
                autoComplete="off"
                value={studentId}
                onChange={(event) => setStudentId(event.target.value.toUpperCase())}
                placeholder="STU-0001"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-5 py-4 font-mono text-lg uppercase outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
              <span className="mt-2 block text-sm font-normal text-slate-500">
                {t.hint}
              </span>
            </label>

            <p className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950">
              {t.privacy}
            </p>

            {message && (
              <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-4 font-semibold text-amber-900">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !studentId.trim()}
              className="mt-6 w-full rounded-2xl bg-blue-700 px-6 py-4 text-lg font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? t.loading : t.button}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
