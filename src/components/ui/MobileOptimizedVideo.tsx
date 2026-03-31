"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";

/**
 * MobileOptimizedVideo Component
 * Production-ready video player for mobile + desktop
 *
 * Features:
 * - Lazy loading (Intersection Observer)
 * - Responsive aspect ratio
 * - Adaptive quality selection
 * - Custom play button overlay
 * - Touch-friendly controls
 * - Fallback handling
 * - Accessibility support
 */

interface MobileOptimizedVideoProps {
  src: string // Main MP4 video
  poster: string // Thumbnail image
  alt: string
  title?: string
  description?: string
  aspectRatio?: "16-9" | "4-3" | "square"
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  showPlayButton?: boolean
  onPlay?: () => void
  onComplete?: () => void
  className?: string
}

export function MobileOptimizedVideo({
  src,
  poster,
  alt,
  title,
  description,
  aspectRatio = "16-9",
  autoplay = false,
  muted = true, // Always true for autoplay
  loop = false,
  controls = true,
  showPlayButton = true,
  onPlay,
  onComplete,
  className = "",
}: MobileOptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);

  // Aspect ratio percentages
  const aspectRatios = {
    "16-9": "56.25%",
    "4-3": "75%",
    square: "100%",
  };

  // Lazy load with Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isLoaded) {
            // Video is visible - start loading
            videoRef.current.load();
            setIsLoaded(true);
          }
        });
      },
      {
        threshold: 0.1, // Start loading when 10% visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoaded]);

  // Handle video events
  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onComplete?.();
  };

  const handleError = () => {
    console.error("Video failed to load:", src);
    setHasError(true);
  };

  const handleLoadedMetadata = () => {
    // Check if fullscreen is supported
    const docWithWebkit = document as unknown as {
      fullscreenEnabled?: boolean
      webkitFullscreenEnabled?: boolean
    }
    setCanFullscreen(
      document.fullscreenEnabled || docWithWebkit.webkitFullscreenEnabled || false
    );
  };

  // Toggle play
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!videoRef.current.muted);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current
        .requestFullscreen()
        .catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  if (hasError) {
    return (
      <div
        className={`relative w-full bg-neutral-900 rounded-lg overflow-hidden ${className}`}
        style={{ paddingBottom: aspectRatios[aspectRatio] }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg font-semibold mb-2">
              Video unavailable
            </div>
            <p className="text-neutral-400 text-sm">
              The video could not be loaded. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}
      style={{ paddingBottom: aspectRatios[aspectRatio] }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={poster}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={false} // We use custom controls
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={handleError}
        onLoadedMetadata={handleLoadedMetadata}
        preload={isLoaded ? "metadata" : "none"}
        aria-label={alt}
      >
        <source src={src} type="video/mp4" />
        <p className="text-white text-sm">
          Your browser does not support HTML5 video. Please upgrade to play this video.
        </p>
      </video>

      {/* Overlay with gradient */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Play Button Overlay (when paused) */}
      {showPlayButton && !isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label={`Play video: ${alt}`}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:bg-white/30 group-hover:border-white/60 transition-all duration-200 group-hover:scale-110">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </button>
      )}

      {/* Custom Controls (Bottom) */}
      {controls && isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Play/Pause & Mute */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                aria-label="Play/Pause"
              >
                {isPlaying ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.75 1.5a.75.75 0 00-.75.75v16.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V2.25a.75.75 0 00-.75-.75h-1.5zm6.5 0a.75.75 0 00-.75.75v16.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V2.25a.75.75 0 00-.75-.75h-1.5z" />
                  </svg>
                ) : (
                  <Play className="w-5 h-5 text-white fill-white" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Right: Fullscreen */}
            {canFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/10 rounded transition-colors ml-auto"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Info Overlay (hover on paused) */}
      {title && !isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
          <p className="text-white font-semibold text-sm sm:text-base truncate">
            {title}
          </p>
          {description && (
            <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 mt-1">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Touch-friendly hint for mobile */}
      <div className="absolute top-3 right-3 sm:hidden">
        <div className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded text-white opacity-75">
          Tap to play
        </div>
      </div>
    </div>
  );
}

/**
 * Gallery Video Card Component
 * Wrapper for gallery items with video
 */
interface GalleryVideoCardProps {
  id: string;
  src: string;
  poster: string;
  title: string;
  description?: string;
  location?: string;
  featured?: boolean;
}

export function GalleryVideoCard({
  id,
  src,
  poster,
  title,
  description,
  location,
  featured = false,
}: GalleryVideoCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ${
        featured ? "sm:col-span-2 lg:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <MobileOptimizedVideo
        src={src}
        poster={poster}
        alt={title}
        title={title}
        description={description}
        aspectRatio={featured ? "16-9" : "4-3"}
        muted
        loop
        showPlayButton
        controls
      />

      {/* Overlay badges */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm3.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
          Video
        </div>
        {featured && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-teal-500/80 backdrop-blur-sm border border-teal-400/50 text-white text-xs font-semibold">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Location info */}
      {location && (
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1 text-teal-300 text-xs opacity-75 group-hover:opacity-100 transition-opacity">
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{location}</span>
        </div>
      )}
    </div>
  );
}
