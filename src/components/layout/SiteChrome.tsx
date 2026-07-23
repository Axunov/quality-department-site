"use client";

import { usePathname } from "@/i18n/routing";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div id="main-content" className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
