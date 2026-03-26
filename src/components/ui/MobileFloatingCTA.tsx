"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { ArrowRight, MessageCircle } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppUrl, buildBookingMessage } from "@/lib/whatsapp";
import type { Trip } from "@/types/trip";

interface MobileFloatingCTAProps {
  trip: Trip;
}

export function MobileFloatingCTA({ trip }: MobileFloatingCTAProps) {
  const whatsappUrl = buildWhatsAppUrl(buildBookingMessage(trip.name));

  return (
    <div className="lg:hidden fixed bottom-1 left-0 right-0 z-[100] px-4 pb-6 animate-fade-in-up">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-neutral-950/80 backdrop-blur-xl border-t border-white/5 shadow-[0_-12px_40px_rgb(0,0,0,0.6)]" />
      <Container className="relative">
        <div className="flex items-center justify-between gap-8 h-20">
          <div className="flex flex-col min-w-[120px] pl-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-black mb-1">Start From</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white leading-none tracking-tight">{formatPrice(trip.pricePerPerson)}</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-none">/ pax</span>
            </div>
          </div>
          
          <Button 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-14 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-black text-sm shadow-[0_8px_20px_rgba(20,184,166,0.3)] active:scale-95 transition-all border border-teal-400/20"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Book Now
          </Button>
        </div>
      </Container>
    </div>
  );
}
