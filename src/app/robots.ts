import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/*/admin/", "/*/search"] },
    ],
    sitemap: "https://qualitydepartment.netlify.app/sitemap.xml",
    host: "https://qualitydepartment.netlify.app",
  };
}
