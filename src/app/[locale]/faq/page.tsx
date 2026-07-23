import { PageHeader } from "@/components/common/PageHeader";

const content = {
  ru: { label: "FAQ", title: "Часто задаваемые вопросы", description: "Ответы для студентов, преподавателей и заинтересованных сторон.", questions: [{ q: "Чем занимается отдел?", a: "Отдел проводит внутренний мониторинг, анализирует качество образования, сопровождает аккредитацию, организует опросы и готовит рекомендации." }, { q: "Куда обращаться по вопросам качества занятий?", a: "Обратитесь по телефону +998 90 322-26-29, электронной почте quality@sbumiptk.uz или через официальный бот обращений." }, { q: "Где размещены документы отдела?", a: "Действующие положения, отчёты и методические материалы размещаются в разделе «Документы»." }] },
  uz: { label: "FAQ", title: "Ko‘p beriladigan savollar", description: "Talabalar, professor-o‘qituvchilar va manfaatdor tomonlar uchun javoblar.", questions: [{ q: "Bo‘lim nima bilan shug‘ullanadi?", a: "Bo‘lim ichki monitoring o‘tkazadi, ta’lim sifatini tahlil qiladi, akkreditatsiyani muvofiqlashtiradi, so‘rovlar va tavsiyalar tayyorlaydi." }, { q: "Darslar sifati bo‘yicha qayerga murojaat qilish mumkin?", a: "+998 90 322-26-29 raqami, quality@sbumiptk.uz pochtasi yoki rasmiy murojaatlar boti orqali bog‘laning." }, { q: "Bo‘lim hujjatlari qayerda joylashtirilgan?", a: "Amaldagi nizomlar, hisobotlar va uslubiy materiallar «Hujjatlar» bo‘limida joylashtiriladi." }] },
  en: { label: "FAQ", title: "Frequently asked questions", description: "Answers for students, faculty and stakeholders.", questions: [{ q: "What does the department do?", a: "The department conducts internal monitoring, analyses education quality, supports accreditation, organises surveys and prepares recommendations." }, { q: "How can I raise a concern about teaching quality?", a: "Contact +998 90 322-26-29, email quality@sbumiptk.uz or use the official appeals bot." }, { q: "Where are department documents published?", a: "Current regulations, reports and guidance are published in the Documents section." }] },
};

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = content[current];
  return <main><PageHeader label={t.label} title={t.title} description={t.description} /><section className="container-main py-12 sm:py-16"><div className="grid gap-6">{t.questions.map((item) => <article key={item.q} className="rounded-[30px] bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"><h2 className="text-2xl font-bold text-slate-900">{item.q}</h2><p className="mt-4 leading-8 text-slate-600">{item.a}</p></article>)}</div></section></main>;
}
