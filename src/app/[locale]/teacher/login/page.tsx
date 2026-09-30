import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import { TeacherLogin } from "@/components/teacher/TeacherAuth";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = { title: "Вход преподавателя — тест HEMIS" };
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}

export default function Page() {
  return <TeacherLogin />;
}
