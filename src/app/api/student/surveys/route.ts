import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export async function GET() {
  const now = new Date().toISOString();
  const { data, error } = await createAdminClient().from("student_surveys")
    .select("id,title_ru,title_uz,title_en,description_ru,description_uz,description_en,starts_at,ends_at")
    .eq("status", "published").lte("starts_at", now)
    .or(`ends_at.is.null,ends_at.gt.${now}`).order("created_at", { ascending: false });
  return error ? NextResponse.json({ ok: false }, { status: 503 }) : NextResponse.json({ ok: true, surveys: data || [] }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
}
