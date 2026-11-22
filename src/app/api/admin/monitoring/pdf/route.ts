import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { layOutReport } from "@/lib/monitoringPdf";
import { jsPDF } from "jspdf";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { buildSurveyMonitoring } from "@/lib/surveyMonitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "MFA required" }, { status: 403 });
  const key = request.nextUrl.searchParams.get("kind");
  try {
    const lang=request.nextUrl.searchParams.get("locale");
    const { reports, generatedAt } = await buildSurveyMonitoring(lang==="uz"||lang==="en"?lang:"ru");
    const report = reports.find(item => item.key === key);
    if (!report) return NextResponse.json({ error: "Unknown survey" }, { status: 404 });

    const font=await readFile(join(process.cwd(),"public","DejaVuSans.ttf"));
    const doc=layOutReport(new jsPDF({unit:"mm",format:"a4"}),font.toString("base64"),report,generatedAt,lang||"ru");
    const output = doc.output("arraybuffer");
    return new NextResponse(Buffer.from(output), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="survey-${report.key}-monitoring.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF unavailable" }, { status: 503 });
  }
}
