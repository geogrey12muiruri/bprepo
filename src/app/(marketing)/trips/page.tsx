import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { trips } from "@/data/trips";
import { TripsGrid } from "@/components/trips/TripsGrid";
import { TripsHeroSection } from "@/components/sections/trips/TripsHeroSection";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Explore our collection of premium boat trips and coastal experiences in Kenya. From Fort Jesus tours to creek safaris, sunset sailings, and private charters in Mombasa.",
  alternates: { canonical: "https://www.bluepineappleholdings.com/trips" },
  openGraph: {
    title: "Boat Trips & Coastal Experiences | BluePineapple",
    description: "Explore our collection of premium boat trips and coastal experiences in Kenya.",
    url: "https://www.bluepineappleholdings.com/trips",
    type: "website",
  },
};

export default function TripsPage() {
  const featuredTrip = trips.find((t) => t.slug === "fort-jesus-trip") || trips[0];

  return (
    <div className="min-h-screen bg-neutral-900 pt-16 sm:pt-20">
      <TripsHeroSection />

      <Container className="py-8 sm:py-10 md:py-12">
        <TripsGrid />
      </Container>
    </div>
  );
}
