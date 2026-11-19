import PublicMonitoringDashboard from "@/components/PublicMonitoringDashboard";

export const dynamic = "force-dynamic";

export default async function MonitoringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PublicMonitoringDashboard locale={locale} />;
}
