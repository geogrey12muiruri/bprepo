import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { HeroCards } from "@/components/sections/home/HeroCards";
import { Services } from "@/components/sections/home/Services";
import { PopularTrips } from "@/components/sections/home/PopularTrips";
import { BoatsPreview } from "@/components/sections/home/BoatsPreview";
import { VideoShowcase } from "@/components/sections/home/VideoShowcase";
import { GalleryPreview } from "@/components/sections/home/GalleryPreview";
import { generateJsonLD } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blue Pineapple | Premium Boat Trips & Coastal Experiences",
  description:
    "Discover unforgettable boat trips and coastal experiences in Kenya with Blue Pineapple Coastal Services. From historic Fort Jesus tours to breathtaking sunset sailings.",
  openGraph: {
    title: "Blue Pineapple | Premium Boat Trips",
    description:
      "Discover premium boat trips and coastal experiences in Kenya with Blue Pineapple Coastal Services.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Blue Pineapple boat trip experience",
      },
    ],
  },
};

export default function HomePage() {
  const jsonLD = generateJsonLD({
    "@type": "LocalBusiness",
    name: "Blue Pineapple Coastal Services",
    description: "Premium boat trips and coastal experiences in Kenya",
    url: "https://bprepo.vercel.app",
    telephone: "+254708485978",
    email: "bluepinappleholdings@gmail.com",
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
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <Hero />
      <Services />
      <HeroCards />
      <PopularTrips />
      <BoatsPreview />
      <VideoShowcase />
      <GalleryPreview />
    </>
  );
}
