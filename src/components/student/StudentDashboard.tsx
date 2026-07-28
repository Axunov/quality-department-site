"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import {
  clearStudentPortalToken,
  readStudentPortalToken,
} from "@/lib/studentPortal";

type Profile = {
  participant_name: string;
  resolved_group_name: string;
  teacher_survey_title: string;
  teacher_survey_available: boolean;
  teacher_survey_completed: boolean;
};

const content = {
  ru: {
    eyebrow: "Личный кабинет",
    title: "Здравствуйте",
    group: "Учебная группа",
    surveys: "Доступные опросы",
    survey: "Преподаватель глазами студента",
    surveyDescription:
      "Анонимная оценка качества преподавания в текущем семестре.",
    available: "Доступен для прохождения",
    completed: "Опрос завершён",
    unavailable: "Сейчас недоступен",
    start: "Пройти опрос",
    logout: "Выйти",
    loading: "Загрузка кабинета…",
    privacy:
      "Личный кабинет подтверждает только факт участия. Ответы анкеты не связываются с вашим Ф.И.О. или Student ID.",
  },
  uz: {
    eyebrow: "Shaxsiy kabinet",
    title: "Assalomu alaykum",
    group: "O‘quv guruhi",
    surveys: "Mavjud so‘rovlar",
    survey: "O‘qituvchi talaba nigohida",
    surveyDescription: "Joriy semestrdagi o‘qitish sifatini anonim baholash.",
    available: "Ishtirok etish mumkin",
    completed: "So‘rov yakunlangan",
    unavailable: "Hozir mavjud emas",
    start: "So‘rovni boshlash",
    logout: "Chiqish",
    loading: "Kabinet yuklanmoqda…",
    privacy:
      "Shaxsiy kabinet faqat ishtirok etganlik holatini qayd etadi. Javoblar F.I.Sh. yoki Student ID bilan bog‘lanmaydi.",
  },
  en: {
    eyebrow: "Student account",
    title: "Welcome",
    group: "Study group",
    surveys: "Available surveys",
    survey: "Teacher Through the Eyes of a Student",
    surveyDescription: "Anonymous assessment of teaching quality this semester.",
    available: "Available",
    completed: "Survey completed",
    unavailable: "Currently unavailable",
    start: "Take survey",
    logout: "Sign out",
    loading: "Loading account…",
    privacy:
      "Your account records participation only. Survey answers are not linked to your name or Student ID.",
  },
} as const;

export default function StudentDashboard({ locale }: { locale: string }) {
  const lang = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[lang];
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const token = readStudentPortalToken();
    if (!token) {
      router.replace("/student/login");
      return;
    }

    void supabase
      .rpc("student_portal_profile", { p_portal_token: token })
      .then(({ data, error }) => {
        const row = data?.[0] as Profile | undefined;
        if (error || !row) {
          clearStudentPortalToken();
          router.replace("/student/login");
          return;
        }
        setProfile(row);
      });
  }, [router, supabase]);

  async function logout() {
    const token = readStudentPortalToken();
    if (token) {
      await supabase.rpc("student_portal_logout", { p_portal_token: token });
    }
    clearStudentPortalToken();
    router.replace("/student/login");
  }

  if (!profile) {
    return (
      <main className="container-main py-16">
        <p className="text-center font-semibold text-slate-600">{t.loading}</p>
      </main>
    );
  }

  const status = profile.teacher_survey_completed
    ? t.completed
    : profile.teacher_survey_available
      ? t.available
      : t.unavailable;

  return (
    <main className="container-main py-8 sm:py-12">
      <div className="flex flex-col justify-between gap-5 rounded-[30px] bg-gradient-to-br from-[#083b73] to-[#087d83] p-7 text-white shadow-xl sm:flex-row sm:items-end sm:p-10">
        <div>
          <p className="text-sm font-black uppercase tracking-[.2em] text-cyan-100">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            {t.title}, {profile.participant_name}
          </h1>
          <p className="mt-4 text-blue-50">
            {t.group}: <strong>{profile.resolved_group_name}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="self-start rounded-xl border border-white/40 px-5 py-3 font-bold text-white transition hover:bg-white/10 sm:self-auto"
        >
          {t.logout}
        </button>
      </div>

      <p className="mt-7 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-sm leading-6 text-cyan-950">
        {t.privacy}
      </p>

      <section className="mt-9">
        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{t.surveys}</h2>
        <article className="mt-5 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">
                {profile.teacher_survey_title || t.survey}
              </p>
              <h3 className="mt-2 text-2xl font-black text-slate-900">{t.survey}</h3>
              <p className="mt-3 leading-7 text-slate-600">{t.surveyDescription}</p>
              <span
                className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-black ${
                  profile.teacher_survey_completed
                    ? "bg-emerald-100 text-emerald-800"
                    : profile.teacher_survey_available
                      ? "bg-blue-100 text-blue-800"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {status}
              </span>
            </div>
            {profile.teacher_survey_available && !profile.teacher_survey_completed && (
              <button
                type="button"
                onClick={() => router.push("/surveys/teacher")}
                className="rounded-2xl bg-blue-700 px-7 py-4 text-lg font-black text-white transition hover:bg-blue-800"
              >
                {t.start}
              </button>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
