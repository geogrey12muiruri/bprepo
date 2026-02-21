"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
    return (
        <section className="py-16 md:py-32 bg-neutral-50 overflow-hidden" id="featured-experiences">
            <Container>
                <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-4">Discovery Awaits</p>
                    <Heading level="h2" size="2xl" className="mb-4 md:mb-6 tracking-tight">
                        Curated Experiences
                    </Heading>
                    <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
                        From serene creek safaris to historical voyages. Choose your perfect
                        coastal adventure with Blue Pineapple.
                    </p>
                </div>

                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 sm:-mx-6 md:-mx-0 px-4 sm:px-6 md:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
                    {services.map((service) => (
                        <div key={service.id} className="flex-shrink-0 w-[65vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw] snap-center">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            </Container>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}
