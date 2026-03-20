"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Shield, 
  Navigation, 
  Camera, 
  Anchor,
  CheckCircle2,
  Clock,
  Calendar,
  Star
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Boat } from "@/types/boat";

interface BoatCardProps {
    boat: Boat;
}

export function BoatCard({ boat }: BoatCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = boat.gallery && boat.gallery.length > 0 ? boat.gallery : [boat.image];
    const hasMultipleImages = images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-teal-200/50 rounded-2xl sm:rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                {/* Image Section with Gallery */}
                <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-full lg:col-span-2 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50">
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
                        <>
                            <Image
                                src={images[currentImageIndex]}
                                alt={`${boat.name} vessel - Premium boat charter in Mombasa, Kenya ${hasMultipleImages ? `- Photo ${currentImageIndex + 1} of ${images.length}` : ''}`}
                                fill
                                className="object-cover transition-opacity duration-500"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                priority={currentImageIndex === 0}
                                quality={90}
                            />
                            {hasMultipleImages && (
                                <>
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-10 border border-neutral-200"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-neutral-700" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-10 border border-neutral-200"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="w-5 h-5 text-neutral-700" />
                                    </button>
                                    
                                    {/* Image Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    index === currentImageIndex
                                                        ? "bg-white w-8 shadow-lg"
                                                        : "bg-white/60 hover:bg-white/80 w-1.5"
                                                }`}
                                                aria-label={`Go to image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    
                    {/* Capacity Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 border border-neutral-200/50">
                        <Users className="w-4 h-4 text-teal-600" />
                        <span className="font-black text-teal-700 text-lg">{boat.capacity}</span>
                        <span className="text-xs text-neutral-500 font-bold uppercase">Guests</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 md:p-8 lg:col-span-3 flex flex-col justify-center bg-white">
                    {/* Header */}
                    <div className="mb-5 sm:mb-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <Heading level="h2" size="xl" className="text-neutral-900">
                                {boat.name}
                            </Heading>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500">
                            <Shield className="w-4 h-4 text-teal-600" />
                            <span className="font-semibold">Fully Insured & Certified</span>
                        </div>
                    </div>

                    {/* Key Features Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-7">
                        {boat.features.slice(0, 4).map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all duration-300 group/feature"
                            >
                                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-sm group-hover/feature:shadow-md group-hover/feature:scale-110 transition-all">
                                    {feature.includes("GPS") && <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                    {feature.includes("Surveillance") && <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                    {feature.includes("Insured") && <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                    {feature.includes("Life Jackets") && <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                    {!feature.includes("GPS") && !feature.includes("Surveillance") && !feature.includes("Insured") && !feature.includes("Life Jackets") && (
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    )}
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-neutral-700 leading-tight">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Charter Pricing */}
                    {(boat.hourlyRate || boat.dailyRate) && (
                        <div className="mb-6 p-5 sm:p-6 bg-gradient-to-br from-teal-50 via-blue-50/50 to-teal-50 rounded-2xl border border-teal-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                <p className="text-xs font-bold text-teal-700 uppercase tracking-widest">Charter Rates</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {boat.hourlyRate && (
                                    <div className="p-3 bg-white/60 rounded-xl">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                                            <span className="text-[10px] text-neutral-500 font-semibold uppercase">Hourly</span>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-black text-teal-700">{formatPrice(boat.hourlyRate)}</p>
                                    </div>
                                )}
                                {boat.dailyRate && (
                                    <div className="p-3 bg-white/60 rounded-xl">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                                            <span className="text-[10px] text-neutral-500 font-semibold uppercase">Daily</span>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-black text-teal-700">{formatPrice(boat.dailyRate)}</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-neutral-500 italic leading-relaxed">
                                Booking reservations should be made with as much notice as possible.
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {boat.description}
                    </p>
                </div>
            </div>
        </Card>
    );
}
