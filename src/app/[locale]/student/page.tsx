import type { Metadata } from "next";
import StudentDashboard from "@/components/student/StudentDashboard";

export const metadata: Metadata = {
  title: "Личный кабинет студента",
  description: "Доступные анонимные опросы и статус участия",
};

export default async function StudentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudentDashboard locale={locale} />;
}
