import { Link } from "@/i18n/routing";

type PageHeaderProps = {
  title: string;
  description: string;
  label: string;
};

export function PageHeader({ title, description, label }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#003b7a] via-[#005eb8] to-[#0ea5a3] text-white">
      <div className="container-main py-16">
        <div className="mb-6 text-sm font-semibold text-blue-100">
          <Link href="/">Главная</Link>
          <span className="mx-2">/</span>
          <span>{label}</span>
        </div>

        <p className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
          {label}
        </p>

        <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight">
          {title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
          {description}
        </p>
      </div>
    </section>
  );
}