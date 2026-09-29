import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { appealFileTypes } from "@/lib/studentAppeals";
import { getClientIp, hashClientIp, verifyTurnstile } from "@/lib/studentSecurity";
import { notifyAdminAboutAppeal } from "@/lib/adminAppealNotifications";

export const runtime = "nodejs";
const categories = new Set(["education","schedule","assessment","teacher","practice","facilities","integrity","technical","suggestion","other"]);
const clean = (value: FormDataEntryValue | null, max: number) => String(value || "").trim().slice(0, max);
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 25_000_000) return NextResponse.json({ok:false},{status:413});
  let form: FormData; try { form = await request.formData(); } catch { return NextResponse.json({ok:false},{status:400}); }
  const category=clean(form.get("category"),50),subject=clean(form.get("subject"),200),body=clean(form.get("body"),5000);
  const anonymous=form.get("anonymous")==="true",name=anonymous?"":clean(form.get("name"),200),group=clean(form.get("group"),150);
  const contactType=anonymous?"":clean(form.get("contactType"),20),contactValue=anonymous?"":clean(form.get("contactValue"),250);
  const locale=["ru","uz","en"].includes(clean(form.get("locale"),2))?clean(form.get("locale"),2):"ru";
  if(!categories.has(category)||subject.length<3||body.length<10||(!anonymous&&!name)||(!anonymous&&contactValue&&!['phone','telegram','email'].includes(contactType))) return NextResponse.json({ok:false,code:"invalid"},{status:400});
  const admin=createAdminClient(),ipHash=hashClientIp(getClientIp(request)),since=new Date(Date.now()-3_600_000).toISOString();
  const {count}=await admin.from("site_security_events").select("id",{count:"exact",head:true}).eq("endpoint","public_appeal").eq("ip_hash",ipHash).gte("created_at",since);
  if((count||0)>=3)return NextResponse.json({ok:false,code:"rate_limited"},{status:429,headers:{"Retry-After":"3600"}});
  if(!await verifyTurnstile(clean(form.get("captchaToken"),3000),getClientIp(request),"public_appeal")){
    await admin.from("site_security_events").insert({endpoint:"public_appeal",ip_hash:ipHash,outcome:"captcha_failed"});
    return NextResponse.json({ok:false,code:"captcha_failed"},{status:403});
  }
  const trackingCode=randomBytes(5).toString("hex").toUpperCase();
  const {data:appeal,error}=await admin.from("student_appeals").insert({source:"public_web",category,subject,body,preferred_locale:locale,confidential:true,anonymous,submitter_name:name||null,group_name:group||null,contact_type:contactType||null,contact_value:contactValue||null,tracking_hash:hash(trackingCode)}).select("id,appeal_number").single();
  if(error||!appeal){await admin.from("site_security_events").insert({endpoint:"public_appeal",ip_hash:ipHash,outcome:"database_failed"});return NextResponse.json({ok:false},{status:503});}
  await admin.from("student_appeal_history").insert({appeal_id:appeal.id,actor_type:"student",action:"submitted_public"});
  const files=form.getAll("files").filter(x=>x instanceof File) as File[];
  for(const file of files.slice(0,3)){if(file.size<1||file.size>5_242_880||!appealFileTypes.has(file.type))continue;const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(-120),path=`${appeal.id}/${crypto.randomUUID()}-${safe}`;const{error:uploadError}=await admin.storage.from("student-appeals").upload(path,await file.arrayBuffer(),{contentType:file.type,upsert:false});if(!uploadError)await admin.from("student_appeal_files").insert({appeal_id:appeal.id,storage_path:path,original_name:file.name.slice(0,200),mime_type:file.type,size_bytes:file.size,uploaded_by_type:"student"});}
  await admin.from("site_security_events").insert({endpoint:"public_appeal",ip_hash:ipHash,outcome:"accepted"});
  await notifyAdminAboutAppeal({number:appeal.appeal_number,category,subject,anonymous,name,group});
  return NextResponse.json({ok:true,number:appeal.appeal_number,trackingCode},{headers:{"Cache-Control":"no-store"}});
}

export async function GET(request: NextRequest) {
  const number=String(request.nextUrl.searchParams.get("number")||"").trim().slice(0,30),code=String(request.nextUrl.searchParams.get("code")||"").trim().toUpperCase().slice(0,30);
  if(!number||!code)return NextResponse.json({ok:false},{status:400});
  const admin=createAdminClient();const{data:appeal}=await admin.from("student_appeals").select("id,appeal_number,subject,status,created_at,updated_at").eq("appeal_number",number).eq("tracking_hash",hash(code)).eq("source","public_web").maybeSingle();
  if(!appeal)return NextResponse.json({ok:false},{status:404});
  const{data:messages}=await admin.from("student_appeal_messages").select("body,author_type,created_at").eq("appeal_id",appeal.id).eq("internal",false).order("created_at");
  return NextResponse.json({ok:true,appeal:{...appeal,messages:messages||[]}},{headers:{"Cache-Control":"private, no-store"}});
}
