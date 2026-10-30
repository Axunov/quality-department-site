import type { NewsMediaSource } from "@/lib/newsMedia";
import { getNewsMedia, mediaCover } from "@/lib/newsMedia";
import { newsMediaCopy } from "@/lib/newsMediaCopy";

export function NewsCover({ item, title, locale, className = "h-48" }: { item: NewsMediaSource; title: string; locale: string; className?: string }) {
  const media = getNewsMedia(item);
  const cover = mediaCover(media);
  const hasVideo = media.some(m => m.type === "video");
  return <div className={`relative w-full overflow-hidden bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] ${className}`}>
    {cover ? <img src={cover} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-5xl text-white" aria-hidden="true">{hasVideo ? "▶" : "📰"}</div>}
    {hasVideo && <span className="absolute right-3 top-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white"><span aria-hidden="true">▶ </span>{newsMediaCopy(locale).video}</span>}
  </div>;
}
