"use client";

import React from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Trip } from "@/types/trip";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";

interface TripCardProps {
    trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
    const isComingSoon = trip.status === "coming-soon";

    return (
        <Card
            className={`group flex flex-col h-full overflow-hidden transition-all duration-300 ${isComingSoon ? "opacity-90" : "hover:shadow-2xl"}`}
            asLink={!isComingSoon}
            href={!isComingSoon ? ROUTES.trip(trip.slug) : undefined}
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <Image
                    src={trip.image || trip.poster || "/images/placeholder.jpg"}
                    alt={trip.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${!isComingSoon && "group-hover:scale-110"}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    loading="lazy"
                />
                {/* Status Badge */}
                {isComingSoon && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-amber-500 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black shadow-2xl backdrop-blur-md uppercase tracking-tighter">
                        Coming Soon
                    </div>
                )}
                {/* Price Tag */}
                {!isComingSoon && (
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 rounded-lg sm:rounded-xl shadow-xl">
                        <span className="text-teal-700 font-black text-base sm:text-lg">{formatPrice(trip.pricePerPerson)}</span>
                        <span className="text-neutral-500 text-[10px] sm:text-xs font-bold ml-1 uppercase opacity-60">/ pax</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-bold text-teal-600 uppercase tracking-wider">
                        {trip.durationHours} hrs · {trip.boatType}
                    </span>
                </div>

                <Heading level="h3" size="lg" className="mb-2 sm:mb-3 group-hover:text-teal-600 transition-colors">
                    {trip.name}
                </Heading>

                <p className="text-neutral-600 text-xs sm:text-sm mb-4 sm:mb-6 flex-grow line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {trip.description}
                </p>

                <div className="mt-auto pt-2">
                    {isComingSoon ? (
                        <Button disabled variant="secondary" className="w-full bg-neutral-100 text-neutral-400 border-neutral-200 text-sm sm:text-base py-2.5 sm:py-3">
                            Coming Soon
                        </Button>
                    ) : (
                        <Button className="w-full group-hover:bg-teal-600 text-sm sm:text-base py-2.5 sm:py-3">
                            View Experience
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
