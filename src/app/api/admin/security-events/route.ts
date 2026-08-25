import { NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  if (!await requireAdminMfa()) return NextResponse.json({ error: "MFA required" }, { status: 403 });
  const { data, error } = await createAdminClient().from("site_security_events").select("id,endpoint,ip_hash,outcome,created_at").order("created_at", { ascending: false }).limit(500);
  if (error) return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  const now = Date.now(), rows = data || [], failed = rows.filter(row => row.outcome !== "accepted");
  return NextResponse.json({ rows: rows.map(row => ({ ...row, ip_hash: `${row.ip_hash.slice(0, 10)}…` })), stats: { lastHour: failed.filter(row => now - new Date(row.created_at).getTime() < 3_600_000).length, lastDay: failed.filter(row => now - new Date(row.created_at).getTime() < 86_400_000).length, blockedSources: new Set(failed.map(row => row.ip_hash)).size } }, { headers: { "Cache-Control": "private, no-store" } });
}
