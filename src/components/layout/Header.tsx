"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

import { EMAIL, PHONE_TEL } from "@/constants/contacts";
import { ROUTES } from "@/lib/routes";
import { buildGeneralBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { Sheet } from "@/components/ui/Sheet";

const NAV_LINKS = [
  { label: "Experiences", href: ROUTES.trips },
  { label: "Fort Jesus", href: ROUTES.trip("fort-jesus-trip") },
  { label: "Our Fleet", href: ROUTES.boats },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact", href: ROUTES.contact },
];

const logoSrc = "/images/logo.png";

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
    ? "bg-neutral-900/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/10"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] py-3 transition-all duration-300 ${headerBg}`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Desktop */}
            <div className="hidden w-full items-center justify-between md:flex">
              <div className="flex items-center gap-6">
                <Link href={ROUTES.home} className="relative z-[110] flex items-center">
                  <div className="relative h-14 w-14 transition-transform duration-300 hover:scale-105 lg:h-16 lg:w-16">
                    <Image
                      src={logoSrc}
                      alt="Blue Pineapple Coastal Services"
                      fill
                      priority
                      sizes="(max-width: 1024px) 56px, 64px"
                      className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </Link>

                <nav className="flex items-center gap-8">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`relative text-sm font-medium transition-colors ${
                          isActive ? "text-white" : "text-white/85 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-white" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <a
                href={buildWhatsAppUrl(buildGeneralBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-900"
              >
                <MessageCircle className="h-4 w-4" />
                Book Now
              </a>
            </div>

            {/* Mobile */}
            <div className="flex w-full items-center justify-between md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link href={ROUTES.home} className="relative z-[110] flex items-center">
                <div className="relative h-14 w-14 transition-transform duration-300 hover:scale-105">
                  <Image
                    src={logoSrc}
                    alt="Blue Pineapple Coastal Services"
                    fill
                    priority
                    sizes="56px"
                    className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </Link>

              <div className="h-10 w-10" aria-hidden="true" />
            </div>
          </div>
        </Container>
      </header>

      <Sheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        side="right"
      >
        <div className="flex h-full flex-col bg-neutral-900">
          <div className="flex items-center justify-between border-b border-white/5 p-5">
            <Link
              href={ROUTES.home}
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative h-12 w-12">
                <Image
                  src={logoSrc}
                  alt="Blue Pineapple Coastal Services"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-white">Blue Pineapple</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-neutral-300 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 px-4">
              <a
                href={buildWhatsAppUrl(buildGeneralBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
              >
                <MessageCircle className="h-5 w-5" />
                Book via WhatsApp
              </a>
            </div>
          </nav>

          <div className="border-t border-white/5 p-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">
              Get in touch
            </p>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5 text-neutral-400 group-hover:text-white" />
                <span className="text-xs text-neutral-400 group-hover:text-white">
                  Call
                </span>
              </a>

              <a
                href={buildWhatsAppUrl(buildGeneralBookingMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5 text-neutral-400 group-hover:text-white" />
                <span className="text-xs text-neutral-400 group-hover:text-white">
                  WhatsApp
                </span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="group flex flex-col items-center gap-2 rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
              >
                <Mail className="h-5 w-5 text-neutral-400 group-hover:text-white" />
                <span className="text-xs text-neutral-400 group-hover:text-white">
                  Email
                </span>
              </a>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}