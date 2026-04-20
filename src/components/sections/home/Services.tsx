"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
    return (
        <section className="relative py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden" id="featured-experiences">
            {/* Ambient accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-[520px] h-[520px] bg-teal-500/10 blur-[90px] rounded-full" />
                <div className="absolute -bottom-28 -right-24 w-[560px] h-[560px] bg-sky-500/10 blur-[100px] rounded-full" />
                <div className="absolute inset-0 [background:radial-gradient(circle_at_35%_25%,rgba(56,189,248,0.10),transparent_45%)]" />
                <div className="absolute inset-0 [background:radial-gradient(circle_at_70%_70%,rgba(20,184,166,0.10),transparent_45%)]" />
            </div>

            <Container className="relative">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
                    <div className="mb-8 lg:mb-0 text-center lg:text-left lg:col-span-4">
                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
                            Discovery Awaits
                        </span>
                        <Heading level="h2" size="lg" className="mt-3 mb-3 text-white">
                            Curated Experiences
                        </Heading>
                        <p className="text-neutral-400 max-w-xl lg:max-w-none mx-auto lg:mx-0 text-xs sm:text-sm leading-relaxed">
                            From serene creek safaris to historical voyages. Choose your perfect coastal adventure.
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {services.map((service) => (
                                <div key={service.id}>
                                    <ServiceCard service={service} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
