"use client";

import { useState } from "react";
import type { NewsMedia } from "@/lib/newsMedia";
import { newsMediaCopy } from "@/lib/newsMediaCopy";

export function NewsGallery({ media, title, locale }: { media: NewsMedia[]; title: string; locale: string }) {
  const [active, setActive] = useState(0);
  const t = newsMediaCopy(locale);
  if (!media.length) return null;
  const index = Math.min(active, media.length - 1);
  const item = media[index];
  return <div className="mb-8 min-w-0">
    <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-lg sm:rounded-3xl">
      {item.type === "video" ? <video key={item.url} src={item.url} poster={item.poster} controls playsInline preload="metadata" aria-label={`${title} — ${t.video} ${index + 1}`} className="aspect-video max-h-[70vh] w-full object-contain"><a href={item.url} target="_blank" rel="noopener noreferrer">{t.open}</a></video> : <img src={item.url} alt={`${title} — ${t.photo} ${index + 1}`} className="max-h-[70vh] w-full object-contain" />}
    </div>
    {item.type === "video" && <p className="mt-3 text-sm text-slate-500">{t.fallback} <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline">{t.open} ↗</a></p>}
    {media.length > 1 && <><p className="mt-4 text-sm text-slate-500" aria-live="polite">{index + 1} / {media.length}</p><div className="mt-2 flex gap-3 overflow-x-auto pb-2">
      {media.map((entry, i) => <button key={entry.url} type="button" onClick={() => setActive(i)} aria-pressed={index === i} aria-label={`${t[entry.type === "video" ? "video" : "photo"]} ${i + 1}`} className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-900 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${index === i ? "border-blue-600" : "border-transparent"}`}>
        {entry.type === "image" || entry.poster ? <img src={entry.type === "image" ? entry.url : entry.poster} alt="" loading="lazy" className="h-full w-full object-cover" /> : null}
        {entry.type === "video" && <span className="absolute inset-0 flex items-center justify-center bg-slate-950/30 text-2xl" aria-hidden="true">▶</span>}
        <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 text-xs">{i + 1}</span>
      </button>)}
    </div></>}
  </div>;
}
