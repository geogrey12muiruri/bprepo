"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { Trip } from "@/types/trip";

import { ROUTES } from "@/lib/routes";
import { formatDuration, formatPrice } from "@/lib/format";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";
import { CLOUDINARY_FORT_JESUS_HERO_IMAGES } from "@/lib/cloudinaryAssets";

export function FortJesusHero({ trip }: { trip: Trip }) {
  const images = useMemo(() => {
    const cloudinary = [...CLOUDINARY_FORT_JESUS_HERO_IMAGES];
    const local = FORT_JESUS_TRIP_CONTENT.heroImages ?? [];
    const fallback = trip.image ? [trip.image] : [];
    const merged = [...cloudinary, ...local, ...fallback].filter(Boolean);
    return merged.length > 0 ? merged : ["https://res.cloudinary.com/dwqw73q3t/image/upload/v1779817369/fortjesus_fogw7k.webp"];
  }, [trip.image]);

  const whatsappUrl = buildWhatsAppUrl(
    buildBookingMessage(trip.name)
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 9500);
    return () => window.clearInterval(interval);
  }, [images.length]);

  const openRouteDrawer = () => {
    const routeEl = document.getElementById("route-fares");
    routeEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new Event("open-fort-jesus-route"));
  };

  const scrollToItinerary = () => {
    document
      .getElementById("itinerary")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="relative -mt-14 isolate overflow-hidden bg-neutral-950">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt={index === 0 ? (trip.heroImageAlt ?? trip.name) : ""}
            aria-hidden={index === 0 ? undefined : true}
            fill
            priority={index === 0}
            sizes="100vw"
            className={[
              "object-cover object-center will-change-[opacity,transform,filter]",
              "transition-[opacity,transform,filter] duration-[2400ms] ease-out",
              index === activeIndex ? "opacity-100" : "opacity-0",
              index === activeIndex
                ? "scale-[1.06] motion-safe:animate-[fortHeroDrift_18s_ease-in-out_infinite]"
                : "scale-[1.02] blur-[1.5px]",
            ].join(" ")}
          />
        ))}
      </div>

      {/* SUBTLE CONTRAST OVERLAY (non-heavy, keeps image bright) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

      <style>{`
        @keyframes fortHeroDrift {
          0% { transform: scale(1.03) translate3d(0px, 0px, 0); }
          50% { transform: scale(1.07) translate3d(-14px, 8px, 0); }
          100% { transform: scale(1.03) translate3d(0px, 0px, 0); }
        }
      `}</style>

      {/* CONTENT */}
      <Container className="relative z-20">
        <div className="flex min-h-[680px] flex-col justify-between pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/85">
            <Link
              href={ROUTES.home}
              className="transition-colors hover:text-amber-200"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-amber-200/70" />
            <Link
              href={ROUTES.trips}
              className="transition-colors hover:text-amber-200"
            >
              Experiences
            </Link>
            <ChevronRight className="h-4 w-4 text-amber-200/70" />
            <span className="text-amber-200/90">{trip.name}</span>
          </nav>

          {/* MAIN GRID */}
          <div className="grid items-end gap-10 pt-20 lg:grid-cols-[1.1fr_340px] lg:pt-28">
            {/* LEFT CONTENT */}
            <div className="max-w-3xl">
              {/* TITLE */}
              <Heading
                level="h1"
                className="text-white !font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight drop-shadow-[0_18px_55px_rgba(0,0,0,0.65)]"
              >
                {trip.seoTitle ?? trip.name}
              </Heading>

              {/* DESCRIPTION */}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                A premium coastal cruise to Fort Jesus with iconic views and time to explore Old Town.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center rounded-2xl bg-brand-blue hover:bg-blue-900 px-7 text-sm font-black text-white shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Reserve spot
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={openRouteDrawer}
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 px-7 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  View route & fares
                </button>

                <button
                  type="button"
                  onClick={scrollToItinerary}
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/12 px-7 text-sm font-bold text-white/90 hover:text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  View itinerary
                </button>
              </div>
            </div>

            {/* RIGHT BOOKING CARD */}
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] border border-white/12 bg-neutral-950/70 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

                <div className="p-8">
                  {/* PRICE */}
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/55">
                      From
                    </p>

                    <div className="mt-2 flex items-end gap-2">
                      <h2 className="text-5xl font-semibold tracking-tight text-white">
                        {formatPrice(trip.pricePerPerson)}
                      </h2>
                    </div>

                    <p className="mt-2 text-sm text-white/65">
                      Per Person
                    </p>
                  </div>

                  {/* DIVIDER */}
                  <div className="my-7 h-px bg-gradient-to-r from-white/30 to-transparent" />

                  {/* INCLUDED */}
                  <div className="space-y-4">
                    {[
                      "Return Transport",
                      "Professional Guide",
                      "Fort Entry Tickets",
                      "Bottled Water",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-brand-blue" />

                        <span className="text-sm text-white/88">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-8 space-y-3">
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-14 w-full items-center justify-center rounded-2xl bg-brand-blue hover:bg-blue-900 text-sm font-black tracking-tight text-white transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Reserve Spot

                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <button
                      type="button"
                      onClick={openRouteDrawer}
                      className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 text-sm font-semibold text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                    >
                      View route & fares
                    </button>
                  </div>
                </div>
              </div>

              {/* GLOW */}
              <div className="absolute -bottom-6 left-1/2 h-24 w-4/5 -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl" />
            </div>
          </div>

          {/* BOTTOM META STRIP */}
          <div className="mt-10 hidden lg:flex items-center gap-6 text-sm text-white/80">
            <span className="font-semibold">{formatDuration(trip.durationHours)}</span>
            <span className="h-1 w-1 rounded-full bg-white/35" />
            <span className="font-semibold">Mombasa, Kenya</span>
            <span className="h-1 w-1 rounded-full bg-white/35" />
            <span className="font-semibold">{trip.boatType}</span>
            <span className="h-1 w-1 rounded-full bg-white/35" />
            <span className="font-semibold">From {formatPrice(trip.pricePerPerson)}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
