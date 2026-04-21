"use client";

import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Compass, Ship, Ticket } from "lucide-react";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";
import { EMAIL, PHONE_DISPLAY, SITE_URL } from "@/constants/contacts";
import { TripPlannerWizard } from "@/components/trips/TripPlannerWizard";

export function HopOnHopOffSection() {
  const { hopOnHopOff, stopOvers } = FORT_JESUS_TRIP_CONTENT;

  return (
    <section id="hop-on-hop-off" className="pt-8 border-t border-white/10 scroll-mt-24">
      <div className="space-y-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-300">Hop-on Hop-off</p>
          <Heading level="h2" size="xl" className="mt-2 text-white !font-bold tracking-tight">
            {hopOnHopOff.headline}
          </Heading>
          <p className="mt-2 text-neutral-300 text-sm sm:text-base max-w-3xl">
            {hopOnHopOff.subtitle}.
          </p>

          {/* Plan in 10 seconds */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
              Plan in 10 seconds
            </p>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/85 list-disc pl-5">
              <li>Board at any stop on the route</li>
              <li>Pay on board for the stops you travel</li>
              <li>
                From <span className="font-semibold text-white tabular-nums">KES 500</span>
              </li>
              <li>
                Last return by <span className="font-semibold text-white tabular-nums">5:30 PM</span>
              </li>
              <li>
                Children 5–15: <span className="font-semibold text-white">50% off</span>
              </li>
              <li>
                Under 5: <span className="font-semibold text-white">Free</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
              Route stops
            </Heading>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.04]">
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70 w-20">Stop</th>
                    <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {stopOvers.map((stop, idx) => (
                    <tr key={stop.id} className="border-t border-white/10">
                      <td className="px-4 py-3 text-white/85 font-semibold tabular-nums whitespace-nowrap">
                        {stop.variant === "final" ? "★" : idx + 1}
                      </td>
                      <td className="px-4 py-3 text-white/90">{stop.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-neutral-400">{hopOnHopOff.routePill} · {hopOnHopOff.footerLine}</p>
          </div>

          <div className="lg:col-span-6">
            <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
              Timetable
            </Heading>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
              <table className="w-full text-left text-sm">
                <tbody>
                  {hopOnHopOff.timetable.map((row) => (
                    <tr key={row.label} className="border-b border-white/10 last:border-0">
                      <td className="px-4 py-3 text-white/80">{row.label}</td>
                      <td className="px-4 py-3 text-white font-semibold tabular-nums whitespace-nowrap">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
              Pricing (one-way)
            </Heading>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.04]">
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Stops</th>
                    <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Fare</th>
                  </tr>
                </thead>
                <tbody>
                  {hopOnHopOff.pricingCards.map((card) => (
                    <tr key={card.label} className="border-t border-white/10">
                      <td className="px-4 py-3 text-white/80">{card.label}</td>
                      <td className="px-4 py-3 text-white font-semibold tabular-nums whitespace-nowrap">
                        KES {card.priceKes.toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-sm text-white/80">{hopOnHopOff.pricingNote}</p>
            <a href="#full-fares" className="inline-flex mt-2 text-sm font-semibold text-teal-300 hover:text-teal-200 transition-colors">
              View full fare table →
            </a>
          </div>

          <div className="lg:col-span-5">
            <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
              Concessions
            </Heading>
            <ul className="space-y-2 text-sm text-white/90 list-disc pl-5">
              <li>Children aged 5–15: 50% off adult fare</li>
              <li>Children under 5: Free</li>
              <li>Return tickets: available on request</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
              How it works
            </Heading>
            <ol className="space-y-2 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-teal-300 mt-0.5" />
                <span><span className="font-semibold">Choose your stop</span> — board at any of our 9 stops along the coast.</span>
              </li>
              <li className="flex items-start gap-3">
                <Ship className="w-4 h-4 text-teal-300 mt-0.5" />
                <span><span className="font-semibold">Step aboard</span> — our friendly crew will welcome you onto the boat.</span>
              </li>
              <li className="flex items-start gap-3">
                <Ticket className="w-4 h-4 text-teal-300 mt-0.5" />
                <span><span className="font-semibold">Pay on board</span> — pay only for the stops you travel.</span>
              </li>
            </ol>
          </div>

          <div className="lg:col-span-6">
            <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
              Discounts (launch)
            </Heading>
            <ul className="space-y-2 text-sm text-white/90 list-disc pl-5">
              {hopOnHopOff.discounts.map((d) => (
                <li key={d.title}>
                  <span className="font-semibold">{d.title}:</span> {d.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full fare table as its own section (keeps main view shorter) */}
        <div id="full-fares" className="scroll-mt-24">
          <Heading level="h3" size="md" className="text-white !font-semibold mb-3">
            Full fare table (Adult / Child 5–15 / Under 5)
          </Heading>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04]">
                <tr>
                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Stops</th>
                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Adult (KES)</th>
                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Child 5–15 (KES)</th>
                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.3em] text-white/70">Under 5</th>
                </tr>
              </thead>
              <tbody>
                {hopOnHopOff.fares.oneWay.map((row) => (
                  <tr
                    key={row.stops}
                    className="border-t border-white/10"
                    style={{
                      backgroundColor: ("highlight" in row && row.highlight) ? "rgba(232,160,32,0.10)" : "transparent",
                    }}
                  >
                    <td className="px-4 py-3 text-white/80">{row.stops}</td>
                    <td className="px-4 py-3 text-white/90 font-semibold tabular-nums">{row.adultKes.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3 text-white/90 font-semibold tabular-nums">{row.childKes.toLocaleString("en-US")}</td>
                    <td className="px-4 py-3 text-white/80">{row.under5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-white/80">{hopOnHopOff.fares.returnSummary}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-sm text-white/80">
          <p className="font-semibold text-white mb-2">Need help planning?</p>
          <ul className="space-y-1">
            <li><span className="font-semibold">WhatsApp:</span> {PHONE_DISPLAY}</li>
            <li><span className="font-semibold">Email:</span> {EMAIL}</li>
            <li><span className="font-semibold">Website:</span> {SITE_URL}</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
            Planner
          </p>
          <p className="mt-1 text-sm text-white/80">
            Use a guided planner to choose your route, passengers, and preferred schedule.
          </p>
          <div className="mt-4">
            <div className="w-full">
              <TripPlannerWizard tripName="Fort Jesus Hop-On Hop-Off" stops={stopOvers} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
