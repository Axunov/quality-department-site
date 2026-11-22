import "server-only";
import { unstable_cache } from "next/cache";
import { getDocuments } from "@/services/documents.service";
import { getEmployees } from "@/services/employees.service";
import { getNews } from "@/services/news.service";
import { portalLocale } from "@/data/portal";
import { learningQualityCopy } from "@/data/learningQualityCopy";

type SearchLocale = ReturnType<typeof portalLocale>;
type SearchCategory = "news" | "documents" | "employees" | "services";
type Result = { id: string; category: SearchCategory; href: string; title: string; text: string; terms?: string; external?: boolean };
const pick = (l: SearchLocale, ru?: string | null, uz?: string | null, en?: string | null) => (
  l === "uz" ? uz || ru || en : l === "en" ? en || ru || uz : ru || uz || en
) || "";
const clean = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const normalize = (value: string) => value.normalize("NFKC").toLowerCase().replace(/[’‘ʻʼ`´]/g, "'").replace(/ё/g, "е").trim();
const serviceLinks = [
  ["/surveys", "Опросы и анкеты", "So‘rovlar va anketalar", "Surveys and questionnaires"],
  ["/surveys/teacher", "Преподаватель глазами студента", "O‘qituvchi talaba nigohida", "Teacher Through the Eyes of a Student"],
  ["/surveys/employers", "Опрос работодателей", "Ish beruvchilar so‘rovi", "Employer survey"],
  ["/surveys/graduates", "Опрос выпускников", "Bitiruvchilar so‘rovi", "Graduate survey"],
  ["/surveys/doctoral", "Опрос докторантов", "Doktorantlar so‘rovi", "Doctoral survey"],
  ["/surveys/learning-quality", learningQualityCopy.ru.menu, learningQualityCopy.uz.menu, learningQualityCopy.en.menu],
  ["/appeals", "Подать обращение", "Murojaat yuborish", "Submit an appeal"],
  ["/monitoring", "Мониторинг опросов", "So‘rovnomalar monitoringi", "Survey monitoring"],
  ["/faq", "Частые вопросы FAQ", "Ko‘p beriladigan savollar FAQ", "Frequently asked questions FAQ"],
  ["/portal", "Вход в личный кабинет", "Shaxsiy kabinetga kirish", "Sign in to your account"],
] as const;

function safeDocumentUrl(value: string) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : null; } catch { return null; }
}

const loadPublishedIndex = unstable_cache(async (l: SearchLocale) => {
  const [news, docs, staff] = await Promise.all([getNews(), getDocuments(), getEmployees()]);
  return [
    ...news.map((x): Result => ({ id: x.id, category: "news", href: `/news/${encodeURIComponent(x.slug)}`, title: pick(l, x.title_ru, x.title_uz, x.title_en), text: clean(pick(l, x.text_ru, x.text_uz, x.text_en)) })),
    ...docs.map((x): Result => { const url = safeDocumentUrl(x.file_url); return { id: x.id, category: "documents", href: url ?? "/documents", external: !!url, title: pick(l, x.title_ru, x.title_uz, x.title_en), text: clean(pick(l, x.description_ru, x.description_uz, x.description_en) || x.file_name || ""), terms: x.file_name || "" }; }),
    ...staff.map((x): Result => ({ id: x.id, category: "employees", href: "/employees", title: pick(l, x.full_name_ru || x.fullname_ru, x.full_name_uz || x.fullname_uz, x.full_name_en || x.fullname_en), text: pick(l, x.position_ru, x.position_uz, x.position_en) })),
  ];
}, ["published-site-search-v1"], { revalidate: 120 });

export async function findSiteResults(locale: string, input: string, limit: number) {
  const l = portalLocale(locale);
  const query = normalize(input.slice(0, 100));
  if (query.length < 2) return [];
  const tokens = query.split(/\s+/);
  const services: Result[] = serviceLinks.map(([href, ru, uz, en]) => ({ id: href, href, category: "services", title: pick(l, ru, uz, en), text: "", terms: href.startsWith("/surveys/") ? pick(l, "опрос анкета", "so‘rov anketa", "survey questionnaire") : "" }));
  const index = [...services, ...await loadPublishedIndex(l)];
  const counts = new Map<SearchCategory, number>();
  return index.filter(x => x.title && tokens.every(token => normalize(`${x.title} ${x.text} ${x.terms || ""}`).includes(token)))
    .sort((a, b) => Number(normalize(b.title).includes(query)) - Number(normalize(a.title).includes(query)))
    .filter(x => { const count = (counts.get(x.category) || 0) + 1; counts.set(x.category, count); return count <= limit; })
    .map(({ id, href, title, text, category, external }) => ({ id, href, title, text: text.slice(0, 180), category, external }));
}
