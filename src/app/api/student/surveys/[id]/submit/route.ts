import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, hashClientIp, hashPublicSurveyParticipant, PUBLIC_SURVEY_DEVICE_COOKIE } from "@/lib/studentSecurity";

export const runtime = "nodejs";
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const device = request.cookies.get(PUBLIC_SURVEY_DEVICE_COOKIE)?.value;
  const { id } = await params;
  if (!device || !/^[0-9a-f]{64}$/i.test(device) || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false }, { status: 400 });
  if (Number(request.headers.get("content-length") || 0) > 70_000) return NextResponse.json({ ok: false }, { status: 413 });
  const payload = await request.json().catch(() => null) as { locale?: string; answers?: unknown } | null;
  if (!payload || !payload.answers || typeof payload.answers !== "object" || Array.isArray(payload.answers)) return NextResponse.json({ ok: false }, { status: 400 });
  const locale = payload.locale === "uz" || payload.locale === "en" ? payload.locale : "ru";
  const supabase = createAdminClient(), ipHash = hashClientIp(getClientIp(request));
  const since = new Date(Date.now() - 3_600_000).toISOString();
  const { count } = await supabase.from("site_security_events").select("id", { count: "exact", head: true }).eq("endpoint", "student_survey").eq("ip_hash", ipHash).gte("created_at", since);
  if ((count || 0) >= 120) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429, headers: { "Retry-After": "3600" } });
  const participantHash = hashPublicSurveyParticipant(device, id);
  const { error } = await supabase.rpc("submit_public_student_survey", { p_survey_id: id, p_participant_hash: participantHash, p_locale: locale, p_answers: payload.answers });
  await supabase.from("site_security_events").insert({ endpoint: "student_survey", ip_hash: ipHash, outcome: error ? "rejected" : "accepted" });
  if (error) return NextResponse.json({ ok: false, code: error.message.includes("already completed") ? "already_completed" : "invalid" }, { status: 400 });
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
