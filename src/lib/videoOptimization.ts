/**
 * Mobile-Friendly Video Rendering Best Practices
 * Optimized for BluePineapple gallery and hero sections
 */

import React from "react"

// ============================================
// 1. VIDEO OPTIMIZATION OVERVIEW
// ============================================

/*
KEY CHALLENGES ON MOBILE:
- Limited bandwidth (2G/3G/4G variation)
- Battery consumption
- Screen real estate
- Network interruptions
- Autoplay restrictions
- Different video codec support

SOLUTION STRATEGY:
1. Adaptive bitrate streaming (multiple quality versions)
2. Lazy loading & intersection observer
3. Poster images (prevents blank while loading)
4. Responsive container sizing
5. Format fallbacks (MP4, WebM)
6. Efficient compression
7. No autoplay with sound (browser restriction)
*/

// ============================================
// 2. VIDEO FORMAT & CODEC RECOMMENDATIONS
// ============================================

/*
RECOMMENDED SETUP:
┌─────────────────────────────────────────────────────┐
│ Format      │ Codec        │ Notes                  │
├─────────────────────────────────────────────────────┤
│ MP4         │ H.264 + AAC  │ Universal compatibility│
│             │              │ Broadest device support│
│             │              │ Good compression       │
├─────────────────────────────────────────────────────┤
│ WebM        │ VP9/VP8      │ 25-30% smaller        │
│             │              │ Better for desktop    │
│             │              │ Limited mobile support│
├─────────────────────────────────────────────────────┤
│ HEVC (H.265)│ HEVC         │ 40% smaller than H.264│
│             │              │ Limited mobile support│
│             │              │ Use as enhancement    │
└─────────────────────────────────────────────────────┘

MINIMUM BITRATES FOR GOOD MOBILE EXPERIENCE:
- 4G LTE:    2-4 Mbps
- 4G:        1-2 Mbps
- 3G:        0.5-1 Mbps
- Mobile 2G: 0.2-0.5 Mbps

VARIABLE BITRATE (VBR) ENCODING:
Use multiple quality versions:
- Ultra HD (4K):    8000-12000 kbps    (desktop only)
- Full HD (1080p):  4000-6000 kbps     (desktop/tablet)
- HD (720p):        2000-3000 kbps     (tablet/mobile)
- SD (480p):        800-1200 kbps      (mobile fallback)
- Low (360p):       400-600 kbps       (very poor connection)
*/

// ============================================
// 3. BEST PRACTICES CHECKLIST
// ============================================

const MOBILE_VIDEO_BEST_PRACTICES = {
  /* DELIVERY */
  "Use CDN": "Always serve from CDN, not origin server",
  "Enable GZIP": "Compress video delivery (if possible)",
  "HTTP/2": "Use modern protocols for parallel requests",
  "Range requests": "Allow seeking without downloading full video",

  /* PERFORMANCE */
  "Lazy load": "Don't start loading until visible",
  "Poster image": "Show thumbnail while loading",
  "Preload: none": "Don't preload video data",
  "muted attribute": "Allows autoplay on most browsers",

  /* RESPONSIVENESS */
  "Responsive container": "Use aspect ratio boxes",
  "Max container width": "Don't exceed max reasonable size",
  "Touch controls": "Always show native controls on mobile",
  "Full screen": "Make fullscreen easily accessible",

  /* QUALITY */
  "Aspect ratio boxes": "Prevent layout shift",
  "Compressed posters": "Use modern formats (WEBP)",
  "Clear call-to-action": "If autoplay muted, indicate video is interactive",

  /* ACCESSIBILITY */
  "Captions/subtitles": "For deaf users and noisy environments",
  "Audio descriptions": "For visually impaired users",
  "Keyboard controls": "Allow play/pause via keyboard",
  "Readable transcripts": "For search engines & accessibility",

  /* FALLBACKS */
  "Multiple formats": "MP4 + WebM at minimum",
  "Error handling": "Graceful degradation if video fails",
  "Progressive enhancement": "Works without JavaScript",
}

// ============================================
// 4. FILE SIZE & COMPRESSION GUIDE
// ============================================

/*
OPTIMAL VIDEO SIZE TARGETS FOR MOBILE:

30-second video:
- Source: ~500-800 MB (raw)
- Final MP4 (1080p): 15-25 MB
- Final MP4 (720p):  8-12 MB
- Final MP4 (480p):  3-5 MB
- Poster image:      150-350 KB (compressed JPEG/WEBP)

1-minute video:
- Final MP4 (1080p): 30-50 MB
- Final MP4 (720p):  15-25 MB
- Final MP4 (480p):  6-10 MB

COMPRESSION COMMANDS (FFmpeg):

For mobile-friendly MP4 (720p):
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 26 \
  -preset fast \
  -vf scale=1280:720 \
  -acodec aac \
  -b:a 128k \
  output-720p.mp4

For fast compression (lower quality):
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset ultrafast \
  -vf scale=854:480 \
  -acodec aac \
  -b:a 96k \
  output-480p.mp4

For tiny file size (very poor connection):
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 32 \
  -preset ultrafast \
  -vf scale=640:360 \
  -acodec aac \
  -b:a 64k \
  output-360p.mp4

CRF (Quality) Scale (0-51, lower = better):
- 18-23: High quality (file heavy)
- 23-28: Good quality (recommended)
- 28-33: OK quality (mobile friendly)
- 33+:   Poor quality (emergency only)

Preset (speed tradeoff):
- ultrafast: ~10x real-time (poor compression)
- fast:      ~3x real-time (good balance)
- medium:    ~1x real-time (better compression)
- slow:      ~0.3x real-time (best compression)
*/

// ============================================
// 5. RESPONSIVE VIDEO CONTAINER PATTERN
// ============================================

// In CSS (tokens.css or global styles):
const CSS_ASPECT_RATIO_PATTERN = `
/* Maintain aspect ratio to prevent layout shift */
.video-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 1rem;
  background: #000;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Alternative for 4:3 content */
.video-container--4-3 {
  padding-bottom: 75%; /* 4:3 aspect ratio */
}

/* Mobile optimization */
@media (max-width: 640px) {
  .video-container {
    border-radius: 0.75rem;
  }
}
`

// ============================================
// 6. REACT COMPONENT: OPTIMIZED MOBILE VIDEO
// ============================================

export interface OptimizedVideoProps {
  src: string // Main video MP4
  poster: string // Thumbnail
  alt: string
  title?: string
  description?: string
  aspectRatio?: "16-9" | "4-3" | "square"
  autoplay?: boolean // Only works if muted
  muted?: boolean
  loop?: boolean
  lazy?: boolean
  controls?: boolean
  fallbackImage?: string
}

const ASPECT_RATIOS = {
  "16-9": "56.25%", // 1920x1080
  "4-3": "75%",     // 1024x768
  "square": "100%", // 1x1
}

// Component implementation shown below in section 7

// ============================================
// 7. TYPESCRIPT UTILITY FUNCTIONS
// ============================================

/**
 * Get video source based on device capability
 * Returns appropriate quality MP4 for connection speed
 */
export function getOptimalVideoSrc(
  baseUrl: string,
  options?: {
    preferWebM?: boolean
    connectionSpeed?: "slow" | "fast" | "very-slow"
  }
): string {
  const { preferWebM = false, connectionSpeed = "fast" } = options || {}

  // Return based on connection quality
  if (connectionSpeed === "slow") {
    return `${baseUrl}-480p.mp4` // 480p fallback
  }
  if (connectionSpeed === "very-slow") {
    return `${baseUrl}-360p.mp4` // 360p for poor connection
  }

  // Fast connection: return highest quality
  if (preferWebM) {
    return `${baseUrl}.webm` // WebM for modern browsers
  }
  return `${baseUrl}.mp4` // MP4 universal fallback
}

/**
 * Detect device connection speed (rough estimate)
 */
export async function detectConnectionSpeed(): Promise<
  "slow" | "fast" | "offline"
> {
  if ("connection" in navigator) {
    const nav = navigator as unknown as { connection?: { effectiveType: string } }
    const connection = nav.connection
    const effectiveType = connection?.effectiveType

    switch (effectiveType) {
      case "4g":
        return "fast"
      case "3g":
        return "slow"
      case "2g":
      case "slow-2g":
        return "slow"
      default:
        return "fast"
    }
  }

  // Fallback if API not available
  return "fast"
}

/**
 * Video metadata for analytics
 */
export interface VideoMetrics {
  duration: number
  played: number
  paused: number
  completed: boolean
  abandonedAt: number
}

/**
 * Format video duration for display
 */
export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return `${minutes}:${String(secs).padStart(2, "0")}`
}

/**
 * Calculate file size for display
 */
export function calculateVideoFileSize(
  durationSeconds: number,
  bitrateMbps: number
): string {
  const megabytes = (durationSeconds * bitrateMbps) / 8
  return `${Math.round(megabytes)} MB`
}

/**
 * Recommend video quality based on device/connection
 */
export function recommendVideoQuality(options: {
  screenWidth: number
  connectionSpeed: "slow" | "fast" | "very-slow"
  isTablet: boolean
}): {
  resolution: string
  bitrate: string
  filename: string
} {
  const { screenWidth, connectionSpeed, isTablet } = options

  // Very poor connection
  if (connectionSpeed === "very-slow") {
    return {
      resolution: "360p",
      bitrate: "400-600 kbps",
      filename: "-360p.mp4",
    }
  }

  // Slow connection
  if (connectionSpeed === "slow") {
    return {
      resolution: "480p",
      bitrate: "800-1200 kbps",
      filename: "-480p.mp4",
    }
  }

  // Fast connection - check screen size
  if (isTablet && screenWidth >= 1024) {
    return {
      resolution: "720p",
      bitrate: "2000-3000 kbps",
      filename: "-720p.mp4",
    }
  }

  if (screenWidth >= 768) {
    return {
      resolution: "720p",
      bitrate: "2000-3000 kbps",
      filename: "-720p.mp4",
    }
  }

  // Small phones
  return {
    resolution: "480p",
    bitrate: "800-1200 kbps",
    filename: "-480p.mp4",
  }
}

// ============================================
// 8. PERFORMANCE OPTIMIZATION HOOKS
// ============================================

/**
 * Intersection Observer for lazy loading
 * Start loading video only when visible
 *
 * Usage in a client component:
 * const videoRef = useRef<HTMLVideoElement>(null)
 * setupVideoLazyLoad(videoRef, true)
 */
export function setupVideoLazyLoad(
  videoRef: React.RefObject<HTMLVideoElement>,
  enabled: boolean = true
) {
  if (!enabled || !videoRef.current) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Video is visible - start buffering
          const video = entry.target as HTMLVideoElement
          if (video && !video.src) {
            video.load()
          }
        }
      })
    },
    {
      threshold: 0.25, // Trigger when 25% visible
    }
  )

  observer.observe(videoRef.current)

  return () => {
    observer.disconnect()
  }
}

/**
 * Track video engagement metrics
 * Returns an object with event handlers to attach to video element
 *
 * Usage:
 * const handlers = setupVideoMetrics()
 * <video onPlay={handlers.onPlay} onPause={handlers.onPause} ... />
 */
export function setupVideoMetrics(onMetricsUpdate?: (m: VideoMetrics) => void) {
  const metrics: VideoMetrics = {
    duration: 0,
    played: 0,
    paused: 0,
    completed: false,
    abandonedAt: 0,
  }

  return {
    onLoadedMetadata: (video: HTMLVideoElement) => {
      metrics.duration = video.duration
      onMetricsUpdate?.(metrics)
    },
    onPlay: () => {
      metrics.played += 1
      onMetricsUpdate?.(metrics)
    },
    onPause: (video: HTMLVideoElement) => {
      metrics.paused += 1
      metrics.abandonedAt = video.currentTime
      onMetricsUpdate?.(metrics)
    },
    onEnded: () => {
      metrics.completed = true
      onMetricsUpdate?.(metrics)
    },
    getMetrics: () => metrics,
  }
}

// ============================================
// 9. MOBILE VIDEO STREAMING TIP
// ============================================

/*
FOR PRODUCTION WITH HIGH TRAFFIC:

Consider HLS (HTTP Live Streaming):
- Adaptive bitrate switching
- Resume playback
- True streaming experience
- Better than progressive download

Tools:
- HLS.js (JavaScript)
- Video.js with HLS plugin
- AWS CloudFront with HLS

For your use case (gallery/hero videos):
- HLS overkill for <2 min videos
- Progressive MP4 download sufficient
- Use CDN for delivery

Cost comparison:
- Self-hosted MP4:        ~$0.01 per GB
- Cloudflare Video Stream: ~$5 per 1000 views
- AWS CloudFront:         ~$0.02 per GB
- Mux (recommended):      ~$0.01-0.05 per GB + $0.10 per 1000 views

RECOMMENDATION FOR BluePineapple:
- Use CloudFlare or AWS CloudFront for MP4 delivery
- Implement Range requests (automatic with most CDNs)
- No need for HLS streaming yet (simple videos)
- Revisit if videos get heavier traffic
*/

// ============================================
// 10. VIDEO CHECKLIST FOR YOUR SITE
// ============================================

export const MOBILE_VIDEO_IMPLEMENTATION_CHECKLIST = [
  "✓ Create 3 quality versions: 720p, 480p, 360p",
  "✓ All videos should be MP4 (H.264)",
  "✓ File sizes: 480p = 5-10 MB max for 1 min",
  "✓ Use aspect-ratio CSS for layout stability",
  "✓ Implement lazy loading with Intersection Observer",
  "✓ Show poster image while loading",
  "✓ Use 'muted' attributes for autoplay support",
  "✓ Never autoplay with audio (browser blocks it)",
  "✓ Always include native browser controls",
  "✓ Test on real devices (not just browsers)",
  "✓ Serve from CDN (not origin server)",
  "✓ Enable gzip compression",
  "✓ Add captions/subtitles (accessibility)",
  "✓ Monitor video loading performance",
  "✓ Create smaller thumbnails for mobile (max 350kb)",
  "✓ Test on slow connections (throttle in DevTools)",
]
