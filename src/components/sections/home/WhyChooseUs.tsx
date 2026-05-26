"use client";

import Image from "next/image";
import { Camera, Navigation, Shield, Ship, User } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const features = [
  {
    icon: Ship,
    title: "Modern Fleet",
    description:
      "Fully equipped boats maintained for comfort, safety, and reliable coastal experiences.",
    image: "/assets/fleet/hunkey02.jpg",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "Certified and insured vessels so every trip feels secure from departure to return.",
    image: "/assets/fleet/insured.jpeg",
  },
  {
    icon: Navigation,
    title: "GPS Navigation",
    description:
      "Navigation-ready vessels supported by clear route planning and local sea knowledge.",
    image: "/images/gallery/choose.jpeg",
  },
  {
    icon: Camera,
    title: "24/7 Surveillance",
    description:
      "Enhanced security systems and operational oversight for safer guest experiences.",
    image: "/assets/fleet/surveillance.jpeg",
  },
  {
    icon: User,
    title: "Expert Captains",
    description:
      "Experienced captains who understand the coastline, routes, tides, and guest safety.",
    image: "/assets/fleet/crew.jpg",
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="border-b border-neutral-200 bg-blue-100 py-14 sm:py-16 lg:py-20"
    >
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.32em] text-brand-blue">
            Trust & Standards
          </p>

          <Heading
            level="h2"
            size="xl"
            className="mt-3 !font-bold tracking-tight text-neutral-950"
          >
            Why choose Blue Pineapple
          </Heading>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
            Clean boats, clear pricing, experienced crew, and safety-first
            operations for premium coastal experiences along the Kenyan coast.
          </p>
        </div>

        {/* Main Layout */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  animation: `fadeUp 700ms ease-out ${index * 100}ms both`,
                }}
              >
                {/* Compact responsive image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 lg:aspect-[5/4]">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 220px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                  <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-brand-blue shadow-sm backdrop-blur-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-sm font-bold text-neutral-950">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}