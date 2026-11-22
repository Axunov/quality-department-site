import { ArrowUpRight, GraduationCap, Landmark, ShieldCheck, Users } from "lucide-react";
import { Link } from "@/i18n/routing";
import { portalLocale, portalRoles, portalUI } from "@/data/portal";

const icons = { student: GraduationCap, teacher: Users, accreditation: Landmark, admin: ShieldCheck };

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = portalUI[portalLocale((await params).locale)];
  return (
    <main className="container-main pb-16 pt-10 sm:pt-14">
      <header className="campus-banner">
        <p className="section-eyebrow">{t.account}</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-xl text-base leading-7">{t.description}</p>
      </header>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {portalRoles.map(({ id, href }) => {
          const Icon = icons[id];
          const [title, description] = t[id];
          return <Link className="campus-card" href={href} key={id}>
            <Icon aria-hidden="true" className="text-blue-600" size={26} />
            <h2 className="mt-5 text-xl font-bold">{title}</h2>
            <p className="mb-5 mt-2 flex-1 text-sm leading-6 text-slate-600">{description}</p>
            <span className="flex items-center gap-2 font-semibold text-blue-700">{t.enter}<ArrowUpRight size={17} aria-hidden="true" /></span>
          </Link>;
        })}
      </div>
      <section className="mt-8" aria-labelledby="portal-public">
        <h2 id="portal-public" className="text-lg font-bold">{t.publicTitle}</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {([["/surveys/teacher", t.survey], ["/appeals", t.appeal], ["/monitoring", t.monitoring]] as const).map(([href, label]) =>
            <Link key={href} href={href} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">{label}</Link>)}
        </div>
      </section>
    </main>
  );
}
