import { PageHeader } from "@/components/common/PageHeader";
import { documents } from "@/data/documents";
import { SearchBox } from "@/components/search/SearchBox";

const categories = [
  "Все документы",
  "Внутренние положения",
  "Аккредитация",
  "Шаблоны",
  "Методические материалы",
];

export default function DocumentsPage() {
  return (
    <main>
      <PageHeader
        label="Документы"
        title="Электронная библиотека документов"
        description="Приказы, положения, формы, шаблоны, методические материалы и документы по аккредитации."
      />

      <section className="container-main py-16">
        <div className="mb-10 rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
          <SearchBox placeholder="Поиск документа..." />

          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-bold text-blue-800"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {documents.map((doc, index) => (
            <div
              key={doc.title}
              className="rounded-[30px] bg-white p-7 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                {index === 0 ? "📕" : index === 1 ? "📘" : "📄"}
              </div>

              <h2 className="mt-6 text-xl font-extrabold leading-7 text-slate-900">
                {doc.title}
              </h2>

              <p className="mt-4 text-sm text-slate-500">
                {doc.category} · {doc.date} · {doc.format}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={doc.file}
                  className="rounded-xl bg-[#0b3b78] px-5 py-3 text-sm font-bold text-white"
                >
                  Скачать
                </a>

                <a
                  href={doc.file}
                  className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-800"
                >
                  Просмотр
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
