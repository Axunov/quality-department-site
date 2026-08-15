import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Education Quality Control Department",
    short_name: "Quality Department",
    description: "Official website of the Education Quality Control Department",
    start_url: "/ru",
    display: "standalone",
    background_color: "#eef4fb",
    theme_color: "#083b73",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
