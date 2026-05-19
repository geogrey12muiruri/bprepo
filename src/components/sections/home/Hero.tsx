"use client";

import React, { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Landmark, Shield, Clock, Star, type LucideIcon } from "lucide-react";
import { ASSETS } from "@/config/assets";
import { cn } from "@/lib/utils";

type HeroChip = { readonly title: string; readonly href: string; readonly icon?: string };

type HeroStat = { readonly icon: LucideIcon; readonly label: string; readonly value: string };

const heroServices: readonly HeroChip[] = [
  { title: "Boat Trips", href: "/trips", icon: "🚤" },
  { title: "Private Charter", href: "/contact", icon: "⚓" },
  { title: "Fort Jesus", href: "/trips/fort-jesus-trip", icon: "🏰" },
];

const STATS: readonly HeroStat[] = [
  { icon: Shield, label: "Certified Safe", value: "100%" },
  { icon: Clock, label: "20+ Years", value: "Experience" },
  { icon: Star, label: "4.8 Rating", value: "from 124+" },
];

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
};

function getPerformanceBudgetSnapshot() {
  if (typeof window === "undefined") return true;

  const navWithConnection = navigator as Navigator & {
    connection?: NavigatorConnection;
  };
  const connection = navWithConnection.connection;
  const isSlowConnection =
    Boolean(connection?.saveData) ||
    connection?.effectiveType === "2g" ||
    connection?.effectiveType === "slow-2g";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const isMobile = window.innerWidth < 768;
  const isLowEndDevice =
    !hasFinePointer &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency < 4;

  return prefersReducedMotion || isSlowConnection || isMobile || isLowEndDevice;
}

function subscribeToPerformanceBudget(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerMql = window.matchMedia("(pointer: fine)");

  window.addEventListener("resize", onStoreChange);
  motionMql.addEventListener("change", onStoreChange);
  pointerMql.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("resize", onStoreChange);
    motionMql.removeEventListener("change", onStoreChange);
    pointerMql.removeEventListener("change", onStoreChange);
  };
}

type MarketingHeroProps = {
  readonly badge?: string;
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCta?: { readonly href: string; readonly label: string };
  readonly secondaryCta?: { readonly href: string; readonly label: string; readonly icon?: LucideIcon };
  readonly chips?: readonly HeroChip[];
  readonly stats?: readonly HeroStat[];
  readonly showVideoControls?: boolean;
};

export function MarketingHero({
  badge = "Coastal Experiences",
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  chips = [],
  stats = [],
  showVideoControls: showVideoControlsProp,
}: MarketingHeroProps) {
  const playlist = ASSETS.marketing.hero.playlist;
  const isLowPowerMode = useSyncExternalStore(
    subscribeToPerformanceBudget,
    getPerformanceBudgetSnapshot,
    () => true
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const backgroundImage = useMemo(() => {
    const fallback = "/images/hero/coastal-poster.jpg";
    const firstPoster = playlist.find((item) => Boolean(item.poster))?.poster;
    return firstPoster || fallback;
  }, [playlist]);

  const toggleVideo = useCallback(async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setIsVideoPlaying(true);
      } catch {
        setIsVideoPlaying(false);
      }
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  const video = playlist[0];
  const showVideoControls = showVideoControlsProp ?? (!isLowPowerMode && Boolean(video?.src));

  return (
    <section className="relative -mt-14 h-[72vh] min-h-[520px] sm:h-[78vh] sm:min-h-[600px] lg:h-[86vh] lg:min-h-[660px] overflow-hidden isolate [transform:translateZ(0)]">
      {/* Background image carousel */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none select-none [object-position:center_30%]"
        />
      </div>

      {/* Fort-Jesus-style overlays (vignette + directional + top fade) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_44%,rgba(0,0,0,.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_82%,rgba(0,0,0,.78)_0%,rgba(0,0,0,.44)_46%,transparent_74%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      </div>

      {showVideoControls && video?.src && (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          poster={video.poster}
          className={cn(
            "absolute inset-0 z-5 h-full w-full object-cover transition-opacity duration-700 pointer-events-none",
            isVideoPlaying ? "opacity-50" : "opacity-0",
          )}
          onEnded={() => setIsVideoPlaying(false)}
          onPause={() => setIsVideoPlaying(false)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      )}

      {/* Content */}
      <div className="relative z-20 h-full flex items-end">
        <Container className="pb-10 sm:pb-12 lg:pb-14">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-blue text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-black/25">
                {badge}
              </span>
              <span className="px-3 py-1 bg-black/35 border border-white/10 text-white/85 text-[10px] sm:text-xs font-semibold rounded-full backdrop-blur-sm">
                Mombasa . Kenya
              </span>
              {stats.map((stat) => (
                <span
                  key={stat.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/30 border border-white/10 text-white/80 text-[10px] sm:text-xs font-semibold rounded-full backdrop-blur-sm"
                >
                  <stat.icon className="h-3.5 w-3.5 text-teal-300" strokeWidth={1.8} />
                  <span className="tabular-nums">{stat.value}</span>
                </span>
              ))}
            </div>

            <Heading
              level="h1"
              className="text-white !font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight drop-shadow-lg"
            >
              {title}
            </Heading>
            <p className="mt-3 text-white/90 text-sm sm:text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            {(primaryCta || secondaryCta || showVideoControls) && (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center h-12 px-5 rounded-xl bg-brand-blue hover:bg-blue-900 text-white text-sm font-bold transition-colors shadow-lg shadow-black/25"
                  >
                    {primaryCta.label} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center h-12 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-colors backdrop-blur-sm"
                  >
                    {secondaryCta.label}
                    {secondaryCta.icon && <secondaryCta.icon className="w-4 h-4 ml-2" />}
                  </Link>
                )}
                {showVideoControls && (
                  <button
                    type="button"
                    onClick={toggleVideo}
                    className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 transition-colors backdrop-blur-sm"
                    aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
                  >
                    <span className="text-base leading-none">{isVideoPlaying ? "⏸" : "▶"}</span>
                  </button>
                )}
              </div>
            )}

            {chips.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {chips.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/25 border border-white/10 text-white/85 hover:text-white hover:bg-black/35 transition-colors text-xs font-semibold backdrop-blur-sm"
                  >
                    {service.icon && <span aria-hidden>{service.icon}</span>}
                    <span>{service.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <MarketingHero
      title="Discover the coast with Blue Pineapple"
      subtitle="Fort Jesus harbour tours, sunset sailings, creek safaris, snorkelling reefs, and private charters — designed to feel premium, safe, and effortless."
      primaryCta={{ href: "/trips", label: "Explore experiences" }}
      secondaryCta={{ href: "/trips/fort-jesus-trip", label: "Fort Jesus", icon: Landmark }}
      chips={heroServices}
      stats={STATS}
    />
  );
}
