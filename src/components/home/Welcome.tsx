import Image from "next/image";
import { useTranslations } from "next-intl";

export function Welcome() {
  const t = useTranslations("Welcome");

  return (
    <section className="container-main section-padding">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <div className="card overflow-hidden p-3">
            <Image
              src="/images/rustamov.jpg"
              alt={t("name")}
              width={500}
              height={650}
              className="h-[430px] w-full rounded-[24px] object-cover object-top"
            />
          </div>
        </div>

        <div className="card p-8 lg:col-span-8">
          <p className="soft-label">{t("label")}</p>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900">
            {t("name")}
          </h2>

          <p className="mt-3 text-lg font-semibold text-blue-800">
            {t("position")}
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">{t("text")}</p>
        </div>
      </div>
    </section>
  );
}