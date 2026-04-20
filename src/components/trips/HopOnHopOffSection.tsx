"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { Compass, Ship, Ticket, Clock, Info } from "lucide-react";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";
import { StopOversCarousel } from "@/components/trips/StopOversCarousel";

const PALETTE = {
  navy: "#0B3D6B",
  gold: "#E8A020",
  teal: "#1A6B9A",
  lightBlue: "#D6E8F7",
  paleBlue: "#EEF5FB",
};

export function HopOnHopOffSection() {
  const { hopOnHopOff, stopOvers } = FORT_JESUS_TRIP_CONTENT;

  return (
    <section id="hop-on-hop-off" className="pt-8 border-t border-white/10 scroll-mt-24">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/40 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: PALETTE.gold }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.3em]"
              style={{ color: "#7EC8E3" }}
            >
              Hop-On Hop-Off Boat
            </span>
          </div>

          <Heading level="h2" size="xl" className="text-white !font-bold tracking-tight">
            {hopOnHopOff.headline}
          </Heading>
          <p className="mt-2 text-neutral-300 text-sm sm:text-base max-w-2xl">
            {hopOnHopOff.subtitle}. Pay only for the stops you travel — like a water matatu along the Mombasa North Coast.
          </p>
        </div>

        {/* Route strip */}
        <div className="px-6 sm:px-8 md:px-10 pb-6">
          {/* Cloudflare-style horizontal block carousel */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-lg shadow-black/30">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <div className="h-px w-7" style={{ backgroundColor: PALETTE.gold }} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/75">
                  Route stops
                </span>
              </div>
              <span
                className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#FFFFFF" }}
              >
                {hopOnHopOff.routePill}
              </span>
            </div>

            <div className="bg-[#0B3D6B] p-3 sm:p-4">
              <StopOversCarousel stops={stopOvers} />
            </div>
          </div>
        </div>

        {/* Pricing + concessions + timetable */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 gap-10">
            {/* Pricing cards */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <Heading level="h3" size="md" className="text-white !font-semibold">
                  Simple, pay-per-stops pricing
                </Heading>
                <span className="text-xs text-neutral-400 hidden sm:block">{hopOnHopOff.footerLine}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hopOnHopOff.pricingCards.map((card) => {
                  const isFull = "variant" in card && card.variant === "full";
                  return (
                    <div
                      key={card.label}
                      className={cn(
                        "rounded-2xl border p-4",
                        isFull ? "text-white" : "bg-white"
                      )}
                      style={{
                        backgroundColor: isFull ? PALETTE.navy : "#FFFFFF",
                        borderColor: isFull ? "rgba(255,255,255,0.18)" : "rgba(11,61,107,0.20)",
                      }}
                    >
                      <p
                        className="text-[11px] font-black uppercase tracking-wider"
                        style={{ color: isFull ? "#7EC8E3" : PALETTE.teal }}
                      >
                        {card.label}
                      </p>
                      <p
                        className="mt-1 text-xl sm:text-2xl font-black"
                        style={{ color: isFull ? "#F7C430" : PALETTE.navy }}
                      >
                        KES {card.priceKes.toLocaleString("en-US")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-3 text-xs" style={{ color: "#7EC8E3" }}>
                {hopOnHopOff.pricingNote}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Concessions */}
              <div className="lg:col-span-5">
                <Heading level="h3" size="md" className="text-white !font-semibold mb-4">
                  Concessions
                </Heading>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hopOnHopOff.concessions.map((badge) => (
                    <div
                      key={badge.title}
                      className="rounded-2xl border p-4"
                      style={{
                        backgroundColor: badge.tone === "teal" ? "rgba(225,245,238,0.10)" : "rgba(255,248,231,0.08)",
                        borderColor: badge.tone === "teal" ? "rgba(20,184,166,0.25)" : "rgba(232,160,32,0.25)",
                      }}
                    >
                      <p
                        className="text-xs font-black uppercase tracking-widest"
                        style={{ color: badge.tone === "teal" ? "#7EC8E3" : "#F7C430" }}
                      >
                        {badge.title}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white/90">{badge.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timetable */}
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Heading level="h3" size="md" className="text-white !font-semibold">
                    Timetable
                  </Heading>
                  <Clock className="w-4 h-4 text-teal-300" />
                </div>

                {/* Timetable card: static container, animated internals */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30">
                  {/* Beige background */}
                  <div className="absolute inset-0" style={{ backgroundColor: "#F3E7D8" }} />
                  <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_20%_15%,rgba(232,160,32,0.14),transparent_55%)]" />
                  <div className="absolute inset-0 opacity-55 [background:radial-gradient(circle_at_85%_80%,rgba(26,107,154,0.10),transparent_55%)]" />

                  <div className="relative p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-9 h-9 rounded-2xl flex items-center justify-center border"
                          style={{ backgroundColor: "rgba(11,61,107,0.06)", borderColor: "rgba(11,61,107,0.16)" }}
                        >
                          <Clock className="w-4 h-4" style={{ color: PALETTE.navy }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: PALETTE.navy }}>
                            TIMETABLE
                          </p>
                          <div className="mt-1 h-1 w-20 rounded-full bg-[#0B3D6B]/20 overflow-hidden">
                            <div className="h-full w-full rounded-full bg-[#0B3D6B]/60 bp-underline" />
                          </div>
                          <p className="mt-2 text-sm font-semibold" style={{ color: "#0B3D6B" }}>
                            Daily coastal route
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: PALETTE.teal }}>
                        Departs daily
                      </span>
                    </div>

                    <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white/40">
                      {hopOnHopOff.timetable.map((row, idx) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between gap-4 px-4 py-3"
                          style={{
                            backgroundColor: idx % 2 === 0 ? "rgba(255,255,255,0.55)" : "rgba(238,245,251,0.45)",
                          }}
                        >
                          <div className="min-w-0 flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2">
                              <span
                                className={cn(
                                  "w-2.5 h-2.5 rounded-full",
                                  idx === 0 ? "bp-pulse" : ""
                                )}
                                style={{
                                  backgroundColor: idx === 0 ? PALETTE.gold : "rgba(11,61,107,0.35)",
                                }}
                                aria-hidden="true"
                              />
                              <span className="text-[11px] font-black tabular-nums" style={{ color: "rgba(11,61,107,0.75)" }}>
                                {idx + 1}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm font-semibold truncate" style={{ color: PALETTE.navy }}>
                              {row.label}
                            </span>
                          </div>

                          {/* dotted leader (desktop-ish) */}
                          <span className="hidden sm:block flex-1 h-px mx-4 opacity-60 [background:repeating-linear-gradient(90deg,rgba(11,61,107,0.35)_0_4px,transparent_4px_8px)]" />

                          <span className="text-xs sm:text-sm font-black tabular-nums" style={{ color: PALETTE.teal }}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-xs" style={{ color: "rgba(11,61,107,0.75)" }}>
                      Multiple runs until <span className="font-semibold" style={{ color: PALETTE.navy }}>5:30 PM</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works + fares */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <Heading level="h3" size="md" className="text-white !font-semibold mb-4">
                  How it works
                </Heading>
                <div className="space-y-3">
                  {[
                    { icon: Compass, ...hopOnHopOff.howItWorks[0] },
                    { icon: Ship, ...hopOnHopOff.howItWorks[1] },
                    { icon: Ticket, ...hopOnHopOff.howItWorks[2] },
                  ].map((step) => (
                    <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/5">
                        <step.icon className="w-4 h-4 text-teal-200" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{step.title}</p>
                        <p className="mt-0.5 text-xs text-neutral-300">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-teal-400/20 bg-teal-500/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-teal-200" />
                    <p className="text-xs font-black uppercase tracking-widest text-teal-200">Launch discounts</p>
                  </div>
                  <ul className="space-y-1.5">
                    {hopOnHopOff.discounts.map((d) => (
                      <li key={d.title} className="text-xs text-white/90">
                        <span className="font-semibold">{d.title}:</span> <span className="text-white/80">{d.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Heading level="h3" size="md" className="text-white !font-semibold mb-4">
                  Full fare table
                </Heading>

                {/* Keep the full table collapsed by default (no interaction required). */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white/90">One-way fares (preview)</p>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Under 5 travels free · Children 5–15 pay 50% of adult fare
                    </p>
                  </div>

                  <div className="px-4 pb-4 pt-3">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-separate border-spacing-0">
                        <thead>
                          <tr>
                            {["Stops", "Adult (KES)", "Child 5–15 (KES)", "Under 5"].map((h) => (
                              <th
                                key={h}
                                className="px-3 py-2 font-black uppercase tracking-wider"
                                style={{
                                  backgroundColor: PALETTE.navy,
                                  color: "#FFFFFF",
                                }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ...hopOnHopOff.fares.oneWay.slice(0, 4),
                            { stops: "…", adultKes: "…", childKes: "…", under5: "…" } as const,
                            hopOnHopOff.fares.oneWay[hopOnHopOff.fares.oneWay.length - 1],
                          ].map((row, idx) => {
                            const highlight = typeof row === "object" && row && "highlight" in row && Boolean((row as { highlight?: boolean }).highlight);
                            const isDots = row.stops === "…";
                            const isLast = !isDots && typeof row.stops === "number" && row.stops === 8;
                            return (
                              <tr
                                // eslint-disable-next-line react/no-array-index-key
                                key={`${row.stops}-${idx}`}
                                style={{
                                  backgroundColor: highlight
                                    ? "rgba(232,160,32,0.14)"
                                    : (idx % 2 === 0 ? "rgba(238,245,251,0.10)" : "transparent"),
                                }}
                              >
                                <td className={cn("px-3 py-2 font-black", isDots ? "text-white/50" : "text-white/90")}>
                                  {row.stops}
                                </td>
                                <td className={cn("px-3 py-2", isDots ? "text-white/35" : "text-white/80", isLast && "font-semibold")}>
                                  {typeof row.adultKes === "number" ? row.adultKes.toLocaleString("en-US") : row.adultKes}
                                </td>
                                <td className={cn("px-3 py-2", isDots ? "text-white/35" : "text-white/80", isLast && "font-semibold")}>
                                  {typeof row.childKes === "number" ? row.childKes.toLocaleString("en-US") : row.childKes}
                                </td>
                                <td className={cn("px-3 py-2", isDots ? "text-white/35" : "text-white/80")}>
                                  {row.under5}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-3 text-xs text-neutral-300">{hopOnHopOff.fares.returnSummary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
