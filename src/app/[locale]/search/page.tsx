import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";
import { portalLocale } from "@/data/portal";
import { searchCategories, searchCopy } from "@/data/searchCopy";
import { findSiteResults } from "@/lib/siteSearch";

export default async function SearchPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const locale = portalLocale((await params).locale);
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : q?.[0] || "").slice(0, 100).trim();
  const t = searchCopy[locale];
  const results = await findSiteResults(locale, query, 100);
  return (
    <main>
      <PageHeader label={t.button} title={t.title} description={t.description} />
      <section className="container-main py-12 sm:py-16">
        <form className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm sm:flex-row" role="search">
          <label className="sr-only" htmlFor="site-search">{t.placeholder}</label>
          <input id="site-search" name="q" defaultValue={query} maxLength={100} placeholder={t.placeholder} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-5 py-3" />
          <button className="rounded-xl bg-blue-700 px-7 py-3 font-bold text-white hover:bg-blue-800">{t.button}</button>
        </form>
        {!results.length && <p className="mt-8 rounded-2xl bg-white p-6 text-slate-600">{query.length < 2 ? t.prompt : t.empty}</p>}
        {searchCategories.map(category => {
          const group = results.filter(x => x.category === category);
          return group.length > 0 && <section key={category} className="mt-8">
            <h2 className="mb-3 text-xl font-bold">{t[category]}</h2>
            <div className="grid gap-3 sm:grid-cols-2">{group.map(x => {
              const details = <><h3 className="font-bold text-blue-800">{x.title}</h3>{x.text && <p className="mt-2 text-sm text-slate-600">{x.text}</p>}</>;
              return x.external
                ? <a key={x.id} href={x.href} target="_blank" rel="noopener noreferrer" className="campus-card">{details}</a>
                : <Link key={x.id} href={x.href} className="campus-card">{details}</Link>;
            })}</div>
          </section>;
        })}
      </section>
    </main>
  );
}
