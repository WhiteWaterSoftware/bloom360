import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "bloom360 — Preventive Care, Reimagined",
  description:
    "Tech-powered, physician-led preventive care membership. A dedicated primary care physician at the center of your care, supported by nutrition, physical therapy, and reproductive health.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans text-ink bg-cream">{children}</body>
    </html>
  );
}
