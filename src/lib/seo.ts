import type { Metadata } from "next";

export const siteConfig = {
  name: "Blue Pineapple Coastal Services",
  description:
    "Book premium boat trips and coastal experiences in Mombasa, Kenya. Fort Jesus boat tours, mangrove creek safaris, sunset sailings, Diani day trips and private charters on the Indian Ocean.",
  url: "https://www.bluepineappleholdings.com",
  locale: "en_KE",
} as const;

export function generateMetadataBase(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: "Blue Pineapple Coastal Services | Boat Trips Mombasa, Kenya",
    description: siteConfig.description,
    keywords: [
      // Long-tail, low-competition, high-intent — achievable for a new site
      "boat trips Mombasa Kenya",
      "Fort Jesus boat tour Mombasa",
      "Fort Jesus tour from Mombasa Beach",
      "mangrove creek safari Mtwapa",
      "Tudor Creek boat safari Mombasa",
      "sunset sailing Mombasa price",
      "Diani Beach boat trip from Mombasa",
      "snorkelling reef Mombasa",
      "private boat charter Mombasa",
      "birthday boat party Mombasa",
      "Indian Ocean boat trip Kenya",
      "Mombasa coastal experiences",
      "Mombasa Old Town boat tour",
      "UNESCO Fort Jesus harbour tour",
      "Blue Pineapple Mombasa",
    ],
    authors: [{ name: "Blue Pineapple Coastal Services" }],
    creator: "Blue Pineapple Coastal Services",
    publisher: "Blue Pineapple Coastal Services",
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: "Blue Pineapple Coastal Services | Boat Trips Mombasa, Kenya",
      description: siteConfig.description,
      siteName: "Blue Pineapple Coastal Services",
      images: [
        {
          url: `${siteConfig.url}/images/hero/hero-main.jpg`,
          width: 1200,
          height: 630,
          alt: "Blue Pineapple boat trips on the Indian Ocean, Mombasa Kenya",
        },
      ],
    },
    icons: {
      icon: "/images/logo.png",
      apple: "/images/logo.png",
    },
    verification: {
      // google: "your-verification-code", — add when available
    },
  };
}

export function generateJsonLD(
  schema: Record<string, unknown>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    ...schema,
  };
}


