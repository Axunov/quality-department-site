import SurveyMonitoringDashboard from "@/components/admin/SurveyMonitoringDashboard";

export const dynamic = "force-dynamic";

export default async function MonitoringAdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SurveyMonitoringDashboard locale={locale} />;
}
