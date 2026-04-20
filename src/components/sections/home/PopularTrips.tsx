"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { trips } from "@/data/trips";
import { formatPrice, formatDuration } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryImages: Record<string, string> = {
  "creek-safaris-mangrove": "/images/services/img2.png",
  "diani-experience": "/images/diani.jpg",
  "malindi-trip": "/images/services/img4.png",
  "fort-jesus-trip": "/images/fort/fort1.jpeg",
  "sunset-sailing": "/images/creek.jpg",
  "birthdays-anniversaries": "/images/services/img1.png",
  "snorkelling-reef": "/images/services/img2.png",
};

export function PopularTrips() {
  const featuredTrips = trips.slice(0, 6);

  return (
    <section className="relative py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden" id="experiences">
      {/* Ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-[-140px] w-[620px] h-[620px] bg-amber-500/10 blur-[110px] rounded-full" />
        <div className="absolute -bottom-40 left-[-160px] w-[680px] h-[680px] bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_60%_30%,rgba(245,158,11,0.10),transparent_45%)]" />
      </div>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Header */}
          <div className="mb-8 lg:mb-0 text-center lg:text-left lg:col-span-4">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Discover
            </span>
            <Heading level="h2" size="lg" className="mt-3 mb-3 text-white">
              Our Experiences
            </Heading>
            <p className="text-neutral-400 max-w-xl lg:max-w-none mx-auto lg:mx-0 text-xs sm:text-sm leading-relaxed">
              From historic tours to sunset sailings. Choose your perfect coastal adventure.
            </p>
          </div>

          {/* Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {featuredTrips.map((trip, index) => {
                const isFeatured = index === 0;
                return (
                  <Link
                    key={trip.id}
                    href={ROUTES.trip(trip.slug)}
                    className={cn(
                      "group",
                      isFeatured && "xl:col-span-2 xl:row-span-2 sm:col-span-2"
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/40",
                        isFeatured ? "h-72 sm:h-72 lg:h-80 xl:h-[34rem]" : "h-64 sm:h-56 lg:h-72"
                      )}
                    >
                      <ImageCarousel
                        images={trip.galleryImages ? [...trip.galleryImages] : [categoryImages[trip.slug] || trip.image]}
                        alt={trip.name}
                        imageClassName="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-wider mb-1">
                          {trip.category}
                        </span>
                        <Heading level="h3" size="sm" className="text-white mb-1 !font-semibold">
                          {trip.name}
                        </Heading>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-white/70 text-[10px]">
                            <Clock className="w-3 h-3" />
                            <span>{formatDuration(trip.durationHours)}</span>
                          </div>
                          <span className="text-teal-300 font-bold text-sm">
                            {formatPrice(trip.pricePerPerson)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href={ROUTES.trips}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                View All Experiences
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
