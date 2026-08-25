import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getClientIp,hashClientIp,hashPublicSurveyParticipant,PUBLIC_SURVEY_DEVICE_COOKIE,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

type Submission = {
  locale?: string;
  answers?: unknown;
  finalSatisfaction?: number;
  finalSuggestions?: string | null;
  groupId?: string;
};

export async function POST(request: NextRequest) {
  const device=request.cookies.get(PUBLIC_SURVEY_DEVICE_COOKIE)?.value;
  if (!device||!/^[0-9a-f]{64}$/i.test(device)) {
    return NextResponse.json(
      { ok: false },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  let payload: Submission;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const locale =
    payload.locale === "uz" || payload.locale === "en"
      ? payload.locale
      : "ru";

  if (
    !Array.isArray(payload.answers) ||
    !payload.groupId||!/^[0-9a-f-]{36}$/i.test(payload.groupId)||
    !Number.isInteger(payload.finalSatisfaction) ||
    Number(payload.finalSatisfaction) < 1 ||
    Number(payload.finalSatisfaction) > 5
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const ipHash=hashClientIp(getClientIp(request)),since=new Date(Date.now()-3_600_000).toISOString();
    const{count}=await supabase.from("site_security_events").select("id",{count:"exact",head:true}).eq("endpoint","teacher_survey").eq("ip_hash",ipHash).gte("created_at",since);
    if((count||0)>=120)return NextResponse.json({ok:false,code:"rate_limited"},{status:429});
    const { error } = await supabase.rpc(
      "submit_public_teacher_survey",
      {
        p_group_id:payload.groupId,
        p_participant_hash:hashPublicSurveyParticipant(device,`teacher:${payload.groupId}`),
        p_locale: locale,
        p_answers: payload.answers,
        p_final_satisfaction: payload.finalSatisfaction,
        p_final_suggestions:
          String(payload.finalSuggestions || "").trim().slice(0, 3000) ||
          null,
      },
    );

    if (error) {
      return NextResponse.json(
        { ok: false },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    await supabase.from("site_security_events").insert({endpoint:"teacher_survey",ip_hash:ipHash,outcome:error?"rejected":"accepted"});
    const response = NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
    return response;
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
