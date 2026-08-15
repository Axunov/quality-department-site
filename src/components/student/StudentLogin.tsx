"use client";

import Script from "next/script";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";

declare global {
  interface Window {
    onStudentTurnstileSuccess?: (token: string) => void;
    onStudentTurnstileExpired?: () => void;
    turnstile?: { reset: () => void };
  }
}

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
    captcha: "Подтвердите, что вы не робот.",
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
    captcha: "Robot emasligingizni tasdiqlang.",
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
    captcha: "Confirm that you are not a robot.",
    privacy:
      "Your Student ID is used only for sign-in and participation tracking. Survey answers are stored separately and remain anonymous.",
    error: "Unable to sign in. Check your Student ID and try again.",
  },
} as const;

export default function StudentLogin({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[lang];
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    void fetch("/api/student/profile", { cache: "no-store" }).then((response) => {
      if (response.ok) router.replace("/student");
    });
  }, [router]);

  useEffect(() => {
    window.onStudentTurnstileSuccess = (token) => setCaptchaToken(token);
    window.onStudentTurnstileExpired = () => setCaptchaToken("");
    return () => {
      delete window.onStudentTurnstileSuccess;
      delete window.onStudentTurnstileExpired;
    };
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    if (!studentId.trim()) return;
    setBusy(true);
    setMessage("");

    const response = await fetch("/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: studentId.trim().toUpperCase(),
        captchaToken,
      }),
    });
    const result = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      captchaRequired?: boolean;
      message?: string;
    };

    if (!response.ok || !result.ok) {
      setCaptchaRequired(Boolean(result.captchaRequired));
      setMessage(result.message || t.error);
      setCaptchaToken("");
      window.turnstile?.reset();
      setBusy(false);
      return;
    }

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

            {captchaRequired && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  {t.captcha}
                </p>
                {turnstileSiteKey ? (
                  <>
                    <Script
                      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                      strategy="afterInteractive"
                    />
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-action="student_login"
                      data-size="flexible"
                      data-callback="onStudentTurnstileSuccess"
                      data-expired-callback="onStudentTurnstileExpired"
                    />
                  </>
                ) : (
                  <p className="text-sm font-semibold text-red-700">
                    CAPTCHA ещё не настроена администратором.
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={
                busy ||
                !studentId.trim() ||
                (captchaRequired && !captchaToken)
              }
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
