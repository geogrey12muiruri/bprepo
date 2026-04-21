import { MapPin, Clock, Anchor, Ship } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import type { Trip } from "@/types/trip";

export function DepartureDetails({ trip }: { trip: Trip }) {
  // Parse departure times into array for pill rendering
  const departureTimesArray = trip.departureTimes 
    ? trip.departureTimes.split(",").map(t => t.trim()).filter(Boolean)
    : [];
  
  const returnTimesArray = trip.returnTimes
    ? trip.returnTimes.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  const details = [
    ...(trip.departurePoints ? [{ icon: MapPin, label: "Departure Point", value: trip.departurePoints, isArray: false }] : []),
    ...(trip.departureTimes ? [{ icon: Clock, label: "Departure Times", value: trip.departureTimes, isArray: true, times: departureTimesArray }] : []),
    ...(trip.returnTimes ? [{ icon: Clock, label: "Return Times", value: trip.returnTimes, isArray: true, times: returnTimesArray }] : []),
    ...(trip.stops ? [{ icon: Anchor, label: "Stops", value: trip.stops, isArray: false }] : []),
    { icon: Ship, label: "Vessel", value: trip.boatType, isArray: false },
  ];

  return (
    <Card className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <Heading level="h3" size="md" className="mb-5 !font-bold text-white">Trip Details</Heading>
      <div className="space-y-4">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-start gap-3">
            <detail.icon className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">{detail.label}</p>
              {/* Render times as pills if it's an array with values, otherwise as plain text */}
              {(detail.isArray && detail.times && detail.times.length > 0) ? (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {detail.times.map((time, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/10 text-neutral-200 text-xs font-semibold rounded tabular-nums">
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-neutral-300">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
