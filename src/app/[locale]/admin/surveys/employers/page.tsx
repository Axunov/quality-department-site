import EmployerSurveyAdmin from "@/components/admin/EmployerSurveyAdmin";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <EmployerSurveyAdmin locale={locale} />;
}
