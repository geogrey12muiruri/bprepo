"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { 
  Ship, 
  Shield, 
  Navigation, 
  Camera, 
  User, 
  Award,
  CheckCircle2
} from "lucide-react";

const featureImages = [
  "/images/fort/fort3.jpeg",
  "/assets/fleet/surveillance.jpeg",
  "/images/gallery/choose.jpeg",
  "/assets/fleet/crew.jpg",
  "/assets/fleet/hunkey02.jpg",
  "/assets/fleet/insured.jpeg",
];

export function WhyChooseUs() {
  const features = [
    {
      icon: Ship,
      title: "Modern Fleet",
      description: "Latest fully equipped boats with state-of-the-art equipment for your comfort.",
      image: featureImages[4],
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All our boats are fully insured and certified for complete peace of mind.",
      image: featureImages[5],
    },
    {
      icon: Navigation,
      title: "GPS Navigation",
      description: "Every vessel fitted with GPS systems for precise navigation and safety.",
      image: featureImages[2],
    },
    {
      icon: Camera,
      title: "24/7 Surveillance",
      description: "360° surveillance cameras on all boats for enhanced security.",
      image: featureImages[1],
    },
    {
      icon: User,
      title: "Expert Captains",
      description: "Qualified captains with 20+ years experience navigating these waters.",
      image: featureImages[3],
    },
  ];

  return (
    <section className="relative py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden" id="why-choose-us">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -right-24 w-[560px] h-[560px] bg-teal-500/10 blur-[110px] rounded-full" />
        <div className="absolute -bottom-36 -left-28 w-[680px] h-[680px] bg-sky-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_50%,_rgba(20,184,166,0.24),_transparent_55%)]" />
      </div>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center lg:text-left lg:mb-0 lg:col-span-4">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
              Trust & Excellence
            </span>
            <Heading level="h2" size="lg" className="mt-3 mb-3 text-white">
              Why Choose Blue Pineapple
            </Heading>
            <p className="text-neutral-400 max-w-xl lg:max-w-none mx-auto lg:mx-0 text-xs sm:text-sm leading-relaxed">
              Premium boat experiences with safety at the core. Our commitment to excellence sets us apart.
            </p>

            {/* Trust indicators */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6">
              {[
                { label: "Certified", value: "100%" },
                { label: "Experienced", value: "20+ Years" },
                { label: "Safe", value: "0 Incidents" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
                  <span className="text-neutral-400 text-xs">{stat.label}</span>
                  <span className="text-white font-semibold text-xs">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl shadow-black/40">
                      {/* Image */}
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

                      {/* Content */}
                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-teal-500/20 backdrop-blur-sm flex items-center justify-center mb-2.5 border border-white/10">
                          <IconComponent className="w-4 h-4 text-teal-300" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5">
                          {feature.title}
                        </h3>
                        <p className="text-neutral-300 text-xs leading-relaxed line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Summary graphic (not a photo card) */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(120deg,rgba(20,184,166,0.10),rgba(56,189,248,0.06),rgba(245,158,11,0.06))] shadow-xl shadow-black/40 sm:col-span-2 xl:col-span-3">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-[360px] h-[360px] bg-teal-500/20 blur-[90px] rounded-full" />
                  <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-sky-500/15 blur-[110px] rounded-full" />
                  <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.10),transparent_55%)]" />
                </div>

                <div className="relative p-5 sm:p-6 md:p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-px w-6 bg-teal-400/80" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-300">
                          Summary
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-lg sm:text-xl">
                        Everything we do is designed around safety, comfort, and precision.
                      </h3>
                      <p className="mt-2 text-neutral-200/80 text-xs sm:text-sm leading-relaxed">
                        From a modern fleet and insured trips to GPS navigation, surveillance, and expert captains — this is the standard behind every journey.
                      </p>
                    </div>

                    <div className="hidden md:flex shrink-0 items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur">
                      <Award className="w-7 h-7 text-teal-200" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {[
                      { icon: Ship, label: "Fleet" },
                      { icon: Shield, label: "Insured" },
                      { icon: Navigation, label: "GPS" },
                      { icon: Camera, label: "Surveillance" },
                      { icon: User, label: "Captains" },
                      { icon: Award, label: "Standards" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 backdrop-blur-sm"
                        >
                          <Icon className="w-4 h-4 text-teal-200" strokeWidth={1.5} />
                          <span className="text-[11px] font-semibold text-white/90">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
