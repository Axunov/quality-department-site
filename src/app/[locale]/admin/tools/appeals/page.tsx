import StudentAppealsAdmin from "@/components/admin/StudentAppealsAdmin";
export default async function AppealsPage({params}:{params:Promise<{locale:string}>}){const{locale}=await params;return <StudentAppealsAdmin locale={locale}/>}
