import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/routes";
import {
  EMAIL,
  PHONE_TEL,
  BUSINESS_NAME_FULL
} from "@/constants/contacts";
import { buildWhatsAppUrl, buildGeneralBookingMessage } from "@/lib/whatsapp";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-white/5">
      <Container className="py-10 sm:py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href={ROUTES.home} className="group">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="BluePineapple Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Quick Links - centered */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
          <Link href={ROUTES.trips} className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">
            Experiences
          </Link>
          <Link href={ROUTES.boats} className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">
            Our Fleet
          </Link>
          <Link href={ROUTES.gallery} className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">
            Gallery
          </Link>
          <Link href={ROUTES.contact} className="text-sm text-neutral-400 hover:text-teal-400 transition-colors">
            Contact
          </Link>
        </div>

        {/* Contact Icons - centered row */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href={`mailto:${EMAIL}`}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500/20 transition-colors group"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-neutral-400 group-hover:text-teal-400" />
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500/20 transition-colors group"
            aria-label="Call"
          >
            <Phone className="w-5 h-5 text-neutral-400 group-hover:text-teal-400" />
          </a>
          <a
            href={buildWhatsAppUrl(buildGeneralBookingMessage())}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-500/20 transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-neutral-400 group-hover:text-teal-400" />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 px-4">
          <p className="text-xs text-neutral-500 text-center leading-relaxed">
            In the event of unseasonal weather or passenger reservations not meeting the minimum requirement, we reserve the right to postpone the trip.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5">
          <p className="text-xs text-neutral-600 text-center">
            &copy; {currentYear} {BUSINESS_NAME_FULL}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
