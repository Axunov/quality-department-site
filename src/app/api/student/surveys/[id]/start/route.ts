import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { GENERIC_SURVEY_RECEIPT_COOKIE, GENERIC_SURVEY_SESSION_COOKIE, STUDENT_PORTAL_COOKIE, studentCookieOptions } from "@/lib/studentSecurity";

export const runtime = "nodejs";
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const portal = request.cookies.get(STUDENT_PORTAL_COOKIE)?.value;
  if (!portal) return NextResponse.json({ ok: false }, { status: 401 });
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: started, error } = await supabase.rpc("begin_generic_student_survey", { p_portal_token: portal, p_survey_id: id });
  const session = started?.[0];
  if (error || !session) return NextResponse.json({ ok: false }, { status: 403 });
  const [{ data: survey }, { data: questions }] = await Promise.all([
    supabase.from("student_surveys").select("id,title_ru,title_uz,title_en,description_ru,description_uz,description_en").eq("id", id).single(),
    supabase.from("student_survey_questions").select("id,question_type,prompt_ru,prompt_uz,prompt_en,options,required,sort_order").eq("survey_id", id).order("sort_order"),
  ]);
  const response = NextResponse.json({ ok: true, survey, questions: questions || [] });
  response.cookies.set(GENERIC_SURVEY_SESSION_COOKIE, session.session_token, studentCookieOptions(7200));
  response.cookies.set(GENERIC_SURVEY_RECEIPT_COOKIE, session.completion_receipt, studentCookieOptions(7200));
  return response;
}
