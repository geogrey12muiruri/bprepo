import type { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us | BluePineapple",
  description: "Get in touch with BluePineapple for booking inquiries and support.",
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <Heading level="h1" size="3xl" className="mb-4">
            Contact Us
          </Heading>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Have questions about our trips? We&apos;d love to hear from you.
            Reach out using any of the methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-12">
          {/* Email */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📧</div>
            <Heading level="h2" size="lg" className="mb-2">
              Email
            </Heading>
            <p className="text-neutral-600 mb-4">
              For general inquiries and support
            </p>
            <a
              href="mailto:info@bluepineapple.com"
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              info@bluepineapple.com
            </a>
          </Card>

          {/* Phone */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📞</div>
            <Heading level="h2" size="lg" className="mb-2">
              Phone
            </Heading>
            <p className="text-neutral-600 mb-4">
              Call us during business hours
            </p>
            <a
              href="tel:+254712345678"
              className="text-teal-600 font-semibold hover:text-teal-700"
            >
              +254 712 345 678
            </a>
          </Card>

          {/* Location */}
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📍</div>
            <Heading level="h2" size="lg" className="mb-2">
              Location
            </Heading>
            <p className="text-neutral-600">
              Mombasa Marina<br />
              Mombasa, Kenya
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-8 max-w-2xl mx-auto">
          <Heading level="h2" size="xl" className="mb-6">
            Send us a Message
          </Heading>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="+254 712 345 678"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Booking inquiry"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            <Button size="lg" className="w-full">
              Send Message
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            We typically respond within 24 hours during business days.
          </p>
        </Card>
      </Container>
    </div>
  );
}
