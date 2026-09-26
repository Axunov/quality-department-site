import type { Metadata } from "next";
import QualitySurveyForm from "@/components/surveys/QualitySurveyForm";
export const metadata: Metadata = { title: "Опрос докторантов", description: "Анонимная оценка условий обучения и научной деятельности" };
export default async function Page({params}:{params:Promise<{locale:string}>}) { const {locale}=await params; return <QualitySurveyForm locale={locale} kind="doctoral"/>; }
