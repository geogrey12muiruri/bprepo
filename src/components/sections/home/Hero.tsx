"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Landmark, Shield, Clock, Star, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroChip = { readonly title: string; readonly href: string; readonly icon?: string };

type HeroStat = { readonly icon: LucideIcon; readonly label: string; readonly value: string };

// Default hero images array - can be overridden by backgroundImage prop
const DEFAULT_HERO_IMAGES = [
  "/assets/new/images/hero/hero1.jpg",
  "/assets/new/images/hero/hero2.jpg", 
  "/assets/new/images/hero/hero3.jpg",
  "/assets/new/images/hero/hero4.jpg"
];

// Fallback image if none provided
const FALLBACK_IMAGE = "/assets/new/images/hero/optimized-hero.webp";

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
}: MarketingHeroProps) {
  // Determine background image: use prop if provided, else first from default array, else fallback
  const heroImage = backgroundImage ?? (DEFAULT_HERO_IMAGES[0] ?? FALLBACK_IMAGE);

  return (
    <section className="relative -mt-14 h-[60vh] min-h-[500px] sm:h-[65vh] sm:min-h-[550px] lg:h-[70vh] lg:min-h-[600px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Coastal experience hero background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
     {/* Content */}
<div className="relative z-20 h-full">
  <Container className="relative flex h-full flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 lg:pb-16">
    
    {/* TOP CONTENT */}
    <div className="max-w-4xl animate-[fadeUp_900ms_ease-out_150ms_both]">
      
      {/* Heading Overlay */}
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
    </div>

    {/* BOTTOM CONTENT */}
    <div className="animate-[fadeUp_900ms_ease-out_350ms_both]">
      
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
        <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
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
      backgroundImage="/assets/new/images/hero/optimized-hero.webp"
    />
  );
}