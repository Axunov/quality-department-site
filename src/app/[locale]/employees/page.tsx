import { PageHeader } from "@/components/common/PageHeader";
import { getEmployees } from "@/services/employees.service";
import { getLocalizedText } from "@/utils/getLocalizedText";

const labels = {
  ru: {
    label: "Сотрудники",
    title: "Сотрудники отдела",
    description:
      "Сотрудники отдела контроля качества образования и контактная информация",
    phone: "Телефон",
    email: "Электронная почта",
    telegram: "Telegram",
    room: "Кабинет",
    reception: "График приёма",
    empty: "Информация о сотрудниках пока не добавлена",
  },
  uz: {
    label: "Xodimlar",
    title: "Bo‘lim xodimlari",
    description:
      "Ta’lim sifatini nazorat qilish bo‘limi xodimlari va aloqa ma’lumotlari",
    phone: "Telefon",
    email: "Elektron pochta",
    telegram: "Telegram",
    room: "Xona",
    reception: "Qabul vaqti",
    empty: "Xodimlar haqida ma’lumot hozircha qo‘shilmagan",
  },
  en: {
    label: "Employees",
    title: "Department employees",
    description:
      "Employees of the Education Quality Control Department and their contact information",
    phone: "Phone",
    email: "Email",
    telegram: "Telegram",
    room: "Office",
    reception: "Reception hours",
    empty: "Employee information has not been added yet",
  },
};

export default async function EmployeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const currentLocale: "ru" | "uz" | "en" =
    locale === "uz" || locale === "en" ? locale : "ru";

  const t = labels[currentLocale];
  const employees = await getEmployees();

  return (
    <main>
      <PageHeader
        label={t.label}
        title={t.title}
        description={t.description}
      />

      <section className="container-main py-16">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {employees.map((emp: any) => {
            const fullName = getLocalizedText(
              currentLocale,
              emp.full_name_ru || emp.fullname_ru,
              emp.full_name_uz || emp.fullname_uz,
              emp.full_name_en || emp.fullname_en
            );

            const position = getLocalizedText(
              currentLocale,
              emp.position_ru,
              emp.position_uz,
              emp.position_en
            );

            const department = getLocalizedText(
              currentLocale,
              emp.department_ru,
              emp.department_uz,
              emp.department_en
            );

            const reception = getLocalizedText(
              currentLocale,
              emp.reception_ru,
              emp.reception_uz,
              emp.reception_en
            );

            return (
              <article
                key={emp.id}
                className="overflow-hidden rounded-[28px] bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="bg-gradient-to-br from-blue-50 to-slate-100 p-7">
                  <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white text-6xl shadow-lg">
                    {emp.photo_url ? (
                      <img
                        src={emp.photo_url}
                        alt={fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "👤"
                    )}
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="text-center text-xl font-bold text-slate-900">
                    {fullName}
                  </h2>

                  {position && (
                    <p className="mt-3 text-center font-semibold text-blue-700">
                      {position}
                    </p>
                  )}

                  {department && (
                    <p className="mt-2 text-center text-sm text-slate-500">
                      {department}
                    </p>
                  )}

                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                    {emp.room && (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">🚪</span>
                        <div>
                          <p className="font-semibold text-slate-700">
                            {t.room}
                          </p>
                          <p className="text-slate-600">{emp.room}</p>
                        </div>
                      </div>
                    )}

                    {reception && (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">🕘</span>
                        <div>
                          <p className="font-semibold text-slate-700">
                            {t.reception}
                          </p>
                          <p className="whitespace-pre-line text-slate-600">
                            {reception}
                          </p>
                        </div>
                      </div>
                    )}

                    {emp.phone && (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">☎</span>
                        <div>
                          <p className="font-semibold text-slate-700">
                            {t.phone}
                          </p>
                          <a
                            href={`tel:${emp.phone}`}
                            className="text-blue-700 hover:underline"
                          >
                            {emp.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {emp.email && (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">✉</span>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-700">
                            {t.email}
                          </p>
                          <a
                            href={`mailto:${emp.email}`}
                            className="break-all text-blue-700 hover:underline"
                          >
                            {emp.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {emp.telegram && (
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5">✈</span>
                        <div>
                          <p className="font-semibold text-slate-700">
                            {t.telegram}
                          </p>
                          <a
                            href={
                              emp.telegram.startsWith("http")
                                ? emp.telegram
                                : `https://t.me/${emp.telegram.replace("@", "")}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            {emp.telegram}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {employees.length === 0 && (
            <div className="col-span-full rounded-3xl bg-white p-12 text-center text-slate-500 shadow">
              {t.empty}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}