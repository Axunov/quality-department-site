"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

export function TeacherLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || data.user?.app_metadata?.role !== "teacher") {
      if (data.user) await supabase.auth.signOut();
      setMessage("Неверная электронная почта или пароль.");
      setBusy(false);
      return;
    }
    router.replace("/teacher");
    router.refresh();
  }

  return (
    <AuthShell title="Вход для преподавателя" subtitle="Войдите, чтобы пройти тест по работе с HEMIS">
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="Электронная почта"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="form-input" /></Field>
        <Field label="Пароль"><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="form-input" /></Field>
        {message && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white hover:bg-blue-800 disabled:opacity-60">{busy ? "Выполняется вход…" : "Войти"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">Нет учётной записи? <Link href="/teacher/register" className="font-bold text-blue-700">Зарегистрироваться</Link></p>
    </AuthShell>
  );
}

export function TeacherRegister() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", department: "", position: "", phone: "", email: "", password: "", confirm: "" });
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (form.password !== form.confirm) return setMessage("Пароли не совпадают.");
    if (!consent) return setMessage("Необходимо подтвердить согласие на обработку данных.");
    setBusy(true); setMessage("");
    const response = await fetch("/api/teacher/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    if (!response.ok) { setMessage(result.message || "Ошибка регистрации."); setBusy(false); return; }
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    if (error) { router.replace("/teacher/login"); return; }
    router.replace("/teacher"); router.refresh();
  }

  return (
    <AuthShell title="Регистрация преподавателя" subtitle="Заполните данные самостоятельно. Они будут доступны администратору системы качества.">
      <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field label="Ф.И.О. полностью *" wide><input required minLength={5} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="form-input" /></Field>
        <Field label="Кафедра / подразделение *"><input required value={form.department} onChange={(e) => update("department", e.target.value)} className="form-input" /></Field>
        <Field label="Должность *"><input required value={form.position} onChange={(e) => update("position", e.target.value)} className="form-input" /></Field>
        <Field label="Номер телефона"><input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" /></Field>
        <Field label="Электронная почта *"><input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" className="form-input" /></Field>
        <Field label="Пароль (не менее 8 символов) *"><input type="password" required minLength={8} value={form.password} onChange={(e) => update("password", e.target.value)} autoComplete="new-password" className="form-input" /></Field>
        <Field label="Повторите пароль *"><input type="password" required minLength={8} value={form.confirm} onChange={(e) => update("confirm", e.target.value)} autoComplete="new-password" className="form-input" /></Field>
        <label className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:col-span-2"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" /><span>Подтверждаю достоверность указанных сведений и даю согласие на их обработку для организации тестирования.</span></label>
        {message && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 sm:col-span-2">{message}</p>}
        <button disabled={busy} className="rounded-xl bg-blue-700 px-5 py-3.5 font-bold text-white hover:bg-blue-800 disabled:opacity-60 sm:col-span-2">{busy ? "Создаём учётную запись…" : "Зарегистрироваться и перейти к тесту"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">Уже зарегистрированы? <Link href="/teacher/login" className="font-bold text-blue-700">Войти</Link></p>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <main className="container-main py-10 sm:py-16"><section className="mx-auto max-w-3xl rounded-[30px] border border-slate-200 bg-white p-6 shadow-xl sm:p-10"><div className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b4b8f] to-[#087d83] text-3xl text-white">✓</div><h1 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">{title}</h1><p className="mt-3 text-slate-600">{subtitle}</p></div>{children}</section></main>;
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`grid gap-2 ${wide ? "sm:col-span-2" : ""}`}><span className="text-sm font-bold text-slate-700">{label}</span>{children}</label>;
}
