import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./site-config";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.website }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[#F3F2ED]"
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
