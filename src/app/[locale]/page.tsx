import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { Directions } from "@/components/home/Directions";
import { Statistics } from "@/components/home/Statistics";
import { NewsPreview } from "@/components/home/NewsPreview";
import { DocumentsPreview } from "@/components/home/DocumentsPreview";
import { QuickServices } from "@/components/home/QuickServices";
import { ContactsPreview } from "@/components/home/ContactsPreview";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero />
      <Welcome />
      <Directions />
      <Statistics />
      <NewsPreview locale={locale} />

      <section className="container-main pb-20">
        <DocumentsPreview />
      </section>

      <QuickServices />
      <ContactsPreview />
    </main>
  );
}