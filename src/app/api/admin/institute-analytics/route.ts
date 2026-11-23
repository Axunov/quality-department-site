import { NextRequest, NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
import { aggregateWorkbook } from "@/lib/institute/import";
import { activeInstituteSnapshot } from "@/lib/institute/data";

export const runtime="nodejs";
const reply=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
const isKind=(v:unknown):v is "students"|"staff"=>v==="students"||v==="staff";
const originOk=(request:NextRequest)=>request.headers.get("origin")===request.nextUrl.origin;
const idValue=(value:unknown)=>typeof value==="string"&&/^\d{1,18}$/.test(value)?value:null;
const rpcResult=(status:unknown,error:unknown,payload?:unknown)=>status==="ok"&&!error?reply({payload}):
  ["stale","old","unchanged"].includes(String(status))?reply({error:status},409):
  status==="invalid"?reply({error:"file"},400):reply({error:"save"},503);

export async function GET(request:NextRequest){
  if(!await requireAdminMfa())return reply({error:"session"},403);
  const kind=request.nextUrl.searchParams.get("kind");
  if(!isKind(kind))return reply({error:"file"},400);
  try{
    const db=createAdminClient();
    const [active,history]=await Promise.all([activeInstituteSnapshot(db,kind),db.from("institute_analytics_snapshots").select("id,as_of,published_at").eq("kind",kind).order("as_of",{ascending:false}).order("id",{ascending:false}).limit(20)]);
    if(active.error||history.error)return reply({error:"save"},503);
    return reply({active:active.data?String(active.data.id):"", history:(history.data??[]).map(x=>({id:String(x.id),asOf:x.as_of,publishedAt:x.published_at}))});
  }catch{return reply({error:"save"},503);}
}

export async function PATCH(request:NextRequest){
  if(!originOk(request))return reply({error:"session"},403);
  const auth=await requireAdminMfa();
  if(!auth)return reply({error:"session"},403);
  const length=Number(request.headers.get("content-length"));
  if(!length||length<1||length>1024)return reply({error:"file"},400);
  try{
    const input=await request.json();
    const target=idValue(input?.target),expected=idValue(input?.expected);
    if(!isKind(input?.kind)||!target||!expected)return reply({error:"file"},400);
    const {data,error}=await createAdminClient().rpc("institute_analytics_publish",{p_kind:input.kind,p_actor:auth.user.id,p_expected:expected,p_payload:null,p_restore:target});
    return rpcResult(data,error);
  }catch{return reply({error:"save"},503);}
}

export async function POST(request:NextRequest){
  if(!originOk(request))return reply({error:"session"},403);
  const auth=await requireAdminMfa();
  if(!auth)return reply({error:"session"},403);
  const length=Number(request.headers.get("content-length"));
  if(!Number.isFinite(length)||length<=0||length>2_200_000)return reply({error:"file"},413);
  let form:FormData;
  try {form=await request.formData();} catch {return reply({error:"file"},400);}
  const file=form.get("file"),kind=form.get("kind"),asOf=form.get("asOf"),year=form.get("year"),action=form.get("action");
  if(!(file instanceof File)||!file.name.toLowerCase().endsWith(".xlsx")||typeof asOf!=="string"||typeof year!=="string"||!isKind(kind)||(action!=="preview"&&action!=="publish")) return reply({error:"file"},400);
  let payload;
  try { payload=aggregateWorkbook(new Uint8Array(await file.arrayBuffer()),kind,asOf,year); }
  catch(e){const code=e instanceof Error?e.message:"file";return reply({error:["columns","date","year","duplicates","empty","programmes"].includes(code)?code:"file"},400);}
  try{
    const db=createAdminClient();
    if(action==="preview"){
      const active=await activeInstituteSnapshot(db,kind);
      if(active.error)return reply({error:"save"},503);
      return reply({payload,previous:active.data?.payload??null,expected:active.data?String(active.data.id):""});
    }
    const expected=form.get("expected");
    if(expected!==""&&!idValue(expected))return reply({error:"file"},400);
    const {data,error}=await db.rpc("institute_analytics_publish",{p_kind:kind,p_actor:auth.user.id,p_expected:idValue(expected),p_payload:payload,p_restore:null});
    return rpcResult(data,error,payload);
  } catch { return reply({error:"save"},503); }
}
