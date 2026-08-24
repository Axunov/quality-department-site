import TeacherSurveyAdmin from "@/components/admin/TeacherSurveyAdmin";
import StudentSurveyBuilder from "@/components/admin/StudentSurveyBuilder";

export const dynamic = "force-dynamic";

export default async function TeacherSurveyAdminPage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  return <div className="space-y-12"><StudentSurveyBuilder locale={locale}/><hr className="border-slate-300"/><TeacherSurveyAdmin /></div>;
}
