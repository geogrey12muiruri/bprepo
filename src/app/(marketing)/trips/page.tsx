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
    <div className="py-16 md:py-24 bg-neutral-50 min-h-screen">
      <Container>
        <div className="mb-16">
          <Heading level="h1" size="3xl" className="mb-4 text-neutral-900">
            Unforgettable Coastal Experiences
          </Heading>
          <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
            From historic tours to private charters and sunset sailings.
            Discover the magic of the Kenyan coast with BluePineapple.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </Container>
    </div>
  );
}
