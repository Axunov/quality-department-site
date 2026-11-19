import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { buildSurveyMonitoring } from "@/lib/surveyMonitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "MFA required" }, { status: 403 });
  const key = request.nextUrl.searchParams.get("kind");
  try {
    const { reports, generatedAt } = await buildSurveyMonitoring();
    const report = reports.find(item => item.key === key);
    if (!report) return NextResponse.json({ error: "Unknown survey" }, { status: 404 });

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = 18;
    const line = (text: string, size = 11, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const wrapped = doc.splitTextToSize(text, 178) as string[];
      doc.text(wrapped, 16, y);
      y += wrapped.length * (size >= 16 ? 8 : 6) + 2;
      if (y > 275) { doc.addPage(); y = 18; }
    };
    line("Education Quality Monitoring Report", 18, true);
    line(report.title, 15, true);
    line(`Generated: ${new Date(generatedAt).toLocaleString("en-GB")}`, 9);
    line(`Total responses: ${report.total}`, 12, true);
    line(`Average score: ${report.average ?? "not available"}`, 12, true);
    line("Responses by period", 13, true);
    for (const item of report.byPeriod) line(`${item.label}: ${item.value}`);
    line("Main categories", 13, true);
    for (const item of report.byCategory.slice(0, 30)) line(`${item.label}: ${item.value}`);
    for (const distribution of report.distributions) {
      line(distribution.label, 13, true);
      for (const item of distribution.values.slice(0, 40)) line(`${item.label}: ${item.value}`);
    }
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
