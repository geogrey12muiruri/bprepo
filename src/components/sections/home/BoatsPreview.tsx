"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { 
  Users, 
  Shield, 
  Navigation, 
  Camera, 
  Anchor,
  CheckCircle2,
  Clock,
  Calendar
} from "lucide-react";
import { boats } from "@/data/boats";
import { formatPrice } from "@/lib/format";

export function BoatsPreview() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-neutral-50/50 to-white overflow-hidden" id="fleet">
      <Container>
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Premium Vessels
            </span>
          </div>
          <Heading level="h2" size="2xl" className="mb-4 sm:mb-5 md:mb-6">
            Meet Our Fleet
          </Heading>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0">
            Carefully maintained, safety-first platforms designed for your ultimate comfort and coastal adventure.
          </p>
        </div>

        <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-32">
          {boats.map((boat, index) => (
            <div
              key={boat.id}
              className={`flex flex-col gap-8 sm:gap-10 md:gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className={`absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl transform transition-transform duration-500 ${index % 2 === 1 ? "rotate-3 group-hover:rotate-2" : "-rotate-3 group-hover:-rotate-2"
                  }`} />
                <div className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 border-4 border-white">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Capacity Badge on Image */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span className="font-black text-teal-700">{boat.capacity}</span>
                    <span className="text-xs text-neutral-500 font-bold uppercase">Guests</span>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 px-0">
                <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
                  {/* Boat Name */}
                  <div>
                    <Heading level="h3" size="xl" className="text-neutral-900 mb-3 sm:mb-4">
                      {boat.name}
                    </Heading>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <Shield className="w-4 h-4 text-teal-600" />
                      <span className="font-semibold">Fully Insured & Certified</span>
                    </div>
                  </div>

                  {/* Key Features Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {boat.features.slice(0, 4).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                          {feature.includes("GPS") && <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                          {feature.includes("Surveillance") && <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                          {feature.includes("Insured") && <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                          {feature.includes("Life Jackets") && <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                          {!feature.includes("GPS") && !feature.includes("Surveillance") && !feature.includes("Insured") && !feature.includes("Life Jackets") && (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-700 leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Charter Pricing */}
                  {(boat.hourlyRate || boat.dailyRate) && (
                    <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-100">
                      <p className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Charter Rates
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {boat.hourlyRate && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-teal-600" />
                              <span className="text-xs text-neutral-500 font-semibold uppercase">Hourly</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-teal-700">{formatPrice(boat.hourlyRate)}</p>
                          </div>
                        )}
                        {boat.dailyRate && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-teal-600" />
                              <span className="text-xs text-neutral-500 font-semibold uppercase">Daily</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-teal-700">{formatPrice(boat.dailyRate)}</p>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-3 sm:mt-4 italic">
                        Booking reservations should be made with as much notice as possible.
                      </p>
                    </div>
                  )}

                  {/* Short Description - Only if needed */}
                  {boat.description && (
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed line-clamp-3">
                      {boat.description.split('.')[0]}. {boat.description.split('.')[1]}.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
