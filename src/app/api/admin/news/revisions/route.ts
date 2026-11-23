import sanitizeHtml from "sanitize-html";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminMfa } from "@/lib/adminSecurity";
import { createAdminClient } from "@/lib/supabase/admin";
const excerpt=(value:unknown)=>typeof value==="string"?sanitizeHtml(value,{allowedTags:[],allowedAttributes:{}}).slice(0,3000):"";
export async function GET(request:NextRequest){
  const headers={"Cache-Control":"private, no-store"};
  if(!await requireAdminMfa())return NextResponse.json({error:"session"},{status:403,headers});
  const id=request.nextUrl.searchParams.get("id");
  if(!id||!/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(id))return NextResponse.json({error:"format"},{status:400,headers});
  const {data,error}=await createAdminClient().from("news_editorial_revisions").select("id,archived_at,snapshot").eq("news_id",id).order("id",{ascending:false}).limit(15);
  if(error)return NextResponse.json({error:"saveError"},{status:503,headers});
  return NextResponse.json({revisions:(data??[]).map(row=>({
    id:row.id,archivedAt:row.archived_at,published:row.snapshot.published===true,
    titles:{ru:row.snapshot.title_ru??"",uz:row.snapshot.title_uz??"",en:row.snapshot.title_en??""},
    bodies:{ru:excerpt(row.snapshot.content_ru||row.snapshot.text_ru),uz:excerpt(row.snapshot.content_uz||row.snapshot.text_uz),en:excerpt(row.snapshot.content_en||row.snapshot.text_en)},
  }))},{headers});
}
