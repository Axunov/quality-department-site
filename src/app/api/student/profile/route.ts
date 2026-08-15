import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  STUDENT_PORTAL_COOKIE,
  studentCookieOptions,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(STUDENT_PORTAL_COOKIE)?.value;
  if (!token) {
    return NextResponse.json(
      { ok: false },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.rpc("student_portal_profile", {
      p_portal_token: token,
    });
    const profile = data?.[0];

    if (error || !profile) {
      const response = NextResponse.json(
        { ok: false },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
      response.cookies.set(
        STUDENT_PORTAL_COOKIE,
        "",
        studentCookieOptions(0),
      );
      return response;
    }

    return NextResponse.json(
      { ok: true, profile },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
