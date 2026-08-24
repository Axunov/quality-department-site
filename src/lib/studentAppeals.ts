import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
export type StudentContext={access_code_id:string;participant_name:string;student_identifier:string;group_id:string;group_name:string};
export async function getStudentContext(token?:string){if(!token)return null;const{data,error}=await createAdminClient().rpc("student_appeal_context",{p_portal_token:token});return error?null:(data?.[0] as StudentContext|undefined)||null;}
export const appealFileTypes=new Set(["application/pdf","image/jpeg","image/png","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
