"use client";

import { useEffect, useState } from "react";
import { ClipboardList, LockKeyhole } from "lucide-react";
import { Link } from "@/i18n/routing";
import { portalLocale } from "@/data/portal";
import { audiences, catalogCopy, fixedSurveys } from "@/data/surveyCatalog";
import learningQuality from "@/data/learningQualitySurvey.json";

type Audience = typeof audiences[number];
type Survey = { id: string; title_ru: string; title_uz: string; title_en: string; description_ru: string | null; description_uz: string | null; description_en: string | null; ends_at: string | null };

export default function SurveyCatalog({ locale, initialAudience }: { locale: string; initialAudience?: string }) {
  const lang = portalLocale(locale);
  const t = catalogCopy[lang];
  const [audience, setAudience] = useState<Audience | "all">(audiences.find(a => a === initialAudience) ?? "all");
  const [published, setPublished] = useState<Survey[] | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/student/surveys", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error();
      const body = await response.json();
      if (!controller.signal.aborted) setPublished(body.surveys ?? []);
    }).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, [attempt]);

  const main = fixedSurveys(lang).filter(s => audience === "all" || s.audience === audience);
  const showStudent = audience === "all" || audience === "students";
  const primary = published?.find(s => s.id === learningQuality.id);
  const extras = published?.filter(s => s.id !== learningQuality.id) ?? [];
  const date = new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeZone: "Asia/Tashkent" });

  return <main className="container-main py-9 sm:py-14">
    <header className="campus-banner">
      <span className="section-eyebrow">{t.catalog}</span>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{t.title}</h1>
      <p className="mt-4 max-w-2xl leading-7">{t.lead}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-blue-700">
        <Link href="/monitoring">{t.monitoring}</Link><Link href="/appeals">{t.appeal}</Link>
      </div>
    </header>
    <section className="mt-7" aria-labelledby="survey-audience">
      <h2 id="survey-audience" className="text-lg font-bold">{t.filter}</h2>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="survey-audience">
        {(["all", ...audiences] as const).map(a => <button key={a} type="button" className="campus-filter" aria-pressed={audience === a} onClick={() => setAudience(a)}>{t[a]}</button>)}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {main.map(s => {
          const signIn = s.key === "hemis";
          const isLearning = s.key === "students";
          const badge = isLearning && published ? (primary ? t.active : t.closed) : null;
          const Icon = signIn ? LockKeyhole : ClipboardList;
          return <article key={s.key} className="campus-card">
            <div className="flex flex-wrap items-center gap-2 text-sm"><Icon className="text-blue-600" size={20} aria-hidden="true"/><span className="font-semibold">{t[s.audience]}</span></div>
            <h3 className="mt-4 text-xl font-black">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{s.description}</p>
            <div className="mb-4 mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600"><span>{signIn ? t.account : t.public}</span>{badge && <strong>{badge}</strong>}</div>
            {isLearning && primary?.ends_at && <p className="mb-4 text-sm font-semibold">{t.until}: {date.format(new Date(primary.ends_at))}</p>}
            <div className="mt-auto flex flex-wrap items-center gap-3">
              {(!isLearning || !published || primary) && <Link className="campus-filter w-fit font-bold text-blue-700" href={s.href}>{t.open}<span className="sr-only">: {s.title}</span></Link>}
              {!signIn && <Link className="text-sm font-semibold text-blue-700 hover:underline" href={`/monitoring?survey=${s.key}`}>{t.monitoring}<span className="sr-only">: {s.title}</span></Link>}
            </div>
          </article>;
        })}
      </div>
    </section>
    {showStudent && <section className="mt-8">
      {failed && <div role="status" className="campus-card"><p>{t.statusError}</p><button className="campus-filter mt-3 w-fit" type="button" onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{t.retry}</button></div>}
      {!failed && !published && <p role="status" className="text-sm text-slate-600">{t.unknown}</p>}
      {!!extras.length && <><h2 className="text-xl font-black">{t.extra}</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">
        {extras.map(s => <article key={s.id} className="campus-card">
          <h3 className="text-lg font-bold">{s[`title_${lang}`] || s.title_ru}</h3>
          {s[`description_${lang}`] && <p className="mt-2 text-sm text-slate-600">{s[`description_${lang}`]}</p>}
          {s.ends_at && <p className="mt-2 text-sm font-semibold">{t.until}: {date.format(new Date(s.ends_at))}</p>}
          <Link className="mt-4 font-bold text-blue-700" href={`/surveys/student/${s.id}`}>{t.open}<span className="sr-only">: {s[`title_${lang}`] || s.title_ru}</span></Link>
        </article>)}
      </div></>}
    </section>}
  </main>;
}
