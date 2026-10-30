export type NewsMedia = { type: "image" | "video"; url: string; poster?: string };
export type NewsMediaSource = { media_items?: NewsMedia[] | null; gallery_urls?: string[] | null; image_url?: string | null };
export const MAX_NEWS_MEDIA = 20;
export const IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024;
export const MEDIA_TYPES: Record<string, { type: NewsMedia["type"]; extension: string }> = {
  "image/jpeg": { type: "image", extension: "jpg" },
  "image/png": { type: "image", extension: "png" },
  "image/webp": { type: "image", extension: "webp" },
  "image/gif": { type: "image", extension: "gif" },
  "image/avif": { type: "image", extension: "avif" },
  "video/mp4": { type: "video", extension: "mp4" },
  "video/webm": { type: "video", extension: "webm" },
};
export const NEWS_MEDIA_ACCEPT = Object.keys(MEDIA_TYPES).join(",");
export function mediaFileError(file: { type: string; size: number }): "format" | "size" | null {
  if (!Object.hasOwn(MEDIA_TYPES, file.type)) return "format";
  const kind = MEDIA_TYPES[file.type];
  return !Number.isSafeInteger(file.size) || file.size <= 0 || file.size > (kind.type === "video" ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES) ? "size" : null;
}
export function getNewsMedia(item: NewsMediaSource): NewsMedia[] {
  if (Array.isArray(item.media_items)) return item.media_items;
  const urls = item.gallery_urls?.length ? item.gallery_urls : item.image_url ? [item.image_url] : [];
  return urls.map(url => ({ type: "image", url }));
}
export function mediaCover(media: NewsMedia[]): string {
  const first = media[0];
  return first?.type === "image" ? first.url : first?.poster || "";
}
export function validNewsMedia(value: unknown, origin: string): value is NewsMedia[] {
  if (!Array.isArray(value) || value.length > MAX_NEWS_MEDIA) return false;
  const validUrl = (v: unknown) => {
    if (typeof v !== "string" || v.length > 2000) return false;
    try { const u = new URL(v); return u.origin === origin && u.pathname.startsWith("/storage/v1/object/public/news/") && !u.username && !u.password && !u.search && !u.hash; } catch { return false; }
  };
  return value.every(m => m && typeof m === "object" && ["image", "video"].includes(m.type) && validUrl(m.url) && (m.poster === undefined || (m.type === "video" && validUrl(m.poster))));
}
