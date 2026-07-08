import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const links = [
  "/monitoring",
  "/accreditation",
  "/documents",
  "/news",
  "/analytics",
  "/appeals",
];

const icons = ["📊", "🏛️", "📄", "📝", "📈", "✉️"];

type DirectionItem = {
  title: string;
  text: string;
};

export function Directions() {
  const t = useTranslations("Directions");
  const items = t.raw("items") as DirectionItem[];

  return (
    <section className="container-main py-14">
      <div className="mb-8">
        <p className="soft-label">{t("label")}</p>
        <h2 className="mt-4 section-title">{t("title")}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Link
            key={item.title}
            href={links[index]}
            className="rounded-[30px] bg-white p-7 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="text-5xl">{icons[index]}</div>
            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
            <p className="mt-6 font-bold text-blue-700">Открыть →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}