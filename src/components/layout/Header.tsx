"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";

// Navigation items
const NAV_LINKS = [
  { label: "Experiences", href: ROUTES.trips },
  { label: "Our Fleet", href: ROUTES.boats },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact", href: ROUTES.contact },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Header style logic
  // If not home, always show "scrolled" style (solid background) for readability
  // If home, transparent at top, solid when scrolled
  const showSolidHeader = !isHome || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${showSolidHeader
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5 lg:py-6"
          }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.home} className="relative z-[110] flex items-center gap-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="Blue Pineapple Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 40px, 48px"
                priority
              />
            </div>
            <span
              className={`font-black tracking-tight text-lg lg:text-xl uppercase transition-opacity duration-300 ${isHome && !isScrolled ? "opacity-95" : "opacity-100"
                } bg-gradient-to-r from-brand-blue to-teal-500 bg-clip-text text-transparent drop-shadow-sm`}
            >
              Blue Pineapple
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 hover:text-brand-teal ${isHome && !isScrolled ? "text-white/90" : "text-brand-ink/80"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={ROUTES.contact}
              variant="primary"
              size="md"
              className={isHome && !isScrolled ? "bg-white text-brand-blue hover:bg-white/90 shadow-none" : ""}
            >
              Book via WhatsApp
            </Button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Optional: Compact CTA for mobile if needed, or just keep it in menu */}
            {/* <Button href={ROUTES.contact} size="sm" className="hidden sm:inline-flex">Book</Button> */}

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors ${isHome && !isScrolled
                ? "text-white hover:bg-white/10"
                : "text-brand-ink hover:bg-brand-ink/5"
                }`}
              aria-label="Open menu"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <Sheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} side="right">
        <div className="flex flex-col h-full bg-white relative">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="font-bold text-brand-blue uppercase tracking-widest text-sm">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-brand-ink transition-colors"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-8 px-8 flex flex-col">
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-brand-ink hover:text-brand-teal transition-colors flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal">
                    →
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-gray-100 space-y-6">
              <Button href={ROUTES.contact} fullWidth size="md" variant="primary">
                Book via WhatsApp
              </Button>

              <div className="text-center space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Us</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+254708485978" className="text-brand-blue font-bold text-lg hover:text-brand-teal transition-colors">
                    +254 708 485 978
                  </a>
                  <a href="mailto:bluepinappleholdings@gmail.com" className="text-sm text-gray-500 hover:text-brand-ink transition-colors">
                    bluepinappleholdings@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 bg-brand-sand/30 border-t border-gray-100/50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Blue Pineapple Mombasa</p>
          </div>
        </div>
      </Sheet>
    </>
  );
}
