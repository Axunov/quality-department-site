import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Statistics() {
  const t = useTranslations("Statistics");

  const statistics = [
    { icon: "🎓", number: "100+", title: t("monitoring"), href: "/about", color: "text-blue-700", bg: "bg-blue-50", line: "bg-blue-500" },
    { icon: "📄", number: "32+", title: t("documents"), href: "/documents", color: "text-emerald-700", bg: "bg-emerald-50", line: "bg-emerald-500" },
    { icon: "📊", number: "10+", title: t("surveys"), href: "/news", color: "text-sky-700", bg: "bg-sky-50", line: "bg-sky-500" },
    { icon: "👥", number: "1800+", title: t("students"), href: "/employees", color: "text-orange-600", bg: "bg-orange-50", line: "bg-orange-500" }
  ];

  return (
    <section className="container-main py-12">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-[22px] bg-white p-5 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl ${item.bg}`}>
                {item.icon}
              </div>

              <div>
                <h2 className={`text-3xl font-extrabold ${item.color}`}>
                  {item.number}
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {item.title}
                </p>
              </div>
            </div>

            <div className="mt-4 h-1 rounded-full bg-slate-100">
              <div className={`h-1 w-12 rounded-full ${item.line}`} />
            </div>

            <p className="mt-3 text-xs font-semibold text-blue-700">
              Подробнее →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}