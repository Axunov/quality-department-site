export function getLocalizedText(
  locale: string,
  ru: string,
  uz: string,
  en: string
) {
  if (locale === "uz") return uz;
  if (locale === "en") return en;
  return ru;
}