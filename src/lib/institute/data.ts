import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Staff, Students } from "./types";

export async function activeInstituteSnapshot(db:ReturnType<typeof createAdminClient>,kind:"students"|"staff"){
 const {data,error}=await db.from("institute_analytics_publications").select("snapshot_id").eq("kind",kind).order("id",{ascending:false}).limit(1).maybeSingle();
 const rows=db.from("institute_analytics_snapshots").select("id,payload,as_of").eq("kind",kind);
 // On an environment awaiting the additive migration, keep public charts on
 // the last saved aggregate; changes are made only by the protected RPC.
 if(error && !["42P01","PGRST205"].includes(error.code))throw error;
 if(data)return rows.eq("id",data.snapshot_id).maybeSingle();
 return rows.order("as_of",{ascending:false}).order("id",{ascending:false}).limit(1).maybeSingle();
}

export async function instituteSnapshots() {
  try {
    const db=createAdminClient();
    const [students,staff]=await Promise.all([activeInstituteSnapshot(db,"students"),activeInstituteSnapshot(db,"staff")]);
    const previous=(kind:"students"|"staff",date:string|undefined)=>date
      ? db.from("institute_analytics_snapshots").select("payload").eq("kind",kind).lt("as_of",date).order("as_of",{ascending:false}).order("id",{ascending:false}).limit(1).maybeSingle()
      : null;
    const [previousStudents,previousStaff]=await Promise.all([previous("students",students.data?.as_of),previous("staff",staff.data?.as_of)]);
    return {students:(students.data?.payload??null) as Students|null,staff:(staff.data?.payload??null) as Staff|null,previousStudents:(previousStudents?.data?.payload??null) as Students|null,previousStaff:(previousStaff?.data?.payload??null) as Staff|null,error:Boolean(students.error||staff.error)};
  } catch { return {students:null,staff:null,previousStudents:null,previousStaff:null,error:true}; }
}
