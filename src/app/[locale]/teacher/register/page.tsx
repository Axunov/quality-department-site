import type { Metadata } from "next";
import { TeacherRegister } from "@/components/teacher/TeacherAuth";

export const metadata: Metadata = { title: "Регистрация преподавателя — тест HEMIS" };

export default function Page() {
  return <TeacherRegister />;
}
