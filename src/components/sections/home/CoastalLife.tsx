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
        alt: "Sunset sailing experience on the Indian Ocean in Mombasa, Kenya - Golden hour boat trip",
        className: "md:col-span-2 md:row-span-2 w-[75vw] sm:w-auto aspect-[4/5] sm:aspect-auto sm:h-64 md:h-96 flex-shrink-0 snap-center sm:snap-align-none", // Large feature
    },
    {
        src: "/images/hero/IMG_5880-poster.jpg", // Ocean Vibes - Open water freedom
        alt: "Cruising the turquoise waters of the Indian Ocean off the coast of Mombasa, Kenya",
        className: "md:col-span-1 md:row-span-1 w-[75vw] sm:w-auto aspect-[4/5] sm:aspect-auto sm:h-64 md:h-48 flex-shrink-0 snap-center sm:snap-align-none",
    },
    {
        src: "/images/hero/IMG_5935-poster.jpg", // Marine Life / Charter
        alt: "Private boat charter experience in Mombasa - Exclusive coastal adventure",
        className: "md:col-span-1 md:row-span-1 w-[75vw] sm:w-auto aspect-[4/5] sm:aspect-auto sm:h-64 md:h-48 flex-shrink-0 snap-center sm:snap-align-none",
    },
    {
        src: "/images/gallery/hero.jpeg", // Luxury Marine
        alt: "Luxury marine experience on a BluePineapple boat in Mombasa",
        className: "md:col-span-1 md:row-span-1 w-[75vw] sm:w-auto aspect-[4/5] sm:aspect-auto sm:h-64 md:h-48 flex-shrink-0 snap-center sm:snap-align-none",
    },
    {
        src: "/images/services/IMG_5997-poster.jpg", // Nature/Mangrove
        alt: "Mangrove creek safari through Mtwapa and Tudor Creek in Mombasa, Kenya",
        className: "md:col-span-1 md:row-span-1 w-[75vw] sm:w-auto aspect-[4/5] sm:aspect-auto sm:h-64 md:h-48 flex-shrink-0 snap-center sm:snap-align-none",
    },
];

export function CoastalLife() {
    return (
        <section className="py-12 md:py-16 bg-neutral-950 text-white overflow-hidden">
            <Container>
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-3">
                        The Experience
                    </p>
                    <Heading level="h2" size="lg" className="mb-3 text-white">
                        Moments from the Coast
                    </Heading>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        A window into the soul of BluePineapple. Catch a glimpse of the beauty and excitement that awaits.
                    </p>
                </div>

                <div className="flex sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-3 md:gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
                    {galleryItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`relative overflow-hidden rounded-xl bg-neutral-900 group ${item.className}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Button
                        href={ROUTES.gallery}
                        variant="outline"
                        className="text-xs sm:text-sm px-5 py-2 text-white border-white/20 hover:bg-white hover:text-neutral-950 transition-all duration-300"
                    >
                        View Full Gallery
                    </Button>
                </div>
            </Container>
        </section>
    );
}
