/**
 * Professional Gallery Content Management System
 * Centralized source of truth for all gallery assets
 * Scalable structure for easy content updates
 */

export interface GalleryItem {
  id: string
  type: "image" | "video"
  src: string // Main asset (image path or video path)
  poster?: string // Video thumbnail
  alt: string
  title: string
  description?: string
  category: "boats" | "trips" | "coastal" | "wildlife" | "adventures" | "marine-life"
  featured: boolean
  metadata?: {
    date?: string
    location?: string
    trip?: string
    boat?: string
    tags?: string[]
  }
}

/**
 * Gallery Images - Organized by Category
 * NEW ASSETS: Integrate your new images from /public/assets/new/ here
 */
export const GALLERY_IMAGES: GalleryItem[] = [
  // Premium Boat Content
  {
    id: "boat-1",
    type: "image",
    src: "/assets/fleet/setting-sons/high-res.jpg",
    alt: "Setting Sons luxury yacht",
    title: "Setting Sons Charter",
    description: "Premium luxury yacht for exclusive charters",
    category: "boats",
    featured: true,
    metadata: {
      boat: "Setting Sons",
      tags: ["luxury", "yacht", "premium"],
    },
  },
  {
    id: "boat-2",
    type: "image",
    src: "/assets/fleet/hunky-dory/hunkey.jpeg",
    alt: "Hunky Dory speedboat",
    title: "Hunky Dory Adventure",
    description: "Fast-paced adventure on our speedboat",
    category: "boats",
    featured: true,
    metadata: {
      boat: "Hunky Dory",
      tags: ["adventure", "speedboat", "thrilling"],
    },
  },

  // Coastal & Scenic
  {
    id: "coast-1",
    type: "image",
    src: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM (2).jpeg",
    alt: "Coastal sunrise view",
    title: "Coastal Sunrise",
    description: "Breathtaking sunrise over the coastal waters",
    category: "coastal",
    featured: false,
    metadata: {
      location: "Mombasa Coast",
      tags: ["sunrise", "scenic", "peaceful"],
    },
  },
  {
    id: "coast-2",
    type: "image",
    src: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
    alt: "Boat fleet in formation",
    title: "Fleet Formation",
    description: "Our boat fleet ready for adventure",
    category: "boats",
    featured: false,
    metadata: {
      tags: ["fleet", "boats", "professional"],
    },
  },

  // Fort Jesus & Historical
  {
    id: "fort-1",
    type: "image",
    src: "/images/fort/fort1.jpeg",
    alt: "Fort Jesus historical monument",
    title: "Fort Jesus View",
    description: "Historic Fort Jesus from the water",
    category: "trips",
    featured: true,
    metadata: {
      location: "Fort Jesus, Mombasa",
      trip: "Fort Jesus Tour",
      tags: ["historical", "cultural", "tour"],
    },
  },
  {
    id: "fort-2",
    type: "image",
    src: "/images/fort/coastal.jpg",
    alt: "Sunset sailing near Fort Jesus",
    title: "Sunset Heritage Tour",
    description: "Evening sail with historical backdrop",
    category: "trips",
    featured: true,
    metadata: {
      location: "Fort Jesus, Mombasa",
      trip: "Sunset Tour",
      tags: ["sunset", "historical", "romantic"],
    },
  },

  // Marine Life & Wildlife
  {
    id: "wildlife-1",
    type: "image",
    src: "/images/services/img2.png",
    alt: "Marine ecosystem exploration",
    title: "Marine Life Discovery",
    description: "Explore the rich marine biodiversity",
    category: "marine-life",
    featured: false,
    metadata: {
      tags: ["marine", "wildlife", "nature", "educational"],
    },
  },

  // Creek Safari
  {
    id: "creek-1",
    type: "image",
    src: "/images/services/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
    alt: "Mangrove creek exploration",
    title: "Creek Safari Adventure",
    description: "Navigate through pristine mangrove creeks",
    category: "adventures",
    featured: false,
    metadata: {
      location: "Mangrove Forests",
      tags: ["safari", "mangrove", "adventure", "nature"],
    },
  },

  // Adventure Activities
  {
    id: "adventure-1",
    type: "image",
    src: "/images/gallery/hero.jpeg",
    alt: "Water adventure activities",
    title: "Adventure Activities",
    description: "Exciting watersports and activities",
    category: "adventures",
    featured: false,
    metadata: {
      tags: ["watersports", "adventure", "fun", "active"],
    },
  },
  {
    id: "adventure-2",
    type: "image",
    src: "/images/services/img1.png",
    alt: "Coastal experience and exploration",
    title: "Coastal Exploration",
    description: "Discover hidden coastal treasures",
    category: "coastal",
    featured: false,
    metadata: {
      location: "Mombasa Coast",
      tags: ["exploration", "discovery", "scenic"],
    },
  },

  // ============================================
  // NEW CLIENT ASSETS - March 31, 2026
  // ============================================

  // Luxury Boats - Premium Fleet
  {
    id: "new-luxury-boat-1",
    type: "image",
    src: "/assets/new/images/boats/luxury-boat-1.jpg",
    alt: "Premium luxury boat docked at Mombasa",
    title: "Premium Luxury Boat",
    description: "Experience our premium luxury boat fleet",
    category: "boats",
    featured: true,
    metadata: {
      date: "2026-03-31",
      boat: "Premium Vessel",
      tags: ["luxury", "boat", "premium", "vessel"],
    },
  },
  {
    id: "new-boat-interior-1",
    type: "image",
    src: "/assets/new/images/boats/boat-interior-1.jpg",
    alt: "Luxury boat interior with modern amenities",
    title: "Interior Comfort",
    description: "Explore the luxurious interior features",
    category: "boats",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["luxury", "interior", "comfort", "amenities"],
    },
  },
  {
    id: "new-luxury-yacht-1",
    type: "image",
    src: "/assets/new/images/boats/luxury-yacht-1.jpg",
    alt: "Spacious luxury yacht at sea",
    title: "Luxury Yacht Experience",
    description: "Relax on our spacious luxury yacht",
    category: "boats",
    featured: true,
    metadata: {
      date: "2026-03-31",
      tags: ["yacht", "luxury", "spacious", "premium"],
    },
  },

  // Coastal Views - Stunning Landscapes
  {
    id: "new-coastal-view-1",
    type: "image",
    src: "/assets/new/images/coastal/coastal-view-1.jpg",
    alt: "Breathtaking coastal landscape view",
    title: "Coastal Paradise",
    description: "Discover pristine coastal landscapes",
    category: "coastal",
    featured: true,
    metadata: {
      date: "2026-03-31",
      location: "Mombasa Coast",
      tags: ["coastal", "scenic", "paradise", "landscape"],
    },
  },
  {
    id: "new-sunset-sail-1",
    type: "image",
    src: "/assets/new/images/coastal/sunset-sail-1.jpg",
    alt: "Sunset sailing experience along the coast",
    title: "Golden Hour Sailing",
    description: "Enjoy magical sunsets on the water",
    category: "trips",
    featured: true,
    metadata: {
      date: "2026-03-31",
      location: "Coastal Waters",
      tags: ["sunset", "sailing", "romantic", "scenic"],
    },
  },
  {
    id: "new-sunset-coast-1",
    type: "image",
    src: "/assets/new/images/coastal/sunset-coast-1.jpg",
    alt: "Orange and pink sunset over coastal waters",
    title: "Sunset Over Water",
    description: "Magnificent sunset over the Indian Ocean",
    category: "coastal",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["sunset", "coastal", "scenic"],
    },
  },
  {
    id: "new-coastal-exploration-1",
    type: "image",
    src: "/assets/new/images/coastal/coastal-exploration-1.jpg",
    alt: "Exploring the scenic coastline",
    title: "Coastal Exploration",
    description: "Explore hidden gems along the coast",
    category: "coastal",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["exploration", "coastal", "adventure"],
    },
  },

  // Adventure Activities
  {
    id: "new-adventure-activity-1",
    type: "image",
    src: "/assets/new/images/adventures/adventure-activity-1.jpg",
    alt: "Exciting adventure activity on water",
    title: "Water Adventure",
    description: "Thrilling water sports and activities",
    category: "adventures",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["adventure", "activity", "thrilling", "watersports"],
    },
  },
  {
    id: "new-creek-safari-1",
    type: "image",
    src: "/assets/new/images/adventures/creek-safari-1.jpg",
    alt: "Creek safari exploration through mangroves",
    title: "Mangrove Safari",
    description: "Navigate pristine mangrove forests",
    category: "adventures",
    featured: false,
    metadata: {
      date: "2026-03-31",
      location: "Mangrove Forests",
      tags: ["safari", "mangrove", "adventure", "nature"],
    },
  },
  {
    id: "new-water-adventure-1",
    type: "image",
    src: "/assets/new/images/adventures/water-adventure-1.jpg",
    alt: "Water adventure with scenic backdrop",
    title: "Adventure Awaits",
    description: "Exciting water-based adventures",
    category: "adventures",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["adventure", "water", "excitement"],
    },
  },
  {
    id: "new-beach-dunes-1",
    type: "image",
    src: "/assets/new/images/adventures/beach-dunes-1.jpg",
    alt: "Sandy beach and coastal dunes",
    title: "Beach Exploration",
    description: "Explore beautiful coastal dunes",
    category: "coastal",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["beach", "dunes", "coastal"],
    },
  },

  // Wildlife & Marine Life
  {
    id: "new-marine-life-1",
    type: "image",
    src: "/assets/new/images/wildlife/marine-life-1.jpg",
    alt: "Marine ecosystem and ocean wildlife",
    title: "Marine Biodiversity",
    description: "Discover rich marine ecosystems",
    category: "marine-life",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["marine", "wildlife", "ecosystem", "ocean"],
    },
  },
  {
    id: "new-tropical-setting-1",
    type: "image",
    src: "/assets/new/images/wildlife/tropical-setting-1.jpg",
    alt: "Tropical coastal setting",
    title: "Tropical Paradise",
    description: "Experience tropical coastal beauty",
    category: "coastal",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["tropical", "paradise", "coastal"],
    },
  },

  // Premium Experience
  {
    id: "new-premium-experience-1",
    type: "image",
    src: "/assets/new/images/premium/premium-experience-1.jpg",
    alt: "Premium exclusive experience showcase",
    title: "VIP Experience",
    description: "Exclusive premium experiences",
    category: "boats",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["premium", "exclusive", "vip", "luxury"],
    },
  },

  // Historical & Cultural
  {
    id: "new-fort-view-1",
    type: "image",
    src: "/assets/new/images/historical/fort-view-1.jpg",
    alt: "Historical fort view from the sea",
    title: "Historic Fort",
    description: "Historic landmarks from the water",
    category: "trips",
    featured: false,
    metadata: {
      date: "2026-03-31",
      location: "Fort Jesus, Mombasa",
      trip: "Fort Jesus Tour",
      tags: ["historical", "cultural", "landmark"],
    },
  },
];

/**
 * Gallery Videos - For premium video content
 */
export const GALLERY_VIDEOS: GalleryItem[] = [
  {
    id: "video-boat-showcase",
    type: "video",
    src: "/assets/fleet/setting-sons/showcase.mp4",
    poster: "/assets/fleet/settinssons2.jpeg",
    alt: "Setting Sons showcase video",
    title: "Setting Sons - Luxury Yacht Showcase",
    description: "Experience the elegance of Setting Sons yacht",
    category: "boats",
    featured: true,
    metadata: {
      date: "2026-03-31",
      boat: "Setting Sons",
      tags: ["luxury", "video", "showcase"],
    },
  },
  {
    id: "video-hunky-dory",
    type: "video",
    src: "/assets/fleet/hunky-dory/showcase.mp4",
    poster: "/assets/fleet/hunky-dory/hunkey.jpeg",
    alt: "Hunky Dory boat showcase",
    title: "Hunky Dory - Speed Adventure",
    description: "High-octane adventures with Hunky Dory",
    category: "boats",
    featured: true,
    metadata: {
      date: "2026-03-31",
      boat: "Hunky Dory",
      tags: ["adventure", "video", "speedboat"],
    },
  },
  {
    id: "video-sunset-sail",
    type: "video",
    src: "/videos/hero/cruise3.mp4",
    poster: "/images/hero/cruise3-poster.jpg",
    alt: "Beautiful sunset sailing experience",
    title: "Sunset Sailing - Pure Magic",
    description: "Experience unforgettable sunsets on the water",
    category: "trips",
    featured: true,
    metadata: {
      date: "2026-03-31",
      trip: "Sunset Sailing",
      tags: ["sunset", "romantic", "scenic"],
    },
  },
  {
    id: "video-boat-trips",
    type: "video",
    src: "/videos/services/IMG_6071.mp4",
    poster: "/images/services/IMG_6071-poster.jpg",
    alt: "Exciting boat trip experience",
    title: "Boat Trip Adventures",
    description: "Explore the waters with our expert guides",
    category: "adventures",
    featured: false,
    metadata: {
      date: "2026-03-31",
      tags: ["adventure", "boat", "experience"],
    },
  },

  // ============================================
  // NEW CLIENT VIDEOS - March 31, 2026
  // ============================================

  {
    id: "new-boat-tour-highlight",
    type: "video",
    src: "/assets/new/videos/boat-tour-highlight.mp4",
    poster: "/assets/new/thumbnails/boat-tour-highlight.jpg",
    alt: "Boat tour highlights and scenic views",
    title: "Boat Tour Highlights",
    description: "Experience our most scenic boat tour",
    category: "boats",
    featured: true,
    metadata: {
      date: "2026-03-31",
      tags: ["video", "tour", "boat", "highlights"],
    },
  },
  {
    id: "new-sunset-sailing-experience",
    type: "video",
    src: "/assets/new/videos/sunset-sailing-experience.mp4",
    poster: "/assets/new/thumbnails/sunset-sailing-experience.jpg",
    alt: "Sunset sailing experience video",
    title: "Sunset Sailing Experience",
    description: "Romantic sunset sailing adventure",
    category: "trips",
    featured: true,
    metadata: {
      date: "2026-03-31",
      tags: ["video", "sunset", "sailing", "romantic"],
    },
  },
  {
    id: "new-adventure-montage",
    type: "video",
    src: "/assets/new/videos/adventure-montage.mp4",
    poster: "/assets/new/thumbnails/adventure-montage.jpg",
    alt: "Adventure activities montage",
    title: "Adventure Montage",
    description: "Thrilling adventure moments",
    category: "adventures",
    featured: true,
    metadata: {
      date: "2026-03-31",
      tags: ["video", "adventure", "montage", "action"],
    },
  },
];

/**
 * Helper function to get all gallery items (images + videos)
 */
export const getAllGalleryItems = (): GalleryItem[] => {
  return [...GALLERY_IMAGES, ...GALLERY_VIDEOS]
}

/**
 * Helper function to get items by category
 */
export const getGalleryByCategory = (category: GalleryItem["category"]): GalleryItem[] => {
  return getAllGalleryItems().filter((item) => item.category === category)
}

/**
 * Helper function to get featured items
 */
export const getFeaturedGalleryItems = (): GalleryItem[] => {
  return getAllGalleryItems().filter((item) => item.featured)
}

/**
 * Helper function to get images only
 */
export const getGalleryImages = (): GalleryItem[] => {
  return GALLERY_IMAGES
}

/**
 * Helper function to get videos only
 */
export const getGalleryVideos = (): GalleryItem[] => {
  return GALLERY_VIDEOS
}

/**
 * Helper function to get items by tag
 */
export const getGalleryByTag = (tag: string): GalleryItem[] => {
  return getAllGalleryItems().filter((item) =>
    item.metadata?.tags?.includes(tag.toLowerCase())
  )
}

/**
 * Get random gallery items (useful for hero sections)
 */
export const getRandomGalleryItems = (count: number): GalleryItem[] => {
  const items = getAllGalleryItems()
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
