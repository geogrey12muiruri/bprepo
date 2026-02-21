"use client";

import React from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/format";
import type { Boat } from "@/types/boat";

interface BoatCardProps {
    boat: Boat;
}

export function BoatCard({ boat }: BoatCardProps) {
    return (
        <Card className="group overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 h-full">
                {/* Image Section */}
                <div className="relative h-72 md:h-auto lg:col-span-2 overflow-hidden bg-neutral-100">
                    {boat.video ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={boat.poster || boat.image}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        >
                            <source src={boat.video} type="video/mp4" />
                        </video>
                    ) : (
                        <Image
                            src={boat.image}
                            alt={boat.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content Section */}
                <div className="p-8 lg:col-span-3 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-lg border border-teal-100">
                            <span className="text-xl font-bold">{boat.capacity}</span>
                            <span className="text-xs uppercase ml-2 tracking-tighter opacity-70">Passengers</span>
                        </div>
                        <Heading level="h3" size="xl" className="text-neutral-900">
                            {boat.name}
                        </Heading>
                    </div>

                    <p className="text-neutral-600 leading-relaxed text-balance mb-6">
                        {boat.description}
                    </p>

                    {/* Charter Pricing */}
                    {(boat.hourlyRate || boat.dailyRate) && (
                        <div className="mb-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Charter Hire</p>
                            <div className="grid grid-cols-2 gap-4">
                                {boat.hourlyRate && (
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">Hourly Rate</p>
                                        <p className="text-xl font-black text-teal-600">{formatPrice(boat.hourlyRate)}</p>
                                    </div>
                                )}
                                {boat.dailyRate && (
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">Daily Rate</p>
                                        <p className="text-xl font-black text-teal-600">{formatPrice(boat.dailyRate)}</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-neutral-500 mt-3 italic">
                                Booking reservations should be made with as much notice as possible.
                            </p>
                        </div>
                    )}

                    <div className="mt-auto flex items-center gap-3">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span key={i} className="text-amber-400 text-lg">★</span>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">
                            Fully Insured & Certified
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
