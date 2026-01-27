"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { CinematicPortrait } from "@/components/ui/CinematicPortrait";

const highlights = [
    {
        video: "/videos/services/IMG_6078.mp4",
        poster: "/images/services/IMG_6078-poster.jpg",
        caption: "Ocean Vibes",
    },
    {
        video: "/videos/services/IMG_6079.mp4",
        poster: "/images/services/IMG_6079-poster.jpg",
        caption: "Marine Life",
    },
    {
        video: "/videos/services/IMG_6080.mp4",
        poster: "/images/services/IMG_6080-poster.jpg",
        caption: "Sunset Magic",
    },
];

export function VideoShowcase() {
    return (
        <section className="bg-neutral-950 py-24 md:py-32 overflow-hidden">
            <Container>
                <div className="mb-20 text-center">
                    <Heading level="h2" size="2xl" className="mb-4 text-white">
                        Experiencing the Coast
                    </Heading>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A window into the soul of BluePineapple. Catch a glimpse of the
                        beauty and excitement that awaits you on the Indian Ocean.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center justify-items-center">
                    {highlights.map((item, idx) => (
                        <CinematicPortrait
                            key={idx}
                            videoSrc={item.video}
                            posterSrc={item.poster}
                            caption={item.caption}
                            className={idx === 1 ? "md:-translate-y-8" : ""}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
