import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  STUDENT_PORTAL_COOKIE,
  SURVEY_RECEIPT_COOKIE,
  SURVEY_SESSION_COOKIE,
  studentCookieOptions,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

type AnonymousSession = {
  session_token: string;
  completion_receipt: string;
  resolved_group_id: string;
};

export async function POST(request: NextRequest) {
  const portalToken = request.cookies.get(STUDENT_PORTAL_COOKIE)?.value;
  if (!portalToken) {
    return NextResponse.json(
      { ok: false },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const supabase = createAdminClient();
    const { data: sessionData, error: sessionError } = await supabase.rpc(
      "begin_teacher_survey_from_portal",
      { p_portal_token: portalToken },
    );
    const session = sessionData?.[0] as AnonymousSession | undefined;

    if (sessionError || !session) {
      return NextResponse.json(
        { ok: false },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    const { data: teachers, error: teachersError } = await supabase
      .from("survey_group_teachers")
      .select("id,teacher_id,subject,teachers:survey_teachers(full_name)")
      .eq("group_id", session.resolved_group_id)
      .eq("active", true)
      .order("sort_order");

    if (teachersError) throw teachersError;

    const response = NextResponse.json(
      { ok: true, teachers: teachers || [] },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(
      SURVEY_SESSION_COOKIE,
      session.session_token,
      studentCookieOptions(60 * 60 * 2),
    );
    response.cookies.set(
      SURVEY_RECEIPT_COOKIE,
      session.completion_receipt,
      studentCookieOptions(60 * 60 * 2),
    );
    return response;
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
