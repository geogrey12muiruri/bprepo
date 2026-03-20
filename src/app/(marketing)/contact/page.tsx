import type { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | BluePineapple",
  description: "Get in touch with BluePineapple for booking inquiries and support. Located in Mombasa, Kenya.",
  alternates: {
    canonical: "https://www.bluepineappleholdings.com/contact",
  },
  openGraph: {
    title: "Contact Us | BluePineapple",
    description: "Get in touch with BluePineapple for booking inquiries and support.",
    url: "https://www.bluepineappleholdings.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-900 pt-16 sm:pt-20">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-400 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Get In Touch
            </span>
          </div>
          <Heading level="h1" size="2xl" className="mb-4 sm:mb-5 md:mb-6 text-white">
            Contact Us
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Have questions about our trips? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Options - WhatsApp prominent */}
        <div className="flex justify-center mb-10">
          <a
            href="https://wa.me/254708485978?text=Hi%20Blue%20Pineapple%2C%20I%27d%20like%20to%20make%20a%20booking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-all duration-200 shadow-lg shadow-teal-500/25"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 md:grid-cols-3 mb-12 sm:mb-14 md:mb-16">
          {/* Email */}
          <Card className="group p-6 sm:p-7 md:p-8 text-center hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-300">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-teal-400" />
            </div>
            <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-white">
              Email
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-5 leading-relaxed">
              For general inquiries and support
            </p>
            <a
              href="mailto:bluepineappleholdings@gmail.com"
              className="text-sm sm:text-base text-teal-400 font-semibold hover:text-teal-300 transition-colors inline-block break-all"
            >
              bluepineappleholdings@gmail.com
            </a>
          </Card>

          {/* Phone */}
          <Card className="group p-6 sm:p-7 md:p-8 text-center hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-300">
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-teal-400" />
            </div>
            <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-white">
              Phone
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-5 leading-relaxed">
              Call us during business hours
            </p>
            <a
              href="tel:+254708485978"
              className="text-sm sm:text-base text-teal-400 font-semibold hover:text-teal-300 transition-colors"
            >
              +254 708 485 978
            </a>
          </Card>

          {/* Location */}
          <Card className="group p-6 sm:p-7 md:p-8 text-center hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-teal-500/20 transition-all duration-300">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-teal-400" />
            </div>
            <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-white">
              Location
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Mombasa Marina<br />
              Mombasa, Kenya
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6 sm:p-8 md:p-10 max-w-2xl mx-auto bg-white/5 border border-white/10">
          <div className="mb-6 sm:mb-8">
            <Heading level="h2" size="xl" className="mb-2 sm:mb-3 text-white">
              Send us a Message
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-400">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-semibold text-neutral-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-white/10 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white/5 text-white placeholder-neutral-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-neutral-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-white/10 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white/5 text-white placeholder-neutral-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-semibold text-neutral-300 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2.5 sm:py-3 border border-white/10 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white/5 text-white placeholder-neutral-500"
                placeholder="+254 708 485 978"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-semibold text-neutral-300 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full px-4 py-2.5 sm:py-3 border border-white/10 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white/5 text-white placeholder-neutral-500"
                placeholder="Booking inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-semibold text-neutral-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 sm:py-3 border border-white/10 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none text-sm sm:text-base bg-white/5 text-white placeholder-neutral-500"
                placeholder="Tell us how we can help..."
              />
            </div>

            <Button size="lg" className="w-full text-sm sm:text-base py-3 sm:py-3.5">
              Send Message
            </Button>
          </form>

          <p className="text-center text-xs sm:text-sm text-neutral-500 mt-6 sm:mt-8">
            We typically respond within 24 hours during business days.
          </p>
        </Card>
      </Container>
    </div>
  );
}
