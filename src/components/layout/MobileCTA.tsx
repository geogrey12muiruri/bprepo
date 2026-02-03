"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export function MobileCTA() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/254708485978", "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white/90 backdrop-blur-xl border-t border-neutral-100 p-4 md:hidden safe-area-inset-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Button
        onClick={handleWhatsApp}
        className="w-full h-14 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-teal-600/20 bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2"
      >
        <span>Book via WhatsApp</span>
      </Button>
    </div>
  );
}
