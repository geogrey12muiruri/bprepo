"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
    return (
        <section className="py-10 sm:py-12 bg-neutral-900 overflow-hidden" id="featured-experiences">
            <Container>
                <div className="mb-8 text-center">
                    <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
                        Discovery Awaits
                    </span>
                    <Heading level="h2" size="lg" className="mt-2 mb-3 text-white">
                        Curated Experiences
                    </Heading>
                    <p className="text-neutral-400 max-w-xl mx-auto text-xs sm:text-sm">
                        From serene creek safaris to historical voyages. Choose your perfect coastal adventure.
                    </p>
                </div>

                <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory overscroll-x-contain">
                    {services.map((service) => (
                        <div key={service.id} className="flex-shrink-0 w-[85vw] sm:w-auto snap-center sm:snap-align-none">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
