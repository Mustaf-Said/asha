import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  title: "Asha Nursing Platform | Guidance, Community & Resources",
  description: "Professional nursing platform providing structured guidance, peer support community, and digital products for nurses at all levels.",
  keywords: "nursing, guidance, community, professional development, nursing education",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
          <Header />
        </Suspense>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
