import {NextResponse} from "next/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {requireAdminMfa} from "@/lib/adminSecurity";

export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
 try{
  const auth=await requireAdminMfa();if(!auth)return NextResponse.json({error:"MFA required"},{status:403});const user=auth.user;
  const{id}=await params;if(!/^[0-9a-f-]{36}$/i.test(id))return NextResponse.json({error:"Invalid document"},{status:400});
  const admin=createAdminClient(),{data:doc,error:readError}=await admin.from("accreditation_v3_documents").select("id,indicator_id,file_name,storage_path,version").eq("id",id).maybeSingle();
  if(readError||!doc)return NextResponse.json({error:readError?.message||"Document not found"},{status:404});
  const{error:storageError}=await admin.storage.from("accreditation-v3-evidence").remove([doc.storage_path]);
  if(storageError)return NextResponse.json({error:storageError.message},{status:400});
  const{count}=await admin.from("accreditation_v3_documents").select("id",{count:"exact",head:true}).eq("indicator_id",doc.indicator_id).neq("id",id);
  await admin.from("accreditation_v3_history").insert({indicator_id:doc.indicator_id,actor_id:user.id,action:"document_deleted",details:{document_id:id,file_name:doc.file_name,version:doc.version}});
  const{error:deleteError}=await admin.from("accreditation_v3_documents").delete().eq("id",id);
  if(deleteError)return NextResponse.json({error:deleteError.message},{status:400});
  if((count||0)===0)await admin.from("accreditation_v3_indicators").update({status:"draft",completion_percent:0,submitted_at:null,approved_at:null}).eq("id",doc.indicator_id);
  return NextResponse.json({ok:true,remaining:count||0});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Server error"},{status:500})}
}
