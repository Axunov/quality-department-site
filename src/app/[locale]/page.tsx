import { NewsCover } from "@/components/news/NewsCover";
import { NewsViews } from "@/components/news/NewsViews";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ClipboardList, MessageSquare, LogIn, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getDocuments } from "@/services/documents.service";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { surveyText } from "@/lib/surveyI18n";
import { HomeMotion } from "@/components/home/HomeMotion";
import { ServiceHub } from "@/components/home/ServiceHub";
import PresidentQuote from "@/components/home/PresidentQuote";
import { portalUI } from "@/data/portal";

export const revalidate = 300;
const actions={
 ru:{label:"Быстрые действия",survey:"Выберите анкету для своей аудитории",appeal:"Задайте вопрос и сохраните код отслеживания",account:"Задания, доказательства и публикации"},
 uz:{label:"Tezkor amallar",survey:"Özingizga mos anketani tanlang",appeal:"Savol yuboring va kuzatuv kodini saqlang",account:"Vazifalar, dalillar va naşrlar"},
 en:{label:"Quick actions",survey:"Choose a survey for your audience",appeal:"Ask a question and keep your tracking code",account:"Tasks, evidence and publications"},
};
const copy = {
 ru: {name:"Отдел обеспечения качества образования", title:"Качество начинается с диалога.", text:"Аккредитация, обратная связь и материалы для развития качества образования — в одном месте.", accreditation:"Аккредитация", survey:"Пройти опрос", appeal:"Подать обращение", about:"Узнать об отделе", note:"Ваше мнение помогает улучшать обучение", privacy:"Студенческий опрос без регистрации и Ф.И.О.", news:"Новости и объявления", allNews:"Все новости", emptyNews:"Новости пока не добавлены", documents:"Документы", allDocuments:"Все документы", emptyDocuments:"Документы пока не добавлены", open:"Открыть", centre:"Информационный центр", resources:"Полезные материалы"},
 uz: {name:"Ta’lim sifatini ta’minlaş bölimi",title:"Sifat muloqotdan boşlanadi.",text:"Akkreditatsiya, qayta aloqa va ta’lim sifatini rivojlantiriş uçun materiallar — bir joyda.",accreditation:"Akkreditatsiya",survey:"Sörovda qatnaşiş",appeal:"Murojaat yuboriş",about:"Bölim haqida",note:"Fikringiz ta’limni yaxşilaşga yordam beradi",privacy:"Talabalar sörovi röyxatdan ötiş va F.I.Ş.siz",news:"Yangiliklar va e’lonlar",allNews:"Barça yangiliklar",emptyNews:"Hozirça yangiliklar qöşilmagan",documents:"Hujjatlar",allDocuments:"Barça hujjatlar",emptyDocuments:"Hozirça hujjatlar qöşilmagan",open:"Oçiş",centre:"Axborot markazi",resources:"Foydali materiallar"},
 en: {name:"Education Quality Assurance Department",title:"Quality begins with dialogue.",text:"Accreditation, feedback and resources to improve education quality — all in one place.",accreditation:"Accreditation",survey:"Take a survey",appeal:"Submit an appeal",about:"About the department",note:"Your feedback helps improve learning",privacy:"Student survey without registration or names",news:"News and announcements",allNews:"All news",emptyNews:"No news has been added yet",documents:"Documents",allDocuments:"All documents",emptyDocuments:"No documents have been added yet",open:"Open",centre:"Information centre",resources:"Useful resources"}
};
export default async function HomePage({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params; const l=locale==='uz'||locale==='en'?locale:'ru'; const t=copy[l];
 const [news,documents]=await Promise.all([getNews(3),getDocuments(3)]);
 const dateLocale=l==='uz'?'uz-UZ':l==='en'?'en-GB':'ru-RU';
 return <main className="public-main home-modern">
  <HomeMotion/>
  <section className="home-hero">
   <Image src="/images/institute.webp" alt="" fill priority sizes="100vw" quality={85} className="hero-campus-photo"/>
   <div className="hero-campus-shade" aria-hidden="true"/>
   <div className="container-main hero-campus-content">
    <div className="hero-copy"><p className="hero-eyebrow">{t.name}</p><h1 className="hero-title">{t.title}</h1><p className="hero-description">{t.text}</p>

     <p className="hero-privacy"><ShieldCheck size={18} aria-hidden="true"/><span>{t.privacy}</span></p>
     <div className="hero-secondary"><a href="#services">{l==='uz'?"Barça xizmatlar":l==='en'?'Explore services':'Все сервисы'}<ArrowDown size={15}/></a><Link href="/monitoring">{portalUI[l].monitoring}<ArrowUpRight size={15}/></Link></div>
    </div>
    <nav aria-label={actions[l].label} className="hero-task-stack">
     {([[ClipboardList,"/surveys",t.survey,actions[l].survey],[MessageSquare,"/appeals",t.appeal,actions[l].appeal],[LogIn,"/portal",portalUI[l].account,actions[l].account]] as const).map(([Icon,href,title,detail])=><Link key={href} href={href} className="hero-task"><Icon size={22} aria-hidden="true"/><span><strong>{title}</strong><small>{detail}</small></span><ArrowUpRight size={18} aria-hidden="true"/></Link>)}
    </nav>
    <p className="hero-campus-caption"><span>{l==='uz'?'Bizning institut':l==='en'?'Our institute':'Наш институт'}</span>{l==='uz'?"SBUMIPTK · Toşkent":l==='en'?'SBUMIPTK · Tashkent':'СБУМИПТК · Ташкент'}</p>
   </div>
  </section>
  <ServiceHub locale={l}/>
  <section className="container-main py-12" aria-labelledby="home-news"><div className="section-heading"><div><p className="section-eyebrow">{t.centre}</p><h2 id="home-news" className="mt-2 text-3xl font-bold tracking-tight">{t.news}</h2></div><Link href="/news" className="text-sm font-semibold text-blue-700">{t.allNews} →</Link></div>
   <div className="mt-6 grid gap-4 md:grid-cols-3">{news.map(item=>{const title=getLocalizedText(l,item.title_ru,item.title_uz,item.title_en);return <Link key={item.id} href={`/news/${item.slug}`} className="news-compact group"><NewsCover item={item} title={title} locale={l} className="h-40"/><div className="p-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">{item.created_at?new Date(item.created_at).toLocaleDateString(dateLocale):''}</p><NewsViews id={item.id} count={item.view_count} locale={l}/></div><h3 className="mt-3 line-clamp-3 text-lg font-semibold leading-6">{title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">{t.open}<ArrowUpRight size={16}/></span></div></Link>})}{!news.length&&<p className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">{t.emptyNews}</p>}</div>
  </section>
  <section className="container-main pb-14" aria-labelledby="home-documents"><div className="section-heading"><div><p className="section-eyebrow">{t.resources}</p><h2 id="home-documents" className="mt-2 text-3xl font-bold tracking-tight">{t.documents}</h2></div><Link href="/documents" className="text-sm font-semibold text-blue-700">{t.allDocuments} →</Link></div><div className="mt-6 grid gap-3">{documents.map(d=><Link key={d.id} href={`/documents/${encodeURIComponent(d.id)}`} className="document-row"><span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">{surveyText(l,d.category||t.documents)}</span><span className="min-w-0 flex-1 font-semibold">{getLocalizedText(l,d.title_ru||"",d.title_uz||"",d.title_en||"")}</span><ArrowUpRight size={20} className="shrink-0 text-slate-500"/></Link>)}{!documents.length&&<p className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">{t.emptyDocuments}</p>}</div></section>
  <PresidentQuote locale={l}/>
 </main>;
}
