import { NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { buildSurveyMonitoring } from "@/lib/surveyMonitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "MFA required" }, { status: 403 });
  try {
    const result = await buildSurveyMonitoring();
    return NextResponse.json(result, { headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return NextResponse.json({ error: "Monitoring data unavailable" }, { status: 503 });
  }
}
