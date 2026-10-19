import { NextRequest, NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
import survey from "@/data/learningQualitySurvey.json";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store" };
  if (!await requireAdminMfa()) return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  const q = request.nextUrl.searchParams, from = q.get("from"), to = q.get("to"), locale = q.get("locale");
  const admin = createAdminClient();
  const rows = [];
  // Read every page so the dashboard is not silently limited to Supabase's 1,000-row default.
  for (let offset = 0; ; offset += 1000) {
    let query = admin.from("student_survey_responses").select("id,submitted_on,locale,answers").eq("survey_id", survey.id);
    if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) query = query.gte("submitted_on", from);
    if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) query = query.lte("submitted_on", to);
    if (locale && ["ru", "uz", "en"].includes(locale)) query = query.eq("locale", locale);
    const { data, error } = await query.order("submitted_on", { ascending: false }).order("id").range(offset, offset + 999);
    if (error) return NextResponse.json({ error: "Data unavailable" }, { status: 503, headers });
    rows.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return NextResponse.json({ rows }, { headers });
}
