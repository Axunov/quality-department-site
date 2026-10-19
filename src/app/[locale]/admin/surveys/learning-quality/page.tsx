import LearningQualityAdmin from "@/components/admin/LearningQualityAdmin";
export const dynamic = "force-dynamic";
export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale} = await params;
  return <LearningQualityAdmin locale={locale}/>;
}
