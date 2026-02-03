"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center bg-black">
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-50 scale-105 animate-[slow-zoom_25s_ease-in-out_infinite]"
          poster="/images/hero/IMG_5880-poster.jpg"
        >
          <source src="/videos/hero/IMG_5880.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Atmospheric Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* 3. Content Layer */}
      <Container className="relative z-20">
        <div className="max-w-4xl text-white">
          {/* Subtle contrast backdrop for text */}
          <div className="absolute -inset-10 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative">
            <div className="mb-6 flex items-center gap-3 animate-[fade-in-right_1.2s_ease-out_forwards]">
              <div className="h-px w-8 md:w-12 bg-teal-500" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-teal-400">
                Exclusive Maritime Journeys
              </span>
            </div>

            <Heading level="h1" size="3xl" className="mb-8 text-white !leading-[1.1] tracking-tight md:tracking-tighter">
              <span className="block overflow-hidden">
                <span className="block animate-[slide-up_1s_ease-out_0.2s_forwards] text-4xl sm:text-5xl md:text-7xl">
                  Discover the <span className="italic font-light text-neutral-400">Hidden</span>
                </span>
              </span>
              <span className="block overflow-hidden py-1 md:py-2">
                <span className="block animate-[slide-up_1s_ease-out_0.4s_forwards] text-4xl sm:text-5xl md:text-7xl">
                  Magic of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-100 to-blue-400 font-black animate-[shimmer_3s_infinite_linear] bg-[length:200%_auto]">
                    Blue Pineapple
                  </span>
                </span>
              </span>
            </Heading>

            <p className="mb-10 text-lg md:text-2xl text-neutral-300/80 leading-relaxed max-w-xl animate-[fade-in_1.5s_ease-out_0.8s_forwards] opacity-0">
              The Indian Ocean, defined by your <span className="text-white border-b border-teal-500/30">curiosity</span>.
              Historic explorations and premium charters combined.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row items-stretch sm:items-center animate-[fade-in_1s_ease-out_1.2s_forwards] opacity-0">
              <Button
                size="lg"
                className="px-10 h-14 md:h-16 text-base md:text-lg rounded-2xl font-black shadow-2xl shadow-teal-500/10 active:scale-95 transition-all"
                onClick={() => window.location.href = ROUTES.trips}
              >
                Start Exploring
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="px-10 h-14 md:h-16 text-base md:text-lg bg-white/5 hover:bg-white/10 border-white/10 text-white backdrop-blur-md rounded-2xl font-bold transition-all"
                onClick={() => window.location.href = ROUTES.contact}
              >
                Charter A Vessel
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Interactive Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 animate-[fade-in_1s_ease-out_2s_forwards] opacity-0">
        <div className="w-[1px] h-12 bg-gradient-to-b from-teal-500/50 to-transparent animate-[scroll-line_2s_infinite]" />
      </div>
    </section>
  );
}
