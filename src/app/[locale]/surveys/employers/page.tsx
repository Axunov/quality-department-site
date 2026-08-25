import type { Metadata } from "next";
import EmployerSurveyForm from "@/components/surveys/EmployerSurveyForm";

export const metadata: Metadata = {
  title: "Опрос работодателей",
  description: "Оценка качества подготовки выпускников и взаимодействия института с работодателями",
};

export default async function EmployerSurveyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <EmployerSurveyForm locale={locale} />;
}

