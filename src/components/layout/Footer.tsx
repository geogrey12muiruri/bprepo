import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/routes";
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS_FULL,
  BUSINESS_NAME,
  BUSINESS_NAME_FULL,
} from "@/constants/contacts";
import { buildWhatsAppUrl, buildGeneralBookingMessage } from "@/lib/whatsapp";

const quickLinks = [
  { label: "Experiences", href: ROUTES.trips },
  { label: "Fort Jesus Trip", href: ROUTES.trip("fort-jesus-trip") },
  { label: "Our Fleet", href: ROUTES.boats },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact Us", href: ROUTES.contact },
];

const socialLinks = [
  {
    platform: "TikTok",
    url: "https://www.tiktok.com/@bluepineappleboats?is_from_webapp=1&sender_device=pc",
    icon: "/icons/tik-tok_3046126.png",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/bluepineappleboats?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: "/icons/instagram.png",
  },
  {
    platform: "Facebook",
    url: "https://web.facebook.com/profile.php?id=61575471731284",
    icon: "/icons/facebook.png",
  },
  // Twitter is not available yet
  // {
  //   platform: "Twitter",
  //   url: "",
  //   icon: "/icons/twitter.png",
  // },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsAppHref = buildWhatsAppUrl(buildGeneralBookingMessage());

  return (
    <footer className="bg-neutral-900 border-t border-white/5">
      {/* Accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-teal-500 to-transparent" />

      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-16 lg:gap-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Link href={ROUTES.home} className="group inline-block w-fit">
              <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt={BUSINESS_NAME}
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div>
              <p className="text-white font-semibold text-sm">{BUSINESS_NAME_FULL}</p>
              <p className="mt-1.5 text-neutral-400 text-sm leading-relaxed max-w-sm">
                Premium boat trips and coastal experiences on the Indian Ocean. Mombasa&rsquo;s most trusted maritime service since 2004.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsAppHref}
                className="inline-flex items-center justify-center h-11 px-4 rounded-xl bg-brand-blue hover:bg-blue-900 text-white text-sm font-bold transition-colors shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book on WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-black text-white uppercase tracking-[0.25em] mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact & Hours */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-black text-white uppercase tracking-[0.25em] mb-5">
              Get in Touch
            </p>
            <ul className="space-y-4 max-w-xl">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-400">{ADDRESS_FULL}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`tel:${PHONE_TEL}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-neutral-500 shrink-0" />
                <a
                  href={whatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  WhatsApp booking & enquiries
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="text-sm text-neutral-400 hover:text-white transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                <div className="text-sm text-neutral-400">
                  <p>Mon – Sat: 6:00 AM – 7:00 PM</p>
                  <p>Sun: 7:00 AM – 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4 — Follow Us (Social Media) */}
          <div className="lg:col-span-4">
            <p className="text-[10px] font-black text-white uppercase tracking-[0.25em] mb-5">
              Follow Us
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-neutral-800/50 hover:bg-neutral-700/70 transition-colors duration-300 rounded-full"
                >
                  {social.url && (
                    <Image
                      src={social.icon}
                      alt={`${social.platform} logo`}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 border-t border-white/5 space-y-3">
          <p className="text-xs text-neutral-500 leading-relaxed text-center sm:text-left">
            In the event of unseasonal weather or passenger reservations not meeting the minimum requirement, we reserve the right to postpone the trip.
          </p>
          <p className="text-xs text-neutral-600 text-center sm:text-left">
            &copy; {currentYear} {BUSINESS_NAME_FULL}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
