import { NewsCover } from "@/components/news/NewsCover";
import { NewsViews } from "@/components/news/NewsViews";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getDocuments } from "@/services/documents.service";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { surveyText } from "@/lib/surveyI18n";
import { ParallaxFrame, Reveal } from "@/components/motion/UnifiedMotion";
import { ServiceHub } from "@/components/home/ServiceHub";
import PublicSiteChat from "@/components/student/PublicSiteChat";
import { HomeEditorNote } from "@/components/home/HomeEditorNote";

export const revalidate = 300;
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
  <section className="home-hero qd-hero-mesh">
   <ParallaxFrame range={16} className="qd-campus-frame"><Image src="/images/institute.webp" alt="" fill priority sizes="100vw" quality={85} className="hero-campus-photo"/></ParallaxFrame>
   <div className="hero-campus-shade" aria-hidden="true"/>
   <div className="container-main hero-campus-content">
    <div className="hero-copy"><p className="hero-eyebrow">{t.name}</p><h1 className="hero-title">{t.title}</h1><p className="hero-description">{t.text}</p>

     <p className="hero-privacy"><ShieldCheck size={18} aria-hidden="true"/><span>{t.privacy}</span></p>
    </div>
    <ServiceHub locale={l}/>
    <p className="hero-campus-caption"><span>{l==='uz'?'Bizning institut':l==='en'?'Our institute':'Наш институт'}</span>{l==='uz'?"SBUMIPTK · Toşkent":l==='en'?'SBUMIPTK · Tashkent':'СБУМИПТК · Ташкент'}</p>
   </div>
  </section>
  <HomeEditorNote locale={l}/>
  <div className="container-main home-publications">
  <Reveal><section className="home-publication-section" aria-labelledby="home-news"><div className="section-heading"><div><p className="section-eyebrow">{t.centre}</p><h2 id="home-news" className="mt-2 text-3xl font-bold tracking-tight">{t.news}</h2></div><Link href="/news" className="text-sm font-semibold text-blue-700">{t.allNews} →</Link></div>
   <div className="mt-6 home-news-grid grid gap-4">{news.map(item=>{const title=getLocalizedText(l,item.title_ru,item.title_uz,item.title_en);return <Link key={item.id} href={`/news/${item.slug}`} className="news-compact editorial-lift group"><NewsCover item={item} title={title} locale={l} className="h-40"/><div className="p-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-500">{item.created_at?new Date(item.created_at).toLocaleDateString(dateLocale):''}</p><NewsViews id={item.id} count={item.view_count} locale={l}/></div><h3 className="mt-3 line-clamp-3 text-lg font-semibold leading-6">{title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">{t.open}<ArrowUpRight size={16}/></span></div></Link>})}{!news.length&&<p className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">{t.emptyNews}</p>}</div>
  </section></Reveal>
  <Reveal delayMs={60}><section className="home-publication-section" aria-labelledby="home-documents"><div className="section-heading"><div><p className="section-eyebrow">{t.resources}</p><h2 id="home-documents" className="mt-2 text-3xl font-bold tracking-tight">{t.documents}</h2></div><Link href="/documents" className="text-sm font-semibold text-blue-700">{t.allDocuments} →</Link></div><div className="mt-6 grid gap-3">{documents.map(d=><Link key={d.id} href={`/documents/${encodeURIComponent(d.id)}`} className="document-row editorial-lift"><span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">{surveyText(l,d.category||t.documents)}</span><span className="min-w-0 flex-1 font-semibold">{getLocalizedText(l,d.title_ru||"",d.title_uz||"",d.title_en||"")}</span><ArrowUpRight size={20} className="shrink-0 text-slate-500"/></Link>)}{!documents.length&&<p className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">{t.emptyDocuments}</p>}</div></section></Reveal>
  </div>
  {process.env.SITE_CHAT_ENABLED !== "0" && <PublicSiteChat locale={l} />}
 </main>;
}
