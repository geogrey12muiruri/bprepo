import { Heading } from "@/components/ui/Heading";
import type { StopOver } from "@/types/trip";
import { Star } from "lucide-react";

type StopOversStripProps = {
  readonly stops: ReadonlyArray<StopOver>;
};

export function StopOversStrip({ stops }: StopOversStripProps) {
  return (
    <section>
      <div className="mb-1">
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
          Hop-on hop-off route
        </span>
      </div>

      <Heading level="h2" size="xl" className="mb-1 !font-bold tracking-tight text-white">
        Stop overs
      </Heading>

      <p className="text-xs text-neutral-500 mb-7">
        {stops.length} stop{stops.length === 1 ? "" : "s"} from Mtwapa Beach to Fort Jesus
      </p>

      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-neutral-900 via-neutral-900/70 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-neutral-900 via-neutral-900/70 to-transparent z-20" />

          <div className="-mx-2 px-2 sm:mx-0 sm:px-0 overflow-x-auto overscroll-x-contain scrollbar-hide">
            <div className="relative flex items-start gap-6 sm:gap-8 min-w-max pr-6 sm:pr-8 py-4">
              {/* Animated route line (subtle “movement” cue) */}
              <div className="pointer-events-none absolute left-0 right-0 top-[28px] h-px route-dash motion-reduce:animate-none" />

              {stops.map((stop, index) => {
                const isFinal = stop.variant === "final" || index === stops.length - 1;
                const markerClasses = isFinal
                  ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30"
                  : "bg-teal-500/10 text-teal-400 ring-1 ring-teal-400/25";

                return (
                  <div
                    key={stop.id}
                    className="relative z-10 flex flex-col items-center text-center w-[118px] sm:w-[132px] flex-shrink-0 snap-center"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black ${markerClasses}`}>
                      {isFinal ? (
                        <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <p className="mt-2 text-[11px] sm:text-xs font-semibold text-white/90 leading-snug">
                      {stop.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
