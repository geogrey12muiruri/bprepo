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
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-white border-b border-neutral-200" id="fleet">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">
              Fleet
            </p>
            <Heading level="h2" size="xl" className="mt-3 !font-bold tracking-tight text-neutral-950">
              Boats built for comfort and safety
            </Heading>
            <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed">
              Clean, modern vessels with the essentials that matter: safety gear, experienced crew, and reliable routes.
            </p>
          </div>
          <Link
            href={ROUTES.boats}
            className="inline-flex items-center justify-center h-11 px-4 rounded-xl border border-neutral-200 bg-white hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-sm font-semibold transition-colors"
          >
            View fleet <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {boats.map((boat) => (
            <Link
              key={boat.id}
              href={ROUTES.boats}
              className="group border-t border-neutral-200 pt-6"
            >
              <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 aspect-[16/10] sm:aspect-square">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 220px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <span>Up to {boat.capacity} guests</span>
                  </div>
                  <Heading level="h3" size="sm" className="mt-2 text-neutral-950 !font-semibold group-hover:text-brand-blue transition-colors">
                    {boat.name}
                  </Heading>
                  <p className="mt-2 text-sm text-neutral-700">
                    From <span className="font-semibold">{formatPrice(boat.hourlyRate || boat.dailyRate || 0)}</span>
                  </p>
                  <p className="mt-3 inline-flex items-center text-sm font-semibold text-brand-blue">
                    See details <ArrowRight className="w-4 h-4 ml-1" />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
