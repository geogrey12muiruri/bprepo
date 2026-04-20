"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-white/10 p-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-400">From</p>
            <p className="text-xl font-black text-teal-400">
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
            <Link href={whatsAppLink("book")} className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-white text-base font-bold rounded-xl shadow-lg text-center">
              Book Now
            </Link>
          )}
        </div>
      </div>

      {/* Desktop & Mobile Card */}
      <Card className="p-6 xl:p-8 shadow-xl border-none rounded-2xl bg-white/5 border border-white/10 mb-8 lg:mb-0">
        <div className="mb-6">
          <p className="text-xs font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">
            {trip.pricingModel === "hop_on_hop_off" ? "Hop-On Hop-Off Fares" : "Select Package"}
          </p>
          
          {trip.pricingModel === "hop_on_hop_off" ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-neutral-400">Starting from</p>
              <p className="mt-1 text-3xl font-black text-teal-300">{formatPrice(trip.pricePerPerson)}</p>
              <p className="mt-1 text-xs text-neutral-400">
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
                  className="flex items-center justify-center h-11 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
                >
                  View Full Fares
                </button>
                <Link
                  href={whatsAppLink("book")}
                  className="flex items-center justify-center h-11 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold transition-colors"
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
                    ? "border-teal-500 bg-teal-500/10" 
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-white">Return Trip</span>
                  </div>
                  <span className="text-xl font-black text-teal-400">{formatPrice(trip.priceReturn)}</span>
                </div>
                <p className="text-xs text-neutral-400">Full experience with time at Fort Jesus</p>
              </button>
              
              <button 
                onClick={() => setSelectedPackage("oneway")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPackage === "oneway" 
                    ? "border-teal-500 bg-teal-500/10" 
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                    <span className="font-bold text-neutral-200">One Way</span>
                  </div>
                  <span className="text-xl font-black text-neutral-300">{formatPrice(trip.priceOneWay)}</span>
                </div>
                <p className="text-xs text-neutral-400">To Fort Jesus only</p>
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-neutral-500 mb-1">From</p>
              <p className="text-3xl font-black text-teal-400">{formatPrice(trip.pricePerPerson)}</p>
              <p className="text-xs text-neutral-400">per person</p>
            </div>
          )}
        </div>

        {/* Move discounts above Book Now button */}
        {trip.discounts && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Percent className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Available Offers</p>
            </div>
            <ul className="space-y-2">
              {trip.discounts.kenyansPercent && (
                <li className="text-xs text-amber-200 font-medium">
                  <span className="font-bold">{trip.discounts.kenyansPercent}% OFF</span> Kenyan residents
                </li>
              )}
              {trip.discounts.childrenPercent && (
                <li className="text-xs text-amber-200 font-medium">
                  <span className="font-bold">{trip.discounts.childrenPercent}% OFF</span> children {trip.discounts.childrenMinAge}-{trip.discounts.childrenMaxAge}
                </li>
              )}
              {trip.discounts.underFiveFree && (
                <li className="text-xs text-amber-200 font-medium">
                  <span className="font-bold">FREE</span> under 5 years
                </li>
              )}
              {trip.discounts.launchDiscount && (
                <li className="text-xs text-amber-200 font-medium">
                  <span className="font-bold">{trip.discounts.launchDiscount.percent}% OFF</span> launch discount
                  {trip.discounts.launchDiscount.months && ` (${trip.discounts.launchDiscount.months.join(" & ")})`}
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="space-y-3">
          {isComingSoon ? (
            <div className="p-4 rounded-xl bg-white/5 text-center">
              <p className="font-bold text-neutral-400">Coming Soon</p>
            </div>
          ) : (
            <Link href={whatsAppLink("book")} className="flex items-center justify-center w-full h-14 bg-teal-500 hover:bg-teal-400 text-white text-base font-bold rounded-xl shadow-lg shadow-teal-700/20">
              Book Now
            </Link>
          )}
          <Link href={whatsAppLink("question")} className="w-full h-12 border-2 border-white/20 text-neutral-300 rounded-xl font-semibold hover:bg-white/5 transition-colors text-sm flex items-center justify-center">
            Ask a Question
          </Link>
        </div>
      </Card>
    </div>
  );
}
