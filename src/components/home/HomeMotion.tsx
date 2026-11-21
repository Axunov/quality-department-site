"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>(".home-modern");
    const hero = home?.querySelector<HTMLElement>(".home-hero");
    if (!home || !hero) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(home.querySelectorAll<HTMLElement>("[data-home-motion]"));
    let stop = () => {};

    function syncMotion() {
      stop();
      if (preference.matches || !hero) return;
      let frame = 0;
      const update = () => {
        frame = 0;
        const bounds = hero.getBoundingClientRect();
        if (bounds.bottom <= 0) return;
        const limit = hero.clientWidth < 640 ? 7 : 17;
        hero.style.setProperty("--campus-drift", Math.min(limit, Math.max(0, -bounds.top * 0.075)) + "px");
      };
      const queue = () => { if (!frame) frame = window.requestAnimationFrame(update); };
      let observer: IntersectionObserver | undefined;
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(entries => {
          for (const { isIntersecting, target } of entries) {
            if (!isIntersecting) continue;
            target.classList.add("home-motion-seen");
            observer?.unobserve(target);
          }
        }, { threshold: 0.2 });
        cards.filter(card => !card.classList.contains("home-motion-seen")).forEach(card => observer?.observe(card));
      }
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue, { passive: true });
      queue();
      stop = () => {
        observer?.disconnect();
        window.removeEventListener("scroll", queue);
        window.removeEventListener("resize", queue);
        window.cancelAnimationFrame(frame);
        hero.style.removeProperty("--campus-drift");
      };
    }

    syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => {
      stop();
      preference.removeEventListener("change", syncMotion);
    };
  }, []);
  return null;
}
