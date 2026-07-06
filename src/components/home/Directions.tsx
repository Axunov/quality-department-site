import { useTranslations } from "next-intl";

export function Directions() {
  const t = useTranslations("Directions");
  const directions = t.raw("items") as string[];

  return (
    <section className="container-main pb-20">
      <h2 className="text-3xl font-bold">{t("title")}</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {directions.map((item) => (
          <div key={item} className="card card-hover p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-700">
              ✓
            </div>
            <h3 className="text-xl font-bold">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}