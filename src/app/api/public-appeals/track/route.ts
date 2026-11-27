import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

import { getClientIp, hashClientIp } from "@/lib/studentSecurity";

export const runtime = "nodejs";
const limitWindowMs=10*60*1000;
const reply=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store",...(status===429?{"Retry-After":String(limitWindowMs/1000)}:{})}});

export async function POST(request:NextRequest){
  if(request.headers.get("origin")!==request.nextUrl.origin) return reply({ok:false},403);
  const length=Number(request.headers.get("content-length"));
  if(!Number.isSafeInteger(length)||length<=0||length>1024) return reply({ok:false},400);
  let input: unknown;
  try { input=await request.json(); } catch { return reply({ok:false},400); }
  if(!input||typeof input!=="object"||!("number" in input)||!("code" in input)||typeof input.number!=="string"||typeof input.code!=="string") return reply({ok:false},400);
  const number=input.number.trim(),code=input.code.trim().toUpperCase();
  if(!number||number.length>30||!/^(?:[0-9A-F]{10}|[0-9A-F]{32})$/.test(code)) return reply({ok:false},404);
  try {
    const admin=createAdminClient();
    // Reuse the existing security ledger with a separate HMAC scope; do not log numbers or codes.
    const ipHash=hashClientIp(`appeal-status:${getClientIp(request)}`);
    const {count,error:limitError}=await admin.from("site_security_events").select("id",{count:"exact",head:true}).eq("endpoint","public_appeal").eq("ip_hash",ipHash).gte("created_at",new Date(Date.now()-limitWindowMs).toISOString());
    if(limitError)return reply({ok:false},503);
    if((count??0)>=30)return reply({ok:false},429);
    const {error:logError}=await admin.from("site_security_events").insert({endpoint:"public_appeal",ip_hash:ipHash,outcome:"accepted"});
    if(logError)return reply({ok:false},503);
    const hash=createHash("sha256").update(code).digest("hex");
    const {data:appeal,error}=await admin.from("student_appeals").select("id,appeal_number,subject,status,created_at,updated_at").eq("appeal_number",number).eq("tracking_hash",hash).eq("source","public_web").maybeSingle();
    if(error) return reply({ok:false},503);
    if(!appeal) return reply({ok:false},404);
    const {data:messages,error:messagesError}=await admin.from("student_appeal_messages").select("body,author_type,created_at").eq("appeal_id",appeal.id).eq("internal",false).order("created_at");
    if(messagesError) return reply({ok:false},503);
    const {appeal_number,subject,status,created_at,updated_at}=appeal;
    return reply({ok:true,appeal:{appeal_number,subject,status,created_at,updated_at,messages:messages||[]}});
  } catch { return reply({ok:false},503); }
}
