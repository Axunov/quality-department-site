import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import TeacherSurveyForm from "@/components/surveys/TeacherSurveyForm";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = {
  title: "Преподаватель глазами студента",
  description: "Анонимная оценка качества преподавания студентами института",
};
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}

export default async function TeacherSurveyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <TeacherSurveyForm locale={locale} />;
}
