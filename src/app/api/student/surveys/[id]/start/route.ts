import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { PUBLIC_SURVEY_DEVICE_COOKIE, studentCookieOptions } from "@/lib/studentSecurity";

export const runtime = "nodejs";
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false }, { status: 400 });
  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const [{ data: survey }, { data: questions }] = await Promise.all([
    supabase.from("student_surveys").select("id,title_ru,title_uz,title_en,description_ru,description_uz,description_en,ends_at").eq("id", id).eq("status", "published").lte("starts_at", now).or(`ends_at.is.null,ends_at.gt.${now}`).maybeSingle(),
    supabase.from("student_survey_questions").select("id,question_type,prompt_ru,prompt_uz,prompt_en,options,required,sort_order").eq("survey_id", id).order("sort_order"),
  ]);
  if (!survey) return NextResponse.json({ ok: false }, { status: 404 });
  const response = NextResponse.json({ ok: true, survey, questions: questions || [] });
  if (!request.cookies.get(PUBLIC_SURVEY_DEVICE_COOKIE)?.value) response.cookies.set(PUBLIC_SURVEY_DEVICE_COOKIE, randomBytes(32).toString("hex"), studentCookieOptions(31_536_000));
  return response;
}
