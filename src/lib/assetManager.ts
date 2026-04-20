/**
 * Asset Management Utilities
 * Senior-level helpers for image and video handling
 */

export interface AssetConfig {
  width?: number
  height?: number
  quality?: number
  format?: "webp" | "jpg" | "png"
  blur?: number
}

/**
 * Generate optimized image URL with responsive sizing
 * Use this for all image rendering
 */
export const getOptimizedImageUrl = (
  src: string,
  options?: AssetConfig
): string => {
  // If using local Next.js Image component, return src as-is
  // Image component handles optimization automatically
  return src
}

/**
 * Generate responsive srcSet for images
 * Useful for custom img tags outside of Next.js Image component
 */
export const getImageSrcSet = (
  basePath: string,
  sizes: number[] = [640, 960, 1280, 1920]
): string => {
  return sizes
    .map((size) => {
      // Construct responsive URLs based on your CDN/image service
      // This is a placeholder - adjust based on your setup
      const fileName = basePath.split(".").slice(0, -1).join(".")
      const ext = basePath.split(".").pop()
      return `${fileName}-${size}w.${ext} ${size}w`
    })
    .join(", ")
}

/**
 * Get video poster/thumbnail for a video asset
 */
export const getVideoPoster = (videoSrc: string, fallback?: string): string => {
  // Try to find poster in gallery config first
  const posterMap: Record<string, string> = {
    "/videos/hero/IMG_5883.mp4": "/images/hero/IMG_5883-poster.jpg",
    "/videos/hero/IMG_5880.mp4": "/images/hero/IMG_5880-poster.jpg",
    "/videos/hero/IMG_5935.mp4": "/images/hero/IMG_5880-poster.jpg",
    "/videos/hero/cruise.mp4": "/images/hero/cruise-poster.jpg",
    "/videos/hero/cruise-mobile.mp4": "/images/hero/cruise-poster.jpg",
    "/videos/hero/coastal.mp4": "/images/hero/coastal-poster.jpg",
    "/videos/hero/coastal-mobile.mp4": "/images/hero/coastal-poster.jpg",
    "/videos/hero/coastal2.mp4": "/images/hero/coastal2-poster.jpg",
    "/videos/hero/coastal2-mobile.mp4": "/images/hero/coastal2-poster.jpg",
    "/videos/hero/crew.mp4": "/images/hero/crew-poster.jpg",
    "/videos/hero/cruise2.mp4": "/images/hero/cruise2-poster.jpg",
    "/videos/hero/cruise2-mobile.mp4": "/images/hero/cruise2-poster.jpg",
    "/videos/hero/cruise3.mp4": "/images/hero/cruise3-poster.jpg",
    "/videos/hero/serena.mp4": "/images/hero/serena-poster.jpg",
    "/videos/hero/serena2.mp4": "/images/hero/serena2-poster.jpg",
    "/videos/services/IMG_6071.mp4": "/images/services/IMG_6071-poster.jpg",
  }

  return posterMap[videoSrc] || fallback || "/images/gallery/hero.jpeg"
}

/**
 * Validate asset path exists in public folder
 * Useful for development environment checking
 */
export const validateAssetPath = (path: string): boolean => {
  // This would require server-side verification
  // For now, just check format
  return path.startsWith("/") && (path.includes(".jpg") || path.includes(".jpeg") || 
    path.includes(".png") || path.includes(".mp4") || path.includes(".webm"))
}

/**
 * Generate alt text fallback
 */
export const getFallbackAlt = (type: string, index: number = 0): string => {
  const defaults: Record<string, string[]> = {
    boat: ["Boat view", "Boating experience", "Marine vessel", "Sea adventure"],
    yacht: ["Luxury yacht", "Premium boat", "Sailing vessel"],
    coast: ["Coastal view", "Beach scene", "Ocean landscape"],
    sunset: ["Sunset view", "Evening sail", "Golden hour"],
    fort: ["Historical site", "Cultural landmark", "Fort structure"],
    wildlife: ["Marine life", "Ocean ecosystem", "Nature scene"],
    adventure: ["Thrilling activity", "Water adventure", "Exciting experience"],
  }

  const typeGuess = type.toLowerCase()
  for (const [key, values] of Object.entries(defaults)) {
    if (typeGuess.includes(key)) {
      return values[index % values.length]
    }
  }

  return "Gallery image"
}

/**
 * Asset categorization helper
 */
export const categorizeAsset = (path: string): string => {
  if (path.includes("/fleet/")) return "boats"
  if (path.includes("/fort/")) return "historical"
  if (path.includes("/services/")) return "services"
  if (path.includes("/hero/")) return "featured"
  if (path.includes("/testimonials/")) return "testimonials"
  if (path.includes("/vessels/")) return "boats"
  return "general"
}

/**
 * Format asset size for display
 */
export const getAssetSizeDisplay = (bytes: number): string => {
  const sizes = ["B", "KB", "MB", "GB"]
  if (bytes === 0) return "0 B"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + sizes[i]
}

/**
 * Get file extension from path
 */
export const getFileExtension = (path: string): string => {
  return path.split(".").pop()?.toLowerCase() || ""
}

/**
 * Check if asset is video
 */
export const isVideoAsset = (path: string): boolean => {
  const videoExts = ["mp4", "webm", "mov", "avi"]
  return videoExts.includes(getFileExtension(path))
}

/**
 * Check if asset is image
 */
export const isImageAsset = (path: string): boolean => {
  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg"]
  return imageExts.includes(getFileExtension(path))
}

/**
 * Extract filename from path
 */
export const getFileName = (path: string): string => {
  return path.split("/").pop() || ""
}

/**
 * Generate asset URL with version cache-busting (optional)
 */
export const getCachedAssetUrl = (path: string, version?: string): string => {
  if (version) {
    return `${path}?v=${version}`
  }
  return path
}

/**
 * Create thumbnail path convention
 * Assumes thumbnails follow pattern: image-thumb.ext
 */
export const getThumbnailPath = (imagePath: string): string => {
  const parts = imagePath.split(".")
  const ext = parts.pop()
  const name = parts.join(".")
  return `${name}-thumb.${ext}`
}

/**
 * Get all asset categories used in the project
 */
export const getAssetCategories = (): string[] => [
  "boats",
  "historical",
  "services",
  "featured",
  "testimonials",
  "general",
]

/**
 * Batch asset path normalizer
 * Ensures consistent path formatting
 */
export const normalizeAssetPaths = (paths: string[]): string[] => {
  return paths.map((path) => {
    // Ensure leading slash
    if (!path.startsWith("/")) {
      return "/" + path
    }
    // Remove double slashes except after protocol
    return path.replace(/(?<!:)\/{2,}/g, "/")
  })
}

/**
 * Asset path builder with optional organization
 */
export const buildAssetPath = (
  category: string,
  fileName: string,
  isPublic: boolean = true
): string => {
  const basePath = isPublic ? "/assets" : "public/assets"
  return `${basePath}/${category}/${fileName}`
}
