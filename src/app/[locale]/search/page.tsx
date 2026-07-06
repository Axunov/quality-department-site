import { PageHeader } from "@/components/common/PageHeader";

export default function SearchPage() {
  return (
    <main>
      <PageHeader
        label="Поиск"
        title="Поиск по сайту"
        description="Поиск по новостям, документам, сотрудникам и материалам отдела."
      />

      <section className="container-main py-16">
        <div className="rounded-[30px] bg-white p-8 shadow-xl shadow-slate-200/70">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500">
            🔍 В следующем этапе подключим полноценный поиск по сайту.
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <a href="/ru/news" className="rounded-2xl bg-blue-50 p-6 font-bold text-blue-800">
              Новости
            </a>
            <a href="/ru/documents" className="rounded-2xl bg-blue-50 p-6 font-bold text-blue-800">
              Документы
            </a>
            <a href="/ru/employees" className="rounded-2xl bg-blue-50 p-6 font-bold text-blue-800">
              Сотрудники
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
