import PublicStudentSurveys from "@/components/surveys/PublicStudentSurveys";

export default async function Page({ params }:{ params:Promise<{locale:string}> }) {
  const { locale } = await params;
  return <PublicStudentSurveys locale={locale}/>;
}
