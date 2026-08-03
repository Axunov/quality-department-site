"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Progress = {
  total_indicators: number;
  approved_indicators: number;
  review_indicators: number;
  revision_indicators: number;
  completion_percent: number;
};

const empty: Progress = {
  total_indicators: 0,
  approved_indicators: 0,
  review_indicators: 0,
  revision_indicators: 0,
  completion_percent: 0,
};

export default function AccreditationProgress() {
  const supabase = useMemo(() => createClient(), []);
  const [progress, setProgress] = useState<Progress>(empty);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data } = await supabase
        .from("accreditation_overall_progress")
        .select("total_indicators,approved_indicators,review_indicators,revision_indicators,completion_percent")
        .limit(1)
        .maybeSingle();

      if (active && data) setProgress(data as Progress);
    }

    void load();
    const channel = supabase
      .channel("accreditation-progress")
      .on("postgres_changes", { event: "*", schema: "public", table: "accreditation_indicators" }, load)
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  const cards = [
    ["Общая готовность", `${progress.completion_percent}%`],
    ["Всего индикаторов", String(progress.total_indicators)],
    ["На проверке", String(progress.review_indicators)],
    ["На доработке", String(progress.revision_indicators)],
  ];

  return (
    <>
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>Фактическая готовность</span>
          <span>{progress.completion_percent}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress.completion_percent}%` }} />
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Процент рассчитывается автоматически по всем индикаторам и изменяется после загрузки, отправки на проверку, доработки и принятия материалов.
        </p>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl font-bold text-slate-950">{value}</div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
          </article>
        ))}
      </section>
    </>
  );
}
