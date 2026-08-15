import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#003b7a] via-[#005eb8] to-[#0ea5a3]">
      <div className="grid min-h-[430px] w-full items-center lg:grid-cols-2">
        <div className="z-10 px-8 py-12 text-white lg:pl-20 xl:pl-24">
          <p className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase backdrop-blur">
            {t("label")}
          </p>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight lg:text-5xl">
            {t("title")}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-blue-50">
            {t("text")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/documents" className="hero-btn">
              📁 {t("documents")}
            </Link>
            <Link href="/news" className="hero-btn">
              📰 {t("news")}
            </Link>
          </div>
        </div>

        <div className="relative h-[430px]">
          <Image
            src="/images/institute.jpg"
            alt="Institute"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#005eb8] to-transparent" />
        </div>
      </div>
    </section>
  );
}