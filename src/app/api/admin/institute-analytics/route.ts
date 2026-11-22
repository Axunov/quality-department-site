import { NextRequest, NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
import { aggregateWorkbook } from "@/lib/institute/import";

export const runtime="nodejs";
const reply=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store"}});

export async function POST(request:NextRequest){
  if(request.headers.get("origin")!==request.nextUrl.origin)return reply({error:"session"},403);
  const auth=await requireAdminMfa();
  if(!auth)return reply({error:"session"},403);
  const length=Number(request.headers.get("content-length"));
  if(!Number.isFinite(length)||length<=0||length>2_200_000)return reply({error:"file"},413);
  let form:FormData;
  try {form=await request.formData();} catch {return reply({error:"file"},400);}
  const file=form.get("file"),kind=form.get("kind"),asOf=form.get("asOf"),year=form.get("year"),action=form.get("action");
  if(!(file instanceof File)||!file.name.toLowerCase().endsWith(".xlsx")||typeof asOf!=="string"||typeof year!=="string"||(kind!=="students"&&kind!=="staff")||(action!=="preview"&&action!=="publish"))return reply({error:"file"},400);
  let payload;
  try { payload=aggregateWorkbook(new Uint8Array(await file.arrayBuffer()),kind,asOf,year); }
  catch(e){const code=e instanceof Error?e.message:"file";return reply({error:["columns","date","year","duplicates","empty","programmes"].includes(code)?code:"file"},400);}
  if(action==="preview")return reply({payload});
  const db=createAdminClient();
  const {data:latest,error:readError}=await db.from("institute_analytics_snapshots").select("as_of").eq("kind",kind).order("as_of",{ascending:false}).order("id",{ascending:false}).limit(1).maybeSingle();
  if(readError)return reply({error:"save"},503);
  if(latest?.as_of && asOf<latest.as_of)return reply({error:"old"},409);
  const {error}=await db.from("institute_analytics_snapshots").insert({kind,as_of:asOf,payload,published_by:auth.user.id});
  return error?reply({error:"save"},503):reply({payload});
}
