"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

const galleryImages = [
  {
    src: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM (2).jpeg",
    alt: "Coastal view",
  },
  {
    src: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
    alt: "BluePineapple Boat",
  },
  {
    src: "/images/gallery/hero.jpeg",
    alt: "Luxury boating experience",
  },
  {
    src: "/images/services/WhatsApp Image 2026-01-17 at 1.36.13 PM (1).jpeg",
    alt: "Marina sunset",
  },
  {
    src: "/images/services/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
    alt: "Creek Safari",
  },
];

export function GalleryPreview() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <Container>
        <div className="mb-12 text-center">
          <Heading level="h2" size="2xl" className="mb-4">
            Moments from the Coast
          </Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Glimpses of the unforgettable memories our guests have created.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-xl bg-neutral-200 ${idx === 0 ? "md:col-span-2 md:row-span-2 h-80 md:h-[500px]" : "h-40 md:h-60"
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes={idx === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" onClick={() => (window.location.href = ROUTES.gallery)}>
            View Full Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
