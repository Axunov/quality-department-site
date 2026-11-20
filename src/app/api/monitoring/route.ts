import { type NextRequest, NextResponse } from "next/server";
import { buildSurveyMonitoring } from "@/lib/surveyMonitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const requested = request.nextUrl.searchParams.get("locale");
    const result = await buildSurveyMonitoring(requested === "en" || requested === "uz" ? requested : "ru", true);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Monitoring data unavailable" }, { status: 503 });
  }
}
