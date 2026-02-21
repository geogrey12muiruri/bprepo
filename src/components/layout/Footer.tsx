import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/routes";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-neutral-200 border-t border-neutral-800">
      <Container className="py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href={ROUTES.home} className="inline-block mb-6 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/logo.png"
                    alt="BluePineapple Logo"
                    fill
                    className="object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(2878%) hue-rotate(194deg) brightness(104%) contrast(101%)' }}
                  />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Blue Pineapple
                </span>
              </div>
            </Link>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-6 max-w-sm">
              Premium boat trips and coastal experiences in Kenya. Discover the magic of the Indian Ocean with our curated maritime adventures.
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Mombasa, Kenya</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 sm:mb-6 font-bold text-white text-base sm:text-lg uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  href={ROUTES.trips}
                  className="text-neutral-400 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Experiences
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.boats}
                  className="text-neutral-400 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.gallery}
                  className="text-neutral-400 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.contact}
                  className="text-neutral-400 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 sm:mb-6 font-bold text-white text-base sm:text-lg uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm sm:text-base">
              <li>
                <a
                  href="mailto:bluepinappleholdings@gmail.com"
                  className="flex items-center gap-3 text-neutral-400 hover:text-teal-400 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <span className="break-all">bluepinappleholdings@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254708485978"
                  className="flex items-center gap-3 text-neutral-400 hover:text-teal-400 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <span>+254 708 485 978</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254708485978"
                  className="flex items-center gap-3 text-neutral-400 hover:text-teal-400 transition-colors duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-teal-400 group-hover:text-teal-300" />
                  </div>
                  <span>WhatsApp Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 sm:mb-6 font-bold text-white text-base sm:text-lg uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="#" className="text-neutral-400 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1 transform">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-400 hover:text-teal-400 transition-colors duration-300 inline-block hover:translate-x-1 transform">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 sm:pt-10 border-t border-neutral-800">
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed text-center max-w-4xl mx-auto">
            In the event of unseasonal weather or passenger reservations not meeting the minimum requirement, we reserve the right to postpone the trip. A full refund or a new date can be agreed upon.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-neutral-500">
            <p>
              &copy; {currentYear} Blue Pineapple Coastal Services. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
