/* eslint-disable @next/next/no-img-element */
import { FileText } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Link } from "@/i18n/routing";
import { portalLocale } from "@/data/portal";
import { getDocuments, type DocumentItem } from "@/services/documents.service";
import { surveyText } from "@/lib/surveyI18n";

const copy = {
  ru: { title:"Документы отдела", lead:"Положения, регламенты, отчёты и методические материалы системы обеспечения качества.", search:"Название или имя файла", category:"Категория", year:"Год добавления", format:"Формат", language:"Язык описания", all:"Все", filter:"Найти", clear:"Сбросить", found:"Найдено", open:"Открыть файл", download:"Скачать", cover:"Титульная страница", none:"По этим параметрам ничего не найдено. Попробуйте изменить запрос или сбросить фильтры.", unknown:"Файл", added:"Добавлено" },
  uz: { title:"Bo‘lim hujjatlari", lead:"Sifatni ta’minlash tizimining nizomlari, reglamentlari, hisobotlari va uslubiy materiallari.", search:"Sarlavha yoki fayl nomi", category:"Toifa", year:"Qo‘shilgan yil", format:"Format", language:"Tavsif tili", all:"Barchasi", filter:"Qidirish", clear:"Tozalash", found:"Topildi", open:"Faylni ochish", download:"Yuklab olish", cover:"Titul sahifasi", none:"Ushbu mezonlar bo‘yicha hujjat topilmadi. So‘rovni o‘zgartiring yoki filtrlarni tozalang.", unknown:"Fayl", added:"Qo‘shilgan" },
  en: { title:"Department documents", lead:"Policies, procedures, reports and guidance for the education quality system.", search:"Title or filename", category:"Category", year:"Year added", format:"Format", language:"Description language", all:"All", filter:"Find", clear:"Reset", found:"Found", open:"Open file", download:"Download", cover:"Cover page", none:"No documents match. Try changing the search or clearing the filters.", unknown:"File", added:"Added" },
} as const;

type Locale = keyof typeof copy;
const languages: Locale[] = ["ru", "uz", "en"];
const langOrder = (l: Locale) => [l, ...languages.filter(x => x !== l)];
const field = (d: DocumentItem, l: Locale, key: "title" | "description") => langOrder(l).map(lang => d[`${key}_${lang}`]?.trim()).find(Boolean);
const extension = (d: DocumentItem) => (d.file_name?.match(/\.([a-z0-9]{1,8})$/i)?.[1] || "").toUpperCase();
const unique = (values: string[]) => [...new Set(values.filter(Boolean))];
const dateOf = (d: DocumentItem) => d.created_at && Number.isFinite(Date.parse(d.created_at)) ? new Date(d.created_at) : null;
const safeUrl = (value?: string | null) => {
  try { return value && new URL(value).protocol === "https:" ? value : null; } catch { return null; }
};

export default async function DocumentsPage({ params, searchParams }: {
  params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, query, documents] = await Promise.all([params, searchParams, getDocuments()]);
  const l = portalLocale(locale), t = copy[l];
  const value = (key: string) => typeof query[key] === "string" ? query[key].slice(0, 120).trim() : "";
  const criteria = { q:value("q"), category:value("category"), year:value("year"), format:value("format"), language:value("language") };
  const yearOf = (d: DocumentItem) => {
    const date = dateOf(d);
    return date ? new Intl.DateTimeFormat("en", {year:"numeric", timeZone:"Asia/Tashkent"}).format(date) : "";
  };
  const normalize = (s: string) => s.normalize("NFKC").toLowerCase().replace(/[’‘ʻʼ]/g, "'").replace(/ё/g, "е");
  const filtered = documents.filter(d =>
    (!criteria.q || normalize([d.file_name, ...languages.flatMap(lang => [d[`title_${lang}`], d[`description_${lang}`]])].join(" ")).includes(normalize(criteria.q))) &&
    (!criteria.category || d.category === criteria.category) &&
    (!criteria.year || yearOf(d) === criteria.year) &&
    (!criteria.format || extension(d) === criteria.format) &&
    (!criteria.language || languages.some(lang => lang === criteria.language && !!d[`description_${lang}`]?.trim()))
  );
  const filters = [
    { name:"category", label:t.category, options:unique(documents.map(d => d.category || "")).map(v => [v, surveyText(l, v)]) },
    { name:"year", label:t.year, options:unique(documents.map(yearOf)).sort().reverse().map(v => [v,v]) },
    { name:"format", label:t.format, options:unique(documents.map(extension)).sort().map(v => [v,v]) },
    { name:"language", label:t.language, options:languages.map(v => [v,v.toUpperCase()]) },
  ] as const;
  const dateFormat = new Intl.DateTimeFormat(l, {dateStyle:"medium",timeZone:"Asia/Tashkent"});
  return <main className="container-main py-9 sm:py-14">
    <Breadcrumbs locale={l} items={[{label:t.title}]} />
    <header className="campus-banner"><h1 className="text-3xl font-black sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl leading-7">{t.lead}</p></header>
    <form role="search" className="campus-card mt-6 gap-4">
      <label className="text-sm font-bold">{t.search}<input name="q" type="search" defaultValue={criteria.q} maxLength={120} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" /></label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filters.map(f => <label key={f.name} className="min-w-0 text-sm font-bold">{f.label}<select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3" name={f.name} defaultValue={criteria[f.name]}>
          <option value="">{t.all}</option>{f.options.map(([v,label]) => <option key={v} value={v}>{label}</option>)}</select></label>)}
      </div>
      <div className="flex flex-wrap gap-3"><button className="rounded-xl bg-blue-700 px-5 py-3 font-bold text-white">{t.filter}</button><Link href="/documents" className="campus-filter">{t.clear}</Link></div>
    </form>
    <p className="mt-6 text-sm font-bold text-slate-600">{t.found}: {filtered.length}</p>
    {filtered.length ? <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {filtered.map(d => {
        const file = safeUrl(d.file_url), preview = safeUrl(d.preview_url);
        const title = field(d,l,"title") || d.file_name || t.unknown;
        const bytes = d.file_size ?? 0;
        const size = bytes >= 1024 * 1024 ? (bytes / (1024 * 1024)).toFixed(1) + " MB" : bytes >= 1024 ? Math.round(bytes / 1024) + " KB" : bytes ? bytes + " B" : "";
        const date = dateOf(d);
        return <article className="campus-card" key={d.id}>
          {preview && <figure className="mb-4 flex h-64 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 sm:h-72"><img src={preview} alt={t.cover + ": " + title} loading="lazy" className="h-full w-full object-contain" /></figure>}
          <div className="flex items-start gap-3"><FileText size={23} aria-hidden="true" className="shrink-0 text-blue-700"/><h2 className="font-bold">{title}</h2></div>
          <p className="mt-2 text-sm text-slate-600">{[d.category ? surveyText(l, d.category) : "", extension(d), size].filter(Boolean).join(" · ")}</p>
          {date && <p className="mt-1 text-sm text-slate-600">{t.added}: {dateFormat.format(date)}</p>}
          {field(d,l,"description") && <p className="mt-3 text-sm leading-6">{field(d,l,"description")}</p>}
          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            {file && <a href={file} target="_blank" rel="noopener noreferrer" className="campus-filter font-bold">{t.open}</a>}
            {file && <a href={file} download={d.file_name || true} className="campus-filter font-bold">{t.download}<span className="sr-only">: {title}</span></a>}
          </div>
        </article>;
      })}
    </div> : <p className="campus-card mt-4">{t.none}</p>}
  </main>;
}
