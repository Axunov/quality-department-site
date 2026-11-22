"use client";

import type { Locale } from "@/lib/accreditation/specialData";
import { deadlineFilter, indicatorDeadlines, indicatorStatuses, registryCopy, statusFilter, type IndicatorDeadlineFilter, type IndicatorStatusFilter } from "@/lib/accreditation/workspace";

type Filters = { q: string; scope: "all" | "mine"; status: IndicatorStatusFilter; deadline: IndicatorDeadlineFilter; indicator: string };
export type RegistryFilterState = Filters;
export const emptyRegistryFilters: Filters = { q: "", scope: "all", status: "all", deadline: "all", indicator: "" };

export default function RegistryFilters({ locale, filters, onChange, label, total, loading }: {
  locale: Locale; filters: Filters; onChange: (filters: Filters) => void; label: (status: string) => string; total: number; loading: boolean;
}) {
  const t = registryCopy[locale];
  const change = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const narrowed = Boolean(filters.q || filters.indicator || filters.scope !== "all" || filters.status !== "all" || filters.deadline !== "all");
  return <section id="indicator-registry" aria-labelledby="indicator-registry-title" className="campus-card scroll-mt-36">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="text-xl font-bold" id="indicator-registry-title">{t.registry}</h2>
      <p role="status" className="text-sm font-semibold text-slate-600">{loading ? t.loading : `${t.found}: ${total}`}</p>
    </div>
    <label className="mt-4 block text-sm font-semibold">{t.search}
      <input type="search" value={filters.indicator || filters.q} maxLength={120} onChange={e => change({ q:e.target.value, indicator:"" })} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" />
    </label>
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
      <label className="min-w-0 text-sm font-semibold">{t.scope}<select value={filters.scope} onChange={e => change({ scope:e.target.value === "mine" ? "mine" : "all" })} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3"><option value="all">{t.all}</option><option value="mine">{t.mine}</option></select></label>
      <label className="min-w-0 text-sm font-semibold">{t.status}<select value={filters.status} onChange={e => change({ status:statusFilter(e.target.value) })} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3"><option value="all">{t.allStatus}</option>{indicatorStatuses.map(s => <option key={s} value={s}>{label(s)}</option>)}</select></label>
      <label className="min-w-0 text-sm font-semibold">{t.deadline}<select value={filters.deadline} onChange={e => change({ deadline:deadlineFilter(e.target.value) })} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3">{indicatorDeadlines.map(d => <option key={d} value={d}>{d === "all" ? t.allDeadline : t[d]}</option>)}</select></label>
    </div>
    {narrowed && <button type="button" className="campus-filter mt-3 w-fit" onClick={() => onChange(emptyRegistryFilters)}>{t.reset}</button>}
  </section>;
}
