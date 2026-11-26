import { Link } from "@/i18n/routing";
import PresidentQuote from "./PresidentQuote";

const copy = {
 ru: { title:"Отдел обеспечения качества образования", note:"Помогаем институту оценивать программы, учитывать обратную связь и готовить материалы по аккредитации.", more:"Об отделе" },
 uz: { title:"Ta’lim sifatini ta’minlaş bölimi", note:"Institutga dasturlarni baholaş, fikrlarni hisobga oliş va akkreditatsiya materiallarini tayyorlaşda yordam beramiz.", more:"Bölim haqida" },
 en: { title:"Education Quality Assurance Department", note:"We help the institute review its programmes, act on feedback and prepare for accreditation.", more:"About the department" },
};

export function HomeEditorNote({locale}: {locale:keyof typeof copy}) {
 const t=copy[locale];
 return <div className="container-main home-editor-note">
   <section className="home-mission" aria-labelledby="home-mission">
    <h2 id="home-mission">{t.title}</h2><p>{t.note}</p><Link href="/about">{t.more}</Link>
   </section>
   <PresidentQuote locale={locale} compact />
 </div>;
}
