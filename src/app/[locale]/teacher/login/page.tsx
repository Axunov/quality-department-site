import type { Metadata } from "next";
import { TeacherLogin } from "@/components/teacher/TeacherAuth";

export const metadata: Metadata = { title: "Вход преподавателя — тест HEMIS" };

export default function Page() {
  return <TeacherLogin />;
}
