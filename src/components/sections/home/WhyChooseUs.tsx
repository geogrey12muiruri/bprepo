"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { 
  Ship, 
  Shield, 
  Navigation, 
  Camera, 
  User, 
  Award 
} from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Ship,
      title: "Latest Fully Equipped Boats",
      description: "Modern vessels with state-of-the-art equipment for your comfort and safety.",
      gradient: "from-blue-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Fully Insured & Certified",
      description: "All our boats are fully insured and certified, giving you complete peace of mind.",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: Navigation,
      title: "GPS Navigation",
      description: "Every vessel is fitted with GPS systems for precise navigation and safety.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Camera,
      title: "24-Hour Surveillance",
      description: "360° surveillance cameras on all boats for enhanced security and monitoring.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: User,
      title: "Experienced Captains",
      description: "Qualified captains with over 20 years of experience navigating these waters.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      title: "European Safety Standards",
      description: "Everything we do adheres to European safety standards for your protection.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-teal-50 overflow-hidden" id="why-choose-us">
      {/* Decorative background elements - solid colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-teal-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50" />
      </div>

      <Container className="relative">
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Trust & Excellence
            </span>
          </div>
          <Heading level="h2" size="2xl" className="mb-4 sm:mb-5 md:mb-6">
            Why Choose Blue Pineapple
          </Heading>
          <p className="text-neutral-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4 sm:px-0">
            We have the latest, fully equipped boats, fully insured and certified. We place the utmost importance on passenger safety, with GPS fitted, 24-hour surveillance cameras, and qualified captains with 20 years experience of these waters. Everything we do is to European safety standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative h-full p-6 sm:p-7 md:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-transparent overflow-hidden">
                  {/* Solid color overlay on hover */}
                  <div className={`absolute inset-0 bg-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Icon container */}
                  <div className="relative mb-5 sm:mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl bg-teal-600 shadow-lg group-hover:shadow-xl group-hover:bg-teal-700 transform group-hover:scale-110 transition-all duration-500`}>
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="relative text-base sm:text-lg font-bold text-neutral-900 mb-2 sm:mb-3 leading-tight group-hover:text-teal-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="relative text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
