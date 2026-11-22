import SurveyCatalog from "@/components/surveys/SurveyCatalog";
import { portalLocale } from "@/data/portal";
import { catalogCopy } from "@/data/surveyCatalog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = catalogCopy[portalLocale(locale)];
  return { title: t.title, description: t.lead };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ audience?: string | string[] }> }) {
  const [{ locale }, { audience }] = await Promise.all([params, searchParams]);
  return <SurveyCatalog locale={locale} initialAudience={typeof audience === "string" ? audience : undefined} />;
}
