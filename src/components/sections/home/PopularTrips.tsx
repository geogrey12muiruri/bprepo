"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 border-b border-neutral-200 bg-stone-50" id="experiences">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">
              Experiences
            </p>
            <Heading level="h2" size="xl" className="mt-3 !font-bold tracking-tight text-neutral-950">
              Pick your next coastal moment
            </Heading>
            <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed">
              Clean layouts, clear details — designed to work beautifully on both mobile and large screens.
            </p>
          </div>
          <Link
            href={ROUTES.trips}
            className="inline-flex items-center justify-center h-11 px-4 rounded-xl border border-neutral-200 bg-white hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-sm font-semibold transition-colors"
          >
            View all <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Mobile: swipeable list. Desktop: structured grid */}
        <div className="mt-10 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible">
          <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 min-w-max sm:min-w-0">
            {featuredTrips.map((trip) => {
              const src = categoryImages[trip.slug] || trip.image;
              return (
                <Link
                  key={trip.id}
                  href={ROUTES.trip(trip.slug)}
                  className="group w-[84vw] sm:w-auto"
                >
                  <div className="border border-neutral-200 bg-white rounded-2xl overflow-hidden transition-colors group-hover:border-brand-blue/40">
                    <div className="relative aspect-[16/11]">
                      <Image
                        src={src}
                        alt={trip.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                        {trip.category}
                      </p>
                      <Heading level="h3" size="sm" className="mt-2 text-neutral-950 !font-semibold">
                        {trip.name}
                      </Heading>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(trip.durationHours)}</span>
                        </div>
                        <span className="text-sm font-bold text-brand-blue">
                          {formatPrice(trip.pricePerPerson)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
