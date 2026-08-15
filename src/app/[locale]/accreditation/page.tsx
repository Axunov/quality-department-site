import { Link } from '@/i18n/routing';
import { accreditationUi, localeOf } from '@/lib/accreditation/ui';
import ProjectProgress from '@/components/accreditation/ProjectProgress';

export default async function AccreditationPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params; const l=localeOf(locale); const t=accreditationUi[l];
 return <main className="min-h-screen bg-slate-50 py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0f5fa8] via-[#167f9a] to-[#24a3a5] px-6 py-10 text-white shadow-[0_25px_70px_rgba(15,95,168,.24)] md:px-12 md:py-14">
   <p className="text-sm font-black uppercase tracking-[.2em] text-cyan-100">{t.label}</p><h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">{t.title}</h1><p className="mt-5 max-w-4xl text-lg leading-8 text-blue-50">{t.description}</p>
   <div className="mt-8 flex flex-wrap gap-3"><Link href="/accreditation/cabinet" className="rounded-xl bg-white px-5 py-3 font-bold text-blue-800">{t.cabinet}</Link><Link href="/accreditation/director" className="rounded-xl bg-white/15 px-5 py-3 font-bold text-white ring-1 ring-white/25">{t.director}</Link></div>
  </section>
  <ProjectProgress projectCodes={['complex','special-software-engineering','special-biomedical-instrumentation']} locale={l} fallbackTotal={457}/>
  <section className="mt-10 grid gap-6 lg:grid-cols-2">
   <Link href="/accreditation/complex" className="group rounded-[30px] border border-blue-100 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,.07)] transition hover:-translate-y-1 hover:shadow-xl"><div className="text-5xl">🏛️</div><h2 className="mt-5 text-3xl font-black text-slate-900">{t.complex}</h2><p className="mt-3 leading-7 text-slate-600">{l==='ru'?'269 индикаторов комплексной государственной аккредитации, самооценка, доказательная база и контроль рабочих групп.':l==='uz'?'Kompleks davlat akkreditatsiyasining 269 indikatori, o‘zini o‘zi baholash, dalillar bazasi va ishchi guruhlar nazorati.':'269 institutional accreditation indicators, self-assessment, evidence base and working-group control.'}</p><div className="mt-6 font-black text-blue-700">{t.open} →</div></Link>
   <Link href="/accreditation/special" className="group rounded-[30px] border border-cyan-100 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,.07)] transition hover:-translate-y-1 hover:shadow-xl"><div className="text-5xl">🎓</div><h2 className="mt-5 text-3xl font-black text-slate-900">{t.special}</h2><p className="mt-3 leading-7 text-slate-600">{l==='ru'?'Мониторинг 94 индикаторов отдельно по двум образовательным программам с ответственными, соисполнителями и доказательной базой.':l==='uz'?'Ikki ta ta’lim dasturi bo‘yicha 94 ta indikatorning mas’ullar, hamijrochilar va dalillar bazasi bilan alohida monitoringi.':'Monitoring of 94 indicators separately for two educational programmes, including owners, co-executors and evidence requirements.'}</p><div className="mt-6 font-black text-cyan-700">{t.open} →</div></Link>
  </section>
 </div></main>
}
