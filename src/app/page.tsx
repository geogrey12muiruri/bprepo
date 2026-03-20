import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
// Keeping import for now if needed, but removing from view
import { Services } from "@/components/sections/home/Services";
import { PopularTrips } from "@/components/sections/home/PopularTrips";
import { BoatsPreview } from "@/components/sections/home/BoatsPreview";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { CoastalLife } from "@/components/sections/home/CoastalLife";
import { generateJsonLD } from "@/lib/seo";
import { PHONE_TEL, EMAIL, ADDRESS_LINE_2, BUSINESS_NAME_FULL } from "@/constants/contacts";

export const metadata: Metadata = {
  title: "Coastal Experiences, Mombasa",
  description:
    "Discover unforgettable boat trips and coastal experiences in Kenya with Blue Pineapple Coastal Services. From historic Fort Jesus tours to breathtaking sunset sailings, creek safaris, and private charters. Book your maritime adventure in Mombasa today.",
  alternates: {
    canonical: "https://www.bluepineappleholdings.com",
  },
  openGraph: {
    title: "Blue Pineapple | Premium Boat Trips & Coastal Experiences",
    description:
      "Discover premium boat trips and coastal experiences in Kenya with Blue Pineapple Coastal Services. From historic Fort Jesus tours to breathtaking sunset sailings.",
    images: [
      {
        url: "https://www.bluepineappleholdings.com/images/hero/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Pineapple boat trip experience on the Indian Ocean",
      },
    ],
  },
};

export default function HomePage() {
  const jsonLD = generateJsonLD({
    "@type": "LocalBusiness",
    "@id": "https://bluepineappleholdings.com/#organization",
    name: BUSINESS_NAME_FULL,
    description: "Premium boat trips and coastal experiences in Kenya. Offering Fort Jesus tours, creek safaris, sunset sailings, and private charters in Mombasa.",
    url: "https://bluepineappleholdings.com",
    telephone: PHONE_TEL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS_LINE_2,
      addressCountry: "KE",
    },
    areaServed: {
      "@type": "City",
      name: "Mombasa",
      addressCountry: "KE",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
    },
    priceRange: "$$",
    image: "https://bluepineappleholdings.com/images/logo.png",
    sameAs: [
      // Add social media profiles when available
      // "https://www.facebook.com/bluepineapple",
      // "https://www.instagram.com/bluepineapple",
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <Hero />
      <WhyChooseUs />
      <Services />
      <PopularTrips />

      <BoatsPreview />
      <CoastalLife />
    </>
  );
}
