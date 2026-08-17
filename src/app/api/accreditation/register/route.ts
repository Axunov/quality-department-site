import {NextResponse} from "next/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {accreditationPositions} from "@/lib/accreditation/positions";
import {internalEmail,normalizeUsername} from "@/lib/accreditation/localization";

const blocked=new Set(["admin","administrator","director","root","support","quality","accreditation"]);
const usernamePattern=/^[a-z0-9][a-z0-9._-]{2,31}$/;
const allowedPositions=new Set(accreditationPositions.filter(x=>x.key!=="director").map(x=>x.key));

export async function POST(request:Request){
 try{
  const body=await request.json(),username=normalizeUsername(String(body.username||"")),password=String(body.password||""),fullName=String(body.fullName||"").trim(),positionKey=String(body.positionKey||"").trim(),phone=String(body.phone||"").trim()||null,recoveryEmail=String(body.email||"").trim().toLowerCase()||null;
  if(!usernamePattern.test(username)||blocked.has(username)||password.length<8||password.length>72||fullName.length<3||fullName.length>160||!allowedPositions.has(positionKey))return NextResponse.json({code:"invalid_input"},{status:400});
  if(recoveryEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail))return NextResponse.json({code:"invalid_email"},{status:400});
  const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||request.headers.get("x-real-ip")||"unknown",admin=createAdminClient();
  const since=new Date(Date.now()-60*60*1000).toISOString(),{count}=await admin.from("accreditation_v72_registration_attempts").select("id",{count:"exact",head:true}).eq("ip_address",forwarded).gte("created_at",since);
  if((count||0)>=5)return NextResponse.json({code:"rate_limited"},{status:429});
  await admin.from("accreditation_v72_registration_attempts").insert({ip_address:forwarded,username,successful:false});
  const{data:existing}=await admin.from("accreditation_v3_profiles").select("user_id").ilike("username",username).maybeSingle();
  if(existing)return NextResponse.json({code:"username_exists"},{status:409});
  const position=accreditationPositions.find(x=>x.key===positionKey)!;
  const{data:created,error:createError}=await admin.auth.admin.createUser({email:internalEmail(username),password,email_confirm:true,app_metadata:{role:"accreditation"},user_metadata:{accreditation_signup:"true",full_name:fullName,job_title:position.ru,position_key:positionKey,requested_role:"department_head"}});
  if(createError||!created.user)return NextResponse.json({code:createError?.message?.toLowerCase().includes("registered")?"username_exists":"creation_failed"},{status:400});
  const{error:profileError}=await admin.from("accreditation_v3_profiles").update({username,recovery_email:recoveryEmail,phone,job_title:position.ru,position_key:positionKey,requested_role:"department_head",role:"department_head",approval_status:"pending",approved_at:null,is_active:false,must_change_password:false}).eq("user_id",created.user.id);
  if(profileError){await admin.auth.admin.deleteUser(created.user.id);return NextResponse.json({code:"profile_failed"},{status:400})}
  await admin.from("accreditation_v72_registration_attempts").update({successful:true}).eq("ip_address",forwarded).eq("username",username).order("created_at",{ascending:false}).limit(1);
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({code:"server_error"},{status:500})}
}
