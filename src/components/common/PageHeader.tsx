import { useLocale } from "next-intl";
import { surveyText } from "@/lib/surveyI18n";
import { Link } from "@/i18n/routing";

type PageHeaderProps = {
  title: string;
  description: string;
  label: string;
};

export function PageHeader({ title, description, label }: PageHeaderProps) {
  const currentLocale = useLocale();
  const tr = (text: string) => surveyText(currentLocale, text);

  return (
    <section className="page-banner relative overflow-hidden text-white">
      <div className="container-main py-9 sm:py-11">
        <div className="mb-4 text-sm font-semibold text-blue-100">
          <Link href="/">{tr("Главная")}</Link>
          <span className="mx-2">/</span>
          <span>{label}</span>
        </div>

        <p className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
          {label}
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight">
          {title}
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-blue-50">
          {description}
        </p>
      </div>
    </section>
  );
}