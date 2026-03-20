import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Play } from "lucide-react";
import { ASSETS } from "@/config/assets";

const galleryItems = [
  {
    type: "image",
    src: ASSETS.gallery.images.fleetShowcase,
    alt: "BluePineapple Fleet Ready for Adventure",
    featured: true,
  },
  {
    type: "video",
    src: ASSETS.marketing.hero.video,
    poster: ASSETS.marketing.hero.poster,
    alt: "Coastal vibes cinematic highlight",
  },
  {
    type: "image",
    src: ASSETS.gallery.images.boatFleet,
    alt: "BluePineapple boat fleet",
  },
  {
    type: "video",
    src: ASSETS.marketing.services.privateCharter.video,
    poster: ASSETS.marketing.services.privateCharter.poster,
    alt: "Underwater highlights",
  },
  {
    type: "image",
    src: ASSETS.gallery.images.luxuryMarine,
    alt: "Luxury marine experience",
  },
  {
    type: "video",
    src: ASSETS.marketing.services.sunsetSailing.video,
    poster: ASSETS.marketing.services.sunsetSailing.poster,
    alt: "Golden hour sailing",
  },
];

export const metadata: Metadata = {
  title: "Gallery | BluePineapple",
  description: "Experience the beauty of the Kenyan coast through our cinematic gallery of boat trips and marine adventures in Mombasa and Diani.",
  alternates: {
    canonical: "https://www.bluepineappleholdings.com/gallery",
  },
  openGraph: {
    title: "Gallery | BluePineapple",
    description: "Experience the beauty of the Kenyan coast through our cinematic gallery of boat trips and marine adventures.",
    url: "https://www.bluepineappleholdings.com/gallery",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50/30 to-white">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Enhanced Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Visual Journey
            </span>
          </div>
          <Heading level="h1" size="2xl" className="mb-4 sm:mb-5 md:mb-6 text-neutral-900">
            Moments Captured at Sea
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            A visual journey through the turquoise waters of Mombasa and Diani.
            Discover the magic that awaits you with BluePineapple.
          </p>
        </div>

        {/* Modern Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {galleryItems.map((item, idx) => {
            const isFeatured = item.featured;
            
            return (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 sm:row-span-2" : ""
                } ${item.type === "video" ? "aspect-[9/16] sm:aspect-auto sm:h-[400px]" : isFeatured ? "aspect-square sm:aspect-auto sm:h-[500px]" : "aspect-square sm:aspect-auto sm:h-[400px]"
                }`}
              >
                {item.type === "video" ? (
                  <div className="h-full w-full relative">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={item.poster}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 text-teal-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/5 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
