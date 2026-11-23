import { uzbekAlphabet } from "@/lib/uzbekAlphabet";

export function getLocalizedText(locale: string, ru: string, uz: string, en: string) {
  if (locale === "uz") return uzbekAlphabet(uz ?? "");
  if (locale === "en") return en;
  return ru;
}
