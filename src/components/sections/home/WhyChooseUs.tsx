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
  "/assets/fleet/setting.jpeg",
  "/images/gallery/choose.jpeg",
];

export function WhyChooseUs() {
  const features = [
    {
      icon: Ship,
      title: "Modern Fleet",
      description: "Latest fully equipped boats with state-of-the-art equipment for your comfort.",
      image: featureImages[0],
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All our boats are fully insured and certified for complete peace of mind.",
      image: featureImages[1],
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
      image: featureImages[0],
    },
    {
      icon: User,
      title: "Expert Captains",
      description: "Qualified captains with 20+ years experience navigating these waters.",
      image: featureImages[1],
    },
    {
      icon: Award,
      title: "Safety Standards",
      description: "Everything we do adheres to European safety standards.",
      image: featureImages[2],
    },
  ];

  return (
    <section className="relative py-10 sm:py-12 bg-neutral-900 overflow-hidden" id="why-choose-us">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(20,184,166,0.3),_transparent_50%)]" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
            Trust & Excellence
          </span>
          <Heading level="h2" size="lg" className="mt-3 mb-3 text-white">
            Why Choose Blue Pineapple
          </Heading>
          <p className="text-neutral-400 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Premium boat experiences with safety at the core. Our commitment to excellence sets us apart.
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on larger screens */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 w-[80vw] sm:w-auto group relative"
              >
                <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden rounded-xl sm:rounded-2xl">
                  {/* Image */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-teal-500/20 backdrop-blur-sm flex items-center justify-center mb-2.5">
                      <IconComponent className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
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
        </div>

        {/* Trust indicators */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          {[
            { label: "Certified", value: "100%" },
            { label: "Experienced", value: "20+ Years" },
            { label: "Safe", value: "0 Incidents" },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-neutral-400 text-xs">{stat.label}</span>
              <span className="text-white font-semibold text-xs">{stat.value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
