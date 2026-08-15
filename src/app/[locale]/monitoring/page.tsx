import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "@/i18n/routing";

const labels = {
  ru: { label: "Мониторинг", title: "Мониторинг качества образования", description: "Проверяемые направления и опубликованные результаты внутреннего мониторинга.", areas: "Направления мониторинга", items: ["посещаемость и организация занятий", "качество преподавания", "проведение экзаменов", "учебно-методическое обеспечение", "результаты опросов заинтересованных сторон", "исполнение корректирующих мероприятий"], noteTitle: "Только подтверждённые показатели", note: "Числовые результаты публикуются после утверждения отчёта с обязательным указанием периода, источника данных и даты обновления.", documents: "Перейти к отчётам и документам" },
  uz: { label: "Monitoring", title: "Ta’lim sifati monitoringi", description: "Ichki monitoring yo‘nalishlari va e’lon qilingan natijalar.", areas: "Monitoring yo‘nalishlari", items: ["davomat va darslarni tashkil etish", "o‘qitish sifati", "imtihonlarni o‘tkazish", "o‘quv-uslubiy ta’minot", "manfaatdor tomonlar so‘rovlari", "tuzatish tadbirlarining bajarilishi"], noteTitle: "Faqat tasdiqlangan ko‘rsatkichlar", note: "Raqamli natijalar hisobot tasdiqlangandan so‘ng davr, ma’lumot manbasi va yangilanish sanasi ko‘rsatilgan holda e’lon qilinadi.", documents: "Hisobotlar va hujjatlarga o‘tish" },
  en: { label: "Monitoring", title: "Education quality monitoring", description: "Monitoring areas and published internal monitoring results.", areas: "Monitoring areas", items: ["attendance and class organisation", "teaching quality", "examination arrangements", "learning resources", "stakeholder survey results", "implementation of corrective actions"], noteTitle: "Verified indicators only", note: "Numerical results are published after approval and always include the reporting period, data source and update date.", documents: "View reports and documents" },
};

export default async function MonitoringPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[current];
  return <main><PageHeader label={t.label} title={t.title} description={t.description} /><section className="container-main py-12 sm:py-16"><div className="grid gap-8 lg:grid-cols-2"><div className="rounded-[30px] bg-white p-6 shadow-xl sm:p-8"><h2 className="section-title">{t.areas}</h2><div className="mt-7 grid gap-4">{t.items.map((item) => <div key={item} className="rounded-2xl bg-blue-50 p-5 font-semibold text-blue-900">✓ {item}</div>)}</div></div><div className="rounded-[30px] bg-[#083b73] p-6 text-white shadow-xl sm:p-8"><h2 className="text-3xl font-bold">{t.noteTitle}</h2><p className="mt-5 leading-8 text-blue-100">{t.note}</p><Link href="/documents" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-[#083b73]">{t.documents}</Link></div></div></section></main>;
}
