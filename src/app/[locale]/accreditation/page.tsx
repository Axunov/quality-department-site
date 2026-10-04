import { Link } from "@/i18n/routing";
import { accreditationUi, localeOf } from "@/lib/accreditation/ui";
import AccreditationOverview from "@/components/accreditation/AccreditationOverview";
export default async function AccreditationPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{type?:string}>}){
 const {locale}=await params;const sp=await searchParams;const l=localeOf(locale),t=accreditationUi[l];
 return <main className="min-h-screen bg-slate-50 py-9"><div className="container-main"><section className="flex flex-wrap items-start justify-between gap-6"><div className="max-w-3xl"><p className="section-eyebrow">{t.label}</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1><p className="mt-4 text-base leading-7 text-slate-600">{t.description}</p></div><Link href="/accreditation/login" className="btn-primary">{t.login}</Link></section><AccreditationOverview locale={l} initialType={sp.type}/></div></main>;
}
