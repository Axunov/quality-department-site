import { Link } from "@/i18n/routing";
import { getEmployees } from "@/services/employees.service";
import { getLocalizedText } from "@/utils/getLocalizedText";
import EmployeeDirectory from "@/components/editorial/EmployeeDirectory";
import { employeesCopy } from "@/components/editorial/employeesCopy";
import { EditorialContents, EditorialIntro, EditorialSection, editorialLocale } from "@/components/editorial/EditorialPage";

export default async function EmployeesPage({params}:{params:Promise<{locale:string}>}){
 const locale=editorialLocale((await params).locale),t=employeesCopy[locale];
 const employees=await getEmployees();
 const pick=(ru?:string|null,uz?:string|null,en?:string|null)=>getLocalizedText(locale,ru||"",uz||"",en||"")||ru||uz||en||"";
 const people=employees.map(p=>({
  id:p.id,name:pick(p.full_name_ru||p.fullname_ru,p.full_name_uz||p.fullname_uz,p.full_name_en||p.fullname_en),
  position:pick(p.position_ru,p.position_uz,p.position_en),department:pick(p.department_ru,p.department_uz,p.department_en),
  office:p.office||p.room||"",reception:pick(p.reception_hours_ru||p.reception_ru,p.reception_hours_uz||p.reception_uz,p.reception_hours_en||p.reception_en),
  email:p.email||"",phone:p.phone||"",photo:p.photo_url||"",
  telegram:(p.telegram||"").trim().match(/^(?:https?:\/\/(?:t\.me|telegram\.me)\/|@)?([a-zA-Z0-9_]{3,})\/?$/)?.[1]||"",
 }));
 return <main className="editorial-page">
  <EditorialIntro title={t.title} description={t.description}/>
  <EditorialContents locale={locale} links={[["team",t.sectionTitle],["team-contact",t.contactInformation]]}>
   <EditorialSection id="team" title={t.sectionTitle} lead={t.sectionDescription}><EmployeeDirectory people={people} locale={locale}/></EditorialSection>
   <EditorialSection id="team-contact" title={t.contactInformation}><Link href="/contacts" className="campus-filter mt-4">{{ru:"Контакты отдела",uz:"Bölim kontaktlari",en:"Department contacts"}[locale]}</Link></EditorialSection>
  </EditorialContents>
 </main>;
}
