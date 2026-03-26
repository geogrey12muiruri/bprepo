import Image from "next/image";
import Link from "next/link";
import { Waves, Compass, Landmark } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import type { Trip } from "@/types/trip";

const journeyAssets = {
  journey: "/images/fort/fort3.jpeg",
  coastal: "/images/fort/coastal.jpg",
  fort: "/images/fort/fortj.jpg",
};

export function JourneySection({ trip }: { trip: Trip }) {
  const sections = [
    {
      icon: Waves,
      title: "The Journey",
      description: "As the boat glides effortlessly away from the powder-white sands of Mombasa Beach, relax and enjoy the ride. The craft is fully equipped with life jackets, GPS navigation, and CCTV for a safe experience.",
      image: journeyAssets.journey,
    },
    {
      icon: Compass,
      title: "Coastal Views",
      description: "Cruise past Nyali, the pristine waters of Mombasa Marine Park, Likoni, and Shelly Beach. Spot landmarks including Ras Serani Lighthouse, State House, and Mombasa Hospital from the water.",
      image: journeyAssets.coastal,
    },
    {
      icon: Landmark,
      title: "Fort Jesus",
      description: "Arrive at the magnificent Fort Jesus, a UNESCO World Heritage Site. Step ashore and explore Old Town's narrow streets filled with antique treasures and Swahili artistry.",
      image: journeyAssets.fort,
    },
  ];

  return (
    <div className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory overscroll-x-contain isolate [transform:translateZ(0)]">
      {sections.map((section, idx) => (
        <div key={idx} className="flex-shrink-0 w-[85vw] sm:w-auto snap-center sm:snap-align-none">
          <Link 
            href="#itinerary"
            className="group block relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] sm:aspect-[4/5] [transform:translateZ(0)] backface-hidden"
          >
            <Image
              src={section.image}
              alt={section.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 [transform:translateZ(0)] backface-hidden"
              priority={idx === 0}
              sizes="(max-width: 640px) 85vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end z-20">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <section.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
              </div>
              <Heading level="h3" className="text-white mb-2 !font-bold text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300">
                {section.title}
              </Heading>
              <p className="text-white/80 text-xs sm:text-[13px] leading-relaxed line-clamp-3 sm:line-clamp-none transition-opacity duration-300">
                {section.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
