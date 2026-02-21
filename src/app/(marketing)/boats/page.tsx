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
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50/30 to-white">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Enhanced Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Premium Vessels
            </span>
          </div>
          <Heading level="h1" size="2xl" className="mb-4 sm:mb-5 md:mb-6 text-neutral-900">
            Engineered for Excellence
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Our fleet represents our commitment to safety, comfort, and premium quality.
            All our vessels are fully insured, certified, and maintained to the highest standards.
          </p>
        </div>

        {/* Boats Grid */}
        <div className="space-y-16 sm:space-y-20 md:space-y-24">
          {boats.map((boat, index) => (
            <div
              key={boat.id}
              className="relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <BoatCard boat={boat} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
