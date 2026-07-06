import { PageHeader } from "@/components/common/PageHeader";
import { news } from "@/data/news";
import { Link } from "@/i18n/routing";
import { SearchBox } from "@/components/search/SearchBox";

const categories = ["Все", "Аккредитация", "Мониторинг", "Опросы", "Семинары"];

export default function NewsPage() {
  return (
    <main>
      <PageHeader
        label="Новости"
        title="Новости отдела"
        description="Актуальные события, объявления, мониторинг, опросы, семинары и материалы по аккредитации."
      />

      <section className="container-main py-16">
        <div className="mb-10 rounded-[28px] bg-white p-6 shadow-xl shadow-slate-200/70">
          <SearchBox placeholder="Поиск по новостям..." />

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

        <div className="grid gap-8 md:grid-cols-3">
          {news.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[30px] bg-white shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#0b3b78] to-[#0ea5a3] text-6xl text-white">
                {index === 0 ? "📊" : index === 1 ? "🏛️" : "📝"}
              </div>

              <div className="p-7">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {item.category}
                </span>

                <h2 className="mt-5 text-xl font-extrabold leading-7 text-slate-900">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  {item.date} · {item.author}
                </p>

                <p className="mt-5 leading-7 text-slate-600">{item.text}</p>

                <Link
                  href={`/news/${item.slug}`}
                  className="mt-6 inline-block font-bold text-blue-700"
                  >
                 Читать подробнее →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
