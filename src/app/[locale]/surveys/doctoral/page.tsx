import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import QualitySurveyForm from "@/components/surveys/QualitySurveyForm";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = { title: "Опрос докторантов", description: "Анонимная оценка условий обучения и научной деятельности" };
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}
export default async function Page({params}:{params:Promise<{locale:string}>}) { const {locale}=await params; return <QualitySurveyForm locale={locale} kind="doctoral"/>; }
