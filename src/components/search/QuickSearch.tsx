"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { portalLocale } from "@/data/portal";
import { searchCategories, searchCopy, type SiteResult } from "@/data/searchCopy";

export default function QuickSearch({ locale }: { locale: string }) {
  const t = searchCopy[portalLocale(locale)];
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<{ query: string; locale: string; results: SiteResult[]; failed?: boolean }>();

  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!dialog.current?.open) dialog.current?.showModal();
        setOpen(true);
        input.current?.focus();
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => document.removeEventListener("keydown", keyboard);
  }, []);

  const term = query.trim();
  useEffect(() => {
    if (!open || term.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ locale, q: term });
        const res = await fetch(`/api/public/search?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error();
        const { results } = await res.json();
        if (!controller.signal.aborted) setResponse({ query: term, locale, results });
      } catch {
        if (!controller.signal.aborted) setResponse({ query: term, locale, results: [], failed: true });
      }
    }, 220);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [locale, open, term]);

  const current = response?.query === term && response.locale === locale ? response : undefined;
  const results = term.length >= 2 ? current?.results || [] : [];
  const fullSearch = { pathname: "/search", query: term ? { q: term } : {} };
  const close = () => dialog.current?.close();

  return <>
    <button type="button" className="header-control" aria-label={t.title} aria-haspopup="dialog" aria-keyshortcuts="Control+k Meta+k" onClick={() => { dialog.current?.showModal(); setOpen(true); input.current?.focus(); }}>
      <Search size={19} aria-hidden="true" />
    </button>
    <dialog ref={dialog} className="quick-search" aria-labelledby="quick-search-title" onClose={() => setOpen(false)}>
      <div className="flex items-center justify-between gap-4 p-4 pb-0 sm:px-6">
        <h2 id="quick-search-title" className="text-lg font-bold">{t.title}</h2>
        <button type="button" onClick={close} className="header-control" aria-label={t.close}><X aria-hidden="true" size={19} /></button>
      </div>
      <div className="flex gap-3 px-4 py-3 sm:px-6">
        <input ref={input} type="search" aria-label={t.placeholder} maxLength={100} value={query} onChange={e => setQuery(e.target.value)} placeholder={t.placeholder} className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3" />
      </div>
      <div className="px-4 sm:px-6">
        <p role="status" className="text-sm text-slate-600">
          {term.length < 2 ? t.prompt : !current ? t.loading : current.failed ? t.error : !results.length ? t.empty : ""}
        </p>
        {searchCategories.map(category => {
          const group = results.filter(x => x.category === category);
          return group.length > 0 && <section className="mt-3" key={category}>
            <h3 className="px-2 text-xs font-bold uppercase tracking-wide text-slate-600">{t[category]}</h3>
            {group.map(x => {
              const detail = <><strong className="block">{x.title}</strong>{x.text && <span className="line-clamp-1 text-sm text-slate-600">{x.text}</span>}</>;
              const classes = "block rounded-lg p-2 hover:bg-blue-50 focus-visible:bg-blue-50";
              return x.external
                ? <a key={x.id} href={x.href} className={classes} onClick={close} target="_blank" rel="noopener noreferrer">{detail}</a>
                : <Link key={x.id} href={x.href} className={classes} onClick={close}>{detail}</Link>;
            })}
          </section>;
        })}
      </div>
      <div className="mt-3 border-t border-slate-200 px-4 py-3 sm:px-6">
        <Link className="inline-block py-2 text-sm font-bold text-blue-700" onClick={close} href={fullSearch}>{t.all} →</Link>
      </div>
    </dialog>
  </>;
}
