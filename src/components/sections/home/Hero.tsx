"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Landmark, Shield, Clock, Star } from "lucide-react";
import { ASSETS } from "@/config/assets";
import { cn } from "@/lib/utils";

const heroServices = [
  { title: "Boat Trips", href: "/trips", icon: "🚤" },
  { title: "Private Charter", href: "/contact", icon: "⚓" },
  { title: "Fort Jesus", href: "/trips/fort-jesus-trip", icon: "🏰" },
];

export function Hero() {
  const stats = [
    { icon: Shield, label: "Certified Safe", value: "100%" },
    { icon: Clock, label: "20+ Years", value: "Experience" },
    { icon: Star, label: "4.8 Rating", value: "from 124+" },
  ];

  const playlist = ASSETS.marketing.hero.playlist;
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const motionMql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mobileMql = window.matchMedia?.("(max-width: 640px)");

    const updateAll = () => {
      setReduceMotion(Boolean(motionMql?.matches));
      setIsMobile(Boolean(mobileMql?.matches));

      const navWithConnection = navigator as Navigator & {
        connection?: { saveData?: boolean };
      };
      setSaveData(Boolean(navWithConnection.connection?.saveData));
    };

    updateAll();
    motionMql?.addEventListener?.("change", updateAll);
    mobileMql?.addEventListener?.("change", updateAll);
    return () => {
      motionMql?.removeEventListener?.("change", updateAll);
      mobileMql?.removeEventListener?.("change", updateAll);
    };
  }, []);

  const backgroundImages = useMemo(() => {
    const posters = playlist.map((item) => item.poster).filter(Boolean);
    const fallback = "/images/hero/coastal-poster.jpg";
    return posters.length > 0 ? posters : [fallback];
  }, [playlist]);

  const canPlayVideo = !reduceMotion && !saveData && !isMobile && playlist.length > 0;
  const activeVideo = playlist[activeIndex % Math.max(playlist.length, 1)];

  const enableAnimatedBackground =
    !reduceMotion && !saveData && !isMobile && backgroundImages.length > 1 && !isVideoPlaying;

  useEffect(() => {
    if (!enableAnimatedBackground) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 16000);
    return () => window.clearInterval(timer);
  }, [backgroundImages.length, enableAnimatedBackground]);

  return (
    <section className="relative min-h-[100svh] sm:min-h-screen w-full overflow-hidden flex flex-col justify-end sm:justify-center bg-black">
      {/* 1. Calm Background Layer (still images; optional video on user action) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          {backgroundImages.map((src, idx) => (
            <div
              key={src}
              className={cn(
                "absolute inset-0 bg-cover scale-100 sm:scale-[1.03] transition-opacity duration-[1800ms] ease-in-out bg-[position:center_25%] sm:bg-center",
                idx === (activeIndex % backgroundImages.length)
                  ? "opacity-55"
                  : "opacity-0"
              )}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>

        {canPlayVideo && isVideoPlaying && activeVideo?.src && (
          <video
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={activeVideo.poster}
            className="absolute inset-0 h-full w-full object-cover opacity-55 scale-[1.03] transition-opacity duration-700"
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src={activeVideo.src} type="video/mp4" />
          </video>
        )}
      </div>

      {/* 2. Atmospheric Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(56,189,248,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(245,158,11,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 [background:linear-gradient(110deg,rgba(255,255,255,0.10),rgba(255,255,255,0)_38%,rgba(255,255,255,0.06))] opacity-45" />
      </div>

      {/* 3. Content Layer */}
      <Container className="relative z-20 pt-10 sm:pt-16 lg:pt-24 pb-24 sm:pb-28">
        <div className="text-white max-w-2xl lg:max-w-3xl mx-auto text-center sm:text-left">
          {/* Subtle contrast backdrop for text */}
          <div className="absolute -inset-10 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-2xl shadow-black/30 px-6 py-7 sm:px-9 sm:py-9 lg:px-12 lg:py-10">
            <div className="mb-2 sm:mb-3 flex items-center justify-center sm:justify-start gap-2 animate-[fade-in-right_1.2s_ease-out_forwards]">
              <div className="h-px w-4 sm:w-6 md:w-8 bg-teal-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">
                Exclusive Maritime Journeys
              </span>
            </div>

            <Heading level="h1" size="4xl" className="mb-3 sm:mb-4 text-white !leading-[1.1] tracking-tight">
              <span className="block overflow-hidden">
                <span className="block animate-[slide-up_1s_ease-out_0.2s_forwards] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Discover the <span className="italic font-light text-neutral-400">Hidden</span>
                </span>
              </span>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="block animate-[slide-up_1s_ease-out_0.4s_forwards] text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Magic of <span className="text-teal-200 font-black">
                    Blue Pineapple
                  </span>
                </span>
              </span>
            </Heading>

            <p className="mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base text-neutral-300/80 leading-relaxed max-w-xl mx-auto sm:mx-0 animate-[fade-in_1.5s_ease-out_0.8s_forwards] opacity-0 px-2 sm:px-0">
              Historic explorations and premium charters on the Indian Ocean.
            </p>

            {/* Featured CTA - Fort Jesus */}
            <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-center sm:justify-start gap-3 animate-[fade-in_1.5s_ease-out_1s_forwards] opacity-0">
              <Link 
                href="/trips/fort-jesus-trip"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 group"
              >
                <Landmark className="w-4 h-4" />
                <span>Experience Fort Jesus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {canPlayVideo && (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying((prev) => !prev)}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 text-white/90 transition-colors"
                  aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
                >
                  <span className="text-base leading-none">{isVideoPlaying ? "⏸" : "▶"}</span>
                </button>
              )}
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8 animate-[fade-in_1.5s_ease-out_1.2s_forwards] opacity-0">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                  <div>
                    <span className="text-white font-semibold text-xs">{stat.value}</span>
                    <span className="text-neutral-400 text-[10px] ml-1">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Bottom Service Links */}
      <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 z-20">
        <Container>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 animate-[fade-in_1.5s_ease-out_1.5s_forwards] opacity-0">
            {heroServices.map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-lg text-white text-[10px] sm:text-xs font-medium transition-all duration-300"
              >
                <span>{service.icon}</span>
                <span>{service.title}</span>
                <ArrowRight className="w-2.5 h-2.5 opacity-50" />
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
