import QualitySurveyAdmin from "@/components/admin/QualitySurveyAdmin";
export const dynamic="force-dynamic";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <QualitySurveyAdmin locale={locale} kind="doctoral"/>}
