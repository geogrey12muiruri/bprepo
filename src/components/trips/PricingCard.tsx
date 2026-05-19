"use client";

import { useState } from "react";
import Link from "next/link";
import { Ship, ArrowRight, Percent } from "lucide-react";
import type { Trip } from "@/types/trip";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppUrl, buildBookingMessage, buildEnquiryMessage } from "@/lib/whatsapp";

interface PricingCardProps {
  trip: Trip;
  isComingSoon: boolean;
}

export function PricingCard({ trip, isComingSoon }: PricingCardProps) {
  const [selectedPackage, setSelectedPackage] = useState<"return" | "oneway">("return");

  const getWhatsAppMessage = (type: "book" | "question") => {
    const packageText = selectedPackage === "return" ? "Return Trip" : "One Way";
    const price = selectedPackage === "return" ? trip.priceReturn : trip.priceOneWay;
    
    if (type === "book") {
      return buildBookingMessage(trip.name, `${packageText} (Ksh ${price})`);
    }
    return buildEnquiryMessage(trip.name);
  };

  const whatsAppLink = (type: "book" | "question") => 
    buildWhatsAppUrl(getWhatsAppMessage(type));

  return (
    <div className="relative">
      {/* Mobile: Fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-white/10 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-400">From</p>
            <p className="text-xl font-black text-white">
              {trip.pricingModel === "hop_on_hop_off"
                ? formatPrice(trip.pricePerPerson)
                : (trip.priceReturn ? formatPrice(trip.priceReturn) : formatPrice(trip.pricePerPerson))}
            </p>
          </div>
          {isComingSoon ? (
            <div className="px-6 py-3 bg-neutral-100 text-neutral-400 rounded-xl font-bold">
              Coming Soon
            </div>
          ) : (
            <Link href={whatsAppLink("book")} className="px-8 py-3 bg-brand-blue hover:bg-blue-900 text-white text-base font-bold rounded-xl shadow-lg text-center">
              Book Now
            </Link>
          )}
        </div>
      </div>

      {/* Desktop & Mobile Card */}
      <div className="mb-8 border-t border-neutral-200 pt-6 lg:mb-0">
        <div className="mb-6">
          <p className="text-xs font-black text-neutral-500 uppercase tracking-[0.3em] mb-4">
            {trip.pricingModel === "hop_on_hop_off" ? "Hop-On Hop-Off Fares" : "Select Package"}
          </p>
          
          {trip.pricingModel === "hop_on_hop_off" ? (
            <div>
              <p className="text-xs text-neutral-500">Starting from</p>
              <p className="mt-1 text-4xl font-black text-brand-blue">{formatPrice(trip.pricePerPerson)}</p>
              <p className="mt-1 text-xs text-neutral-600">
                Pay on board · Board at any stop · Under 5s free
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("hop-on-hop-off")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="flex items-center justify-center h-11 rounded-xl border border-neutral-300 bg-white hover:border-brand-blue text-neutral-800 text-xs font-semibold transition-colors"
                >
                  View Full Fares
                </button>
                <Link
                  href={whatsAppLink("book")}
                  className="flex items-center justify-center h-11 rounded-xl bg-brand-blue hover:bg-blue-900 text-white text-xs font-bold transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ) : trip.priceOneWay && trip.priceReturn ? (
            <div className="space-y-3">
              <button 
                onClick={() => setSelectedPackage("return")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPackage === "return" 
                    ? "border-brand-blue bg-brand-blue/10" 
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-brand-blue" />
                    <span className="font-bold text-neutral-950">Return Trip</span>
                  </div>
                  <span className="text-xl font-black text-brand-blue">{formatPrice(trip.priceReturn)}</span>
                </div>
                <p className="text-xs text-neutral-600">Full experience with time at Fort Jesus</p>
              </button>
              
              <button 
                onClick={() => setSelectedPackage("oneway")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPackage === "oneway" 
                    ? "border-brand-blue bg-brand-blue/10" 
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                    <span className="font-bold text-neutral-800">One Way</span>
                  </div>
                  <span className="text-xl font-black text-neutral-700">{formatPrice(trip.priceOneWay)}</span>
                </div>
                <p className="text-xs text-neutral-600">To Fort Jesus only</p>
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-neutral-500 mb-1">From</p>
              <p className="text-3xl font-black text-brand-blue">{formatPrice(trip.pricePerPerson)}</p>
              <p className="text-xs text-neutral-600">per person</p>
            </div>
          )}
        </div>

        {trip.discounts && (
          <div className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-brand-blue" />
              <p className="text-xs font-black text-neutral-700 uppercase tracking-widest">Available Offers</p>
            </div>
            <ul className="space-y-2">
              {trip.discounts.couplePercent && (
                <li className="text-xs text-neutral-700 font-medium">
                  <span className="font-bold">{trip.discounts.couplePercent}% OFF</span> couple bookings
                </li>
              )}
              {trip.discounts.groupFamilyPercent && (
                <li className="text-xs text-neutral-700 font-medium">
                  <span className="font-bold">{trip.discounts.groupFamilyPercent}% OFF</span> group/family bookings
                  {trip.discounts.groupFamilyMinPassengers && ` (${trip.discounts.groupFamilyMinPassengers}+ paying passengers)`}
                </li>
              )}
              {trip.discounts.childrenPercent && (
                <li className="text-xs text-neutral-700 font-medium">
                  <span className="font-bold">{trip.discounts.childrenPercent}% OFF</span> children {trip.discounts.childrenMinAge}-{trip.discounts.childrenMaxAge}
                </li>
              )}
              {trip.discounts.underFiveFree && (
                <li className="text-xs text-neutral-700 font-medium">
                  <span className="font-bold">FREE</span> under 5 years
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="space-y-3">
          {isComingSoon ? (
            <div className="p-4 rounded-xl bg-neutral-100 text-center">
              <p className="font-bold text-neutral-500">Coming Soon</p>
            </div>
          ) : (
            <Link href={whatsAppLink("book")} className="flex items-center justify-center w-full h-14 bg-brand-blue hover:bg-blue-900 text-white text-base font-bold rounded-xl shadow-lg shadow-brand-blue/20">
              Book Now
            </Link>
          )}
          <Link href={whatsAppLink("question")} className="w-full h-12 border-2 border-neutral-300 text-neutral-700 rounded-xl font-semibold hover:border-brand-blue hover:text-brand-blue transition-colors text-sm flex items-center justify-center">
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  );
}
