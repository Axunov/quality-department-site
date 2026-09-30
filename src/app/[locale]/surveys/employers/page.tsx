import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import EmployerSurveyForm from "@/components/surveys/EmployerSurveyForm";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = {
  title: "Опрос работодателей",
  description: "Оценка качества подготовки выпускников и взаимодействия института с работодателями",
};
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}

export default async function EmployerSurveyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <EmployerSurveyForm locale={locale} />;
}

