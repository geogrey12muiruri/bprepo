"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { TripCard } from "@/components/ui/TripCard";
import { trips } from "@/data/trips";
import { ROUTES } from "@/lib/routes";

export function PopularTrips() {
  // Show first 6 trips on home page
  const featuredTrips = trips.slice(0, 6);

  return (
    <section className="bg-neutral-50 py-16 md:py-24" id="experiences">
      <Container>
        <div className="mb-16 text-center">
          <Heading level="h2" size="2xl" className="mb-4">
            Unforgettable Experiences
          </Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            From serene creek safaris to thrilling reef explorations.
            Discover the magic of the Kenyan coast with our curated boat trips.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="secondary"
            className="px-12"
            onClick={() => (window.location.href = ROUTES.trips)}
          >
            Explore All Experiences
          </Button>
        </div>
      </Container>
    </section>
  );
}
