"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { services } from "@/data/services";
import Link from "next/link";
import { ArrowRight, Landmark, Ship, Sparkles } from "lucide-react";

export function Services() {
    return (
        <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-white border-b border-neutral-200" id="featured-experiences">
            <Container>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">
                            What we do
                        </p>
                        <Heading level="h2" size="xl" className="mt-3 !font-bold tracking-tight text-neutral-950">
                            Experiences, charters, and historic tours
                        </Heading>
                        <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed">
                            A clean, modern selection — built around comfort, safety, and memorable routes.
                        </p>
                    </div>
                    <Link
                        href="/trips"
                        className="inline-flex items-center justify-center h-11 px-4 rounded-xl border border-neutral-200 bg-white hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-sm font-semibold transition-colors"
                    >
                        Browse all experiences <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {services.map((service) => {
                        const Icon = service.id === "fort-jesus" ? Landmark : service.id === "private-charter" ? Sparkles : Ship;
                        return (
                            <Link
                                key={service.id}
                                href={service.href ?? "/"}
                                className="group border-t border-neutral-200 pt-6"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-brand-blue">
                                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-neutral-950 group-hover:text-brand-blue transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <p className="mt-3 inline-flex items-center text-sm font-semibold text-brand-blue">
                                            Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
