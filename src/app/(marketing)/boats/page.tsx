import type { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { BoatCard } from "@/components/ui/BoatCard";
import { boats } from "@/data/boats";

export const metadata: Metadata = {
  title: "Meet Our Fleet | BluePineapple",
  description: "Discover our collection of premium, safe, and certified vessels for coastal adventures.",
};

export default function BoatsPage() {
  return (
    <div className="py-16 md:py-24 bg-neutral-50 min-h-screen">
      <Container>
        <div className="mb-16">
          <Heading level="h1" size="3xl" className="mb-4 text-neutral-900">
            Engineered for Excellence
          </Heading>
          <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
            Our fleet represents our commitment to safety, comfort, and premium quality.
            All our vessels are fully insured, certified, and maintained to the highest standards.
          </p>
        </div>

        <div className="space-y-12">
          {boats.map((boat) => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </Container>
    </div>
  );
}
