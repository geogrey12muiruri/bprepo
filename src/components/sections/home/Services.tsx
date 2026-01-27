"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
    return (
        <section className="py-16 md:py-32 bg-white overflow-hidden" id="featured-experiences">
            <Container>
                <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] mb-4">Discovery Awaits</p>
                    <Heading level="h2" size="2xl" className="mb-4 md:mb-6 tracking-tight">
                        Curated Experiences
                    </Heading>
                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
                        From serene creek safaris to historical voyages. Choose your perfect
                        coastal adventure with BluePineapple.
                    </p>
                </div>

                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-x-visible pb-8 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar">
                    {services.map((service) => (
                        <div key={service.id} className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-start">
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
