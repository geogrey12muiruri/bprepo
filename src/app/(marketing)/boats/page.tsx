import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { boats } from "@/data/boats";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { ArrowRight, Users, Clock, Calendar, Check } from "lucide-react";

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
  const settingSons = boats.find(b => b.id === "setting-sons")!;
  const hunkyDory = boats.find(b => b.id === "hunky-dory")!;

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

        {/* Comparison Table - Enhancement 5A */}
        <section className="mt-16">
          <Heading level="h2" size="lg" className="mb-6 text-white !font-bold text-center">
            Which vessel suits you?
          </Heading>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-neutral-400 text-xs font-semibold uppercase tracking-wider">Feature</th>
                  <th className="text-center py-4 px-4 text-teal-400 text-xs font-bold uppercase tracking-wider">Setting Sons</th>
                  <th className="text-center py-4 px-4 text-teal-400 text-xs font-bold uppercase tracking-wider">Hunky Dory</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-neutral-300 text-sm">Capacity</td>
                  <td className="py-4 px-4 text-center text-white font-semibold">{settingSons?.capacity || 35} guests</td>
                  <td className="py-4 px-4 text-center text-white font-semibold">{hunkyDory?.capacity || 14} guests</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-neutral-300 text-sm">Hourly rate</td>
                  <td className="py-4 px-4 text-center text-teal-400 font-bold">{settingSons.hourlyRate ? formatPrice(settingSons.hourlyRate) : 'Ksh 8,000'}</td>
                  <td className="py-4 px-4 text-center text-teal-400 font-bold">{hunkyDory.hourlyRate ? formatPrice(hunkyDory.hourlyRate) : 'Ksh 5,000'}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-neutral-300 text-sm">Daily rate</td>
                  <td className="py-4 px-4 text-center text-white font-semibold">{settingSons.dailyRate ? formatPrice(settingSons.dailyRate) : 'Ksh 32,000'}</td>
                  <td className="py-4 px-4 text-center text-white font-semibold">{hunkyDory.dailyRate ? formatPrice(hunkyDory.dailyRate) : 'Ksh 20,000'}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-neutral-300 text-sm">Best for</td>
                  <td className="py-4 px-4 text-center text-neutral-200 text-sm">Large groups, corporate events</td>
                  <td className="py-4 px-4 text-center text-neutral-200 text-sm">Small groups, families, glass-bottom views</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-neutral-300 text-sm">Unique feature</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-teal-400 text-xs font-medium">
                      <Check className="w-3 h-3" /> 360° Surveillance
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-teal-400 text-xs font-medium">
                      <Check className="w-3 h-3" /> Glass Bottom
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Charter Enquiry CTA - Enhancement 5B */}
        <section className="mt-16 py-12 px-6 sm:px-8 bg-gradient-to-r from-teal-500/20 via-teal-600/10 to-transparent rounded-2xl border border-teal-500/20">
          <div className="text-center">
            <Heading level="h2" size="lg" className="mb-4 text-white !font-bold">
              Ready to charter?
            </Heading>
            <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
              Get in touch to discuss your charter requirements. We'll help you find the perfect vessel for your needs.
            </p>
            <Button
              href="https://wa.me/254708485978?text=Hi%20Blue%20Pineapple%2C%20I%27d%20like%20to%20enquire%20about%20chartering%20a%20boat"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="shadow-lg shadow-teal-500/20"
            >
              Enquire Now <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
