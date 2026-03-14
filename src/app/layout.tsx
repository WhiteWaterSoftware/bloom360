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
  metadataBase: new URL("https://bloom360.com"),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "bloom360 — Preventive Care, Reimagined",
    description:
      "One dedicated doctor. A full care team. Nutrition, movement, reproductive health — all coordinated, all virtual, all yours.",
    url: "https://bloom360.com",
    siteName: "bloom360",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "bloom360 — Preventive Care, Reimagined",
    description:
      "One dedicated doctor. A full care team. Nutrition, movement, reproductive health — all coordinated, all virtual, all yours.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "bloom360",
  url: "https://bloom360.com",
  logo: "https://bloom360.com/logo.svg",
  description:
    "Tech-powered, physician-led preventive care membership. A dedicated primary care physician at the center of your care, supported by nutrition, physical therapy, and reproductive health.",
  email: "care@bloom360.com",
  medicalSpecialty: [
    "PrimaryCare",
    "PhysicalTherapy",
    "DietNutrition",
  ],
  availableService: [
    {
      "@type": "MedicalTherapy",
      name: "Primary Care",
      description: "Dedicated physician-led primary care via telehealth",
    },
    {
      "@type": "MedicalTherapy",
      name: "Nutrition",
      description: "Personalized nutrition counseling and planning",
    },
    {
      "@type": "MedicalTherapy",
      name: "Physical Therapy",
      description: "Movement and physical therapy guidance",
    },
    {
      "@type": "MedicalTherapy",
      name: "Reproductive Health",
      description: "Comprehensive reproductive health services",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans text-ink bg-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
