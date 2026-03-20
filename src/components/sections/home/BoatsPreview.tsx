"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { boats } from "@/data/boats";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { ArrowRight, Users } from "lucide-react";

export function BoatsPreview() {
  return (
    <section className="py-10 sm:py-12 bg-neutral-900" id="fleet">
      <Container>
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
            Premium Vessels
          </span>
          <Heading level="h2" size="lg" className="mt-2 mb-3 text-white">
            Our Fleet
          </Heading>
          <p className="text-neutral-400 max-w-xl mx-auto text-xs sm:text-sm">
            Safety-certified boats for your ultimate comfort and coastal adventure.
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex sm:grid sm:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {boats.map((boat) => (
            <Link
              key={boat.id}
              href={ROUTES.boats}
              className="flex-shrink-0 w-[75vw] sm:w-auto group"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-xl">
                <Image
                  src={boat.image}
                  alt={boat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 75vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-3 h-3 text-teal-400" />
                    <span className="text-[10px] text-teal-400 font-semibold">
                      Up to {boat.capacity} guests
                    </span>
                  </div>
                  <Heading level="h3" size="sm" className="text-white mb-1 !font-semibold">
                    {boat.name}
                  </Heading>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[10px]">
                      From {formatPrice(boat.hourlyRate || boat.dailyRate || 0)}
                    </span>
                    <ArrowRight className="w-3 h-3 text-teal-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={ROUTES.boats}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            View Fleet Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
