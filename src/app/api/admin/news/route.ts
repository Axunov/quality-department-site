import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
import { mediaCover, validNewsMedia, type NewsMedia } from "@/lib/newsMedia";

function refresh(slug?: string) {
  for (const locale of ["ru", "uz", "en"]) {
    for (const path of [`/${locale}`, `/${locale}/news`, `/${locale}/admin/news`]) revalidatePath(path);
    if (slug) revalidatePath(`/${locale}/news/${slug}`);
  }
}
async function mutate(request: NextRequest, mode: "create" | "update" | "delete") {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "session" }, { status: 403 });
  if (request.headers.get("origin") && request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ error: "origin" }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 800000) return NextResponse.json({ error: "size" }, { status: 413 });
    const body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "format" }, { status: 400 });
    if (mode !== "create" && (typeof body.id !== "string" || !/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(body.id))) return NextResponse.json({ error: "format" }, { status: 400 });
    const admin = createAdminClient();
    if (mode === "delete") {
      const { data, error } = await admin.from("news").delete().eq("id", body.id).select("slug").single();
      if (error) return NextResponse.json({ error: "saveError" }, { status: 400 });
      refresh(data.slug); return NextResponse.json({ ok: true });
    }
    const origin = new URL(admin.storage.from("news").getPublicUrl("test").data.publicUrl).origin;
    if (!validNewsMedia(body.media_items, origin)) return NextResponse.json({ error: "format" }, { status: 400 });
    const media: NewsMedia[] = body.media_items;
    const fields: Record<string, string> = {};
    for (const lang of ["ru", "uz", "en"]) {
      for (const prefix of ["title", "text"]) {
        const value = body[`${prefix}_${lang}`];
        if (typeof value !== "string" || value.length > (prefix === "title" ? 500 : 200000)) return NextResponse.json({ error: "size" }, { status: 400 });
        fields[`${prefix}_${lang}`] = value.trim();
      }
      fields[`content_${lang}`] = fields[`text_${lang}`];
    }
    if (![fields.title_ru, fields.title_uz, fields.title_en].some(Boolean)) return NextResponse.json({ error: "titleRequired" }, { status: 400 });
    if (typeof body.category !== "string" || body.category.length > 100) return NextResponse.json({ error: "size" }, { status: 400 });
    const values = { ...fields, category: body.category.trim() || "Новости", media_items: media, image_url: mediaCover(media), gallery_urls: media.filter(m => m.type === "image").map(m => m.url) };
    const slug = (fields.title_en || fields.title_uz || "news").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0,80) || "news";
    const result = mode === "create"
      ? await admin.from("news").insert({ ...values, slug: `${slug}-${crypto.randomUUID().slice(0,8)}`, published: true, author: "Admin" }).select("id,slug").single()
      : await admin.from("news").update(values).eq("id", body.id).select("id,slug").single();
    if (result.error) return NextResponse.json({ error: "saveError" }, { status: 503 });
    refresh(result.data.slug);
    return NextResponse.json({ ok: true, ...result.data });
  } catch { return NextResponse.json({ error: "saveError" }, { status: 400 }); }
}
export const POST = (request: NextRequest) => mutate(request, "create");
export const PATCH = (request: NextRequest) => mutate(request, "update");
export const DELETE = (request: NextRequest) => mutate(request, "delete");
