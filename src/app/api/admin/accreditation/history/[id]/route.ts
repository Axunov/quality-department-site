import {NextResponse} from "next/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {requireAdminMfa} from "@/lib/adminSecurity";

export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
  const{id}=await params;if(!await requireAdminMfa())return NextResponse.json({error:"MFA required"},{status:403});
  const historyId=Number(id);
  if(!Number.isSafeInteger(historyId)||historyId<1)return NextResponse.json({error:"Invalid id"},{status:400});
  const admin=createAdminClient(),{data:entry,error:readError}=await admin.from("accreditation_v3_history").select("id,indicator_id,action,details").eq("id",historyId).maybeSingle();
  if(readError||!entry)return NextResponse.json({error:readError?.message||"Not found"},{status:404});
  const{error}=await admin.from("accreditation_v3_history").delete().eq("id",historyId);
  if(error)return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({ok:true});
}
