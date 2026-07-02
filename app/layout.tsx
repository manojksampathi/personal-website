import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/nav/Footer";

// Body font — Inter (clean, modern, highly readable)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display font for big headlines — Bricolage Grotesque (variable, distinctive, modern)
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Mono font — JetBrains Mono (code-friendly)
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manoj Sampathi — Data Analyst & AI Engineer",
  description:
    "Personal portfolio showcasing analytics work across retail, finance, and healthcare. Built with Next.js, BigQuery, and Claude AI.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Manoj Sampathi — Data Analyst & AI Engineer",
    description:
      "Personal portfolio showcasing analytics work across retail, finance, and healthcare.",
    url: "https://manojksampathi.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
