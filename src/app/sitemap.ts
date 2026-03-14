import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bloom360.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/telehealth-consent`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/nondiscrimination`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cancellation`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/controlled-substances`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
