import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminMfa } from "@/lib/adminSecurity";

export const runtime = "nodejs";
export async function GET(request: NextRequest, {params}:{params:Promise<{kind:string}>}) {
  if (!await requireAdminMfa()) return NextResponse.json({error:"MFA required"},{status:403});
  const {kind}=await params; if (kind!=="graduates"&&kind!=="doctoral") return NextResponse.json({error:"Not found"},{status:404});
  const q=request.nextUrl.searchParams, from=q.get("from")||"", to=q.get("to")||"";
  let query=createAdminClient().from("quality_survey_responses").select("id,created_at,locale,profile,ratings,choices,answers").eq("survey_type",kind);
  if (/^\d{4}-\d{2}-\d{2}$/.test(from)) query=query.gte("created_at",`${from}T00:00:00.000Z`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(to)) query=query.lte("created_at",`${to}T23:59:59.999Z`);
  const {data,error}=await query.order("created_at",{ascending:false}).limit(5000);
  if(error) return NextResponse.json({error:"Data unavailable"},{status:503});
  const rows=data||[], week=rows.filter(row=>Date.now()-new Date(row.created_at).getTime()<604800000).length;
  return NextResponse.json({rows,week},{headers:{"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
}
