import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { STUDENT_PORTAL_COOKIE } from "@/lib/studentSecurity";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const token = request.cookies.get(STUDENT_PORTAL_COOKIE)?.value;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  const { data, error } = await createAdminClient().rpc("student_generic_surveys", { p_portal_token: token });
  return error ? NextResponse.json({ ok: false }, { status: 401 }) : NextResponse.json({ ok: true, surveys: data || [] }, { headers: { "Cache-Control": "no-store" } });
}
