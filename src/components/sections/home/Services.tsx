"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
    return (
        <section className="py-16 md:py-32 bg-white" id="featured-experiences">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
