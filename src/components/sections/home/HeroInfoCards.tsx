"use client";

import React from "react";
import Image from "next/image";
import { services } from "@/data/services";

export function HeroInfoCards() {
  const heroServices = services.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12 animate-[fade-in_1s_ease-out_1.2s_forwards] opacity-0">
      {heroServices.map((service, index) => (
        <div
          key={service.id}
          className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
          style={{
            animationDelay: `${1.4 + index * 0.1}s`,
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            {service.image && (
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content */}
          <div className="relative p-4 sm:p-5 md:p-6 flex flex-col justify-end min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 group-hover:text-teal-300 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
              {service.description}
            </p>
          </div>

          {/* Decorative accent */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400/0 via-teal-400/50 to-teal-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
      ))}
    </div>
  );
}
