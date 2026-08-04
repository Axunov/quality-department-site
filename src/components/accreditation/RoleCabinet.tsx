"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Role = "department_head" | "quality_office" | "administrator" | "director";
type Mode = "department" | "admin" | "director";
type Profile = {
  full_name: string;
  job_title: string | null;
  role: Role;
  department_id: string | null;
};
type Indicator = {
  id: string;
  code: string;
  title: string;
  responsible_name: string | null;
  completion_percent: number;
  status: string;
  department_id: string | null;
};
type DirectorSummary = {
  completion_percent: number;
  total_indicators: number;
  under_review: number;
  overdue: number;
};

const labels: Record<string, string> = {
  draft: "Не начато",
  in_progress: "В работе",
  review: "На проверке",
  revision: "На доработке",
  approved: "Принято",
};

const emptySummary: DirectorSummary = {
  completion_percent: 0,
  total_indicators: 0,
  under_review: 0,
  overdue: 0,
};

export default function RoleCabinet({ mode }: { mode: Mode }) {
  const supabase = useMemo(() => createClient(), []);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [items, setItems] = useState<Indicator[]>([]);
  const [summary, setSummary] = useState<DirectorSummary>(emptySummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!userData.user) {
          if (active) setSignedOut(true);
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("accreditation_profiles")
          .select("full_name,job_title,role,department_id")
          .eq("user_id", userData.user.id)
          .maybeSingle();

        if (profileError) {
          throw new Error(
            profileError.message.includes("accreditation_profiles")
              ? "Сначала выполните файл supabase/accreditation_user_cabinets.sql в Supabase."
              : profileError.message
          );
        }

        if (!profileData) {
          if (active) setProfile(null);
          return;
        }

        const currentProfile = profileData as Profile;
        if (active) setProfile(currentProfile);

        let query = supabase
          .from("accreditation_indicators")
          .select("id,code,title,responsible_name,completion_percent,status,department_id")
          .order("code");

        if (mode === "department") {
          if (!currentProfile.department_id) {
            throw new Error("Пользователю не назначено подразделение в профиле аккредитации.");
          }
          query = query.eq("department_id", currentProfile.department_id);
        }

        if (mode === "admin") {
          query = query.in("status", ["review", "revision"]);
        }

        const { data: indicatorData, error: indicatorError } = await query;
        if (indicatorError) throw indicatorError;
        if (active) setItems((indicatorData || []) as Indicator[]);

        if (mode === "director") {
          const { data: dashboardData, error: dashboardError } = await supabase
            .from("accreditation_director_dashboard")
            .select("completion_percent,total_indicators,under_review,overdue")
            .maybeSingle();

          if (dashboardError) {
            throw new Error(
              dashboardError.message.includes("accreditation_director_dashboard")
                ? "Представление кабинета директора ещё не создано. Выполните accreditation_user_cabinets.sql."
                : dashboardError.message
            );
          }

          if (active && dashboardData) setSummary(dashboardData as DirectorSummary);
        }
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Не удалось загрузить кабинет.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [mode, supabase]);

  if (loading) {
    return <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">Загрузка кабинета...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h1 className="text-lg font-bold">Кабинет пока не настроен</h1>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  if (signedOut) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <h1 className="text-lg font-bold">Требуется вход</h1>
        <p className="mt-2 text-sm">Войдите через существующую страницу администратора или корпоративную учётную запись.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <h1 className="text-lg font-bold">Профиль ещё не назначен</h1>
        <p className="mt-2 text-sm">Администратор должен назначить пользователю роль и подразделение в системе аккредитации.</p>
      </div>
    );
  }

  const title =
    mode === "department"
      ? "Кабинет руководителя подразделения"
      : mode === "admin"
        ? "Проверка материалов аккредитации"
        : "Кабинет директора";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-wider">{profile.job_title || profile.role}</p>
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-blue-50">{profile.full_name}</p>
      </section>

      {mode === "director" && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Готовность", `${summary.completion_percent}%`],
            ["Всего", String(summary.total_indicators)],
            ["На проверке", String(summary.under_review)],
            ["Просрочено", String(summary.overdue)],
          ].map(([label, value]) => (
            <article key={label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </article>
          ))}
        </section>
      )}

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">{mode === "admin" ? "Материалы на проверке" : "Индикаторы"}</h2>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">{items.length}</span>
        </div>

        <div className="mt-5 space-y-3">
          {items.length === 0 && (
            <p className="rounded-xl bg-slate-50 p-5 text-slate-500">Нет доступных материалов.</p>
          )}

          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm font-bold text-blue-700">{item.code}</div>
                  <h3 className="mt-1 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">Ответственный: {item.responsible_name || "не назначен"}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.completion_percent}%</div>
                  <div className="text-sm text-slate-500">{labels[item.status] || item.status}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {mode === "department" && (
                  <a href="/ru/accreditation/indicators" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
                    Открыть и загрузить ответ
                  </a>
                )}
                {mode === "admin" && (
                  <a href="/ru/accreditation/indicators" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">
                    Проверить материал
                  </a>
                )}
                {mode === "director" && (
                  <a href="/ru/accreditation/indicators" className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    Посмотреть
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
