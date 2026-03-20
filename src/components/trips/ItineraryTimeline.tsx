import { CheckCircle2 } from "lucide-react";
import type { Trip } from "@/types/trip";

export function ItineraryTimeline({ trip }: { trip: Trip }) {
  const highlights = trip.highlights || [
    "Depart from Mombasa Beach",
    "Cruise past Nyali Beach",
    "Pass Mombasa Marine Park",
    "View Likoni & Shelly Beach",
    "Arrive at Fort Jesus Harbour",
    "Explore Old Town",
    "Return journey",
  ];

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-teal-500 via-teal-400 to-amber-500 hidden sm:block" />
      
      <div className="space-y-0">
        {highlights.map((item, idx) => (
          <div key={idx} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                idx === highlights.length - 1 
                  ? "bg-amber-500 text-white" 
                  : "bg-teal-500 text-white"
              }`}>
                {idx === highlights.length - 1 ? (
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <span className="text-sm font-bold">{idx + 1}</span>
                )}
              </div>
            </div>
            <div className="pt-1.5">
              <p className="text-sm sm:text-base font-medium text-neutral-800">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
