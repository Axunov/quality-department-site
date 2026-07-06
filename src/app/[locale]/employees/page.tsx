import Image from "next/image";
import { PageHeader } from "@/components/common/PageHeader";
import { employees } from "@/data/employees";
import { Link } from "@/i18n/routing";

export default function EmployeesPage() {
  return (
    <main>
      <PageHeader
        label="Сотрудники"
        title="Сотрудники отдела"
        description="Структура отдела контроля качества образования, должностные обязанности, контакты и график приема работников."
      />

      <section className="container-main py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {employees.map((employee) => (
            <div key={employee.name} className="card card-hover overflow-hidden">
              <div className="grid gap-6 p-7 md:grid-cols-[180px_1fr]">
                <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-3xl bg-slate-100 text-slate-500">
                  {employee.photo ? (
                    <Image
                      src={employee.photo}
                      alt={employee.name}
                      width={360}
                      height={440}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    "Фото"
                  )}
                </div>

                <div>
                  <p className="soft-label">Сотрудник отдела</p>

                  <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
                    {employee.name}
                  </h2>

                  <p className="mt-2 font-semibold text-blue-700">
                    {employee.position}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-600">
                    <p>☎ {employee.phone}</p>
                    <p>✉ {employee.email}</p>
                    <p>✈ {employee.telegram}</p>
                    <p>🕘 {employee.reception}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 p-7">
                <h3 className="text-lg font-bold">Должностные обязанности</h3>

                <ul className="mt-4 space-y-2 text-slate-600">
                  {employee.duties.map((duty) => (
                    <li key={duty}>✓ {duty}</li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`mailto:${employee.email}`} className="btn-primary">
                    Написать письмо
                  </a>

                  <a href={`tel:${employee.phone}`} className="btn-secondary">
                    Позвонить
                  </a>

                  <Link href="/contacts" className="btn-secondary">
                    Контакты отдела
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}