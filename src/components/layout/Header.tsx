"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { buildWhatsAppUrl, buildGeneralBookingMessage } from "@/lib/whatsapp";
import { EMAIL, PHONE_TEL } from "@/constants/contacts";
import { Container } from "@/components/ui/Container";
import { Sheet } from "@/components/ui/Sheet";
import { MessageCircle, Mail, Phone, X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Experiences", href: ROUTES.trips },
  { label: "Fort Jesus", href: ROUTES.trip("fort-jesus-trip") },
  { label: "Our Fleet", href: ROUTES.boats },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact", href: ROUTES.contact },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolidHeader = !isHome || isScrolled;
  const headerBg = showSolidHeader 
    ? "bg-neutral-900/95 backdrop-blur-md border-b border-white/5" 
    : "bg-transparent";
  const textColor = "text-white";
  const hoverColor = "hover:text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerBg} py-3`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={ROUTES.home} className="relative z-[110]">
              <div className="relative w-10 h-10 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Blue Pineapple"
                  fill
                  className="object-contain"
                  sizes="40px"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav - minimal text links */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative ${
                      isActive ? "text-white" : `${textColor} ${hoverColor}`
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href={buildWhatsAppUrl(buildGeneralBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-blue-900 text-white text-sm font-semibold rounded-full transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Book Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-blue-900/10 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer - Dark Theme */}
      <Sheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} side="right">
        <div className="flex flex-col h-full bg-neutral-900">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <Link 
              href={ROUTES.home} 
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative w-9 h-9">
                <Image
                  src="/images/logo.png"
                  alt="Blue Pineapple"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <span className="font-bold text-white">Blue Pineapple</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-blue-900/5 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-neutral-300 hover:bg-blue-900/5 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8 px-4">
              <a
                href={buildWhatsAppUrl(buildGeneralBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-brand-blue hover:bg-blue-900 text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
              </a>
            </div>
          </nav>

          {/* Contact Options */}
          <div className="p-5 border-t border-white/5">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Get in touch</p>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-blue-900/10 transition-colors group"
              >
                <Phone className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                <span className="text-xs text-neutral-400 group-hover:text-white">Call</span>
              </a>
              <a
                href={buildWhatsAppUrl(buildGeneralBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-blue-900/10 transition-colors group"
              >
                <MessageCircle className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                <span className="text-xs text-neutral-400 group-hover:text-white">WhatsApp</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-blue-900/10 transition-colors group"
              >
                <Mail className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                <span className="text-xs text-neutral-400 group-hover:text-white">Email</span>
              </a>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}
