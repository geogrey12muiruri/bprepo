"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { Star, Clock, Ship } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Trip } from "@/types/trip";
import { formatDuration } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";
import { cn } from "@/lib/utils";

export function QuickFactsStrip({ trip }: { trip: Trip }) {
  const departureTimes = trip.departureTimes ? trip.departureTimes.split(",").map(t => t.trim()) : [];
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : trip.boatType === "Glass-bottomed Boat" ? "hunky-dory" : null;
  const isFortJesus = trip.slug === "fort-jesus-trip" && departureTimes.length > 0;

  const facts = [
    { icon: Clock, label: "Duration", value: formatDuration(trip.durationHours) },
  ];

  if (trip.rating) {
    facts.unshift({ icon: Star, label: "Rating", value: `${trip.rating} (${trip.reviewCount || "new"})` });
  }

  // ── Open planner + scroll to it ──────────────────────────────────────────
  const handleTimeClick = useCallback((time: string) => {
    // Fire custom event for TripPlannerWizard
    window.dispatchEvent(
      new CustomEvent("open-trip-planner", {
        detail: { time },
      })
    );
    // Scroll the section into view after two frames so the modal has opened
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const anchor = document.getElementById("plan-trip-anchor");
        anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  return (
    <div className="bg-white border-b border-neutral-200 py-5 sm:py-6">
      <Container>
        {/* Mobile: Stack facts vertically, desktop: horizontal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6 md:gap-10">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                <fact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">{fact.label}</p>
                <p className="text-sm font-bold text-neutral-950 tabular-nums">{fact.value}</p>
              </div>
            </div>
          ))}
          
          {/* Vessel as link */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0">
              <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Vessel</p>
              {vesselSlug ? (
                <Link href={`${ROUTES.boats}/${vesselSlug}`} className="text-sm font-bold text-brand-blue hover:text-brand-blue transition-colors">
                  {trip.boatType}
                </Link>
              ) : (
                <p className="text-sm font-bold text-neutral-950">{trip.boatType}</p>
              )}
            </div>
          </div>
          
           {/* Departure Times — clickable chips that scroll to the planner */}
          {departureTimes.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-2">Departure Times</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {departureTimes.map((time) => (
                     <button
                       key={time}
                       type="button"
                       onClick={() => handleTimeClick(time)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-full text-xs font-bold tabular-nums transition-all duration-200",
                        isFortJesus
                          ? "bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 text-brand-blue hover:shadow-md hover:shadow-brand-blue/10 active:scale-[0.96]"
                          : "bg-neutral-100 border border-neutral-200 text-neutral-800 hover:bg-neutral-200 active:scale-[0.96]"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
