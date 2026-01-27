import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { BoatCard } from "@/components/ui/BoatCard";
import { boats } from "@/data/boats";

export function BoatsPreview() {
  return (
    <section className="py-16 md:py-24 bg-white" id="fleet">
      <Container>
        <div className="mb-16 text-center">
          <Heading level="h2" size="2xl" className="mb-4">
            Meet Our Fleet
          </Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Our vessels are more than just boats — they are carefully maintained,
            safety-first platforms for your coastal adventure.
          </p>
        </div>

        <div className="space-y-12">
          {boats.map((boat) => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
