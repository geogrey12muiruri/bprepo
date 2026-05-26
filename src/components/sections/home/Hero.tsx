"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Landmark, Shield, Clock, Star, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLOUDINARY_HERO_IMAGES } from "@/lib/cloudinaryAssets";

type HeroChip = { readonly title: string; readonly href: string; readonly icon?: string };

type HeroStat = { readonly icon: LucideIcon; readonly label: string; readonly value: string };

const DEFAULT_HERO_IMAGES = CLOUDINARY_HERO_IMAGES;

type MarketingHeroProps = {
  readonly badge?: string;
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCta?: { readonly href: string; readonly label: string };
  readonly secondaryCta?: { readonly href: string; readonly label: string; readonly icon?: LucideIcon };
  readonly chips?: readonly HeroChip[];
  readonly stats?: readonly HeroStat[];
  readonly showVideoControls?: boolean; // Kept for compatibility but not used
  readonly backgroundImage?: string; // New prop to specify background image
  readonly backgroundImages?: readonly string[]; // New prop to rotate multiple backgrounds
  readonly contentAlign?: "left" | "center";
  readonly titleStyle?: "bar" | "clean";
  readonly carouselStyle?: "crossfade" | "cinematic";
};

export function MarketingHero({
  badge = "Coastal Experiences",
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  chips = [],
  stats = [],
  showVideoControls: showVideoControlsProp = false, // Not used in simplified version
  backgroundImage,
  backgroundImages,
  contentAlign = "left",
  titleStyle = "bar",
  carouselStyle = "crossfade",
}: MarketingHeroProps) {
  const images = useMemo(() => {
    if (backgroundImages && backgroundImages.length > 0) return backgroundImages;
    if (backgroundImage) return [backgroundImage];
    return DEFAULT_HERO_IMAGES;
  }, [backgroundImage, backgroundImages]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, carouselStyle === "cinematic" ? 9000 : 6500);
    return () => window.clearInterval(interval);
  }, [carouselStyle, images.length]);

  return (
    <section className="relative -mt-14 h-[60vh] min-h-[500px] sm:h-[65vh] sm:min-h-[550px] lg:h-[70vh] lg:min-h-[600px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            fill
            priority={index === 0}
            sizes="100vw"
            className={cn(
              "object-cover object-center will-change-[opacity,transform]",
              carouselStyle === "cinematic"
                ? "transition-[opacity,transform] duration-[2400ms] ease-out"
                : "transition-opacity duration-1000",
              index === activeIndex ? "opacity-100" : "opacity-0",
              carouselStyle === "cinematic" && index === activeIndex
                ? "scale-[1.06] motion-safe:animate-[heroDrift_12s_ease-in-out_infinite]"
                : "scale-100",
            )}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      </div>

      {/* Content */}
      <style>{`
        @keyframes heroDrift {
          0% { transform: scale(1.06) translate3d(0px, 0px, 0); }
          50% { transform: scale(1.09) translate3d(-10px, 6px, 0); }
          100% { transform: scale(1.06) translate3d(0px, 0px, 0); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-20 h-full">
        <Container
          className={cn(
            "relative flex h-full flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 lg:pb-16",
            contentAlign === "center" && "items-center text-center",
          )}
        >
    
    {/* TOP CONTENT */}
    <div className={cn("max-w-4xl animate-[fadeUp_900ms_ease-out_150ms_both]", contentAlign === "center" && "mx-auto")}>
      
      {/* Heading Overlay */}
      {titleStyle === "bar" ? (
        <div className="-mx-4 sm:mx-0 w-screen sm:w-full backdrop-blur-sm border-y border-white/10">
          <div className="px-4 sm:px-6 py-5 sm:py-6 md:py-7">
            <Heading
              level="h1"
              className="text-white !font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight drop-shadow-xl"
            >
              {title}
            </Heading>
          </div>
        </div>
      ) : (
        <div>
          {badge ? (
            <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm">
              {badge}
            </div>
          ) : null}
          <Heading
            level="h1"
            className="text-white !font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.55)]"
          >
            {title}
          </Heading>
        </div>
      )}
    </div>

    {/* BOTTOM CONTENT */}
    <div className={cn("animate-[fadeUp_900ms_ease-out_350ms_both]", contentAlign === "center" && "flex flex-col items-center")}>
      
      {/* Subtitle */}
      <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
        {subtitle}
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
        {primaryCta && (
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center justify-center h-12 px-6 rounded-xl bg-brand-blue hover:bg-blue-900 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-black/25"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}

        {secondaryCta && (
          <Link
            href={secondaryCta.href}
            className="group inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            {secondaryCta.label}
            {secondaryCta.icon && (
              <Landmark className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:scale-110" />
            )}
          </Link>
        )}
      </div>

      {/* Service Chips */}
      {chips.length > 0 && (
        <div className={cn("mt-7 flex flex-wrap gap-2 sm:gap-3", contentAlign === "center" && "justify-center")}>
          {chips.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/10 text-white/90 hover:text-white hover:bg-black/45 transition-all duration-300 text-xs font-semibold backdrop-blur-sm"
              style={{
                animation: `fadeUp 700ms ease-out ${500 + index * 120}ms both`,
              }}
            >
              {service.icon && <span>{service.icon}</span>}
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
      badge="Coastal Experiences"
      title="Discover the coast with Blue Pineapple"
      subtitle="Fort Jesus harbour tours, sunset sailings, creek safaris, snorkelling reefs, and private charters — designed to feel premium, safe, and effortless."
      primaryCta={{ href: "/trips", label: "Explore experiences" }}
      secondaryCta={{ href: "/trips/fort-jesus-trip", label: "Fort Jesus", icon: Landmark }}
      chips={[
        { title: "Boat Trips", href: "/trips" },
        { title: "Private Charter", href: "/contact" },
        { title: "Fort Jesus", href: "/trips/fort-jesus-trip" },
      ]}
      stats={[
        { icon: Shield, label: "Certified Safe", value: "100%" },
        { icon: Clock, label: "20+ Years", value: "Experience" },
        { icon: Star, label: "4.8 Rating", value: "from 124+" },
      ]}
      backgroundImages={CLOUDINARY_HERO_IMAGES}
    />
  );
}
