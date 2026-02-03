import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/routes";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative w-14 h-14 brightness-0 invert opacity-90">
                <Image
                  src="/images/logo.png"
                  alt="BluePineapple Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Blue Pineapple
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium boat trips and coastal experiences in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={ROUTES.trips}
                  className="hover:text-teal-400 transition-colors"
                >
                  Trips
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.boats}
                  className="hover:text-teal-400 transition-colors"
                >
                  Boats
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.gallery}
                  className="hover:text-teal-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:bluepinappleholdings@gmail.com"
                  className="hover:text-teal-400 transition-colors"
                >
                  bluepinappleholdings@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+254708485978"
                  className="hover:text-teal-400 transition-colors"
                >
                  +254 708 485 978
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254708485978"
                  className="hover:text-teal-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} Blue Pineapple Coastal Services. All rights reserved. | Made with ❤️ for Kenya
          </p>
        </div>
      </Container>
    </footer>
  );
}
