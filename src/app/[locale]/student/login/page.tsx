import type { Metadata } from "next";
import StudentLogin from "@/components/student/StudentLogin";

export const metadata: Metadata = {
  title: "Вход в кабинет студента",
  description: "Личный кабинет студента и доступ к анонимным опросам",
};

export default async function StudentLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <StudentLogin locale={locale} />;
}
