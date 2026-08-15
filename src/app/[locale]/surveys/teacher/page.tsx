import type { Metadata } from "next";
import TeacherSurveyForm from "@/components/surveys/TeacherSurveyForm";

export const metadata: Metadata = {
  title: "Преподаватель глазами студента",
  description: "Анонимная оценка качества преподавания студентами института",
};

export default async function TeacherSurveyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <TeacherSurveyForm locale={locale} />;
}
