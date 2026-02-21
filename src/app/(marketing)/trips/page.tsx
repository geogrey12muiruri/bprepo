import type { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { TripCard } from "@/components/ui/TripCard";
import { trips } from "@/data/trips";

export const metadata: Metadata = {
  title: "Boat Trips & Coastal Experiences | BluePineapple",
  description: "Explore our collection of premium boat trips and coastal experiences in Kenya.",
};

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50/30 to-white">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Enhanced Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Our Experiences
            </span>
          </div>
          <Heading level="h1" size="2xl" className="mb-4 sm:mb-5 md:mb-6 text-neutral-900">
            Unforgettable Coastal Experiences
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            From historic tours to private charters and sunset sailings.
            Discover the magic of the Kenyan coast with BluePineapple.
          </p>
        </div>

        {/* Enhanced Grid Layout */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
