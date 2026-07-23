import type { MetadataRoute } from "next";

const baseUrl = "https://qualitydepartment.netlify.app";
const locales = ["ru", "uz", "en"];
const pages = ["", "/about", "/employees", "/news", "/documents", "/accreditation", "/self-assessment", "/monitoring", "/analytics", "/open-data", "/appeals", "/faq", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: now,
      changeFrequency: page === "/news" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((language) => [language, `${baseUrl}/${language}${page}`])
        ),
      },
    }))
  );
}
