"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Star, Waves, Compass, Landmark } from "lucide-react";
import type { Trip } from "@/types/trip";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

const journeyAssets = {
  journey: "/images/fort/fort3.jpeg",
  coastal: "/images/fort/coastal.jpg",
  fort: "/images/fort/fortj.jpg",
};

export function FortJesusHero({ trip }: { trip: Trip }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isComingSoon = trip.status === "coming-soon";

  const slides = [
    {
      id: "intro",
      image: trip.image,
      title: trip.seoTitle ?? trip.name,
      description: trip.description,
      icon: null,
    },
    {
      id: "journey",
      image: journeyAssets.journey,
      title: "The Journey",
      description: "As the boat glides effortlessly away from the powder-white sands of Mombasa Beach, relax and enjoy the ride. The craft is fully equipped with life jackets, GPS navigation, and CCTV for a safe experience.",
      icon: Waves,
    },
    {
      id: "coastal",
      image: journeyAssets.coastal,
      title: "Coastal Views",
      description: "Cruise past Nyali, the pristine waters of Mombasa Marine Park, Likoni, and Shelly Beach. Spot landmarks including Ras Serani Lighthouse, State House, and Mombasa Hospital from the water.",
      icon: Compass,
    },
    {
      id: "fort",
      image: journeyAssets.fort,
      title: "Fort Jesus",
      description: "Arrive at the magnificent Fort Jesus, a UNESCO World Heritage Site. Step ashore and explore Old Town's narrow streets filled with antique treasures and Swahili artistry.",
      icon: Landmark,
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[65vh] sm:h-[75vh] min-h-[500px] overflow-hidden group isolate [transform:translateZ(0)]">
      {/* 1. Desktop Experience: Cross-fade (hidden on mobile) */}
      <div className="hidden sm:block absolute inset-0">
        {slides.map((slide, idx) => (
          <div
            key={`desktop-${slide.id}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className={cn(
                "object-cover [transform:translateZ(0)] transition-transform duration-[10s] ease-out",
                currentSlide === idx ? "scale-105" : "scale-100"
              )}
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* 2. Mobile Experience: Native Swipeable (hidden on desktop) */}
      <div className="sm:hidden absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide overscroll-x-contain z-10"
           onScroll={(e) => {
             const scrollPosition = e.currentTarget.scrollLeft;
             const width = e.currentTarget.clientWidth;
             const index = Math.round(scrollPosition / width);
             if (index !== currentSlide) setCurrentSlide(index);
           }}
      >
        {slides.map((slide) => (
          <div key={`mobile-${slide.id}`} className="relative h-full w-screen flex-none snap-center overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover [transform:translateZ(0)] backface-hidden"
              priority={slide.id === "intro"}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Shared Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 sm:via-neutral-900/60 to-black/20 z-20 pointer-events-none" />

      {isComingSoon && (
        <div className="absolute top-6 right-6 z-30 bg-amber-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
          Coming Soon
        </div>
      )}

      {/* Persistent Back Link */}
      <div className="absolute top-6 left-0 right-0 z-40 pointer-events-none">
        <Container>
          <Link
            href={ROUTES.trips}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full pointer-events-auto"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Experiences
          </Link>
        </Container>
      </div>

      {/* Content Area (Shared) */}
      <Container className="absolute bottom-0 left-0 right-0 pb-12 sm:pb-16 z-30 pointer-events-none">
        <div className="pointer-events-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-teal-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-lg">
              {trip.category}
            </span>
            {trip.rating && (
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold text-sm drop-shadow-md">{trip.rating}</span>
              </div>
            )}
          </div>

          <div className="relative min-h-[160px] sm:min-h-[140px]">
            {slides.map((slide, idx) => {
              const Icon = slide.icon;
              return (
                <div
                  key={`content-${slide.id}`}
                  className={cn(
                    "transition-all duration-700 absolute bottom-0 left-0 w-full",
                    currentSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  )}
                >
                  {Icon && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/10 shadow-xl">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                    </div>
                  )}
                  <Heading
                    level={idx === 0 ? "h1" : "h2"}
                    className={cn(
                      "text-white mb-2 sm:mb-3 !font-bold drop-shadow-lg",
                      idx === 0 ? "text-2xl sm:text-4xl md:text-5xl lg:text-6xl" : "text-xl sm:text-3xl md:text-4xl"
                    )}
                  >
                    {slide.title}
                  </Heading>
                  <p className="text-white/90 text-sm sm:text-lg max-w-2xl drop-shadow-md leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {slide.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Glass-Pill Indicators (Bottom Right on Mobile, Bottom Center on Desktop?) */}
      <div className="absolute bottom-6 left-0 right-0 z-40 pointer-events-none">
        <Container>
          <div className="flex justify-center sm:justify-end">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto">
              {slides.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => setCurrentSlide(idx)}
                  className="group p-1"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      currentSlide === idx
                        ? "w-6 bg-teal-400"
                        : "w-1.5 bg-white/40 group-hover:bg-white"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
