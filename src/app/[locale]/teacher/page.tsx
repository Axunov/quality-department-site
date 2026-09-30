import { surveyText } from "@/lib/surveyI18n";
import type { Metadata } from "next";
import HemisQuiz from "@/components/teacher/HemisQuiz";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  const metadata = { title: "Тест по функциям HEMIS" };
  return Object.fromEntries(Object.entries(metadata).map(([key,value]) => [key, surveyText(locale,value)]));
}
export const dynamic = "force-dynamic";

export default function Page() {
  return <HemisQuiz />;
}
