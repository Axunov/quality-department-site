import PublicMonitoringDashboard from "@/components/PublicMonitoringDashboard";

export const dynamic = "force-dynamic";

export default async function MonitoringPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ survey?: string | string[] }> }) {
  const [{ locale }, { survey }] = await Promise.all([params, searchParams]);
  return <PublicMonitoringDashboard locale={locale} initialReport={typeof survey === "string" ? survey : undefined} />;
}
