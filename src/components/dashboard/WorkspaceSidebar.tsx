"use client";

import { Link, usePathname } from "@/i18n/routing";
import { portalLocale, portalUI } from "@/data/portal";
import { DoorOpen, type LucideIcon } from "lucide-react";

export default function WorkspaceSidebar({ locale, title, items }: {
  locale: string;
  title: string;
  items: ReadonlyArray<readonly [label: string, href: string, icon: LucideIcon]>;
}) {
  const pathname = usePathname();
  return <>
    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
    <nav aria-label={title}>
      {items.map(([label, href, Icon]) => {
        const active = pathname === href || (href === "/student/appeals" && pathname.startsWith(href + "/"));
        return <Link key={href} href={href} className={`workspace-nav-link ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}>
          <Icon size={17} aria-hidden="true"/>{label}
        </Link>;
      })}
      <Link href="/portal" className="workspace-nav-link mt-4"><DoorOpen size={17} aria-hidden="true"/>{portalUI[portalLocale(locale)].title}</Link>
    </nav>
  </>;
}
