import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Staff, Students } from "./types";

export async function instituteSnapshots() {
  try {
    const db=createAdminClient();
    const table="institute_analytics_snapshots";
    const [students,staff]=await Promise.all(["students","staff"].map(kind=>db.from(table).select("payload").eq("kind",kind).order("as_of",{ascending:false}).order("id",{ascending:false}).limit(1).maybeSingle()));
    return {students:(students.data?.payload??null) as Students|null,staff:(staff.data?.payload??null) as Staff|null,error:Boolean(students.error||staff.error)};
  } catch { return {students:null,staff:null,error:true}; }
}
