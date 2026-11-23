import { Link } from "@/i18n/routing";
import { analyticsCopy,analyticsLanguage } from "@/lib/institute/copy";
import { instituteSnapshots } from "@/lib/institute/data";
import { StaffCharts,StudentCharts } from "@/components/institute/InstituteCharts";
import { SnapshotComparison } from "@/components/institute/SnapshotComparison";
export const dynamic="force-dynamic";
export default async function AnalyticsPage({params}:{params:Promise<{locale:string}>}){
 const lang=analyticsLanguage((await params).locale),t=analyticsCopy[lang];
 const {students,staff,previousStudents,previousStaff,error}=await instituteSnapshots();
 return <main className="container-main space-y-9 py-8 sm:py-14">
   <header className="campus-banner"><p className="section-eyebrow">HEMIS · SBUMIPTK</p><h1 className="mt-3 text-4xl font-black">{t.title}</h1><p className="mt-4 max-w-2xl">{t.lead}</p>
     <nav className="mt-5 flex flex-wrap gap-2" aria-label={t.title}>{students&&<a className="campus-filter" href="#students">{t.students}</a>}{staff&&<a className="campus-filter" href="#staff">{t.staff}</a>}<Link className="campus-filter" href="/monitoring">{t.monitoring}</Link><Link className="campus-filter" href="/documents">{t.docs}</Link></nav>
   </header>
   {error&&<p role="status" className="campus-card">{t.unavailable}</p>}
   {students?<><StudentCharts data={students} lang={lang}/><SnapshotComparison lang={lang} current={students} previous={previousStudents}/></>:!error&&<p className="campus-card">{t.students}: {t.empty}</p>}
   {staff?<><StaffCharts data={staff} lang={lang}/><SnapshotComparison lang={lang} current={staff} previous={previousStaff}/></>:!error&&<p className="campus-card">{t.staff}: {t.empty}</p>}
 </main>;
}
