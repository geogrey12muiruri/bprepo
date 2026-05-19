import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { trips } from "@/data/trips";
import { TripsGrid } from "@/components/trips/TripsGrid";
import { TripsHeroSection } from "@/components/sections/trips/TripsHeroSection";
import { ReviewsSection } from "@/components/ui/ReviewsSection";
import { getAbsoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Boat Trips & Coastal Experiences in Mombasa, Kenya",
  description:
    "Explore all boat trips and coastal experiences with Blue Pineapple in Mombasa, Kenya. Fort Jesus harbour tours, mangrove creek safaris, glass-bottomed boat safaris, sunset sailings, snorkelling reefs and private charters. Book online today.",
  keywords: [
    "boat trips Mombasa",
    "coastal experiences Kenya",
    "Fort Jesus boat tour",
    "mangrove creek safari Mombasa",
    "glass-bottomed boat safari Kenya",
    "sunset sailing Mombasa",
    "snorkelling Mombasa reef",
    "private charter Mombasa",
  ],
  alternates: { canonical: getAbsoluteUrl("/trips") },
  openGraph: {
    title: "Boat Trips & Coastal Experiences in Mombasa, Kenya | Blue Pineapple",
    description:
      "Fort Jesus tours, glass-bottomed mangrove safaris, sunset sailings and private charters on the Indian Ocean. Book with Blue Pineapple Coastal Services.",
    url: getAbsoluteUrl("/trips"),
    type: "website",
    images: [
      {
        url: getAbsoluteUrl("/images/hero/hero-main.jpg"),
        width: 1200,
        height: 630,
        alt: "Blue Pineapple boat trips and coastal experiences in Mombasa Kenya",
      },
    ],
  },
};

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-950">
      <TripsHeroSection />

      <Container className="py-8 sm:py-10 md:py-12">
        <TripsGrid />
      </Container>

      <ReviewsSection variant="light" />
    </div>
  );
}
