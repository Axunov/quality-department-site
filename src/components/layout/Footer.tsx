"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const header = useTranslations("Header");
  return (
    <footer className="mt-16 bg-[#083b73] text-white">
      <div className="container-main py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.jpg"
                alt="Логотип института"
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full object-cover bg-white"
              />

              <div>
                <h2 className="text-2xl font-extrabold">
                  {t("title")}
                </h2>
                <p className="mt-2 text-sm text-blue-100">
                  {t("institute")}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl leading-7 text-blue-100">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">{t("quickLinks")}</h3>
            <div className="mt-5 grid gap-3 text-blue-100">
              <Link href="/about">{t("about")}</Link>
              <Link href="/employees">{t("employees")}</Link>
              <Link href="/news">{t("news")}</Link>
              <Link href="/documents">{t("documents")}</Link>
              <Link href="/accreditation">{t("accreditation")}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">{t("contacts")}</h3>
            <div className="mt-5 space-y-3 text-blue-100">
              <p>📍 {header("address")}</p>
              <p>☎ +998 90 322-26-29</p>
              <p>✉ quality@sbumiptk.uz</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-blue-100">
          © 2026 {t("rights")}
        </div>
      </div>
    </footer>
  );
}
