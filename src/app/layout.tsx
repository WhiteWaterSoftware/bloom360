import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import WaitlistProvider from "@/components/WaitlistProvider";
import "./globals.css";

const GTM_ID = "GTM-KD5RPXTW";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "bloom360 — Primary Care, Reimagined",
  description:
    "Tech-powered, physician-led preventive care membership. A dedicated primary care physician at the center of your care, supported by nutrition, physical therapy, and reproductive health.",
  metadataBase: new URL("https://www.bloom360.com"),
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "bloom360 — Primary Care, Reimagined",
    description:
      "One dedicated doctor. A full care team. Nutrition, movement, reproductive health — all coordinated, all virtual, all yours.",
    url: "https://www.bloom360.com",
    siteName: "bloom360",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "bloom360 — Your health, in full bloom.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "bloom360 — Primary Care, Reimagined",
    description:
      "One dedicated doctor. A full care team. Nutrition, movement, reproductive health — all coordinated, all virtual, all yours.",
    images: ["/og.png"],
  },
  verification: {
    google: "BxU-8PlFqqHDfFRIAJFf1zjflPyznszuhZdukvKfLRs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "bloom360",
  url: "https://www.bloom360.com",
  logo: "https://www.bloom360.com/logo-salmon.svg",
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
      <head>
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="font-sans text-ink bg-cream">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
