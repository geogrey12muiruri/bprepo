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
        <article className={`group relative h-[500px] sm:h-[550px] md:h-[500px] lg:h-[450px] overflow-hidden rounded-[2.5rem] bg-neutral-900 shadow-2xl transition-all duration-700 ${!isDisabled && "hover:shadow-teal-500/30 hover:-translate-y-2 cursor-pointer"}`}>
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
                <div className="absolute inset-0 border-2 border-white/0 transition-all duration-700 group-hover:border-white/20 rounded-[2.5rem] pointer-events-none" />
            )}

            {/* Text Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end h-full text-left">
                {isDisabled && statusMessage && (
                    <div className="mb-6 inline-block self-start">
                        <span className="bg-amber-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md">
                            Coming Soon
                        </span>
                    </div>
                )}

                <div className="relative z-10">
                    <Heading level="h3" size="xl" className={`text-white mb-2 md:mb-4 tracking-tighter !leading-none text-3xl md:text-4xl transition-transform duration-500 ${!isDisabled && "group-hover:-translate-y-1"}`}>
                        {title}
                    </Heading>
                    <p className="text-neutral-200/90 text-sm md:text-base leading-relaxed mb-8 md:mb-10 line-clamp-3 max-w-[280px] md:max-w-none transition-all duration-500 group-hover:text-white">
                        {description}
                    </p>

                    {isDisabled ? (
                        <div className="mt-auto px-6 py-5 rounded-[1.5rem] bg-white/5 border border-white/10 text-center backdrop-blur-md">
                            <p className="text-[10px] md:text-xs font-black text-white/50 uppercase tracking-[0.2em] leading-relaxed">
                                {statusMessage}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-500/20">
                                <span className="text-white text-xl transition-transform duration-500 group-hover:translate-x-1">→</span>
                            </div>
                            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
                                {id === "private-charter" ? "Book Private Charter" : "See All Trips"}
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
