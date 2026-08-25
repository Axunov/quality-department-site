import {NextResponse} from "next/server";
import {requireAdminMfa} from "@/lib/adminSecurity";
import {createAdminClient} from "@/lib/supabase/admin";
export async function GET(){if(!await requireAdminMfa())return NextResponse.json({error:"MFA required"},{status:403});const{data,error}=await createAdminClient().from("teacher_survey_public_participation").select("group_id,completed_on");if(error)return NextResponse.json({error:"Unavailable"},{status:503});const rows=data||[],byGroup=Object.entries(rows.reduce<Record<string,number>>((a,x)=>{a[x.group_id]=(a[x.group_id]||0)+1;return a},{})).map(([groupId,count])=>({groupId,count}));return NextResponse.json({total:rows.length,byGroup},{headers:{"Cache-Control":"private, no-store"}})}
