"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

type Locale = "ru" | "uz" | "en";
type Setup = { factorId: string; challengeId: string; qr?: string; secret?: string; enrolled: boolean };
const tx = {
  ru: { title: "Защита админ-панели", intro: "Для входа требуется одноразовый код из приложения-аутентификатора.", setup: "Первичная настройка", scan: "Отсканируйте QR-код в Google Authenticator, Microsoft Authenticator или другом TOTP-приложении.", secret: "Резервный ключ для ручного ввода", code: "Шестизначный код", verify: "Подтвердить и войти", checking: "Проверяем…", error: "Код не подтверждён. Проверьте время на телефоне и повторите попытку.", existing: "Введите код из ранее подключённого приложения.", logout: "Выйти" },
  uz: { title: "Admin panel himoyasi", intro: "Kirish uchun autentifikator ilovasidagi bir martalik kod talab qilinadi.", setup: "Dastlabki sozlash", scan: "QR-kodni Google Authenticator, Microsoft Authenticator yoki boshqa TOTP ilovasida skanerlang.", secret: "Qo‘lda kiritish uchun zaxira kalit", code: "Olti xonali kod", verify: "Tasdiqlash va kirish", checking: "Tekshirilmoqda…", error: "Kod tasdiqlanmadi. Telefon vaqtini tekshirib, qayta urinib ko‘ring.", existing: "Avval ulangan ilovadagi kodni kiriting.", logout: "Chiqish" },
  en: { title: "Admin panel protection", intro: "A one-time code from an authenticator app is required to continue.", setup: "Initial setup", scan: "Scan the QR code with Google Authenticator, Microsoft Authenticator or another TOTP app.", secret: "Backup key for manual entry", code: "Six-digit code", verify: "Verify and continue", checking: "Checking…", error: "The code was not verified. Check your phone time and try again.", existing: "Enter the code from your previously connected app.", logout: "Sign out" },
} as const;

export default function AdminMfa({ locale }: { locale: string }) {
  const lang: Locale = locale === "uz" || locale === "en" ? locale : "ru", t = tx[lang], router = useRouter(), supabase = useMemo(() => createClient(), []);
  const [setup, setSetup] = useState<Setup | null>(null), [code, setCode] = useState(""), [busy, setBusy] = useState(true), [message, setMessage] = useState("");
  useEffect(() => { let active = true; void (async () => {
    const { data: factors, error } = await supabase.auth.mfa.listFactors();
    if (!active) return;
    if (error) { setMessage(t.error); setBusy(false); return; }
    const verified = factors.totp.find(factor => factor.status === "verified");
    if (verified) { const challenge = await supabase.auth.mfa.challenge({ factorId: verified.id }); if (challenge.data && active) setSetup({ factorId: verified.id, challengeId: challenge.data.id, enrolled: true }); }
    else { const enrolled = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "Quality Department Admin" }); if (!enrolled.data || !active) { setMessage(t.error); setBusy(false); return; } const challenge = await supabase.auth.mfa.challenge({ factorId: enrolled.data.id }); if (challenge.data && active) setSetup({ factorId: enrolled.data.id, challengeId: challenge.data.id, qr: enrolled.data.totp.qr_code, secret: enrolled.data.totp.secret, enrolled: false }); }
    if (active) setBusy(false);
  })(); return () => { active = false; }; }, [supabase, t.error]);
  async function verify() { if (!setup || !/^\d{6}$/.test(code)) return; setBusy(true); setMessage(""); const { error } = await supabase.auth.mfa.verify({ factorId: setup.factorId, challengeId: setup.challengeId, code }); if (error) { setMessage(t.error); setCode(""); setBusy(false); return; } router.replace("/admin"); router.refresh(); }
  return <main className="flex min-h-screen items-center justify-center bg-slate-100 p-5"><section className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl sm:p-9"><div className="text-center"><span className="text-5xl">🛡️</span><h1 className="mt-4 text-3xl font-black text-slate-900">{t.title}</h1><p className="mt-3 text-slate-600">{t.intro}</p></div>{busy && !setup ? <p className="mt-8 text-center">{t.checking}</p> : setup && <div className="mt-7 space-y-5">{!setup.enrolled && <><h2 className="text-xl font-black">{t.setup}</h2><p className="text-sm leading-6 text-slate-600">{t.scan}</p>{setup.qr && <img src={setup.qr} alt="TOTP QR" className="mx-auto h-56 w-56 rounded-2xl border bg-white p-3"/>}<div className="rounded-xl bg-slate-100 p-4"><p className="text-xs font-bold text-slate-500">{t.secret}</p><code className="mt-2 block break-all font-bold">{setup.secret}</code></div></>} {setup.enrolled && <p className="rounded-xl bg-blue-50 p-4 font-semibold text-blue-900">{t.existing}</p>}<label className="block font-bold">{t.code}<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ""))} className="mt-2 w-full rounded-xl border p-4 text-center font-mono text-2xl tracking-[.4em]"/></label>{message && <p className="rounded-xl bg-red-50 p-4 text-red-700">{message}</p>}<button onClick={() => void verify()} disabled={busy || code.length !== 6} className="w-full rounded-xl bg-blue-700 px-5 py-4 font-black text-white disabled:opacity-50">{busy ? t.checking : t.verify}</button></div>}<button onClick={async () => { await supabase.auth.signOut(); router.replace("/admin/login"); }} className="mt-6 w-full text-sm font-bold text-slate-500">{t.logout}</button></section></main>;
}
