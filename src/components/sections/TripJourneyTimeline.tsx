"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import type { JourneyStop, JourneyStopIcon } from "@/types/trip";

interface TripJourneyTimelineProps {
  stops: readonly JourneyStop[];
  returnNote: string;
}

const JOURNEY_STOP_ICONS: Record<JourneyStopIcon, React.ReactNode> = {
  depart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  scenic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  marine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
    </svg>
  ),
  heritage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  ),
  explore: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
};

function JourneyStopRow({ 
  stop, 
  isOpen, 
  isLast,
  onToggle 
}: { 
  stop: JourneyStop; 
  isOpen: boolean; 
  isLast: boolean;
  onToggle: () => void;
}) {
  const isHighlight = stop.variant === "highlight";
  const isFinal = stop.variant === "final";
  
  const iconBgClass = isFinal 
    ? "bg-amber-500/20 border-amber-400 text-amber-400" 
    : isOpen || isHighlight
      ? "bg-teal-500/20 border-teal-400 text-teal-400"
      : "bg-white/5 border-white/20 text-neutral-400";

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Left column - icon + spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-10 sm:w-12">
        <button
          onClick={onToggle}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${iconBgClass}`}
          aria-label={isOpen ? `Collapse ${stop.label}` : `Expand ${stop.label}`}
        >
          {JOURNEY_STOP_ICONS[stop.icon]}
        </button>
        {!isLast && (
          <div className={`w-0.5 flex-1 my-2 transition-colors ${isOpen ? "bg-teal-500" : "bg-neutral-700"}`} />
        )}
      </div>

      {/* Right column - content */}
      <div className="flex-1 pb-4 sm:pb-6">
        <button
          onClick={onToggle}
          className={`w-full text-left rounded-xl p-3 sm:p-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
            isOpen 
              ? "bg-teal-500/5 sm:bg-transparent" 
              : "hover:bg-white/5 active:bg-white/10"
          }`}
          aria-expanded={isOpen}
        >
          <div className="flex items-center justify-between gap-2 min-h-[44px]">
            <span className={`text-sm sm:text-[15px] font-medium transition-colors ${isOpen ? "text-teal-400" : "text-white"}`}>
              {stop.label}
            </span>
            <span className={`flex-shrink-0 p-1 rounded-full transition-all duration-200 ${isOpen ? "bg-teal-500 text-white" : "bg-white/10 text-neutral-400"}`}>
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
          
          {/* Tags - only show when collapsed to keep it clean */}
          {!isOpen && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {stop.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-white/10 text-neutral-400 text-[10px] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </button>

        {/* Expandable detail */}
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 opacity-100 mt-2 sm:mt-3" : "max-h-0 opacity-0"}`}>
          <div className="pt-2 sm:pt-3 border-t border-white/10">
            {/* Show tags when expanded too */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {stop.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-white/10 text-neutral-400 text-[10px] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {stop.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TripJourneyTimeline({ stops, returnNote }: TripJourneyTimelineProps) {
  const [openStopId, setOpenStopId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenStopId(openStopId === id ? null : id);
  };

  return (
    <section>
      <div className="mb-2">
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Your route</span>
      </div>
      <Heading level="h2" size="xl" className="mb-2 !font-bold tracking-tight text-white">
        Journey highlights
      </Heading>
      <p className="text-sm text-neutral-400 mb-6 flex items-center gap-2">
        <span className="hidden sm:inline">Tap any stop to explore</span>
        <span className="sm:hidden">Tap to explore each stop</span>
        <svg className="w-4 h-4 text-teal-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      </p>

      {/* Timeline */}
      <div className="space-y-0">
        {stops.map((stop, index) => (
          <JourneyStopRow
            key={stop.id}
            stop={stop}
            isOpen={openStopId === stop.id}
            isLast={index === stops.length - 1}
            onToggle={() => handleToggle(stop.id)}
          />
        ))}
      </div>

      {/* Return note */}
      <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl flex items-start gap-3">
        <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 4v6h6M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
        <p className="text-sm text-neutral-600">{returnNote}</p>
      </div>
    </section>
  );
}
