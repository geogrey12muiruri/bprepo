"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { boats } from "@/data/boats";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";

export function BoatsPreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBoat = boats[activeIndex];
  const totalBoats = boats.length;

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? totalBoats - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === totalBoats - 1 ? 0 : current + 1
    );
  };

  if (!activeBoat) return null;

  return (
    <section
      id="fleet"
      className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-sky-50 via-white to-blue-50/40 py-14 sm:py-16 lg:py-24"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-brand-blue">
              Fleet
            </p>

            <Heading
              level="h2"
              size="xl"
              className="mt-3 !font-bold tracking-tight text-neutral-950"
            >
              Meet the Blue Pineapple fleet
            </Heading>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              Featured coastal vessels selected for comfort, safety, harbour
              tours, private charters, and memorable Mombasa experiences.
            </p>
          </div>

          <Link
            href={ROUTES.boats}
            className="group inline-flex h-11 w-fit items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue hover:shadow-md"
          >
            View full fleet
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-neutral-100 sm:min-h-[420px] lg:min-h-[520px]">
              <Image
                key={activeBoat.id}
                src={activeBoat.image}
                alt={activeBoat.name}
                fill
                priority
                className="object-cover animate-[fleetImageFade_500ms_ease-out_both]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <div className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-700 shadow-sm backdrop-blur-sm">
                Vessel {activeIndex + 1} of {totalBoats}
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 sm:p-7 lg:p-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">
                  Blue Pineapple Vessel
                </p>

                <Heading
                  key={activeBoat.name}
                  level="h3"
                  size="lg"
                  className="mt-3 text-neutral-950 !font-bold tracking-tight animate-[fadeUp_450ms_ease-out_both]"
                >
                  {activeBoat.name}
                </Heading>

                <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                  Comfortable, crew-supported, and ready for premium coastal
                  experiences along the Mombasa coastline.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-neutral-800">
                    <Users className="h-4 w-4 text-brand-blue" />
                    Up to {activeBoat.capacity} guests
                  </div>

                  <div className="rounded-full bg-brand-blue px-4 py-2 text-sm font-bold text-white">
                    From{" "}
                    {formatPrice(
                      activeBoat.hourlyRate || activeBoat.dailyRate || 0
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
                    aria-label="View previous vessel"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue"
                    aria-label="View next vessel"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <div className="ml-2 flex items-center gap-2">
                    {boats.map((boat, index) => (
                      <button
                        key={boat.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? "w-8 bg-brand-blue"
                            : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                        }`}
                        aria-label={`View ${boat.name}`}
                      />
                    ))}
                  </div>
                </div>

                <Link
                  href={ROUTES.boats}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-brand-blue"
                >
                  See vessel details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fleetImageFade {
          from {
            opacity: 0.7;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}