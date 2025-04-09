import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./site-config";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
