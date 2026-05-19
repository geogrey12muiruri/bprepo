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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {features.map((feature) => (
        <div key={feature} className="flex min-h-14 items-center gap-3 border-b border-neutral-200 py-3 last:border-b-0 sm:border sm:rounded-xl sm:bg-white sm:p-3">
          <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" strokeWidth={2} />
          <span className="text-sm font-medium text-neutral-800">{feature}</span>
        </div>
      ))}
    </div>
  );
}
