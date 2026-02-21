"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

const galleryItems = [
    {
        src: "/images/hero/IMG_5883-poster.jpg", // Sunset Magic - The "Golden Hour" shot
        alt: "Magical sunset sailing",
        className: "md:col-span-2 md:row-span-2 h-64 md:h-96", // Large feature
    },
    {
        src: "/images/hero/IMG_5880-poster.jpg", // Ocean Vibes - Open water freedom
        alt: "Cruising the Indian Ocean",
        className: "md:col-span-1 md:row-span-1 h-64 md:h-48",
    },
    {
        src: "/images/hero/IMG_5935-poster.jpg", // Marine Life / Charter
        alt: "Private charter moments",
        className: "md:col-span-1 md:row-span-1 h-64 md:h-48",
    },
    {
        src: "/images/services/IMG_6069-poster.jpg", // People/Celebration
        alt: "Celebrations on deck",
        className: "md:col-span-1 md:row-span-1 h-64 md:h-48",
    },
    {
        src: "/images/services/IMG_5997-poster.jpg", // Nature/Mangrove
        alt: "Serene mangrove safari",
        className: "md:col-span-1 md:row-span-1 h-64 md:h-48",
    },
];

export function CoastalLife() {
    return (
        <section className="py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
            <Container>
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.4em] mb-4">
                        The Experience
                    </p>
                    <Heading level="h2" size="2xl" className="mb-6 text-white">
                        Moments from the Coast
                    </Heading>
                    <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
                        A window into the soul of BluePineapple. Catch a glimpse of the
                        beauty and excitement that awaits you on the Indian Ocean.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6">
                    {galleryItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`relative overflow-hidden rounded-2xl bg-neutral-900 group ${item.className}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        href={ROUTES.gallery}
                        variant="outline"
                        className="text-white border-white/20 hover:bg-white hover:text-neutral-950 transition-all duration-300"
                    >
                        View Full Gallery
                    </Button>
                </div>
            </Container>
        </section>
    );
}
