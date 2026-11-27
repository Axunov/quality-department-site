import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, hashClientIp } from "@/lib/studentSecurity";
import { siteChatAnswer } from "@/lib/publicSiteChat";

const reply = (data: object, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
const names = { ru: "Russian", uz: "Uzbek, Latin script", en: "English" } as const;

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return reply({}, 403);
  const length = Number(request.headers.get("content-length"));
  if (!Number.isSafeInteger(length) || length < 1 || length > 180) return reply({}, 400);
  try {
    const raw = await request.text();
    if (raw.length > 180) return reply({}, 400);
    const input = JSON.parse(raw);
    if (!input || Object.keys(input).length !== 2 || typeof input.topic !== "string" || !["ru", "uz", "en"].includes(input.locale)) return reply({}, 400);
    const locale = input.locale as keyof typeof names;
    const answer = siteChatAnswer(input.topic, locale);
    if (!answer) return reply({}, 404);
    const fallback = () => reply({ ...answer, generated: false });
    const key = process.env.SITE_CHAT_OPENAI_API_KEY;
    if (!key || process.env.SITE_CHAT_ENABLED === "0") return fallback();

    try {
      // Separate quotas from appeals and from the staff assistant. No text or topic is logged.
      const admin = createAdminClient();
      const globalScope = hashClientIp("public-site-chat-global");
      const clientScope = hashClientIp(`public-site-chat-client:${getClientIp(request)}`);
      const count = (scope: string, ms: number) => admin.from("site_security_events").select("id", {count:"exact",head:true})
        .eq("endpoint","public_appeal").eq("ip_hash",scope).gte("created_at",new Date(Date.now()-ms).toISOString());
      const [all, client] = await Promise.all([count(globalScope, 86400000), count(clientScope, 600000)]);
      if (all.error || client.error || (all.count ?? 0) >= 120 || (client.count ?? 0) >= 5) return fallback();
      const {error} = await admin.from("site_security_events").insert([globalScope,clientScope].map(ip_hash=>({endpoint:"public_appeal",ip_hash,outcome:"accepted"})));
      if(error) return fallback();

      // The provider receives only curated guidance; links remain assigned by the site.
      const result = await fetch("https://api.openai.com/v1/responses", {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(9000),
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-5.4-mini", reasoning: {effort:"none"}, store:false, max_output_tokens:180,
          instructions: "Restate the supplied public guidance briefly in the supplied language. Preserve all constraints. Never add links, personal details, policy, deadlines, or new facts. Use plain text.",
          input: JSON.stringify({language:names[locale], topic:input.topic, guidance:answer.text}),
          text:{format:{type:"json_schema",name:"site_guidance",strict:true,schema:{type:"object",additionalProperties:false,required:["text"],properties:{text:{type:"string"}}}}},
        }),
      });
      if (!result.ok) {
        const body = await result.json().catch(() => null);
        const code = body?.error?.code;
        console.warn("site_chat_provider_rejected", result.status,
          typeof code === "string" && /^[a-z_]{1,60}$/.test(code) ? code : "unknown");
        return fallback();
      }
      const data = await result.json();
      if (data.status !== "completed" || !Array.isArray(data.output)) {
        console.warn("site_chat_provider_incomplete");
        return fallback();
      }
      const content = data.output.flatMap((x: {type?: string; content?: unknown[]}) => x?.type === "message" && Array.isArray(x.content) ? x.content : []);
      if (content.length !== 1 || content[0]?.type !== "output_text" || typeof content[0]?.text !== "string" || content[0].text.length > 2400) return fallback();
      const text = JSON.parse(content[0].text)?.text;
      if (typeof text !== "string" || text.trim().length < 15 || text.length > 700 || /https?:|www\.|[<>]|\S+@\S+/i.test(text)) return fallback();
      return reply({...answer, text:text.trim(), generated:true});
    } catch (error) {
      console.warn("site_chat_provider_unavailable",
        error instanceof Error && error.name === "TimeoutError" ? "timeout" : "failure");
      return fallback();
    }
  } catch { return reply({}, 400); }
}
