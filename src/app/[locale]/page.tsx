import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { Directions } from "@/components/home/Directions";
import { NewsPreview } from "@/components/home/NewsPreview";
import { DocumentsPreview } from "@/components/home/DocumentsPreview";
import { ContactsPreview } from "@/components/home/ContactsPreview";
import { Statistics } from "@/components/home/Statistics";

export default function Home() {
  return (
    <main>
      <Hero />
      <Statistics />
      <Welcome />
      <Directions />
            

      <NewsPreview />

<section className="container-main pb-20">
  <DocumentsPreview />
</section>

      <ContactsPreview />
    </main>
  );
}