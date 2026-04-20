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
    <section className="relative py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden" id="fleet">
      {/* Ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-[-160px] w-[640px] h-[640px] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 right-[-180px] w-[720px] h-[720px] bg-teal-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.10),transparent_50%)]" />
      </div>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Header */}
          <div className="mb-8 lg:mb-0 text-center lg:text-left lg:col-span-4">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Premium Vessels
            </span>
            <Heading level="h2" size="lg" className="mt-3 mb-3 text-white">
              Our Fleet
            </Heading>
            <p className="text-neutral-400 max-w-xl lg:max-w-none mx-auto lg:mx-0 text-xs sm:text-sm leading-relaxed">
              Safety-certified boats for your ultimate comfort and coastal adventure.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              {boats.map((boat) => (
                <Link
                  key={boat.id}
                  href={ROUTES.boats}
                  className="group"
                >
                  <div className="relative h-72 sm:h-64 lg:h-80 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/40">
                    <Image
                      src={boat.image}
                      alt={boat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 75vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                    <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Users className="w-3.5 h-3.5 text-teal-300" />
                        <span className="text-[10px] text-teal-200 font-semibold">
                          Up to {boat.capacity} guests
                        </span>
                      </div>
                      <Heading level="h3" size="sm" className="text-white mb-1 !font-semibold">
                        {boat.name}
                      </Heading>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-300/80 text-[10px]">
                          From {formatPrice(boat.hourlyRate || boat.dailyRate || 0)}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href={ROUTES.boats}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                View Fleet Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
