import LearningQualityForm from "@/components/surveys/LearningQualityForm";
import learningSurvey from "@/data/learningQualitySurvey.json";
import GenericStudentSurveyForm from "@/components/surveys/GenericStudentSurveyForm";
export default async function Page({params}:{params:Promise<{locale:string;id:string}>}){const {locale,id}=await params;if(id===learningSurvey.id) return <LearningQualityForm locale={locale}/>;return <GenericStudentSurveyForm locale={locale} id={id}/>;}
