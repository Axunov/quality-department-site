import AdminMfa from "@/components/admin/AdminMfa";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AdminMfa locale={locale} />;
}
