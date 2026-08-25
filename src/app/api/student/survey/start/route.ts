import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  PUBLIC_SURVEY_DEVICE_COOKIE,
  studentCookieOptions,
} from "@/lib/studentSecurity";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body=await request.json().catch(()=>({})) as {groupId?:string};
    if(!body.groupId){const{data:groups,error}=await supabase.from("survey_groups").select("id,name").eq("active",true).order("name");if(error)throw error;return NextResponse.json({ok:true,groups:groups||[]},{headers:{"Cache-Control":"no-store"}});}
    if(!/^[0-9a-f-]{36}$/i.test(body.groupId))return NextResponse.json({ok:false},{status:400});

    const { data: teachers, error: teachersError } = await supabase
      .from("survey_group_teachers")
      .select("id,teacher_id,subject,teachers:survey_teachers(full_name)")
      .eq("group_id", body.groupId)
      .eq("active", true)
      .order("sort_order");

    if (teachersError) throw teachersError;

    const response = NextResponse.json(
      { ok: true, teachers: teachers || [] },
      { headers: { "Cache-Control": "no-store" } },
    );
    if(!request.cookies.get(PUBLIC_SURVEY_DEVICE_COOKIE)?.value)response.cookies.set(PUBLIC_SURVEY_DEVICE_COOKIE,randomBytes(32).toString("hex"),studentCookieOptions(31_536_000));
    return response;
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
