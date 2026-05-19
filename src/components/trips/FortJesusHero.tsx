"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Star } from "lucide-react";
import type { Trip } from "@/types/trip";
import { ROUTES } from "@/lib/routes";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";

export function FortJesusHero({ trip }: { trip: Trip }) {
  const images = FORT_JESUS_TRIP_CONTENT.heroImages;
  const isComingSoon = trip.status === "coming-soon";

  const heroImage = images.length > 0 ? images[0] : trip.image;

  return (
    <div className="relative h-[56vh] min-h-[380px] sm:h-[62vh] sm:min-h-[480px] overflow-hidden group isolate [transform:translateZ(0)]">
      {/* ── Background image (no slideshow) ───────────────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={trip.heroImageAlt ?? trip.name}
          fill
          className="object-cover origin-center [transform:translateZ(0)]"
          priority
          sizes="100vw"
        />
      </div>

      {/* ── TRIPLE-LAYER OVERLAY ───────────────────────────────────────────── */}
      {/* Layer 1  –  uniform vignette darkens all four edges equally so        */}
      {/*            bright ocean / sky never bleeds into nav chips or text.     */}
      {/* Layer 2  –  RADIAL DIRECTIONAL overlay (32 %/88 % = bottom-left):     */}
      {/*            72 % opacity where the H1 + description live, fading to 0   */}
      {/*            toward the top-right so bright water / sky breathes freely. */}
      {/* Layer 3  –  top gradient preserves highlight space in the upper frame. */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* ── Layer 1: uniform vignette ring ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_44%,rgba(0,0,0,.56)_100%)]" />
        {/* ── Layer 2: directional dark zone (bottom-left, where text sits) ── */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_88%,rgba(0,0,0,.72)_0%,rgba(0,0,0,.38)_46%,transparent_75%)]" />
        {/* ── Layer 3: top fade so bright sky/water doesn't clip at the horizon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent" />
      </div>

      {/* ── Coming Soon badge ──────────────────────────────────────────────── */}
      {isComingSoon && (
        <div className="absolute top-6 right-6 z-30 bg-neutral-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
          Coming Soon
        </div>
      )}

      {/* ── Breadcrumb links ───────────────────────────────────────────────── */}
      <div className="absolute top-6 left-0 right-0 z-40 pointer-events-none">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={ROUTES.home}
              className="inline-flex items-center gap-2 text-white/85 hover:text-white text-xs sm:text-sm font-medium transition-colors bg-black/25 px-2.5 sm:px-3 py-1.5 rounded-full pointer-events-auto"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Home
            </Link>
            <Link
              href={ROUTES.trips}
              className="inline-flex items-center gap-2 text-white/75 hover:text-white text-xs sm:text-sm font-medium transition-colors bg-black/20 px-2.5 sm:px-3 py-1.5 rounded-full pointer-events-auto"
            >
              Experiences
            </Link>
          </div>
        </Container>
      </div>

      {/* ── Content card ──────────────────────────────────────────────────── */}
      <Container className="absolute bottom-0 left-0 right-0 pb-14 sm:pb-16 z-30 pointer-events-none">
        <div className="pointer-events-auto max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4 pt-2">
            <span className="px-3 py-1 bg-brand-blue text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-black/25">
              {trip.category}
            </span>
            {trip.rating && (
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full shadow-lg shadow-black/10">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400/80" />
                <span className="text-white font-bold text-sm drop-shadow-md">{trip.rating}</span>
              </div>
            )}
          </div>

          <Heading
            level="h1"
            className="text-white mb-2 sm:mb-3 !font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight drop-shadow-lg"
          >
            {trip.seoTitle ?? trip.name}
          </Heading>
          <p className="text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed">
            {trip.description}
          </p>
        </div>
      </Container>

    </div>
  );
}
