"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, LayoutGrid, Pause, Play } from "lucide-react";
import { homeLocale, officialPortals, portalCopy } from "@/data/homePortals";

export default function OfficialPortals({ locale }: { locale: string }) {
  const l = homeLocale(locale), t = portalCopy[l];
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cards = (duplicate: boolean) => officialPortals.map(portal => (
    <a key={portal.id} href={portal.url} className="portal-card" target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined}>
      <span className="portal-logo"><Image src={portal.image} width={132} height={72} alt="" className="portal-logo-image"/></span>
      <h3>{portal.title[l]}</h3>
      <span className="portal-domain">{portal.domain}<ArrowUpRight size={16} aria-hidden="true"/></span>
      {!duplicate && <span className="sr-only">{t.newTab}</span>}
    </a>
  ));
  return (
    <section id="official-portals" className="official-portals" aria-labelledby="portals-title">
      <div className="container-main">
        <div className="portal-heading">
          <div><p className="section-eyebrow">{t.label}</p><h2 id="portals-title">{t.title}</h2><p className="portal-description">{t.description}</p></div>
          <div className="portal-controls">
            {!expanded && <button type="button" className="portal-motion-toggle" aria-pressed={paused} aria-controls="portal-links" onClick={() => setPaused(!paused)}>{paused ? <Play size={16} aria-hidden="true"/> : <Pause size={16} aria-hidden="true"/>}{paused ? t.play : t.pause}</button>}
            <button type="button" aria-expanded={expanded} aria-controls="portal-links" onClick={() => setExpanded(!expanded)}><LayoutGrid size={16} aria-hidden="true"/>{expanded ? t.collapse : t.show}</button>
          </div>
        </div>
        <div id="portal-links" className={`portal-viewport${expanded ? " is-expanded" : ""}`} data-paused={paused}
          onFocusCapture={event => { if (event.target instanceof HTMLAnchorElement && event.target.matches(":focus-visible")) setExpanded(true); }}>
          <div className="portal-track">
            <div className="portal-group">{cards(false)}</div>
            {!expanded && <div className="portal-group portal-duplicates" aria-hidden="true">{cards(true)}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
