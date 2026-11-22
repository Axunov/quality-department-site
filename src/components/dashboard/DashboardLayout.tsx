import type { ReactNode } from "react";

export default function DashboardLayout({ sidebar, children, admin = false }: {
  sidebar: ReactNode; children: ReactNode; admin?: boolean;
}) {
  return (
    <div className={admin ? "flex min-w-0 flex-col md:flex-row" : "workspace-shell"}>
      <aside className={admin
        ? "admin-sidebar w-full border-b border-slate-200 bg-white p-4 text-slate-900 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:self-start md:overflow-y-auto md:border-r md:border-b-0"
        : "workspace-sidebar"}>
        {sidebar}
      </aside>
      <div className={admin ? "admin-content min-w-0 flex-1" : "workspace-content"}>{children}</div>
    </div>
  );
}
