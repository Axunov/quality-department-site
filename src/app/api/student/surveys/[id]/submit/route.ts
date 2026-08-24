import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { GENERIC_SURVEY_RECEIPT_COOKIE, GENERIC_SURVEY_SESSION_COOKIE, studentCookieOptions } from "@/lib/studentSecurity";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const session = request.cookies.get(GENERIC_SURVEY_SESSION_COOKIE)?.value;
  const receipt = request.cookies.get(GENERIC_SURVEY_RECEIPT_COOKIE)?.value;
  if (!session || !receipt) return NextResponse.json({ ok: false }, { status: 401 });
  const payload = await request.json().catch(() => null) as { locale?: string; answers?: unknown } | null;
  if (!payload || !payload.answers || typeof payload.answers !== "object" || Array.isArray(payload.answers)) return NextResponse.json({ ok: false }, { status: 400 });
  const locale = payload.locale === "uz" || payload.locale === "en" ? payload.locale : "ru";
  const { error } = await createAdminClient().rpc("submit_generic_student_survey", { p_session_token: session, p_completion_receipt: receipt, p_locale: locale, p_answers: payload.answers });
  if (error) return NextResponse.json({ ok: false }, { status: 400 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(GENERIC_SURVEY_SESSION_COOKIE, "", studentCookieOptions(0));
  response.cookies.set(GENERIC_SURVEY_RECEIPT_COOKIE, "", studentCookieOptions(0));
  return response;
}
