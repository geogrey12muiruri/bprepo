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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {sections.map((section, idx) => (
        <Link 
          key={idx} 
          href="#itinerary"
          className="group block relative overflow-hidden rounded-xl sm:rounded-2xl aspect-video sm:aspect-[4/5]"
        >
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 150 + 200}ms` }}>
              <section.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <Heading level="h3" className={`text-white mb-1 !font-bold text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300 animate-fade-in-up [animation-delay:${idx * 150 + 300}ms]`}>
              {section.title}
            </Heading>
            <p className={`text-white/70 text-xs line-clamp-2 group-hover:opacity-80 transition-opacity duration-300 animate-fade-in-up [animation-delay:${idx * 150 + 400}ms]`}>
              {section.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
