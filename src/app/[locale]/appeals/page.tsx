import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import PublicAppealForm from "@/components/student/PublicAppealForm";

const labels = {
  ru: { label: "Обращения", title: "Электронные обращения студентов", description: "Отправьте вопрос, предложение или сообщение непосредственно через защищённую форму сайта." },
  uz: { label: "Murojaatlar", title: "Talabalarning elektron murojaatlari", description: "Savol, taklif yoki xabaringizni saytning himoyalangan shakli orqali to‘g‘ridan-to‘g‘ri yuboring." },
  en: { label: "Appeals", title: "Student appeals", description: "Submit a question, suggestion or concern directly through the secure website form." },
};

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> { const {locale}=await params;const current=locale==="uz"||locale==="en"?locale:"ru";return {title:labels[current].title,description:labels[current].description}; }

export default async function AppealsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const current = locale === "uz" || locale === "en" ? locale : "ru";
  const t = labels[current];

  return (
    <main>
      <PageHeader label={t.label} title={t.title} description={t.description} />
      <section className="container-main py-10 sm:py-14"><PublicAppealForm locale={current}/></section>
    </main>
  );
}
