"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, Landmark, Shield, Clock, Star } from "lucide-react";

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

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] w-full overflow-hidden flex flex-col justify-end sm:justify-between bg-black">
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
      <Container className="relative z-20 pt-8 sm:pt-12 pb-2 flex-shrink-0">
        <div className="max-w-3xl text-white">
          {/* Subtle contrast backdrop for text */}
          <div className="absolute -inset-10 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative">
            <div className="mb-2 sm:mb-3 flex items-center gap-2 animate-[fade-in-right_1.2s_ease-out_forwards]">
              <div className="h-px w-4 sm:w-6 md:w-8 bg-teal-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">
                Exclusive Maritime Journeys
              </span>
            </div>

            <Heading level="h1" size="4xl" className="mb-3 sm:mb-4 text-white !leading-[1.1] tracking-tight">
              <span className="block overflow-hidden">
                <span className="block animate-[slide-up_1s_ease-out_0.2s_forwards] text-2xl sm:text-3xl md:text-4xl">
                  Discover the <span className="italic font-light text-neutral-400">Hidden</span>
                </span>
              </span>
              <span className="block overflow-hidden py-0.5 sm:py-1">
                <span className="block animate-[slide-up_1s_ease-out_0.4s_forwards] text-2xl sm:text-3xl md:text-4xl">
                  Magic of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-100 to-blue-400 font-black animate-[shimmer_3s_infinite_linear] bg-[length:200%_auto]">
                    Blue Pineapple
                  </span>
                </span>
              </span>
            </Heading>

            <p className="mb-4 sm:mb-5 text-xs sm:text-sm text-neutral-300/80 leading-relaxed max-w-lg animate-[fade-in_1.5s_ease-out_0.8s_forwards] opacity-0 px-2 sm:px-0">
              Historic explorations and premium charters on the Indian Ocean.
            </p>

            {/* Featured CTA - Fort Jesus */}
            <div className="mb-5 sm:mb-6 animate-[fade-in_1.5s_ease-out_1s_forwards] opacity-0">
              <Link 
                href="/trips/fort-jesus-trip"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 group"
              >
                <Landmark className="w-4 h-4" />
                <span>Experience Fort Jesus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 animate-[fade-in_1.5s_ease-out_1.2s_forwards] opacity-0">
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
      <div className="relative z-20 pb-4 sm:pb-6">
        <Container>
          <div className="flex flex-wrap justify-center gap-2 animate-[fade-in_1.5s_ease-out_1.5s_forwards] opacity-0">
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
