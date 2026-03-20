import { CheckCircle2 } from "lucide-react";
import type { Trip } from "@/types/trip";

export function SafetyFeatures({ trip }: { trip: Trip }) {
  const features = trip.features?.length ? trip.features : [
    "Certified Life Jackets",
    "GPS Navigation",
    "CCTV Surveillance",
    "Experienced Captain",
    "Full Insurance",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" strokeWidth={2} />
          <span className="text-sm font-medium text-neutral-200">{feature}</span>
        </div>
      ))}
    </div>
  );
}
