import { NextResponse } from "next/server";
import { buildSurveyMonitoring } from "@/lib/surveyMonitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale: requested } = await params;
    if (requested !== "ru" && requested !== "uz" && requested !== "en") return new NextResponse(null, { status: 404 });
    const result = await buildSurveyMonitoring(requested, true);
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
