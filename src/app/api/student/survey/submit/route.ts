import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  SURVEY_RECEIPT_COOKIE,
  SURVEY_SESSION_COOKIE,
  studentCookieOptions,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

type Submission = {
  locale?: string;
  answers?: unknown;
  finalSatisfaction?: number;
  finalSuggestions?: string | null;
};

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(SURVEY_SESSION_COOKIE)?.value;
  const receiptToken = request.cookies.get(SURVEY_RECEIPT_COOKIE)?.value;

  if (!sessionToken || !receiptToken) {
    return NextResponse.json(
      { ok: false },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  let payload: Submission;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const locale =
    payload.locale === "uz" || payload.locale === "en"
      ? payload.locale
      : "ru";

  if (
    !Array.isArray(payload.answers) ||
    !Number.isInteger(payload.finalSatisfaction) ||
    Number(payload.finalSatisfaction) < 1 ||
    Number(payload.finalSatisfaction) > 5
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.rpc(
      "submit_teacher_survey_anonymous",
      {
        p_session_token: sessionToken,
        p_completion_receipt: receiptToken,
        p_locale: locale,
        p_answers: payload.answers,
        p_final_satisfaction: payload.finalSatisfaction,
        p_final_suggestions:
          String(payload.finalSuggestions || "").trim().slice(0, 3000) ||
          null,
      },
    );

    if (error) {
      return NextResponse.json(
        { ok: false },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const response = NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(
      SURVEY_SESSION_COOKIE,
      "",
      studentCookieOptions(0),
    );
    response.cookies.set(
      SURVEY_RECEIPT_COOKIE,
      "",
      studentCookieOptions(0),
    );
    return response;
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
