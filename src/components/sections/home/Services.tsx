"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
    return (
        <section className="py-10 md:py-14 bg-neutral-50 overflow-hidden" id="featured-experiences">
            <Container>
                <div className="mb-8 md:mb-10 text-center max-w-2xl mx-auto">
                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.3em] mb-3">Discovery Awaits</p>
                    <Heading level="h2" size="lg" className="mb-3 tracking-tight">
                        Curated Experiences
                    </Heading>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        From serene creek safaris to historical voyages. Choose your perfect coastal adventure.
                    </p>
                </div>

                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 -mx-4 sm:-mx-6 md:-mx-0 px-4 sm:px-6 md:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar">
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
