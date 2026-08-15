import { useTranslations } from "next-intl";

export function ContactsPreview() {
  const t = useTranslations("ContactsPreview");

  return (
    <section className="container-main pb-20">
      <div className="card bg-gradient-to-r from-[#0b3b78] to-[#2563eb] p-10 text-white">

        <h2 className="text-4xl font-bold">
          {t("title")}
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-3">

          <div>
            <p className="text-blue-200">
              {t("addressLabel")}
            </p>

            <p className="mt-2">
              {t("address")}
            </p>
          </div>

          <div>
            <p className="text-blue-200">
              {t("phoneLabel")}
            </p>

            <p className="mt-2">
              +998 90 322-26-29
            </p>
          </div>

          <div>
            <p className="text-blue-200">
              {t("employeesLabel")}
            </p>

            <p className="mt-2">
              {t("head")}
            </p>

            <p>
              {t("inspector")}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}