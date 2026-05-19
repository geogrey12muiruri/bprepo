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
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 border-b border-neutral-200" id="why-choose-us">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">
              Trust & Standards
            </p>
            <Heading level="h2" size="xl" className="mt-3 !font-bold tracking-tight text-neutral-950">
              Why choose Blue Pineapple
            </Heading>
            <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl">
              Clean boats, clear pricing, trained crew, and safety-first operations — without the heavy “salesy” visuals.
            </p>

            <div className="mt-7 relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={featureImages[2]}
                  alt="Blue Pineapple crew and boats"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-semibold drop-shadow">Premium by design, not by gimmicks.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="border-t border-neutral-200 pt-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-brand-blue">
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-neutral-950">{feature.title}</h3>
                        <p className="mt-1 text-sm text-neutral-700 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
