import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { trips } from "@/data/trips";
import { TripsGrid } from "@/components/trips/TripsGrid";

export const metadata: Metadata = {
  title: "Boat Trips & Coastal Experiences | BluePineapple",
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
      {/* Hero Section */}
      <div className="relative py-10 sm:py-12 md:py-16 bg-neutral-900">
        <Container>
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-xs font-black text-teal-400 uppercase tracking-[0.3em]">
              Discover Kenya
            </span>
            <Heading level="h1" size="3xl" className="mt-3 mb-4 text-white !font-bold">
              Coastal Experiences
            </Heading>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              From historic Fort Jesus tours to sunset sailings and mangrove adventures.
            </p>
          </div>
        </Container>
        
        {/* Decorative wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      </div>

      <Container className="py-8 sm:py-10 md:py-12">
        <TripsGrid />
      </Container>
    </div>
  );
}
