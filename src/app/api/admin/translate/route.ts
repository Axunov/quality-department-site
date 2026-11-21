import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";
import { requireAdminMfa } from "@/lib/adminSecurity";

const languages = ["ru", "uz", "en"] as const;
const markup = { allowedTags: ["p", "br", "strong", "em", "u", "s", "ul", "ol", "li", "h2", "h3", "blockquote", "a", "pre", "code", "hr"], allowedAttributes: { a: ["href"] }, allowedSchemes: ["http", "https", "mailto"] };
const reply = (data: object, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });

export async function POST(request: NextRequest) {
  if (!await requireAdminMfa() || request.headers.get("origin") !== request.nextUrl.origin) return reply({ error: "session" }, 403);
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 102400) return reply({ error: "size" }, 413);
    const body = JSON.parse(raw);
    if (!body || !languages.includes(body.source) || !["text", "html"].includes(body.format) ||
        typeof body.title !== "string" || !body.title.trim() || body.title.length > 500 ||
        typeof body.content !== "string" || body.content.length > 24000) return reply({ error: "invalid" }, 400);
    const key = process.env.GOOGLE_CLOUD_TRANSLATION_API_KEY;
    if (!key) return reply({ error: "unconfigured" }, 503);
    const content = body.format === "html" ? sanitizeHtml(body.content, markup) : body.content.trim();
    async function translate(value: string, target: string, format: "text" | "html") {
      if (!value) return "";
      const result = await fetch("https://translation.googleapis.com/language/translate/v2", {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(12000),
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key! },
        body: JSON.stringify({ q: value, source: body.source, target, format }),
      });
      if (!result.ok) throw new Error("provider");
      const translated = (await result.json()).data?.translations?.[0]?.translatedText;
      if (typeof translated !== "string" || !translated.trim()) throw new Error("provider");
      return format === "html" ? sanitizeHtml(translated, markup) : translated;
    }
    const translations = await Promise.all(languages.filter(lang => lang !== body.source).map(async lang => {
      const [title, text] = await Promise.all([translate(body.title.trim(), lang, "text"), translate(content, lang, body.format)]);
      return [lang, { title: title.slice(0, 500), content: text }];
    }));
    return reply({ translations: Object.fromEntries(translations) });
  } catch { return reply({ error: "failed" }, 502); }
}
