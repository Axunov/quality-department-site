import LearningQualityForm from "@/components/surveys/LearningQualityForm";
import survey from "@/data/learningQualitySurvey.json";
import { learningLocale } from "@/data/learningQualityCopy";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  const {locale} = await params; const lang = learningLocale(locale);
  return { title: survey.title[lang], description: survey.description[lang] };
}
export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale} = await params;
  return <LearningQualityForm locale={locale}/>;
}
