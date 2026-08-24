import GenericStudentSurveyForm from "@/components/surveys/GenericStudentSurveyForm";
export default async function Page({params}:{params:Promise<{locale:string;id:string}>}){const {locale,id}=await params;return <GenericStudentSurveyForm locale={locale} id={id}/>;}
