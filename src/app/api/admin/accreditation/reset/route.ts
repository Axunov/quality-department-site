import {NextResponse} from "next/server";
import {createAdminClient} from "@/lib/supabase/admin";
import {requireAdminMfa} from "@/lib/adminSecurity";

export async function POST(){
 if(!await requireAdminMfa())return NextResponse.json({error:"MFA required"},{status:403});
 const admin=createAdminClient(),{data:documents,error:readError}=await admin.from("accreditation_v3_documents").select("storage_path");
 if(readError)return NextResponse.json({error:readError.message},{status:400});
 const paths=(documents||[]).map(x=>x.storage_path).filter(Boolean);
 if(paths.length){const{error}=await admin.storage.from("accreditation-v3-evidence").remove(paths);if(error)return NextResponse.json({error:error.message},{status:400})}
 const operations=[
  admin.from("accreditation_v3_reviews").delete().neq("id","00000000-0000-0000-0000-000000000000"),
  admin.from("accreditation_v3_documents").delete().neq("id","00000000-0000-0000-0000-000000000000"),
  admin.from("accreditation_v6_notifications").delete().in("kind",["approved","revision","returned"]),
 ];
 for(const operation of operations){const{error}=await operation;if(error)return NextResponse.json({error:error.message},{status:400})}
 const{error:updateError}=await admin.from("accreditation_v3_indicators").update({status:"draft",completion_percent:0,submitted_at:null,approved_at:null,response_text:""}).neq("id","00000000-0000-0000-0000-000000000000");
 if(updateError)return NextResponse.json({error:updateError.message},{status:400});
 const{error:historyError}=await admin.from("accreditation_v3_history").delete().neq("action","assigned");
 if(historyError)return NextResponse.json({error:historyError.message},{status:400});
 return NextResponse.json({ok:true,removedFiles:paths.length});
}
