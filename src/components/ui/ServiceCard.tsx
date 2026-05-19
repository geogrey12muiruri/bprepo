"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/Heading";
import { Service } from "@/types/service";

interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const { id, title, description, href, image, video, poster, isDisabled, statusMessage } = service;

    const content = (
        <article className={`group relative w-full aspect-[3/4] overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-900 shadow-md hover:shadow-lg transition-all duration-300 ${!isDisabled && "hover:shadow-teal-500/20 hover:-translate-y-0.5 cursor-pointer"}`}>
            {/* Background Media */}
            <div className="absolute inset-0">
                {video ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={poster || image}
                        className={`h-full w-full object-cover object-center transition-transform duration-1000 ${!isDisabled && "group-hover:scale-110"}`}
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                ) : image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={`object-cover object-center transition-transform duration-1000 ${!isDisabled && "group-hover:scale-110"} ${isDisabled && "opacity-40 grayscale"}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    /* Premium Fallback for Asset-less cards */
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-teal-950 to-neutral-900">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />
                    </div>
                )}
            </div>

            {/* Cinematic Overlays */}
            {/* Top subtle vignette to show video detail */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

            {/* Bottom heavy overlay for legibility */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 ${!isDisabled && "group-hover:opacity-60"}`} />

            {/* Interactive Border Effect */}
            {!isDisabled && (
                <div className="absolute inset-0 border border-white/0 transition-all duration-300 group-hover:border-white/20 rounded-xl sm:rounded-2xl pointer-events-none" />
            )}

            {/* Text Content */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 flex flex-col justify-end h-full text-left">
                {isDisabled && statusMessage && (
                    <div className="mb-2 sm:mb-2.5 inline-block self-start">
                        <span className="bg-amber-500 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] shadow-md backdrop-blur-sm">
                            Coming Soon
                        </span>
                    </div>
                )}

                <div className="relative z-10">
                    <Heading level="h3" size="xl" className={`text-white mb-1 sm:mb-1.5 tracking-tight !leading-tight text-sm sm:text-base md:text-lg transition-transform duration-300 ${!isDisabled && "group-hover:-translate-y-0.5"}`}>
                        {title}
                    </Heading>
                    <p className="text-neutral-200/90 text-[10px] sm:text-xs md:text-sm leading-snug mb-2 sm:mb-2.5 line-clamp-2 transition-all duration-300 group-hover:text-white">
                        {description}
                    </p>

                    {isDisabled ? (
                        <div className="mt-auto px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg bg-white/5 border border-white/10 text-center backdrop-blur-sm">
                            <p className="text-[8px] sm:text-[9px] font-black text-white/50 uppercase tracking-[0.15em] leading-tight">
                                {statusMessage}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-teal-500/20">
                                <span className="text-white text-xs sm:text-sm md:text-base transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                            </div>
                            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.15em] opacity-60 group-hover:opacity-100 transition-opacity">
                                {id === "private-charter" ? "Book Charter" : "See Trips"}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );

    if (isDisabled || !href) {
        return content;
    }

    return (
        <Link href={href} className="block">
            {content}
        </Link>
    );
}
