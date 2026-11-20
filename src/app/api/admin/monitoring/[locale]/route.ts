import { NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { buildSurveyMonitoring } from "@/lib/surveyMonitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "MFA required" }, { status: 403 });
  try {
    const { locale: requested } = await params;
    if (requested !== "ru" && requested !== "uz" && requested !== "en") return new NextResponse(null, { status: 404 });
    const result = await buildSurveyMonitoring(requested, false);
    return NextResponse.json(result, { headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return NextResponse.json({ error: "Monitoring data unavailable" }, { status: 503 });
  }
}
