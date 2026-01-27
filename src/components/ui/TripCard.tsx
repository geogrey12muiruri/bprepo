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
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={trip.image || trip.poster || "/images/placeholder.jpg"}
                    alt={trip.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${!isComingSoon && "group-hover:scale-110"}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Status Badge */}
                {isComingSoon && (
                    <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-2xl backdrop-blur-md uppercase tracking-tighter">
                        Coming Soon
                    </div>
                )}
                {/* Price Tag */}
                {!isComingSoon && (
                    <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-xl">
                        <span className="text-teal-700 font-black text-lg">{formatPrice(trip.pricePerPerson)}</span>
                        <span className="text-neutral-500 text-xs font-bold ml-1.5 uppercase opacity-60">/ pax</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        {trip.durationHours} hrs · {trip.boatType}
                    </span>
                </div>

                <Heading level="h3" size="lg" className="mb-2 group-hover:text-teal-600 transition-colors">
                    {trip.name}
                </Heading>

                <p className="text-neutral-600 text-sm mb-6 flex-grow line-clamp-2">
                    {trip.description}
                </p>

                <div className="mt-auto">
                    {isComingSoon ? (
                        <Button disabled variant="secondary" className="w-full bg-neutral-100 text-neutral-400 border-neutral-200">
                            Coming Soon
                        </Button>
                    ) : (
                        <Button className="w-full group-hover:bg-teal-600">
                            View Experience
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
