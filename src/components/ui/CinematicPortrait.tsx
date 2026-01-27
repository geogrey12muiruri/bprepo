"use client";

import React from "react";

interface CinematicPortraitProps {
    videoSrc: string;
    posterSrc?: string;
    caption?: string;
    className?: string;
}

export function CinematicPortrait({
    videoSrc,
    posterSrc,
    caption,
    className = "",
}: CinematicPortraitProps) {
    return (
        <div className={`group relative flex flex-col items-center ${className}`}>
            {/* Cinematic Frame */}
            <div className="relative aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[2rem] border-[8px] border-white/10 bg-neutral-900 shadow-2xl ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-[1.02]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterSrc}
                    className="h-full w-full object-cover"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {caption && (
                <p className="mt-4 text-sm font-semibold text-neutral-500 uppercase tracking-widest text-center">
                    {caption}
                </p>
            )}
        </div>
    );
}
