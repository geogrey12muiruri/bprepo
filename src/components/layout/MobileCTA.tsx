"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

export function MobileCTA() {
  const handleClick = () => {
    const bookingSection = document.querySelector("#booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = ROUTES.contact;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white/80 backdrop-blur-xl border-t border-neutral-100 p-4 md:hidden safe-area-inset-bottom">
      <Button
        onClick={handleClick}
        className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-teal-600/20"
      >
        Book Experience
      </Button>
    </div>
  );
}
