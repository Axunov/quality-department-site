import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getNews } from "@/services/news.service";
import { getDocuments } from "@/services/documents.service";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { surveyText } from "@/lib/surveyI18n";
import { ServiceHub } from "@/components/home/ServiceHub";

export const revalidate = 300;
const copy = {
 ru: {name:"Отдел обеспечения качества образования", title:"Качество начинается с диалога.", text:"Аккредитация, обратная связь и материалы для развития качества образования — в одном месте.", accreditation:"Аккредитация", survey:"Пройти опрос", appeal:"Подать обращение", about:"Узнать об отделе", note:"Ваше мнение помогает улучшать обучение", privacy:"Студенческий опрос без регистрации и Ф.И.О.", news:"Новости и объявления", allNews:"Все новости", emptyNews:"Новости пока не добавлены", documents:"Документы", allDocuments:"Все документы", emptyDocuments:"Документы пока не добавлены", open:"Открыть", centre:"Информационный центр", resources:"Полезные материалы"},
 uz: {name:"Ta’lim sifatini ta’minlash bo‘limi",title:"Sifat muloqotdan boshlanadi.",text:"Akkreditatsiya, qayta aloqa va ta’lim sifatini rivojlantirish uchun materiallar — bir joyda.",accreditation:"Akkreditatsiya",survey:"So‘rovda qatnashish",appeal:"Murojaat yuborish",about:"Bo‘lim haqida",note:"Fikringiz ta’limni yaxshilashga yordam beradi",privacy:"Talabalar so‘rovi ro‘yxatdan o‘tish va F.I.Sh.siz",news:"Yangiliklar va e’lonlar",allNews:"Barcha yangiliklar",emptyNews:"Hozircha yangiliklar qo‘shilmagan",documents:"Hujjatlar",allDocuments:"Barcha hujjatlar",emptyDocuments:"Hozircha hujjatlar qo‘shilmagan",open:"Ochish",centre:"Axborot markazi",resources:"Foydali materiallar"},
 en: {name:"Education Quality Assurance Department",title:"Quality begins with dialogue.",text:"Accreditation, feedback and resources to improve education quality — all in one place.",accreditation:"Accreditation",survey:"Take a survey",appeal:"Submit an appeal",about:"About the department",note:"Your feedback helps improve learning",privacy:"Student survey without registration or names",news:"News and announcements",allNews:"All news",emptyNews:"No news has been added yet",documents:"Documents",allDocuments:"All documents",emptyDocuments:"No documents have been added yet",open:"Open",centre:"Information centre",resources:"Useful resources"}
};
export default async function HomePage({params}:{params:Promise<{locale:string}>}) {
 const {locale}=await params; const l=locale==='uz'||locale==='en'?locale:'ru'; const t=copy[l];
 const [news,documents]=await Promise.all([getNews(3),getDocuments(3)]);
 const dateLocale=l==='uz'?'uz-UZ':l==='en'?'en-GB':'ru-RU';
 return <main className="public-main home-modern">
  <section className="home-hero">
   <div className="container-main grid items-center gap-8 py-12 lg:grid-cols-[1.3fr_.7fr] lg:py-16">
    <div><p className="hero-eyebrow">{t.name}</p><h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-6xl">{t.title}</h1><p className="mt-5 max-w-2xl text-lg leading-7 text-blue-100">{t.text}</p>
     <div className="mt-7 flex flex-wrap gap-3"><Link href="/accreditation" className="hero-action-primary">{t.accreditation}<ArrowUpRight size={18}/></Link><Link href="/surveys/teacher" className="hero-action">{t.survey}</Link><Link href="/appeals" className="hero-action">{t.appeal}</Link></div>
     <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm text-blue-100 underline underline-offset-4">{t.about}<ArrowUpRight size={15}/></Link>
    </div>
    <div className="hero-note"><ShieldCheck size={28} className="text-teal-300"/><p className="mt-5 text-2xl font-semibold leading-tight">{t.note}</p><p className="mt-4 border-t border-white/20 pt-4 text-sm leading-6 text-blue-100">{t.privacy}</p></div>
   </div>
  </section>
  <ServiceHub locale={l}/>
  <section className="container-main py-12" aria-labelledby="home-news"><div className="section-heading"><div><p className="section-eyebrow">{t.centre}</p><h2 id="home-news" className="mt-2 text-3xl font-bold tracking-tight">{t.news}</h2></div><Link href="/news" className="text-sm font-semibold text-blue-700">{t.allNews} →</Link></div>
   <div className="mt-6 grid gap-4 md:grid-cols-3">{news.map(item=>{const title=getLocalizedText(l,item.title_ru,item.title_uz,item.title_en);return <Link key={item.id} href={`/news/${item.slug}`} className="news-compact group">{item.image_url&&<div className="relative h-40 overflow-hidden"><Image src={item.image_url} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-300 group-hover:scale-105"/></div>}<div className="p-5"><p className="text-xs text-slate-500">{item.created_at?new Date(item.created_at).toLocaleDateString(dateLocale):''}</p><h3 className="mt-3 line-clamp-3 text-lg font-semibold leading-6">{title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">{t.open}<ArrowUpRight size={16}/></span></div></Link>})}{!news.length&&<p className="col-span-full rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">{t.emptyNews}</p>}</div>
  </section>
  <section className="container-main pb-14" aria-labelledby="home-documents"><div className="section-heading"><div><p className="section-eyebrow">{t.resources}</p><h2 id="home-documents" className="mt-2 text-3xl font-bold tracking-tight">{t.documents}</h2></div><Link href="/documents" className="text-sm font-semibold text-blue-700">{t.allDocuments} →</Link></div><div className="mt-6 grid gap-3">{documents.map(d=><a key={d.id} href={d.file_url||"/documents"} target="_blank" rel="noreferrer" className="document-row"><span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">{surveyText(l,d.category||t.documents)}</span><span className="min-w-0 flex-1 font-semibold">{getLocalizedText(l,d.title_ru||"",d.title_uz||"",d.title_en||"")}</span><ArrowUpRight size={20} className="shrink-0 text-slate-500"/></a>)}{!documents.length&&<p className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">{t.emptyDocuments}</p>}</div></section>
 </main>;
}
