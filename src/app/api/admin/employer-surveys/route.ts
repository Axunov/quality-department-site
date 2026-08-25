import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const columns = "id,created_at,locale,organization_name,activity_area,respondent_position,programmes,graduates_count,curriculum_participation,commission_participation,practice_participation,graduate_qualities,ratings,practice_rating,programme_relevance,cooperation_directions,improvement_areas,demanded_competencies,proposals,hiring_readiness,recommendation_score,cooperation_readiness,contact_name,contact_phone,contact_email";

export async function GET(request: NextRequest) {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user || user.app_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const pageSize = Math.min(100, Math.max(10, Number(params.get("pageSize")) || 25));
  const search = String(params.get("search") || "").trim().slice(0, 100).replace(/[,%()]/g, " ");
  const locale = ["ru", "uz", "en"].includes(String(params.get("locale"))) ? String(params.get("locale")) : "";
  const from = String(params.get("from") || "");
  const to = String(params.get("to") || "");
  const admin = createAdminClient();

  let query = admin.from("employer_survey_responses").select(columns, { count: "exact" });
  if (search) query = query.or(`organization_name.ilike.%${search}%,activity_area.ilike.%${search}%,respondent_position.ilike.%${search}%,contact_name.ilike.%${search}%`);
  if (locale) query = query.eq("locale", locale);
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) query = query.gte("created_at", `${from}T00:00:00.000Z`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) query = query.lt("created_at", `${to}T23:59:59.999Z`);

  const start = (page - 1) * pageSize;
  const [{ data, count, error }, { data: summary, error: summaryError }] = await Promise.all([
    query.order("created_at", { ascending: false }).range(start, start + pageSize - 1),
    admin.from("employer_survey_responses").select("created_at,recommendation_score"),
  ]);
  if (error || summaryError) return NextResponse.json({ error: "Data unavailable" }, { status: 503 });

  const now = Date.now();
  const day = 86_400_000;
  const scores = (summary || []).map((row) => Number(row.recommendation_score)).filter(Number.isFinite);
  return NextResponse.json({
    rows: data || [],
    total: count || 0,
    page,
    pageSize,
    stats: {
      total: summary?.length || 0,
      today: (summary || []).filter((row) => now - new Date(row.created_at).getTime() < day).length,
      week: (summary || []).filter((row) => now - new Date(row.created_at).getTime() < 7 * day).length,
      averageRecommendation: scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length * 10) / 10 : 0,
    },
  }, { headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
