import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";

const labels = {
  ru: { label: "Аналитика", title: "Аналитические материалы", description: "Отчёты и аналитические материалы отдела контроля качества образования.", title2: "Принципы публикации", items: ["указание отчётного периода", "ссылка на источник данных", "описание методики расчёта", "дата утверждения результата", "ответственное подразделение", "рекомендации и последующие меры"], note: "Неподтверждённые демонстрационные показатели удалены. Актуальные результаты размещаются в электронном архиве после официального утверждения.", documents: "Открыть электронный архив" },
  uz: { label: "Tahlil", title: "Tahliliy materiallar", description: "Ta’lim sifatini nazorat qilish bo‘limining hisobot va tahliliy materiallari.", title2: "E’lon qilish tamoyillari", items: ["hisobot davrini ko‘rsatish", "ma’lumot manbasiga havola", "hisoblash usulini tavsiflash", "natijani tasdiqlash sanasi", "mas’ul bo‘linma", "tavsiyalar va keyingi choralar"], note: "Tasdiqlanmagan namoyish ko‘rsatkichlari olib tashlandi. Dolzarb natijalar rasmiy tasdiqlangandan so‘ng elektron arxivda joylashtiriladi.", documents: "Elektron arxivni ochish" },
  en: { label: "Analytics", title: "Analytical materials", description: "Reports and analytical materials of the Education Quality Control Department.", title2: "Publication principles", items: ["reporting period", "data source", "calculation methodology", "approval date", "responsible unit", "recommendations and follow-up actions"], note: "Unverified demonstration figures have been removed. Current results are added to the electronic archive after formal approval.", documents: "Open the document archive" },
};

export default async function AnalyticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[current];
  return <main><PageHeader label={t.label} title={t.title} description={t.description} /><section className="container-main py-12 sm:py-16"><div className="rounded-[30px] bg-white p-6 shadow-xl sm:p-8"><h2 className="section-title">{t.title2}</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{t.items.map((item) => <div key={item} className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-900">✓ {item}</div>)}</div><p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-900">{t.note}</p><Link href="/documents" className="mt-7 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white">{t.documents}</Link></div></section></main>;
}
