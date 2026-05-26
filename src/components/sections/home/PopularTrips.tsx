"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { trips } from "@/data/trips";
import { formatDuration, formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";

export function PopularTrips() {
  const featuredTrips = trips.slice(0, 6);

  return (
    <section
      id="experiences"
      className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-white via-sky-50/70 to-white py-14 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-sky-200/40 blur-3xl" />

      <Container>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-brand-blue">
              Experiences
            </p>

            <Heading
              level="h2"
              size="xl"
              className="mt-3 !font-bold tracking-tight text-neutral-950"
            >
              Pick your next coastal moment
            </Heading>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              Explore clear, memorable routes across Mombasa, Fort Jesus,
              creek safaris, reef trips, private charters, and coastal
              celebrations.
            </p>
          </div>

          <Link
            href={ROUTES.trips}
            className="group inline-flex h-11 w-fit items-center justify-center rounded-xl border border-neutral-200 bg-white/90 px-5 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue hover:shadow-md"
          >
            View all experiences
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-10 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex min-w-max gap-4 sm:grid sm:min-w-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {featuredTrips.map((trip, index) => {
              const src = trip.image;

              return (
                <Link
                  key={trip.id}
                  href={ROUTES.trip(trip.slug)}
                  className="group w-[82vw] max-w-[360px] sm:w-auto sm:max-w-none"
                  style={{
                    animation: `fadeUp 700ms ease-out ${index * 100}ms both`,
                  }}
                >
                  <article className="h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl">
                    <div className="relative aspect-[16/11] overflow-hidden bg-neutral-100">
                      <Image
                        src={src}
                        alt={trip.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-neutral-700 shadow-sm backdrop-blur-sm">
                        {trip.category}
                      </div>

                      <div className="absolute bottom-3 right-3 rounded-full bg-brand-blue px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-black/20">
                        {formatPrice(trip.pricePerPerson)}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <Heading
                        level="h3"
                        size="sm"
                        className="text-neutral-950 !font-bold tracking-tight transition-colors group-hover:text-brand-blue"
                      >
                        {trip.name}
                      </Heading>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                          <Clock className="h-4 w-4 text-brand-blue" />
                          <span>{formatDuration(trip.durationHours)}</span>
                        </div>

                        <span className="inline-flex items-center text-xs font-bold text-brand-blue">
                          View trip
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}