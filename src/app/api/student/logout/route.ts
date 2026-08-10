import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  clearStudentCookies,
  STUDENT_PORTAL_COOKIE,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(STUDENT_PORTAL_COOKIE)?.value;

  if (token) {
    try {
      const supabase = createAdminClient();
      await supabase.rpc("student_portal_logout", {
        p_portal_token: token,
      });
    } catch {
      // Cookie всё равно удаляется, даже если база временно недоступна.
    }
  }

  const response = NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  clearStudentCookies(response);
  return response;
}
