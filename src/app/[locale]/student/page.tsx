import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import StudentDashboard from "@/components/student/StudentDashboard";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = {
  title: "Личный кабинет студента",
  description: "Доступные анонимные опросы и статус участия",
};
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}

export default async function StudentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudentDashboard locale={locale} />;
}
