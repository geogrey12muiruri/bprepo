import type { Metadata } from "next";

export const siteConfig = {
  name: "BluePineapple",
  description: "Premium boat trips and coastal experiences in Kenya",
  url: "https://bluepineapple.com",
  locale: "en_KE",
  twitterHandle: "@bluepineapple",
} as const;

export function generateMetadataBase(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "BluePineapple | Premium Boat Trips & Coastal Experiences",
      template: "%s | BluePineapple",
    },
    description: siteConfig.description,
    keywords: [
      "boat trips",
      "coastal experiences",
      "Kenya",
      "Fort Jesus",
      "dhow sailing",
      "tourism",
    ],
    authors: [{ name: "BluePineapple" }],
    creator: "BluePineapple",
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: "BluePineapple | Premium Boat Trips",
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: "BluePineapple | Premium Boat Trips",
      description: siteConfig.description,
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
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
