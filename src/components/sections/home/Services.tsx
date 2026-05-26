"use client";

import Link from "next/link";
import { ArrowRight, Landmark, Ship, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { services } from "@/data/services";

function getServiceIcon(serviceId: string) {
  if (serviceId === "fort-jesus") return Landmark;
  if (serviceId === "private-charter") return Sparkles;
  return Ship;
}

export function Services() {
  return (
    <section
      id="featured-experiences"
      className="border-b border-neutral-200 bg-gradient-to-b from-blue-50 to-white  py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-brand-blue">
              What we do
            </p>

            <Heading
              level="h2"
              size="xl"
              className="mt-3 !font-bold tracking-tight text-neutral-950"
            >
              Experiences, charters, and historic tours
            </Heading>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              A clean, modern selection of coastal experiences built around
              comfort, safety, and memorable routes.
            </p>
          </div>

          <Link
            href="/trips"
            className="group inline-flex h-11 w-fit items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue hover:shadow-md"
          >
            Browse all experiences
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.id);

            return (
              <Link
                key={service.id}
                href={service.href ?? "/"}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl"
                style={{
                  animation: `fadeUp 700ms ease-out ${index * 120}ms both`,
                }}
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-brand-blue/5 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-base font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-brand-blue">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {service.description}
                  </p>

                  <div className="mt-5 inline-flex items-center text-sm font-semibold text-brand-blue">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}