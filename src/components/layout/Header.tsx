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
        <div className="flex flex-col h-full bg-gradient-to-b from-white to-neutral-50 relative">
          {/* Drawer Header - Modern with Logo */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-100">
            <Link 
              href={ROUTES.home} 
              className="flex items-center gap-2.5 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Blue Pineapple Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="font-black tracking-tight text-base uppercase bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                Blue Pineapple
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-6 sm:py-8 px-5 sm:px-6 flex flex-col">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? "bg-teal-50 text-teal-700 border border-teal-100"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-teal-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-teal-600" : "text-neutral-300 group-hover:text-teal-500 group-hover:translate-x-1"}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-neutral-200 space-y-6">
              <Button 
                href={ROUTES.contact} 
                fullWidth 
                size="lg" 
                variant="primary"
                className="shadow-lg shadow-teal-500/20"
              >
                Book via WhatsApp
              </Button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">Contact</p>
                <div className="space-y-3">
                  <a 
                    href="tel:+254708485978" 
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-teal-50 border border-neutral-100 hover:border-teal-200 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                      <svg className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-neutral-900 font-semibold group-hover:text-teal-700 transition-colors">+254 708 485 978</span>
                  </a>
                  <a 
                    href="mailto:bluepinappleholdings@gmail.com" 
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-teal-50 border border-neutral-100 hover:border-teal-200 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                      <svg className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-600 group-hover:text-teal-700 transition-colors break-all">bluepinappleholdings@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}
