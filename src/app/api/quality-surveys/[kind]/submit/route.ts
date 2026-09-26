import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, hashClientIp, verifyTurnstile } from "@/lib/studentSecurity";
import { doctoralRatingItems, graduateProgrammes, graduateRatingItems } from "@/data/qualitySurveys";

export const runtime = "nodejs";
const clean = (value: unknown, max = 3000) => String(value ?? "").trim().slice(0, max);

export async function POST(request: NextRequest, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (kind !== "graduates" && kind !== "doctoral") return NextResponse.json({ok:false},{status:404});
  if (Number(request.headers.get("content-length") || 0) > 80_000) return NextResponse.json({ok:false},{status:413});
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ok:false},{status:400}); }
  const profile = body.profile && typeof body.profile === "object" ? body.profile as Record<string, unknown> : {};
  const answers = body.answers && typeof body.answers === "object" ? body.answers as Record<string, unknown> : {};
  const expected = kind === "graduates" ? graduateRatingItems.length : doctoralRatingItems.length;
  const ratings = Array.isArray(body.ratings) ? body.ratings.map(Number) : [];
  const validBase = ratings.length === expected && ratings.every(v => Number.isInteger(v) && v >= 1 && v <= 5);
  const validProfile = kind === "graduates"
    ? ["2024","2025","2026"].includes(clean(profile.graduationYear)) && graduateProgrammes.includes(clean(profile.programme)) && Boolean(clean(profile.faculty) && clean(profile.employmentStatus) && clean(answers.firstJobTiming) && clean(answers.recommendation))
    : Boolean(clean(profile.specialty,250) && ["1-й курс","2-й курс","3-й курс"].includes(clean(profile.course)) && ["Базовая докторантура (PhD)","Докторантура (DSc)","Самостоятельный соискатель"].includes(clean(profile.form)));
  if (!validBase || !validProfile) return NextResponse.json({ok:false},{status:400,headers:{"Cache-Control":"no-store"}});

  const safeProfile = Object.fromEntries(Object.entries(profile).slice(0,10).map(([k,v])=>[k,clean(v,500)]));
  const safeAnswers = Object.fromEntries(Object.entries(answers).slice(0,10).map(([k,v])=>[k,clean(v)]));
  const choices = Array.isArray(body.choices) ? body.choices.slice(0,20).map(v=>clean(v,200)).filter(Boolean) : [];
  try {
    const admin = createAdminClient(), clientIp = getClientIp(request), ipHash = hashClientIp(clientIp), endpoint = `${kind}_survey`;
    const since = new Date(Date.now()-3_600_000).toISOString();
    const { count } = await admin.from("site_security_events").select("id",{count:"exact",head:true}).eq("endpoint",endpoint).eq("ip_hash",ipHash).gte("created_at",since);
    if ((count||0)>=5) return NextResponse.json({ok:false,code:"rate_limited"},{status:429,headers:{"Retry-After":"3600","Cache-Control":"no-store"}});
    const captcha = await verifyTurnstile(clean(body.captchaToken),clientIp,endpoint);
    if (!captcha) { await admin.from("site_security_events").insert({endpoint,ip_hash:ipHash,outcome:"captcha_failed"}); return NextResponse.json({ok:false,code:"captcha_failed"},{status:403}); }
    const { error } = await admin.from("quality_survey_responses").insert({survey_type:kind,locale:body.locale === "uz" || body.locale === "en" ? body.locale : "ru",profile:safeProfile,ratings,choices,answers:safeAnswers});
    await admin.from("site_security_events").insert({endpoint,ip_hash:ipHash,outcome:error?"database_failed":"accepted"});
    if (error) return NextResponse.json({ok:false},{status:503});
    return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  } catch { return NextResponse.json({ok:false},{status:503,headers:{"Cache-Control":"no-store"}}); }
}
