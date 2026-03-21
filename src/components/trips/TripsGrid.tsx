"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
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
  const Icon = categoryIcons[trip.category] || Compass;
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : null;
  
  return (
    <div className="group relative block cursor-pointer" onClick={() => window.location.href = ROUTES.trip(trip.slug)}>
      <div className="relative h-[45vh] sm:h-[50vh] overflow-hidden rounded-2xl">
        <ImageCarousel
          images={trip.galleryImages ? [...trip.galleryImages] : [trip.image]}
          alt={trip.name}
          imageClassName="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="px-2.5 py-1 bg-teal-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
            Featured
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.5} />
            <span className="text-teal-400 text-[10px] font-bold uppercase tracking-wider">{trip.category}</span>
          </div>
          <Heading level="h2" size="xl" className="text-white mb-1 !font-bold">
            {trip.name}
          </Heading>
          <p className="text-white/80 text-xs sm:text-sm mb-3 line-clamp-2 max-w-xl">
            {trip.description}
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-white/70 text-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(trip.durationHours)}</span>
            </div>
            {vesselSlug && (
              <a 
                href={`${ROUTES.boats}/${vesselSlug}`}
                className="px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white rounded text-[10px] font-medium transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {trip.boatType}
              </a>
            )}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Mombasa</span>
            </div>
            {trip.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-white">{trip.rating}</span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-white/20">
            <span className="text-lg font-bold text-teal-400">From {formatPrice(trip.pricePerPerson)}</span>
            <span className="text-xs text-white/50 ml-1">/pax</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip }: { trip: typeof trips[0] }) {
  const isComingSoon = trip.status === "coming-soon";
  const Icon = categoryIcons[trip.category] || Compass;
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : null;
  
  return (
    <Link href={ROUTES.trip(trip.slug)} className="group block">
      <div className="overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-white/20">
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageCarousel
            images={trip.galleryImages ? [...trip.galleryImages] : [trip.image]}
            alt={trip.name}
            imageClassName="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {isComingSoon && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
              Coming Soon
            </div>
          )}
          <div className="absolute top-2 left-2">
            <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider">
              {trip.category}
            </span>
            {trip.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-neutral-300">{trip.rating}</span>
              </div>
            )}
          </div>
          
          <Heading level="h3" size="sm" className="mb-1.5 group-hover:text-teal-400 transition-colors !font-semibold text-white">
            {trip.name}
          </Heading>
          
          <p className="text-xs text-neutral-400 mb-3 line-clamp-2">
            {trip.description}
          </p>
          
          <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(trip.durationHours)}</span>
              </div>
              {vesselSlug && (
                <span 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `${ROUTES.boats}/${vesselSlug}`;
                  }}
                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white rounded text-[10px] font-medium transition-colors cursor-pointer"
                >
                  {trip.boatType}
                </span>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Mombasa</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-teal-400">{formatPrice(trip.pricePerPerson)}</span>
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
          <Heading level="h2" size="lg" className="!font-bold text-white">Featured Experience</Heading>
        </div>
        <FeaturedTrip trip={featuredTrip} />
      </section>

      {/* All Trips Grid */}
      <section>
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <Heading level="h2" size="lg" className="!font-bold text-white">All Experiences</Heading>
          <span className="text-xs text-neutral-500">{trips.length} trips</span>
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-12 sm:mt-14 text-center py-10 sm:py-12 bg-white/5 border border-white/10 rounded-2xl">
        <Heading level="h2" size="lg" className="mb-3 !font-bold text-white">Ready for an Adventure?</Heading>
        <p className="text-sm text-neutral-400 mb-6 max-w-md mx-auto">
          Book your perfect coastal experience today.
        </p>
        <Button 
          href={buildWhatsAppUrl(buildGeneralBookingMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-sm font-semibold rounded-lg"
        >
          Contact Us <ArrowRight className="w-4 h-4 ml-2 inline" />
        </Button>
      </section>
    </>
  );
}
