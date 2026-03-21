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
    <section className="py-10 sm:py-12 bg-neutral-900" id="experiences">
      <Container>
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
            Discover
          </span>
          <Heading level="h2" size="lg" className="mt-2 mb-3 text-white">
            Our Experiences
          </Heading>
          <p className="text-neutral-400 max-w-xl mx-auto text-xs sm:text-sm">
            From historic tours to sunset sailings. Choose your perfect coastal adventure.
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {featuredTrips.map((trip) => (
            <Link
              key={trip.id}
              href={ROUTES.trip(trip.slug)}
              className="flex-shrink-0 w-[75vw] sm:w-auto group"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden rounded-xl">
                <ImageCarousel
                  images={trip.galleryImages ? [...trip.galleryImages] : [categoryImages[trip.slug] || trip.image]}
                  alt={trip.name}
                  imageClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
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
                    <span className="text-teal-400 font-bold text-sm">
                      {formatPrice(trip.pricePerPerson)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={ROUTES.trips}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            View All Experiences
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
