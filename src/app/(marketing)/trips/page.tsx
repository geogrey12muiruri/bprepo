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

      <section
        id="trips"
        className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-white via-sky-50/70 to-stone-50 py-10 sm:py-12 md:py-14"
      >
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-sky-200/40 blur-3xl" />

        <Container>
          <TripsGrid />
        </Container>
      </section>

      <ReviewsSection variant="light" />
    </div>
  );
}
