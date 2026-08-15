"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = { user_id: string; full_name: string; department: string; position: string; phone: string | null; email: string; created_at: string };
type Attempt = { id: string; user_id: string; score: number; total_questions: number; passed: boolean; created_at: string };

function downloadCsv(rows: Record<string, unknown>[]) {
  const keys = Object.keys(rows[0] || {});
  const q = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = "\uFEFF" + [keys.map(q).join(";"), ...rows.map((row) => keys.map((key) => q(row[key])).join(";"))].join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = `hemis-test-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(url);
}

export default function HemisQuizAdmin() {
  const supabase = useMemo(() => createClient(), []);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setMessage("");
    const [p, a] = await Promise.all([
      supabase.from("hemis_teacher_profiles").select("*").order("full_name"),
      supabase.from("hemis_quiz_attempts").select("id,user_id,score,total_questions,passed,created_at").order("created_at", { ascending: false }),
    ]);
    if (p.error || a.error) setMessage("Не удалось загрузить реестр. Сначала выполните SQL-файл установки модуля в Supabase.");
    setProfiles((p.data || []) as Profile[]); setAttempts((a.data || []) as Attempt[]); setLoading(false);
  }, [supabase]);
  useEffect(() => {
    // Загрузка выполняется один раз при открытии административного реестра.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const rows = profiles.map((profile) => {
    const own = attempts.filter((attempt) => attempt.user_id === profile.user_id);
    const best = own.length ? Math.max(...own.map((attempt) => attempt.score)) : null;
    const latest = own[0] || null;
    const passed = own.some((attempt) => attempt.passed);
    return { ...profile, attempts: own.length, best, latest, passed, status: own.length === 0 ? "Не начал" : passed ? "Пройден" : "Не набран проходной балл" };
  });
  const shown = rows.filter((row) => {
    const text = `${row.full_name} ${row.department} ${row.position} ${row.email}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "passed" && row.passed) || (filter === "not-started" && row.attempts === 0) || (filter === "failed" && row.attempts > 0 && !row.passed);
    return matchSearch && matchFilter;
  });

  const passedCount = rows.filter((row) => row.passed).length;
  const notStarted = rows.filter((row) => row.attempts === 0).length;
  const failed = rows.length - passedCount - notStarted;
  const exportRows = shown.map((row) => ({ "Ф.И.О.": row.full_name, "Кафедра": row.department, "Должность": row.position, "Телефон": row.phone, "Почта": row.email, "Статус": row.status, "Лучший результат": row.best === null ? "" : `${row.best}/15`, "Попыток": row.attempts, "Последняя попытка": row.latest ? new Date(row.latest.created_at).toLocaleString("ru-RU") : "" }));

  return <div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-black uppercase tracking-[.18em] text-cyan-700">Контроль прохождения</p><h1 className="mt-2 text-4xl font-black text-slate-950">Тест по HEMIS</h1><p className="mt-2 text-slate-500">Отображаются преподаватели, которые самостоятельно зарегистрировались.</p></div><button onClick={() => downloadCsv(exportRows)} disabled={!shown.length} className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white disabled:opacity-50">Скачать Excel/CSV</button></div>
    <div className="mt-7 grid gap-4 sm:grid-cols-4"><Card label="Зарегистрировано" value={rows.length} color="text-blue-700" /><Card label="Успешно прошли" value={passedCount} color="text-emerald-700" /><Card label="Не начали" value={notStarted} color="text-amber-700" /><Card label="Не набрали 80%" value={failed} color="text-red-700" /></div>
    <div className="mt-6 grid gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-[1fr_260px]"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по Ф.И.О., кафедре или почте" className="form-input" /><select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-input"><option value="all">Все статусы</option><option value="passed">Успешно прошли</option><option value="not-started">Не начали</option><option value="failed">Не набрали 80%</option></select></div>
    {message && <p className="mt-5 rounded-xl bg-red-50 p-4 font-semibold text-red-700">{message}</p>}
    <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm"><table className="min-w-full text-sm"><thead className="bg-slate-50 text-left text-slate-600"><tr>{["Ф.И.О.", "Кафедра и должность", "Контакты", "Результат", "Статус"].map((item) => <th key={item} className="px-5 py-4 font-bold">{item}</th>)}</tr></thead><tbody className="divide-y">{shown.map((row) => <tr key={row.user_id} className="align-top"><td className="px-5 py-4 font-bold text-slate-900">{row.full_name}<p className="mt-1 text-xs font-normal text-slate-400">Регистрация: {new Date(row.created_at).toLocaleDateString("ru-RU")}</p></td><td className="px-5 py-4">{row.department}<p className="mt-1 text-slate-500">{row.position}</p></td><td className="px-5 py-4">{row.email}<p className="mt-1 text-slate-500">{row.phone || "—"}</p></td><td className="px-5 py-4 font-bold">{row.best === null ? "—" : `${row.best}/15`}<p className="mt-1 font-normal text-slate-500">Попыток: {row.attempts}</p></td><td className="px-5 py-4"><Status value={row.status} /></td></tr>)}</tbody></table>{!loading && !shown.length && <p className="p-10 text-center text-slate-500">Записи не найдены.</p>}{loading && <p className="p-10 text-center text-slate-500">Загрузка реестра…</p>}</div>
  </div>;
}

function Card({ label, value, color }: { label: string; value: number; color: string }) { return <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><p className={`mt-2 text-4xl font-black ${color}`}>{value}</p></div>; }
function Status({ value }: { value: string }) { const style = value === "Пройден" ? "bg-emerald-100 text-emerald-800" : value === "Не начал" ? "bg-amber-100 text-amber-900" : "bg-red-100 text-red-800"; return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${style}`}>{value}</span>; }
