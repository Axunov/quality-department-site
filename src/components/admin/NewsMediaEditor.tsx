"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Upload } from "tus-js-client";
import { MAX_NEWS_MEDIA, MEDIA_TYPES, NEWS_MEDIA_ACCEPT, mediaFileError, type NewsMedia } from "@/lib/newsMedia";
import { newsMediaCopy } from "@/lib/newsMediaCopy";

export default function NewsMediaEditor({ items, setItems, locale, disabled, onBusy }: {
  items: NewsMedia[]; setItems: Dispatch<SetStateAction<NewsMedia[]>>; locale: string; disabled: boolean; onBusy: (busy: boolean) => void;
}) {
  const t = newsMediaCopy(locale);
  const [progress, setProgress] = useState<{ name: string; percent: number } | null>(null);
  const [message, setMessage] = useState("");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);

  async function upload(file: File, signal: AbortSignal): Promise<NewsMedia> {
    const response = await fetch("/api/admin/news/media", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: file.type, size: file.size }), signal });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error === "session" ? t.session : t.uploadError);
    signal.throwIfAborted();
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let settled = false;
      const finish = (error?: Error) => {
        if (settled) return;
        settled = true;
        signal.removeEventListener("abort", cancel);
        error ? reject(error) : resolve();
      };
      const cancel = () => {
        xhr.abort();
        finish(new DOMException("Aborted", "AbortError"));
      };
      xhr.open("PUT", data.uploadUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.setRequestHeader("Cache-Control", "31536000");
      xhr.upload.onprogress = event => {
        if (event.lengthComputable) setProgress({ name: file.name, percent: Math.round(event.loaded / event.total * 100) });
      };
      xhr.onerror = () => finish(new Error(t.uploadError));
      xhr.onabort = () => { if (!signal.aborted) finish(new Error(t.uploadError)); };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) finish();
        else finish(new Error(t.uploadError));
      };
      signal.addEventListener("abort", cancel, { once: true });
      xhr.send(file);
    });
    signal.throwIfAborted();
    return { type: MEDIA_TYPES[file.type].type, url: data.url };
  }

  async function add(files: File[], posterIndex?: number) {
    if (!files.length || controller.current || disabled) return;
    setMessage("");
    if (posterIndex === undefined && items.length + files.length > MAX_NEWS_MEDIA) { setMessage(t.limit); return; }
    for (const file of files) {
      const error = mediaFileError(file);
      if (error || (posterIndex !== undefined && MEDIA_TYPES[file.type]?.type !== "image")) { setMessage(`${file.name}: ${t[error || "format"]}`); return; }
    }
    const current = new AbortController(); controller.current = current; onBusy(true);
    try {
      for (const file of files) {
        setProgress({ name: file.name, percent: 0 });
        const media = await upload(file, current.signal);
        setItems(old => posterIndex === undefined ? [...old, media] : old.map((item, i) => i === posterIndex ? { ...item, poster: media.url } : item));
      }
      setMessage(t.ready);
    } catch (error) {
      if (!current.signal.aborted) setMessage(error instanceof Error ? error.message : t.uploadError);
    } finally { controller.current = null; setProgress(null); onBusy(false); }
  }
  function move(index: number, offset: number) {
    setItems(old => { const next = [...old]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; return next; });
  }
  const locked = disabled || !!progress;
  return <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5" aria-label={t.media}>
    <div><h3 className="text-lg font-bold">{t.media}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{t.hint}</p><p className="mt-1 text-sm leading-6 text-slate-600">{t.order}</p></div>
    <label className="block text-sm font-semibold">{t.add}<input type="file" multiple accept={NEWS_MEDIA_ACCEPT} disabled={locked} className="mt-2 block w-full min-w-0 rounded-lg border bg-white p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-800 disabled:opacity-50" onChange={e => { const files = Array.from(e.target.files || []); e.target.value = ""; void add(files); }} /></label>
    {progress && <div role="status" className="rounded-xl bg-white p-4"><p className="break-words text-sm">{t.uploading}: {progress.name} — {progress.percent}%</p><progress max={100} value={progress.percent} className="mt-2 h-3 w-full accent-blue-700" aria-label={t.uploading} /><button type="button" onClick={() => controller.current?.abort()} className="mt-2 rounded-lg border px-3 py-2 text-sm">{t.cancel}</button></div>}
    {!items.length && <p className="text-sm text-slate-500">{t.empty}</p>}
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => <li key={item.url} className="min-w-0 overflow-hidden rounded-xl border bg-white">
        {item.type === "video" ? <video src={item.url} poster={item.poster} controls playsInline preload="metadata" className="aspect-video w-full bg-slate-950 object-contain" /> : <img src={item.url} alt={`${t.photo} ${index + 1}`} className="aspect-video w-full object-cover" />}
        <div className="space-y-3 p-3"><p className="text-sm font-semibold">{index + 1}. {t[item.type === "video" ? "video" : "photo"]}{index === 0 && <span className="ml-2 rounded bg-blue-50 px-2 py-1 text-xs text-blue-800">{t.cover}</span>}</p>
          <div className="flex flex-wrap gap-2"><button type="button" disabled={locked || index === 0} aria-label={t.previous} title={t.previous} onClick={() => move(index,-1)} className="min-h-10 min-w-10 rounded-lg border disabled:opacity-30">←</button><button type="button" disabled={locked || index === items.length - 1} aria-label={t.next} title={t.next} onClick={() => move(index,1)} className="min-h-10 min-w-10 rounded-lg border disabled:opacity-30">→</button><button type="button" disabled={locked} onClick={() => setItems(old => old.filter((_, i) => i !== index))} className="min-h-10 rounded-lg border px-3 text-sm text-red-700 disabled:opacity-30">{t.remove}</button></div>
          {item.type === "video" && <label className="block text-xs text-slate-600">{t.posterHint}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" disabled={locked} aria-label={t.poster} className="mt-2 block w-full min-w-0 text-xs" onChange={e => { const file = e.target.files?.[0]; e.target.value = ""; if (file) void add([file], index); }} /></label>}
        </div>
      </li>)}
    </ol>
    {message && <p role="status" className="break-words text-sm font-medium">{message}</p>}
  </section>;
}
