import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { trips } from "@/data/trips";
import { formatPrice, formatDuration } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { Star, Clock, MapPin, ArrowRight, Waves, Compass, Landmark, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Boat Trips & Coastal Experiences | BluePineapple",
  description: "Explore our collection of premium boat trips and coastal experiences in Kenya. From Fort Jesus tours to creek safaris, sunset sailings, and private charters in Mombasa.",
  alternates: { canonical: "https://www.bluepineappleholdings.com/trips" },
  openGraph: {
    title: "Boat Trips & Coastal Experiences | BluePineapple",
    description: "Explore our collection of premium boat trips and coastal experiences in Kenya.",
    url: "https://www.bluepineappleholdings.com/trips",
    type: "website",
  },
};

const categoryIcons: Record<string, React.ElementType> = {
  cultural: Landmark,
  adventure: Compass,
  leisure: Sun,
  family: Waves,
};

function FeaturedTrip({ trip }: { trip: typeof trips[0] }) {
  const Icon = categoryIcons[trip.category] || Compass;
  
  return (
    <Link href={ROUTES.trip(trip.slug)} className="group relative block">
      <div className="relative h-[45vh] sm:h-[50vh] overflow-hidden rounded-2xl">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
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
        </div>
      </div>
    </Link>
  );
}

function TripCardCompact({ trip }: { trip: typeof trips[0] }) {
  const isComingSoon = trip.status === "coming-soon";
  const Icon = categoryIcons[trip.category] || Compass;
  
  return (
    <Link href={ROUTES.trip(trip.slug)} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={trip.image}
            alt={trip.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {isComingSoon && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
              Coming Soon
            </div>
          )}
          <div className="absolute top-2 left-2">
            <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-teal-600" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        
        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider">
              {trip.category}
            </span>
            {trip.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold text-neutral-600">{trip.rating}</span>
              </div>
            )}
          </div>
          
          <Heading level="h3" size="sm" className="mb-1.5 group-hover:text-teal-600 transition-colors !font-semibold">
            {trip.name}
          </Heading>
          
          <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
            {trip.description}
          </p>
          
          <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(trip.durationHours)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-teal-600">{formatPrice(trip.pricePerPerson)}</span>
              <span className="text-[9px] text-neutral-400 ml-1">/pax</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function TripsPage() {
  const featuredTrip = trips.find((t) => t.slug === "fort-jesus-trip") || trips[0];
  const otherTrips = trips.filter((t) => t.id !== featuredTrip.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-10 sm:py-12 md:py-16 bg-neutral-900">
        <Container>
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-xs font-black text-teal-400 uppercase tracking-[0.3em]">
              Discover Kenya
            </span>
            <Heading level="h1" size="3xl" className="mt-3 mb-4 text-white !font-bold">
              Coastal Experiences
            </Heading>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              From historic Fort Jesus tours to sunset sailings and mangrove adventures.
            </p>
          </div>
        </Container>
        
        {/* Decorative wave pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      </div>

      <Container className="py-8 sm:py-10 md:py-12">
        {/* Featured Trip - Fort Jesus as hero */}
        <section className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <Heading level="h2" size="lg" className="!font-bold">Featured Experience</Heading>
          </div>
          <FeaturedTrip trip={featuredTrip} />
        </section>

        {/* All Trips Grid */}
        <section>
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <Heading level="h2" size="lg" className="!font-bold">All Experiences</Heading>
            <span className="text-xs text-neutral-500">{trips.length} trips</span>
          </div>
          
          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherTrips.map((trip) => (
              <TripCardCompact key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 sm:mt-14 text-center py-10 sm:py-12 bg-neutral-50 rounded-2xl">
          <Heading level="h2" size="lg" className="mb-3 !font-bold">Ready for an Adventure?</Heading>
          <p className="text-sm text-neutral-600 mb-6 max-w-md mx-auto">
            Book your perfect coastal experience today.
          </p>
          <Button className="px-6 py-3 text-sm font-semibold rounded-lg">
            Contact Us <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </section>
      </Container>
    </div>
  );
}
