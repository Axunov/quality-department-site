import { Link } from "@/i18n/routing";
import { aboutCopy } from "@/components/editorial/aboutCopy";
import { EditorialContents, EditorialIntro, EditorialSection, editorialLocale } from "@/components/editorial/EditorialPage";

export default async function AboutPage({params}:{params:Promise<{locale:string}>}){
 const locale=editorialLocale((await params).locale),t=aboutCopy[locale];
 const principles=[[t.transparency,t.transparencyDesc],[t.objectivity,t.objectivityDesc],[t.continuous,t.continuousDesc],[t.participation,t.participationDesc]];
 return <main className="editorial-page">
  <EditorialIntro title={t.title} description={t.description}/>
  <EditorialContents locale={locale} links={[["mission",t.missionLabel],["principles",t.principlesLabel],["tasks",t.tasksTitle],["process",t.processLabel],["materials",t.ctaTitle]]}>
   <EditorialSection id="mission" title={t.missionTitle} lead={t.missionText}>
    <div className="editorial-highlight"><h3>{t.goalTitle}</h3><p>{t.goalText}</p></div>
   </EditorialSection>
   <EditorialSection id="principles" title={t.principlesTitle}>
    <div className="editorial-pairs">{principles.map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
   </EditorialSection>
   <EditorialSection id="tasks" title={t.tasksTitle} lead={t.tasksDescription}>
    <div className="editorial-pairs">{t.tasks.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
   </EditorialSection>
   <EditorialSection id="process" title={t.processTitle} lead={t.processDescription}>
    <ol className="editorial-process">{t.stages.map(item=><li key={item.number}><span aria-hidden="true">{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol>
   </EditorialSection>
   <EditorialSection id="materials" title={t.ctaTitle} lead={t.ctaDescription}><Link href="/documents" className="campus-filter mt-4">{t.ctaButton}</Link></EditorialSection>
  </EditorialContents>
 </main>;
}
