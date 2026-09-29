import {NextRequest,NextResponse} from "next/server";
import {requireAdminMfa} from "@/lib/adminSecurity";
import {createAdminClient} from "@/lib/supabase/admin";
export async function GET(){if(!await requireAdminMfa())return NextResponse.json({error:"MFA required"},{status:403});const{count}=await createAdminClient().from("student_appeals").select("id",{count:"exact",head:true}).is("admin_seen_at",null);return NextResponse.json({unread:count||0},{headers:{"Cache-Control":"private, no-store"}})}
export async function PATCH(r:NextRequest){if(!await requireAdminMfa())return NextResponse.json({error:"MFA required"},{status:403});const{id}=await r.json();if(typeof id!=="string")return NextResponse.json({ok:false},{status:400});const{error}=await createAdminClient().from("student_appeals").update({admin_seen_at:new Date().toISOString()}).eq("id",id);return NextResponse.json({ok:!error},{status:error?503:200,headers:{"Cache-Control":"private, no-store"}})}
