import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { I18nProvider } from "@/lib/i18n/client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobsAtlas | Votre plateforme d’emploi intelligente",
  description: "JobsAtlas aide les chercheurs d’emploi à trouver des offres partout dans le monde et à générer leurs documents de candidature grâce à l’IA.",
  alternates: {
    languages: {
      fr: "/fr",
      en: "/en",
      ar: "/ar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <I18nProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
