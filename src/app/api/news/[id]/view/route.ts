import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hashClientIp } from "@/lib/studentSecurity";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return new NextResponse(null, { status: 400 });
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin || request.headers.get("sec-fetch-site") === "cross-site") return new NextResponse(null, { status: 403 });
  if (/bot|crawler|spider|preview|headless/i.test(request.headers.get("user-agent") || "")) return new NextResponse(null, { status: 204 });
  // Netlify supplies this header; never trust a caller's X-Forwarded-For.
  const ip = request.headers.get("x-nf-client-connection-ip");
  if (!ip) return new NextResponse(null, { status: 204 });
  try {
    const day = new Date().toISOString().slice(0, 10);
    const fingerprint = hashClientIp(`news-view:${id}:${day}:${ip}`);
    const { data, error } = await createAdminClient().rpc("record_news_view", { p_news_id: id, p_fingerprint: fingerprint });
    if (error) return new NextResponse(null, { status: 503 });
    if (data === null) return new NextResponse(null, { status: 404 });
    return NextResponse.json({ count: Number(data) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return new NextResponse(null, { status: 503 }); }
}
