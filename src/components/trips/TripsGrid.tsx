"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { ImageBadge } from "@/components/ui/ImageBadge";
import { trips } from "@/data/trips";
import { formatPrice, formatDuration } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { buildWhatsAppUrl, buildGeneralBookingMessage } from "@/lib/whatsapp";
import { Star, Clock, MapPin, ArrowRight, Waves, Compass, Landmark, Sun } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  cultural: Landmark,
  adventure: Compass,
  leisure: Sun,
  family: Waves,
};

function FeaturedTrip({ trip }: { trip: typeof trips[0] }) {
  const router = useRouter();
  const Icon = categoryIcons[trip.category] || Compass;
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : trip.boatType === "Glass-bottomed Boat" ? "hunky-dory" : null;
  
  return (
    <Link href={ROUTES.trip(trip.slug)} className="group block">
      <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch rounded-2xl border border-neutral-200 bg-white overflow-hidden">
        <div className="relative lg:col-span-7 aspect-[16/11] lg:aspect-auto lg:min-h-[340px] overflow-hidden">
          <ImageCarousel
            images={trip.galleryImages ? [...trip.galleryImages] : [trip.image]}
            alt={trip.name}
            imageClassName="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-brand-blue text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg shadow-black/20">
              Featured
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <ImageBadge badge={trip.imageBadge} />
          </div>
        </div>

        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-brand-blue" strokeWidth={1.6} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
                {trip.category}
              </span>
            </div>
            <Heading level="h2" size="xl" className="text-neutral-950 mb-2 !font-bold tracking-tight">
              {trip.name}
            </Heading>
            <p className="text-neutral-700 text-sm leading-relaxed line-clamp-3 max-w-xl">
              {trip.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-neutral-600 text-xs">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(trip.durationHours)}</span>
              </div>
              {vesselSlug && (
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 hover:border-brand-blue/40 hover:text-brand-blue text-neutral-700 text-[11px] font-semibold transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(`${ROUTES.boats}/${vesselSlug}`);
                  }}
                >
                  {trip.boatType}
                </button>
              )}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Mombasa</span>
              </div>
              {trip.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-neutral-900 font-semibold">{trip.rating}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-neutral-200 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-500">From</p>
              <p className="text-lg font-bold text-brand-blue">{formatPrice(trip.pricePerPerson)}</p>
            </div>
            <span className="text-sm font-semibold text-brand-blue inline-flex items-center">
              View details <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TripCard({ trip }: { trip: typeof trips[0] }) {
  const isComingSoon = trip.status === "coming-soon";
  const Icon = categoryIcons[trip.category] || Compass;
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : trip.boatType === "Glass-bottomed Boat" ? "hunky-dory" : null;
  
  return (
    <Link href={ROUTES.trip(trip.slug)} className="group block isolate [transform:translateZ(0)]">
      <div className="overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-colors duration-300 hover:border-brand-blue/40 [transform:translateZ(0)] backface-hidden">
        <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
          <ImageCarousel
            images={trip.galleryImages ? [...trip.galleryImages] : [trip.image]}
            alt={trip.name}
            imageClassName="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
          />
          {isComingSoon && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
              Coming Soon
            </div>
          )}
          {!isComingSoon && (
            <div className="absolute top-2 right-2 z-10">
              <ImageBadge badge={trip.imageBadge} />
            </div>
          )}
          {isComingSoon && (
            <div className="absolute top-10 right-2 z-10">
              <ImageBadge badge={trip.imageBadge} />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <div className="w-7 h-7 rounded-full bg-white/80 backdrop-blur border border-white/40 flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-brand-blue" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider">
              {trip.category}
            </span>
            {trip.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-neutral-700">{trip.rating}</span>
              </div>
            )}
          </div>
          
          <Heading level="h3" size="sm" className="mb-1.5 group-hover:text-brand-blue transition-colors !font-semibold text-neutral-950 line-clamp-1 sm:line-clamp-none">
            {trip.name}
          </Heading>
          
          <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
            {trip.description}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-neutral-600">
              <div className="flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{formatDuration(trip.durationHours)}</span>
              </div>
              {vesselSlug && (
                <span 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `${ROUTES.boats}/${vesselSlug}`;
                  }}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded text-[10px] font-medium transition-colors cursor-pointer"
                >
                  {trip.boatType}
                </span>
              )}
              <div className="hidden sm:flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Mombasa</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-brand-blue">{formatPrice(trip.pricePerPerson)}</span>
              <span className="text-[9px] text-neutral-500 ml-1">/pax</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function TripsGrid() {
  const featuredTrip = trips.find((t) => t.slug === "fort-jesus-trip") || trips[0];
  const otherTrips = trips.filter((t) => t.id !== featuredTrip.id);

  return (
    <>
      {/* Featured Trip - Fort Jesus as hero */}
      <section className="mb-10 sm:mb-12">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <Heading level="h2" size="lg" className="!font-bold text-neutral-950">Featured Experience</Heading>
        </div>
        <FeaturedTrip trip={featuredTrip} />
      </section>

      {/* All Trips Grid */}
      <section>
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <Heading level="h2" size="lg" className="!font-bold text-neutral-950">All Experiences</Heading>
          <span className="text-xs text-neutral-500">{trips.length} trips</span>
        </div>
        
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory overscroll-x-contain">
          {otherTrips.map((trip) => (
            <div key={trip.id} className="flex-shrink-0 w-[85vw] sm:w-auto snap-center sm:snap-align-none">
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-12 sm:mt-14 text-center py-10 sm:py-12 bg-white border border-neutral-200 rounded-2xl">
        <Heading level="h2" size="lg" className="mb-3 !font-bold text-neutral-950">Ready for an Adventure?</Heading>
        <p className="text-sm text-neutral-700 mb-6 max-w-md mx-auto">
          Book your perfect coastal experience today.
        </p>
        <Button 
          href={buildWhatsAppUrl(buildGeneralBookingMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-sm font-semibold rounded-lg bg-brand-blue hover:bg-blue-900 text-white"
        >
          Contact Us <ArrowRight className="w-4 h-4 ml-2 inline" />
        </Button>
      </section>
    </>
  );
}
