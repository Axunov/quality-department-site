import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Отдел контроля качества образования",
  description: "Официальный сайт отдела контроля качества образования",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}