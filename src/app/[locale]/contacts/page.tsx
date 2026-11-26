import { Link } from "@/i18n/routing";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { contactsCopy } from "@/components/editorial/contactsCopy";
import CopyContact from "@/components/editorial/CopyContact";
import { EditorialContents, EditorialIntro, EditorialSection, editorialLocale } from "@/components/editorial/EditorialPage";

export default async function ContactsPage({params}:{params:Promise<{locale:string}>}){
 const locale=editorialLocale((await params).locale),t=contactsCopy[locale];
 const query=encodeURIComponent(t.addressValue);
 const mapLabel={ru:"Открыть в Google Maps",uz:"Google Maps’da oçiş",en:"Open in Google Maps"}[locale];
 return <main className="editorial-page">
  <EditorialIntro title={t.title} description={t.description}/>
  <EditorialContents locale={locale} links={[["contacts",t.sectionLabel],["map",t.mapTitle],["reception",t.receptionTitle]]}>
   <EditorialSection id="contacts" title={t.sectionTitle} lead={t.sectionDescription}>
    <dl className="editorial-pairs contact-details">
    {([[MapPin,t.address,t.addressValue,""],[Phone,t.phone,t.phoneValue,"tel:"+t.phoneValue.replace(/[^+\d]/g,"")],[Mail,t.email,t.emailValue,"mailto:"+t.emailValue],[Clock,t.workSchedule,t.workScheduleValue,""]] as const).map(([Icon,label,value,href])=><div key={label}><dt><Icon size={17} aria-hidden="true"/>{label}</dt><dd>{href?<a href={href}>{value}</a>:value}{href&&<CopyContact locale={locale} label={label} value={value}/>}</dd></div>)}
    </dl>
    <div className="editorial-highlight"><h3>{t.reception}</h3><p>{t.receptionValue}</p></div>
    <p className="mt-4"><Link className="editorial-link" href="/employees">{t.employeesButton}</Link></p>
   </EditorialSection>
   <EditorialSection id="map" title={t.mapTitle} lead={t.mapDescription}>
    <iframe title={t.mapTitle} src={`https://www.google.com/maps?q=${query}&output=embed`} className="contact-map" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
    <a className="editorial-link mt-4 inline-block" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${query}`}>{mapLabel}</a>
   </EditorialSection>
   <EditorialSection id="reception" title={t.receptionTitle} lead={t.receptionDescription}><Link href="/appeals" className="campus-filter mt-4">{t.receptionButton}</Link></EditorialSection>
  </EditorialContents>
 </main>;
}
