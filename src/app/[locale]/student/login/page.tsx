import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import StudentLogin from "@/components/student/StudentLogin";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = {
  title: "Вход в кабинет студента",
  description: "Личный кабинет студента и доступ к анонимным опросам",
};
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}

export default async function StudentLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudentLogin locale={locale} />;
}
