import type { Metadata } from "next";
import HemisQuiz from "@/components/teacher/HemisQuiz";

export const metadata: Metadata = { title: "Тест по функциям HEMIS" };
export const dynamic = "force-dynamic";

export default function Page() {
  return <HemisQuiz />;
}
