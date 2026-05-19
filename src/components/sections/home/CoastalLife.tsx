"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { ASSETS } from "@/config/assets";

const galleryItems = ASSETS.marketing.coastalLife.galleryPreview.map((item) => ({
    ...item,
    gridClassName: item.emphasis === "feature" ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1",
}));

export function CoastalLife() {
    return (
        <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-stone-50 text-neutral-950 overflow-hidden isolate [transform:translateZ(0)]">
            <Container>
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
                    {/* Left header — matches WhyChooseUs / Services / PopularTrips / BoatsPreview pattern */}
                    <div className="mb-8 lg:mb-0 text-center lg:text-left lg:col-span-4">
                        <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em]">
                            The Experience
                        </p>
                        <Heading level="h2" size="xl" className="mt-3 mb-3 text-neutral-950 !font-bold tracking-tight">
                            Moments from the Coast
                        </Heading>
                        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
                            A window into the soul of BluePineapple. Catch a glimpse of the beauty and excitement that awaits.
                        </p>
                        <div className="mt-7 sm:mt-8">
                            <Button
                                href={ROUTES.gallery}
                                variant="outline"
                                className="text-xs sm:text-sm px-5 py-2 text-neutral-900 border-neutral-300 hover:border-brand-blue hover:text-brand-blue transition-all duration-300 bg-white"
                            >
                                View Full Gallery
                            </Button>
                        </div>
                    </div>

                    {/* Gallery grid — right content column */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 md:auto-rows-[10.5rem]">
                            {galleryItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white group md:h-auto ${item.gridClassName}`}
                                >
                                    <div className="relative h-56 sm:h-52 md:h-full w-full">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                        priority={idx === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-35 group-hover:opacity-25 transition-opacity duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
