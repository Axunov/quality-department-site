"use client";
import { usePathname } from "@/i18n/routing";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WorkspaceSidebar from "@/components/dashboard/WorkspaceSidebar";
import { LayoutDashboard, ListChecks, FileText, Users } from "lucide-react";
const copy={ru:{title:"Рабочее пространство",home:"Мои индикаторы",complex:"Комплексная",special:"Специализированная",documents:"Документы",groups:"Рабочие группы",overview:"Обзор аккредитации"},uz:{title:"Iş maydoni",home:"Mening indikatorlarim",complex:"Kompleks",special:"Maxsus",documents:"Hujjatlar",groups:"Işçi guruhlar",overview:"Akkreditatsiya şarhi"},en:{title:"Workspace",home:"My indicators",complex:"Institutional",special:"Programme",documents:"Documents",groups:"Working groups",overview:"Accreditation overview"}};
export default function WorkspaceNavigation({ locale, children }: { locale: string; children: React.ReactNode }) {
  const path = usePathname();
  const l = locale === "uz" || locale === "en" ? locale : "ru";
  const t = copy[l];
  const director = { ru: "Кабинет директора", uz: "Direktor kabineti", en: "Director dashboard" };
  return <DashboardLayout sidebar={<WorkspaceSidebar locale={l} title={t.title} items={[
    path === "/accreditation/director" ? [director[l], "/accreditation/director", LayoutDashboard] : [t.home, "/accreditation/cabinet", LayoutDashboard],
    [t.complex, "/accreditation/complex", ListChecks], [t.special, "/accreditation/special", ListChecks],
    [t.documents, "/accreditation/complex/documents", FileText], [t.groups, "/accreditation/complex/working-groups", Users],
    [t.overview, "/accreditation", LayoutDashboard],
  ]}/>}>{children}</DashboardLayout>;
}
