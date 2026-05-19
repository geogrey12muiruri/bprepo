"use client";

import { Heading } from "@/components/ui/Heading";
import type { JourneyStop, JourneyStopIcon } from "@/types/trip";

interface TripJourneyTimelineProps {
  stops: readonly JourneyStop[];
  returnNote: string;
  variant?: "dark" | "light";
}

const STOP_ICONS: Record<JourneyStopIcon, React.ReactNode> = {
  depart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l2 2" />
    </svg>
  ),
  scenic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  marine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 10h18M3 14h18M7 6l5-3 5 3M7 18l5 3 5-3" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    </svg>
  ),
  heritage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  ),
  explore: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
};

function StopCard({
  stop,
  index,
  total,
}: {
  stop: JourneyStop;
  index: number;
  total: number;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const isFinal = stop.variant === "final";

  const accentColor = isFinal
    ? "text-amber-400 border-amber-400/40 bg-amber-400/5"
    : isFirst
    ? "text-teal-300 border-teal-400/50 bg-teal-400/5"
    : "text-teal-400 border-teal-400/25 bg-teal-400/[0.03]";

  const numberColor = isFinal
    ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30"
    : "bg-teal-500/10 text-teal-400 ring-1 ring-teal-400/25";

  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* Left: number pill + connector line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${numberColor}`}
        >
          {index + 1}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-teal-500/30 to-teal-500/05 min-h-[24px]" />
        )}
      </div>

      {/* Right: content card */}
      <div
        className={`flex-1 rounded-xl border px-4 py-3.5 mb-3 transition-colors duration-200 hover:border-teal-400/40 ${accentColor}`}
      >
        {/* Icon + label row */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="opacity-70">{STOP_ICONS[stop.icon]}</span>
          <span className="text-[13px] sm:text-sm font-semibold tracking-tight text-white">
            {stop.label}
          </span>
        </div>

        {/* Tags */}
        {stop.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {stop.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/5 text-neutral-500 text-[9px] font-medium uppercase tracking-wider rounded-full border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Detail text — always visible, no accordion */}
        <p className="text-[12px] sm:text-[13px] text-neutral-400 leading-relaxed">
          {stop.detail}
        </p>
      </div>
    </div>
  );
}

export function TripJourneyTimeline({ stops, returnNote }: TripJourneyTimelineProps) {
  return (
    <section>
      {/* Section label */}
      <div className="mb-1">
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
          Your route
        </span>
      </div>

      <Heading level="h2" size="xl" className="mb-1 !font-bold tracking-tight text-white">
        Journey highlights
      </Heading>

      <p className="text-xs text-neutral-500 mb-7 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {stops.length} stops along the way
      </p>

      {/* Timeline */}
      <div>
        {stops.map((stop, index) => (
          <StopCard
            key={stop.id}
            stop={stop}
            index={index}
            total={stops.length}
          />
        ))}
      </div>

      {/* Return note */}
      <div className="mt-3 flex items-start gap-3 px-4 py-3 bg-white/[0.03] border border-white/8 rounded-xl">
        <svg
          className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 4v6h6M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
        <p className="text-xs text-neutral-500">{returnNote}</p>
      </div>
    </section>
  );
}
