"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageCarousel({
  images,
  alt,
  fill = true,
  className = "",
  imageClassName = "",
  priority = false,
  sizes,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // If there's only one image, fall back to standard rendering
  if (!images || images.length <= 1) {
    const src = images?.[0] || "";
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={imageClassName}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollPosition / width);
      setCurrentIndex(index);
    }
  };

  return (
    <div className={`relative w-full h-full ${className} group/carousel`} onClick={(e) => e.stopPropagation()}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {images.map((src, idx) => (
          <div key={idx} className="relative w-full h-full flex-none snap-center overflow-hidden">
            <Image
              src={src}
              alt={`${alt} - Image ${idx + 1}`}
              fill={fill}
              className={imageClassName}
              priority={priority && idx === 0}
              sizes={sizes}
            />
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-4 bg-teal-400" : "w-1.5 bg-white/60 backdrop-blur-sm"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
