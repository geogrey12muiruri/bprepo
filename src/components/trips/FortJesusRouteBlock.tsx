"use client";

import { useEffect, useMemo, useState } from "react";
import { Ticket, Clock, MapPin, ArrowRight, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { HopOnHopOffSection } from "@/components/trips/HopOnHopOffSection";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";

export function FortJesusRouteBlock() {
  const [open, setOpen] = useState(false);
  const { hopOnHopOff, stopOvers } = FORT_JESUS_TRIP_CONTENT;

  const openDrawer = () => setOpen(true);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-fort-jesus-route", handler);
    return () => window.removeEventListener("open-fort-jesus-route", handler);
  }, []);

  const pricingHighlights = useMemo(() => hopOnHopOff.pricingCards.slice(0, 4), [hopOnHopOff.pricingCards]);
  const timetablePreview = useMemo(() => hopOnHopOff.timetable.slice(0, 3), [hopOnHopOff.timetable]);

  return (
    <section
      id="route-fares"
      className="relative overflow-hidden border-y border-neutral-200 bg-gradient-to-b from-white via-sky-50/70 to-white py-10 sm:py-12 md:py-14 scroll-mt-24"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-sky-200/40 blur-3xl" />

      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-brand-blue">
              Route & fares
            </p>
            <Heading level="h2" size="xl" className="mt-3 !font-bold tracking-tight text-neutral-950">
              {hopOnHopOff.headline}
            </Heading>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              {hopOnHopOff.subtitle}. See stops, timetable, and live fare estimate — without scrolling a long page.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-brand-blue" strokeWidth={1.8} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                    Quick fares
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pricingHighlights.map((card) => (
                    <span
                      key={card.label}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-800"
                    >
                      <span className="text-neutral-600">{card.label}</span>
                      <span className="font-black text-brand-blue tabular-nums">KES {card.priceKes.toLocaleString()}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-neutral-500">{hopOnHopOff.pricingNote}</p>
              </div>

              <div className="rounded-2xl border border-neutral-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-blue" strokeWidth={1.8} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                    Timetable preview
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {timetablePreview.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-2 last:border-b-0 last:pb-0">
                      <span className="text-sm font-medium text-neutral-800">{row.label}</span>
                      <span className="text-sm font-black text-neutral-950 tabular-nums">{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {stopOvers.length} stops along the coast
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-200/80 bg-white/75 p-6 shadow-sm backdrop-blur-sm">
              <Heading level="h3" size="md" className="!font-bold tracking-tight text-neutral-950">
                Open the full planner
              </Heading>
              <p className="mt-2 text-sm text-neutral-700">
                Get the full stop list, fare table, route planner, and booking links in a focused panel.
              </p>
              <Button
                onClick={openDrawer}
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-blue px-5 text-sm font-bold text-white transition-colors hover:bg-blue-900"
              >
                View full route & fares <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <Sheet isOpen={open} onClose={() => setOpen(false)} side="right">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">Fort Jesus</p>
            <p className="text-sm font-bold text-neutral-950">Route, fares & planner</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <HopOnHopOffSection />
        </div>
      </Sheet>
    </section>
  );
}
