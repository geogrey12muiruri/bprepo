import type { Metadata } from "next";

export const siteConfig = {
  name: "BluePineapple",
  description: "Premium boat trips and coastal experiences in Kenya",
  url: "https://www.bluepineappleholdings.com",
  locale: "en_KE",
} as const;

export function generateMetadataBase(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "BluePineapple | Premium Boat Trips & Coastal Experiences in Kenya",
      template: "%s | BluePineapple",
    },
    description: siteConfig.description,
    keywords: [
      "boat trips Kenya",
      "coastal experiences Mombasa",
      "Fort Jesus tours",
      "dhow sailing",
      "marine tourism Kenya",
      "boat charters Mombasa",
      "coastal adventures",
      "Indian Ocean trips",
      "Mombasa boat tours",
      "Diani boat trips",
    ],
    authors: [{ name: "BluePineapple" }],
    creator: "BluePineapple",
    publisher: "BluePineapple Coastal Services",
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: "BluePineapple | Premium Boat Trips & Coastal Experiences",
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/images/hero/hero-main.jpg`,
          width: 1200,
          height: 630,
          alt: "BluePineapple Premium Boat Trips",
        },
      ],
    },
    icons: {
      icon: "/images/logo.png",
      apple: "/images/logo.png",
    },
    verification: {
      // Add Google Search Console verification when available
      // google: "your-verification-code",
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
