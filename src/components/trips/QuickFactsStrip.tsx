import Link from "next/link";
import { Star, Clock, Ship } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Trip } from "@/types/trip";
import { formatDuration } from "@/lib/format";
import { ROUTES } from "@/lib/routes";

export function QuickFactsStrip({ trip }: { trip: Trip }) {
  const departureTimes = trip.departureTimes ? trip.departureTimes.split(",").map(t => t.trim()) : [];
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : null;
  
  const facts = [
    { icon: Clock, label: "Duration", value: formatDuration(trip.durationHours) },
  ];
  
  if (trip.rating) {
    facts.unshift({ icon: Star, label: "Rating", value: `${trip.rating} (${trip.reviewCount || "new"})` });
  }
  
  return (
    <div className="bg-neutral-800/50 border-b border-white/5 py-5 sm:py-6">
      <Container>
        {/* Mobile: Stack facts vertically, desktop: horizontal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6 md:gap-10">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <fact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{fact.label}</p>
                <p className="text-sm font-bold text-neutral-900">{fact.value}</p>
              </div>
            </div>
          ))}
          
          {/* Vessel as link */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Vessel</p>
              {vesselSlug ? (
                <Link href={`${ROUTES.boats}/${vesselSlug}`} className="text-sm font-bold text-teal-600 hover:text-teal-500 transition-colors">
                  {trip.boatType}
                </Link>
              ) : (
                <p className="text-sm font-bold text-neutral-900">{trip.boatType}</p>
              )}
            </div>
          </div>
          
          {/* Departure Times as interactive chips */}
          {departureTimes.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Departure Times</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {departureTimes.map((time) => (
                    <button
                      key={time}
                      className="px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-teal-600 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
