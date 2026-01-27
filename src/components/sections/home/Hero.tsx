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
          className="h-full w-full object-cover opacity-60 scale-105 animate-[slow-zoom_20s_ease-in-out_infinite]"
          poster="/images/hero/IMG_5880-poster.jpg"
        >
          <source src="/videos/hero/IMG_5880.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Atmospheric Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Radial vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        {/* Left-weighted dark gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        {/* Bottom-weighted shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* 3. Content Layer */}
      <Container className="relative z-20">
        <div className="max-w-4xl text-white">
          <div className="mb-6 flex items-center gap-3 animate-[fade-in-down_1s_ease-out_forwards]">
            <div className="h-px w-12 bg-teal-500" />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-teal-400">
              Premium Coastal Experiences
            </span>
          </div>

          <Heading level="h1" size="3xl" className="mb-8 text-white !leading-[1.1] tracking-tighter animate-[fade-in-up_1s_ease-out_0.2s_forwards] opacity-0">
            Discover the <span className="relative inline-block">
              <span className="relative z-10 italic font-light">Unseen</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-teal-500/20 -z-10" />
            </span> Magic of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-black">
              BluePineapple
            </span>
          </Heading>

          <p className="mb-12 text-xl md:text-2xl text-neutral-300/90 leading-relaxed max-w-2xl animate-[fade-in-up_1s_ease-out_0.4s_forwards] opacity-0">
            From historic marine explorations to premium private charters.
            Step into the <span className="text-white font-bold">Indian Ocean</span> like never before.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row items-center animate-[fade-in-up_1s_ease-out_0.6s_forwards] opacity-0">
            <Button
              size="lg"
              className="px-12 h-16 text-lg rounded-2xl font-black shadow-2xl shadow-teal-500/20 active:scale-95 transition-all"
              onClick={() => window.location.href = ROUTES.trips}
            >
              Explore Experiences
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="px-12 h-16 text-lg bg-white/5 hover:bg-white/10 border-white/10 text-white backdrop-blur-md rounded-2xl font-bold transition-all"
              onClick={() => window.location.href = ROUTES.contact}
            >
              Private Charter
            </Button>
          </div>
        </div>
      </Container>

      {/* 4. Interactive Elements Layer */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-[fade-in_1s_ease-out_1s_forwards] opacity-0">
        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Scroll to Explore</div>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-teal-500 rounded-full animate-[scroll-bounce_2s_infinite]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes scroll-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
          40% { transform: translate(-50%, 6px); }
          60% { transform: translate(-50%, 3px); }
        }
      `}</style>
    </section>
  );
}
