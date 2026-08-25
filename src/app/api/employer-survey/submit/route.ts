import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, hashClientIp, verifyTurnstile } from "@/lib/studentSecurity";

export const runtime = "nodejs";

const text = (value: unknown, max = 3000) => String(value ?? "").trim().slice(0, max);
const list = (value: unknown, maxItems = 30) => Array.isArray(value) ? value.slice(0, maxItems).map((item) => text(item, 250)).filter(Boolean) : [];

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 100_000) return NextResponse.json({ ok: false }, { status: 413 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const ratings = Array.isArray(body.ratings) ? body.ratings.map(Number) : [];
  const recommendationScore = Number(body.recommendationScore);
  if (!text(body.organizationName, 250) || !text(body.activityArea, 250) || !text(body.respondentPosition, 200) || ratings.length !== 10 || ratings.some((value) => !Number.isInteger(value) || value < 1 || value > 10) || !Number.isInteger(recommendationScore) || recommendationScore < 0 || recommendationScore > 10 || body.consent !== true) {
    return NextResponse.json({ ok: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const payload = {
    locale: body.locale === "uz" || body.locale === "en" ? body.locale : "ru",
    organization_name: text(body.organizationName, 250), activity_area: text(body.activityArea, 250), respondent_position: text(body.respondentPosition, 200),
    programmes: list(body.programmes), other_programme: text(body.otherProgramme, 250) || null, graduates_count: text(body.graduatesCount, 100) || null,
    curriculum_participation: text(body.curriculumParticipation, 150), commission_participation: text(body.commissionParticipation, 150), practice_participation: list(body.practiceParticipation),
    graduate_qualities: list(body.graduateQualities), ratings, practice_rating: Number(body.practiceRating) || null, programme_relevance: text(body.programmeRelevance, 150),
    cooperation_directions: list(body.cooperationDirections), improvement_areas: list(body.improvementAreas), demanded_competencies: text(body.demandedCompetencies) || null,
    proposals: text(body.proposals) || null, hiring_readiness: text(body.hiringReadiness, 150),
    recommendation_score: recommendationScore, cooperation_readiness: text(body.cooperationReadiness, 150), contact_name: text(body.contactName, 200) || null,
    contact_phone: text(body.contactPhone, 50) || null, contact_email: text(body.contactEmail, 200) || null,
    user_agent: text(request.headers.get("user-agent"), 500) || null,
  };

  try {
    const supabase = createAdminClient();
    const clientIp = getClientIp(request);
    const ipHash = hashClientIp(clientIp);
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase.from("site_security_events").select("id", { count: "exact", head: true }).eq("endpoint", "employer_survey").eq("ip_hash", ipHash).gte("created_at", since);
    if ((count || 0) >= 5) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "3600" } });
    const captchaValid = await verifyTurnstile(text(body.captchaToken, 3000), clientIp, "employer_survey");
    if (!captchaValid) {
      await supabase.from("site_security_events").insert({ endpoint: "employer_survey", ip_hash: ipHash, outcome: "captcha_failed" });
      return NextResponse.json({ ok: false, code: "captcha_failed" }, { status: 403, headers: { "Cache-Control": "no-store" } });
    }
    const { error } = await supabase.from("employer_survey_responses").insert(payload);
    await supabase.from("site_security_events").insert({ endpoint: "employer_survey", ip_hash: ipHash, outcome: error ? "database_failed" : "accepted" });
    if (error) return NextResponse.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
