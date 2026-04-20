"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Star } from "lucide-react";
import type { Trip } from "@/types/trip";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";

export function FortJesusHero({ trip }: { trip: Trip }) {
  const images = FORT_JESUS_TRIP_CONTENT.heroImages;
  const heroVideo = FORT_JESUS_TRIP_CONTENT.heroVideo;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const isComingSoon = trip.status === "coming-soon";

  const safeImages = images.length > 0 ? images : [trip.image];
  const showVideo = Boolean(heroVideo?.src) && !reduceMotion && !isMobile && !saveData;

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % safeImages.length);
  }, [safeImages.length]);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mobileMql = window.matchMedia?.("(max-width: 640px)");

    const updateAll = () => {
      setReduceMotion(Boolean(mql?.matches));
      setIsMobile(Boolean(mobileMql?.matches));

      const navWithConnection = navigator as Navigator & {
        connection?: { saveData?: boolean };
      };
      setSaveData(Boolean(navWithConnection.connection?.saveData));
    };

    updateAll();
    mql?.addEventListener?.("change", updateAll);
    mobileMql?.addEventListener?.("change", updateAll);
    return () => {
      mql?.removeEventListener?.("change", updateAll);
      mobileMql?.removeEventListener?.("change", updateAll);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || safeImages.length <= 1) return;
    const timer = setInterval(nextImage, 6500);
    return () => clearInterval(timer);
  }, [nextImage, reduceMotion, safeImages.length]);

  return (
    <div className="relative h-[65vh] sm:h-[75vh] min-h-[500px] overflow-hidden group isolate [transform:translateZ(0)]">
      {/* Background video (desktop-first). Falls back to image carousel on reduced motion. */}
      {showVideo && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-55 scale-105 animate-[slow-zoom_25s_ease-in-out_infinite]"
            poster={heroVideo.poster}
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Background image carousel (text stays static to avoid visual distraction) */}
      <div className={cn("absolute inset-0", showVideo ? "hidden" : "block")}>
        {safeImages.map((src, idx) => {
          const isActive = idx === currentImageIndex;
          return (
            <div
              key={src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <Image
                src={src}
                alt={trip.heroImageAlt ?? trip.name}
                fill
                className={cn(
                  "object-cover [transform:translateZ(0)] will-change-transform",
                  reduceMotion
                    ? "scale-100"
                    : isActive
                      ? "scale-105 transition-transform duration-[9000ms] ease-out"
                      : "scale-100"
                )}
                priority={idx === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            </div>
          );
        })}
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
          <div className="flex items-center gap-2">
            <Link
              href={ROUTES.home}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full pointer-events-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Home
            </Link>
            <Link
              href={ROUTES.trips}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-black/15 px-3 py-1.5 rounded-full pointer-events-auto"
            >
              Experiences
            </Link>
          </div>
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

          <Heading
            level="h1"
            className="text-white mb-2 sm:mb-3 !font-bold drop-shadow-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {trip.seoTitle ?? trip.name}
          </Heading>
          <p className="text-white/90 text-sm sm:text-lg max-w-2xl drop-shadow-md leading-relaxed">
            {trip.description}
          </p>
        </div>
      </Container>

      {/* Glass-Pill Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-40 pointer-events-none">
        <Container>
          <div className="flex justify-center sm:justify-end">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto">
              {safeImages.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className="group p-1"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      currentImageIndex === idx
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
