import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";
import { getDocuments } from "@/services/documents.service";
import { getEmployees } from "@/services/employees.service";
import { getNews } from "@/services/news.service";

const labels = {
  ru: { label: "Поиск", title: "Поиск по сайту", description: "Поиск по новостям, документам и сотрудникам отдела.", placeholder: "Введите запрос", button: "Найти", empty: "По вашему запросу ничего не найдено.", prompt: "Введите слово или фразу для поиска.", news: "Новости", documents: "Документы", employees: "Сотрудники" },
  uz: { label: "Qidiruv", title: "Sayt bo‘yicha qidiruv", description: "Bo‘lim yangiliklari, hujjatlari va xodimlari bo‘yicha qidiruv.", placeholder: "So‘rovni kiriting", button: "Qidirish", empty: "So‘rovingiz bo‘yicha ma’lumot topilmadi.", prompt: "Qidirish uchun so‘z yoki iborani kiriting.", news: "Yangiliklar", documents: "Hujjatlar", employees: "Xodimlar" },
  en: { label: "Search", title: "Site search", description: "Search department news, documents and staff.", placeholder: "Enter a search term", button: "Search", empty: "No results were found.", prompt: "Enter a word or phrase to search.", news: "News", documents: "Documents", employees: "Staff" },
};

function pick(locale: string, ru?: string | null, uz?: string | null, en?: string | null) {
  if (locale === "uz") return uz || ru || en || "";
  if (locale === "en") return en || ru || uz || "";
  return ru || uz || en || "";
}

function plainText(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q = "" } = await searchParams;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[current];
  const query = q.trim().toLocaleLowerCase(current);

  const [news, documents, employees] = query
    ? await Promise.all([getNews(), getDocuments(), getEmployees()])
    : [[], [], []];

  const newsResults = news.filter((item) =>
    `${pick(current, item.title_ru, item.title_uz, item.title_en)} ${pick(current, item.text_ru, item.text_uz, item.text_en)}`.toLocaleLowerCase(current).includes(query)
  );
  const documentResults = documents.filter((item) =>
    `${pick(current, item.title_ru, item.title_uz, item.title_en)} ${pick(current, item.description_ru, item.description_uz, item.description_en)} ${item.file_name || ""}`.toLocaleLowerCase(current).includes(query)
  );
  const employeeResults = employees.filter((item) =>
    `${pick(current, item.full_name_ru || item.fullname_ru, item.full_name_uz || item.fullname_uz, item.full_name_en || item.fullname_en)} ${pick(current, item.position_ru, item.position_uz, item.position_en)}`.toLocaleLowerCase(current).includes(query)
  );
  const total = newsResults.length + documentResults.length + employeeResults.length;

  return (
    <main>
      <PageHeader label={t.label} title={t.title} description={t.description} />
      <section className="container-main py-12 sm:py-16">
        <form className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-xl shadow-slate-200/70 sm:flex-row" role="search">
          <label className="sr-only" htmlFor="site-search">{t.placeholder}</label>
          <input id="site-search" name="q" defaultValue={q} placeholder={t.placeholder} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-5 py-3 outline-none focus:border-blue-600" />
          <button className="rounded-xl bg-blue-700 px-7 py-3 font-bold text-white hover:bg-blue-800">{t.button}</button>
        </form>

        {!query && <p className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">{t.prompt}</p>}
        {query && total === 0 && <p className="mt-8 rounded-2xl bg-white p-6 text-slate-600 shadow">{t.empty}</p>}

        {newsResults.length > 0 && <ResultSection title={t.news}>{newsResults.map((item) => <ResultLink key={item.id} href={`/news/${item.slug}`} title={pick(current, item.title_ru, item.title_uz, item.title_en)} text={plainText(pick(current, item.text_ru, item.text_uz, item.text_en)).slice(0, 180)} />)}</ResultSection>}
        {documentResults.length > 0 && <ResultSection title={t.documents}>{documentResults.map((item) => <ResultLink key={item.id} href={item.file_url} external title={pick(current, item.title_ru, item.title_uz, item.title_en)} text={pick(current, item.description_ru, item.description_uz, item.description_en) || item.file_name || ""} />)}</ResultSection>}
        {employeeResults.length > 0 && <ResultSection title={t.employees}>{employeeResults.map((item) => <ResultLink key={item.id} href="/employees" title={pick(current, item.full_name_ru || item.fullname_ru, item.full_name_uz || item.fullname_uz, item.full_name_en || item.fullname_en)} text={pick(current, item.position_ru, item.position_uz, item.position_en)} />)}</ResultSection>}
      </section>
    </main>
  );
}

function ResultSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-10"><h2 className="text-2xl font-extrabold text-slate-900">{title}</h2><div className="mt-4 grid gap-4">{children}</div></section>;
}

function ResultLink({ href, title, text, external = false }: { href: string; title: string; text: string; external?: boolean }) {
  const className = "rounded-2xl bg-white p-5 shadow transition hover:-translate-y-0.5 hover:shadow-lg";
  const content = <><h3 className="font-bold text-blue-800">{title}</h3>{text && <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>}</>;
  return external ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}
