/* eslint-disable @next/next/no-img-element */
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { portalLocale } from "@/data/portal";
import { getPublishedDocument } from "@/services/documents.service";
import { documentText, documentUrl } from "@/lib/publicDocument";
import { surveyText } from "@/lib/surveyI18n";

const copy={
 ru:{catalog:"Документы",date:"Добавлено",open:"Открыть файл",file:"Документ",cover:"Титульная страница",noCover:"Обложка отсутствует",noFile:"Файл недоступен"},
 uz:{catalog:"Hujjatlar",date:"Qöşilgan",open:"Faylni oçiş",file:"Hujjat",cover:"Titul sahifasi",noCover:"Muqova yöq",noFile:"Fayl oçilmayapti"},
 en:{catalog:"Documents",date:"Added",open:"Open file",file:"Document",cover:"Cover page",noCover:"No cover available",noFile:"File unavailable"},
};
export const revalidate=300;

export default async function Page({params}:{params:Promise<{locale:string;id:string}>}){
 const {locale,id}=await params, l=portalLocale(locale), t=copy[l];
 const document=await getPublishedDocument(id);
 if(!document)notFound();
 const title=documentText(document,l,"title")||document.file_name||t.file;
 const description=documentText(document,l,"description");
 const cover=documentUrl(document.preview_url),file=documentUrl(document.file_url);
 const added=document.created_at && Number.isFinite(Date.parse(document.created_at))
  ? new Intl.DateTimeFormat(l,{dateStyle:"long",timeZone:"Asia/Tashkent"}).format(new Date(document.created_at)) : null;
 return <main className="container-main space-y-6 py-9 sm:py-14">
  <nav aria-label={t.catalog}><Link href="/documents" className="campus-filter">{t.catalog}</Link></nav>
  <article className="campus-card grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
    <figure className="flex min-h-52 items-center justify-center rounded-xl border bg-slate-50 p-4">
      {cover?<img src={cover} alt={t.cover+": "+title} className="max-h-[70vh] w-full object-contain"/>:
        <figcaption className="grid justify-items-center gap-3 text-sm"><FileText size={42} aria-hidden="true"/>{t.noCover}</figcaption>}
    </figure>
    <div className="min-w-0 space-y-4 sm:py-4">
      {document.category&&<p className="section-eyebrow">{surveyText(l,document.category)}</p>}
      <h1 className="break-words text-3xl font-black sm:text-4xl">{title}</h1>
      {added&&<p className="text-sm">{t.date}: <time dateTime={document.created_at}>{added}</time></p>}
      {document.file_name&&<p className="break-all text-sm">{document.file_name}</p>}
      {description&&<p className="whitespace-pre-line leading-7">{description}</p>}
      {file?<a href={file} className="campus-filter w-fit font-bold" target="_blank" rel="noopener noreferrer">{t.open}</a>:<p>{t.noFile}</p>}
    </div>
  </article>
 </main>;
}
