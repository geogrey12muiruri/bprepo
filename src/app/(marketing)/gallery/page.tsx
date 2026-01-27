import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const galleryItems = [
  {
    type: "image",
    src: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM (2).jpeg",
    alt: "Pristine coastal views in Mombasa",
  },
  {
    type: "video",
    src: "/videos/services/IMG_6078.mp4",
    poster: "/images/services/IMG_6078-poster.jpg",
    alt: "Coastal vibes cinematic highlight",
  },
  {
    type: "image",
    src: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
    alt: "BluePineapple boat fleet",
  },
  {
    type: "video",
    src: "/videos/services/IMG_6079.mp4",
    poster: "/images/services/IMG_6079-poster.jpg",
    alt: "Underwater highlights",
  },
  {
    type: "image",
    src: "/images/gallery/hero.jpeg",
    alt: "Luxury marine experience",
  },
  {
    type: "video",
    src: "/videos/services/IMG_6080.mp4",
    poster: "/images/services/IMG_6080-poster.jpg",
    alt: "Golden hour sailing",
  },
  {
    type: "image",
    src: "/images/services/WhatsApp Image 2026-01-17 at 1.36.13 PM (1).jpeg",
    alt: "Marina operations at sunset",
  },
  {
    type: "image",
    src: "/images/services/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
    alt: "Creek safari boat",
  },
  {
    type: "image",
    src: "/images/services/IMG_6071-poster.jpg",
    alt: "Historic tours nearby",
  },
];

export const metadata: Metadata = {
  title: "Gallery | BluePineapple",
  description: "Experience the beauty of the Kenyan coast through our cinematic gallery of boat trips and marine adventures.",
};

export default function GalleryPage() {
  return (
    <div className="py-16 md:py-32 bg-neutral-50">
      <Container>
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <Heading level="h1" size="3xl" className="mb-6">
            Moments Captured at Sea
          </Heading>
          <p className="text-xl text-neutral-600 leading-relaxed">
            A visual journey through the turquoise waters of Mombasa and Diani.
            Discover the magic that awaits you with BluePineapple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${item.type === "video" ? "aspect-[9/16] md:row-span-2" : "aspect-square md:aspect-auto md:h-80"
                }`}
            >
              {item.type === "video" ? (
                <div className="h-full w-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={item.poster}
                    className="h-full w-full object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="h-full w-full relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
