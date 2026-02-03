"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { Container } from "@/components/ui/Container";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Experiences", href: ROUTES.trips },
    { label: "Our Fleet", href: ROUTES.boats },
    { label: "Gallery", href: ROUTES.gallery },
    { label: "Contact", href: ROUTES.contact },
  ];

  const isHome = pathname === ROUTES.home;
  const showScrolledStyle = isScrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${showScrolledStyle
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-6"
          }`}
      >
        <Container className="flex items-center justify-between">
          <Link href={ROUTES.home} className="flex items-center gap-3 group">
            <div className={`relative w-16 h-16 transition-all duration-500 group-hover:scale-110 ${!showScrolledStyle && "brightness-0 invert"}`}>
              <Image
                src="/images/logo.png"
                alt="BluePineapple Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${showScrolledStyle ? "text-neutral-900" : "text-white"
              }`}>
              Blue Pineapple
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-black uppercase tracking-widest transition-all duration-300 hover:text-teal-500 relative group ${showScrolledStyle ? "text-neutral-600" : "text-white/80"
                  }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link href={ROUTES.contact}>
              <button
                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 ${showScrolledStyle
                  ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20"
                  : "bg-white text-teal-900 hover:bg-neutral-100 shadow-xl"
                  }`}
              >
                Book Now
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all active:scale-90 z-[110]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? "rotate-45 translate-y-2" : ""
                } ${showScrolledStyle || isOpen ? "bg-neutral-900" : "bg-white"}`} />
              <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? "opacity-0 translate-x-4" : ""
                } ${showScrolledStyle || isOpen ? "bg-neutral-900" : "bg-white"}`} />
              <span className={`w-full h-0.5 transition-all duration-500 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                } ${showScrolledStyle || isOpen ? "bg-neutral-900" : "bg-white"}`} />
            </div>
          </button>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[95] bg-white transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="h-full flex flex-col items-center justify-center p-10">
          <nav className="flex flex-col items-center gap-8 text-center">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-4xl font-black text-neutral-900 tracking-tighter transition-all duration-500 hover:text-teal-600 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`mt-10 transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
                }`}
              style={{ transitionDelay: "500ms" }}
            >
              <Link href={ROUTES.contact}>
                <button className="bg-teal-600 text-white px-12 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-teal-600/30 active:scale-95">
                  Book Now
                </button>
              </Link>
            </div>
          </nav>

          <div className="absolute bottom-10 left-0 right-0 text-center">
            <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em] mb-4">BluePineapple Mombasa</p>
            <div className="flex justify-center gap-6 opacity-30">
              <span className="text-xl">Facebook</span>
              <span className="text-xl">Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
