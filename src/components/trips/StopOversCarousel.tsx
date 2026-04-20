"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { StopOver } from "@/types/trip";
import { cn } from "@/lib/utils";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type StopOversCarouselProps = {
  readonly stops: ReadonlyArray<StopOver>;
  readonly className?: string;
};

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(Boolean(mql?.matches));
    update();
    mql?.addEventListener?.("change", update);
    return () => mql?.removeEventListener?.("change", update);
  }, []);

  return reduceMotion;
}

export function StopOversCarousel({ stops, className }: StopOversCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const stopCount = stops.length;

  const stopIds = useMemo(() => stops.map((s) => s.id), [stops]);
  const [autoPaused, setAutoPaused] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Fallback active index calculation (works even if IntersectionObserver behaves oddly)
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    const update = () => {
      const items = Array.from(scroller.querySelectorAll<HTMLElement>("[data-stop-card='true']"));
      if (items.length === 0) return;

      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < items.length; i += 1) {
        const el = items[i];
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(elCenter - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      }

      setActiveIndex(bestIndex);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [stopIds]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const items = Array.from(scroller.querySelectorAll<HTMLElement>("[data-stop-card='true']"));
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = items.findIndex((el) => el === visible.target);
        if (idx >= 0) setActiveIndex(idx);
      },
      { root: scroller, threshold: [0.55, 0.7, 0.85] }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stopIds]);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const items = Array.from(scroller.querySelectorAll<HTMLElement>("[data-stop-card='true']"));
    const target = items[index];
    if (!target) return;

    const targetLeft = target.offsetLeft - (scroller.clientWidth - target.offsetWidth) / 2;
    const clampedLeft = Math.max(0, Math.min(targetLeft, scroller.scrollWidth - scroller.clientWidth));
    scroller.scrollTo({
      left: clampedLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(stopCount - 1, activeIndex + 1));

  const pauseAutoplay = () => {
    setAutoPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setAutoPaused(false), 9000);
  };

  // Only autoplay when the carousel is actually in view (prevents page auto-scroll to this section).
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.35 }
    );

    observer.observe(scroller);
    return () => observer.disconnect();
  }, [stopIds]);

  // Autoplay: gently advances one card at a time, pauses on interaction.
  useEffect(() => {
    if (reduceMotion) return;
    if (autoPaused) return;
    if (!isInView) return;
    if (stopCount <= 1) return;

    const timer = window.setInterval(() => {
      const nextIndex = activeIndex >= stopCount - 1 ? 0 : activeIndex + 1;
      scrollToIndex(nextIndex);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoPaused, isInView, reduceMotion, stopCount]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onVisibility = () => {
      if (document.visibilityState !== "visible") {
        setAutoPaused(true);
        if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
      }
    };

    const onUserIntent = () => pauseAutoplay();
    const onEnter = () => pauseAutoplay();

    document.addEventListener("visibilitychange", onVisibility);
    scroller.addEventListener("wheel", onUserIntent, { passive: true });
    scroller.addEventListener("touchstart", onUserIntent, { passive: true });
    scroller.addEventListener("pointerdown", onUserIntent, { passive: true });
    scroller.addEventListener("mouseenter", onEnter);
    scroller.addEventListener("focusin", onEnter);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      scroller.removeEventListener("wheel", onUserIntent);
      scroller.removeEventListener("touchstart", onUserIntent);
      scroller.removeEventListener("pointerdown", onUserIntent);
      scroller.removeEventListener("mouseenter", onEnter);
      scroller.removeEventListener("focusin", onEnter);
    };
  }, [stopIds]);

  return (
    <div className={cn("relative", className)}>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0B3D6B] via-[#0B3D6B]/60 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0B3D6B] via-[#0B3D6B]/60 to-transparent z-20" />

      {/* Controls (desktop) */}
      <div className="hidden sm:flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-3 z-30">
        <button
          type="button"
          onClick={prev}
          className="w-9 h-9 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 text-white/90 transition-colors disabled:opacity-40"
          aria-label="Previous stop"
          disabled={activeIndex <= 0}
        >
          <ChevronLeft className="w-4 h-4 mx-auto" />
        </button>
        <button
          type="button"
          onClick={next}
          className="w-9 h-9 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 text-white/90 transition-colors disabled:opacity-40"
          aria-label="Next stop"
          disabled={activeIndex >= stopCount - 1}
        >
          <ChevronRight className="w-4 h-4 mx-auto" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto overscroll-x-contain scrollbar-hide snap-x snap-mandatory scroll-px-4 px-1 py-1"
        aria-label="Hop-on hop-off stops"
      >
        {stops.map((stop, index) => {
          const isFinal = stop.variant === "final" || index === stops.length - 1;
          const isActive = index === activeIndex;
          return (
            <div
              key={stop.id}
              data-stop-card="true"
              className={cn(
                "snap-center flex-shrink-0 min-w-[220px] sm:min-w-[250px] rounded-2xl border p-4 sm:p-5 transition-colors",
                "bg-white/[0.06] border-white/10 hover:bg-white/[0.09]",
                isActive && "border-white/20 bg-white/[0.10]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                    Stop {index + 1}
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-white leading-tight">
                    {stop.label}
                  </p>
                </div>

                <div
                  className={cn(
                    "w-9 h-9 rounded-2xl flex items-center justify-center border",
                    isFinal
                      ? "bg-amber-500/15 border-amber-400/30"
                      : "bg-teal-500/10 border-teal-400/20"
                  )}
                  aria-hidden="true"
                >
                  {isFinal ? (
                    <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  ) : (
                    <span className="text-xs font-black text-teal-200">{index + 1}</span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div
                  className={cn(
                    "h-1.5 rounded-full flex-1",
                    isFinal ? "bg-amber-400/30" : "bg-teal-400/20"
                  )}
                />
                <span className="text-[11px] font-semibold text-white/60 tabular-nums">
                  {index + 1}/{stopCount}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {stops.map((stop, idx) => (
          <button
            key={`dot-${stop.id}`}
            type="button"
            onClick={() => scrollToIndex(idx)}
            className="p-1"
            aria-label={`Go to stop ${idx + 1}`}
          >
            <span
              className={cn(
                "block h-1 rounded-full transition-all duration-300",
                idx === activeIndex ? "w-6 bg-white/80" : "w-2 bg-white/25 hover:bg-white/40"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
