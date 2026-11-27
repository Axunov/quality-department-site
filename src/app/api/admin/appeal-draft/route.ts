import { NextRequest, NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
import { allowsAppealTemplates } from "@/lib/appealHelp";
import { appealDraftContext, appealDraftRequest, readAppealDraft } from "@/lib/appealDraft";
import { hashClientIp } from "@/lib/studentSecurity";

export const runtime = "nodejs";
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } });
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return reply({ error: "session" }, 403);
  try {
    const auth = await requireAdminMfa();
    if (!auth) return reply({ error: "session" }, 403);
    const key = process.env.APPEALS_OPENAI_API_KEY;
    if (process.env.APPEALS_ASSISTANT_ENABLED === "0" || process.env.APPEALS_AI_ENABLED === "0" || !key) return reply({ error: "unconfigured" }, 503);
    const size = Number(request.headers.get("content-length"));
    if (!Number.isSafeInteger(size) || size < 1 || size > 512) return reply({ error: "invalid" }, 400);
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 512) return reply({ error: "invalid" }, 400);
    let input: unknown;
    try { input = JSON.parse(raw); } catch { return reply({ error: "invalid" }, 400); }
    if (!input || typeof input !== "object" || Object.keys(input).length !== 2 || !("appealId" in input) ||
        typeof input.appealId !== "string" || !uuid.test(input.appealId) || !("locale" in input) ||
        (input.locale !== "ru" && input.locale !== "uz" && input.locale !== "en")) return reply({ error: "invalid" }, 400);

    const { data: appeal, error } = await auth.supabase.from("student_appeals").select("category,status").eq("id", input.appealId).maybeSingle();
    if (error) return reply({ error: "unavailable" }, 503);
    if (!appeal || !allowsAppealTemplates(appeal.category, appeal.status)) return reply({ error: "manual" }, 422);
    const context = appealDraftContext(appeal.category, input.locale);
    if (!context) return reply({ error: "manual" }, 422);

    // Reserve an attempt before calling the provider. The existing ledger stores opaque scopes only.
    const admin = createAdminClient();
    const scope = hashClientIp("appeal-ai-global-v1");
    const userScope = hashClientIp(`appeal-ai-user-v1:${auth.user.id}`);
    const now = new Date();
    const month = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
    const minute = new Date(now.getTime() - 60_000).toISOString();
    const count = (hash: string, since: string) => admin.from("site_security_events").select("id", { count: "exact", head: true })
      .eq("endpoint", "public_appeal").eq("ip_hash", hash).gte("created_at", since);
    const [monthly, recent] = await Promise.all([count(scope, month), count(userScope, minute)]);
    if (monthly.error || recent.error) return reply({ error: "unavailable" }, 503);
    if ((monthly.count ?? 0) >= 1000 || (recent.count ?? 0) >= 3) return reply({ error: "limit" }, 429);
    const { error: claimError } = await admin.from("site_security_events").insert([
      { endpoint: "public_appeal", ip_hash: scope, outcome: "accepted" },
      { endpoint: "public_appeal", ip_hash: userScope, outcome: "accepted" },
    ]);
    if (claimError) return reply({ error: "unavailable" }, 503);

    const provider = await fetch("https://api.openai.com/v1/responses", {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(appealDraftRequest(context)),
    });
    if (!provider.ok) return reply({ error: "unavailable" }, 502);
    const result = readAppealDraft(await provider.json(), context);
    if (!result) return reply({ error: "manual" }, 422);
    return reply(result);
  } catch {
    return reply({ error: "unavailable" }, 503);
  }
}
