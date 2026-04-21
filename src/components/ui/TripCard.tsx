"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Trip } from "@/types/trip";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { ImageBadge } from "@/components/ui/ImageBadge";

interface TripCardProps {
  trip: Trip;
  variant?: "default" | "dark";
}

export function TripCard({ trip, variant = "default" }: TripCardProps) {
  const isComingSoon = trip.status === "coming-soon";
  const isDark = variant === "dark";

  const cardBg = isDark ? "bg-white/5 border border-white/10" : "bg-white";
  const textPrimary = isDark ? "text-white" : "text-neutral-900";
  const textSecondary = isDark ? "text-neutral-400" : "text-neutral-600";
  const textAccent = isDark ? "text-teal-400" : "text-teal-600";
  const priceBg = isDark ? "bg-neutral-800/90" : "bg-white/95";
  const priceText = isDark ? "text-teal-400" : "text-teal-700";

  if (isComingSoon) {
    return (
      <div className={`group flex flex-col h-full overflow-hidden rounded-2xl ${cardBg} transition-all duration-300 opacity-80`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={trip.image || trip.poster || "/images/placeholder.jpg"}
            alt={trip.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-3 right-3 z-10 bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Coming Soon
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${textSecondary}`}>
            {trip.durationHours} hrs · {trip.boatType}
          </span>
          <h3 className={`text-lg font-bold mt-2 ${textPrimary}`}>
            {trip.name}
          </h3>
          <p className={`text-xs mt-2 line-clamp-2 ${textSecondary}`}>
            {trip.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link href={ROUTES.trip(trip.slug)} className="group block h-full">
      {/* Note: hover:-translate-y-1 removed — card translate + child image scale = dual compositor layer conflict on mobile */}
      <div className={`flex flex-col h-full overflow-hidden rounded-2xl ${cardBg} transition-shadow duration-300 hover:shadow-2xl isolate [transform:translateZ(0)]`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden [transform:translateZ(0)] backface-hidden">
          <Image
            src={trip.image || trip.poster || "/images/placeholder.jpg"}
            alt={`${trip.name} boat trip in Mombasa`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Image Badge */}
          <div className="absolute top-3 right-3 z-10">
            <ImageBadge badge={trip.imageBadge} />
          </div>
          {/* Price Tag */}
          {/* backdrop-blur-sm removed — backdrop-filter inside overflow-hidden + transform causes GPU layer conflict on Android Chrome */}
          <div className={`absolute bottom-3 left-3 z-10 ${priceBg} px-3 py-1.5 rounded-lg shadow-lg`}>
            <span className={`font-black text-sm ${priceText}`}>{formatPrice(trip.pricePerPerson)}</span>
            <span className="text-neutral-500 text-[9px] font-bold ml-1 uppercase">/pax</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${textSecondary}`}>
            {trip.durationHours} hrs · {trip.boatType}
          </span>
          
          <h3 className={`text-base font-bold mt-2 ${textPrimary} group-hover:${textAccent} transition-colors`}>
            {trip.name}
          </h3>

          <p className={`text-xs mt-2 line-clamp-2 ${textSecondary}`}>
            {trip.description}
          </p>

          <div className="mt-auto pt-3">
            <span className={`inline-flex items-center text-xs font-semibold ${textAccent}`}>
              View Details
              <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
