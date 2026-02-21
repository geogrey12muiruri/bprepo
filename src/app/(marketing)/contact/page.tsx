import type { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | BluePineapple",
  description: "Get in touch with BluePineapple for booking inquiries and support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50/30 to-white">
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Enhanced Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-600 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Get In Touch
            </span>
          </div>
          <Heading level="h1" size="2xl" className="mb-4 sm:mb-5 md:mb-6 text-neutral-900">
            Contact Us
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Have questions about our trips? We&apos;d love to hear from you.
            Reach out using any of the methods below.
          </p>
        </div>

        {/* Enhanced Contact Cards */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 md:grid-cols-3 mb-12 sm:mb-14 md:mb-16">
          {/* Email */}
          <Card className="group p-6 sm:p-7 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-neutral-100 hover:border-teal-200/50">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-neutral-900">
              Email
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-600 mb-4 sm:mb-5 leading-relaxed">
              For general inquiries and support
            </p>
            <a
              href="mailto:bluepinappleholdings@gmail.com"
              className="text-sm sm:text-base text-teal-600 font-semibold hover:text-teal-700 transition-colors inline-block break-all"
            >
              bluepinappleholdings@gmail.com
            </a>
          </Card>

          {/* Phone */}
          <Card className="group p-6 sm:p-7 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-neutral-100 hover:border-teal-200/50">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500">
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-neutral-900">
              Phone
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-600 mb-4 sm:mb-5 leading-relaxed">
              Call us during business hours
            </p>
            <a
              href="tel:+254708485978"
              className="text-sm sm:text-base text-teal-600 font-semibold hover:text-teal-700 transition-colors"
            >
              +254 708 485 978
            </a>
          </Card>

          {/* Location */}
          <Card className="group p-6 sm:p-7 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-neutral-100 hover:border-teal-200/50">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-teal-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <Heading level="h2" size="lg" className="mb-2 sm:mb-3 text-neutral-900">
              Location
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Mombasa Marina<br />
              Mombasa, Kenya
            </p>
          </Card>
        </div>

        {/* Enhanced Contact Form */}
        <Card className="p-6 sm:p-8 md:p-10 max-w-2xl mx-auto border border-neutral-100 shadow-xl">
          <div className="mb-6 sm:mb-8">
            <Heading level="h2" size="xl" className="mb-2 sm:mb-3 text-neutral-900">
              Send us a Message
            </Heading>
            <p className="text-xs sm:text-sm text-neutral-600">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white hover:border-teal-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white hover:border-teal-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white hover:border-teal-300"
                placeholder="+254 708 485 978"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm sm:text-base bg-white hover:border-teal-300"
                placeholder="Booking inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-semibold text-neutral-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 sm:py-3 border border-neutral-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none text-sm sm:text-base bg-white hover:border-teal-300"
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
