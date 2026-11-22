"use client";

import { useLocale } from "next-intl";
import { Bell, LayoutDashboard, Mail } from "lucide-react";
import { usePathname } from "@/i18n/routing";
import { portalLocale, portalUI } from "@/data/portal";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WorkspaceSidebar from "@/components/dashboard/WorkspaceSidebar";

const copy = {
  ru: ["Обзор", "Мои обращения", "Уведомления"],
  uz: ["Umumiy ko‘rinish", "Mening murojaatlarim", "Bildirishnomalar"],
  en: ["Overview", "My appeals", "Notifications"],
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const l = portalLocale(useLocale());
  const path = usePathname();
  if (path === "/student/login") return children;

  const [overview, appeals, notifications] = copy[l];
  return <DashboardLayout sidebar={<WorkspaceSidebar locale={l} title={portalUI[l].student[0]} items={[
    [overview, "/student", LayoutDashboard],
    [appeals, "/student/appeals", Mail],
    [notifications, "/student/notifications", Bell],
  ]}/>}>{children}</DashboardLayout>;
}
