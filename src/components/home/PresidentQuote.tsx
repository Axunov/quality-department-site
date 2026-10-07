import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { homeLocale, presidentCopy } from "@/data/homePortals";

export default function PresidentQuote({ locale }: { locale: string }) {
  const t = presidentCopy[homeLocale(locale)];
  return (
    <section id="education-priority" className="container-main president-section" aria-labelledby="president-title">
      <h2 id="president-title" className="sr-only">{t.label}</h2>
      <figure className="president-card">
        <div className="president-message">
          <p className="section-eyebrow">{t.label}</p>
          <Quote className="president-quote-mark" size={44} aria-hidden="true"/>
          <blockquote cite={t.href}><p>{t.quote}</p></blockquote>
          <figcaption>
            <div className="president-author">
              <Image src="/images/portals/emblem.png" alt="" width={56} height={56}/>
              <div><p className="president-name">{t.name}</p><p className="president-role">{t.role}</p></div>
            </div>
            <a className="president-source" href={t.href} target="_blank" rel="noopener noreferrer"><span>{t.source}<time dateTime="2022-12-20">{t.date}</time></span><ArrowUpRight size={17} aria-hidden="true"/></a>
          </figcaption>
        </div>
        <div className="president-portrait">
          <Image src="/images/portals/president.jpg" alt={`${t.name} — ${t.role}`} fill sizes="(max-width: 767px) 100vw, 45vw" className="president-photo"/>
        </div>
      </figure>
    </section>
  );
}
