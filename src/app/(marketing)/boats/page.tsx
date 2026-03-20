import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { boats } from "@/data/boats";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { ArrowRight, Users, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Our Fleet | BluePineapple",
  description: "Discover our collection of premium, safe, and certified vessels for coastal adventures in Mombasa. Fully insured boats with GPS, surveillance, and experienced captains.",
  alternates: { canonical: "https://www.bluepineappleholdings.com/boats" },
  openGraph: {
    title: "Meet Our Fleet | BluePineapple",
    description: "Discover our collection of premium, safe, and certified vessels for coastal adventures.",
    url: "https://www.bluepineappleholdings.com/boats",
    type: "website",
  },
};

export default function BoatsPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header with proper top spacing */}
      <div className="pt-16 sm:pt-20 pb-8 bg-neutral-900">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.25em]">
              Premium Vessels
            </span>
            <Heading level="h1" size="2xl" className="mt-2 mb-3 text-white !font-bold">
              Our Fleet
            </Heading>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Safety-certified boats for your ultimate comfort.
            </p>
          </div>
        </Container>
      </div>

      {/* Boats Grid */}
      <Container className="pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {boats.map((boat) => (
            <Link
              key={boat.id}
              href={`${ROUTES.boats}/${boat.id}`}
              className="group block"
            >
              <div className="relative h-56 sm:h-60 overflow-hidden rounded-xl">
                <Image
                  src={boat.image}
                  alt={boat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg w-fit mb-2">
                    <Users className="w-3 h-3 text-white" />
                    <span className="text-white text-[10px] font-semibold">Up to {boat.capacity}</span>
                  </div>
                  
                  <Heading level="h3" size="md" className="text-white mb-1 !font-semibold">
                    {boat.name}
                  </Heading>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 text-[10px]">
                      {boat.hourlyRate && (
                        <span>{formatPrice(boat.hourlyRate)}/hr</span>
                      )}
                      {boat.dailyRate && (
                        <span className="text-white/50">·</span>
                      )}
                      {boat.dailyRate && (
                        <span>{formatPrice(boat.dailyRate)}/day</span>
                      )}
                    </div>
                    <ArrowRight className="w-3 h-3 text-teal-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
