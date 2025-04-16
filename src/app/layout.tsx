import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./site-config";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ReactQueryProvider } from "../providers/ReactQueryProvider";

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
        className={`antialiased bg-[#F3F2ED] ${quicksand.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
