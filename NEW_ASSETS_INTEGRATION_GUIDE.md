# Organizing Your New Assets - Action Plan

## Current Status
You have **15 images** and **3 videos** in `/public/assets/new/` that need professional organization.

---

## 🎯 Step 1: Rename Assets Professionally

Instead of the default WhatsApp names, use descriptive naming:

### Images to Rename:
```
Current                                          → New Name
WhatsApp Image 2026-03-31 at 10.41.19 AM (1).jpeg → coastal-view-1.jpg
WhatsApp Image 2026-03-31 at 10.41.20 AM (1).jpeg → luxury-boat-1.jpg
WhatsApp Image 2026-03-31 at 10.41.21 AM (1).jpeg → sunset-sail-1.jpg
WhatsApp Image 2026-03-31 at 10.41.21 AM (2).jpeg → marine-life-1.jpg
WhatsApp Image 2026-03-31 at 10.41.21 AM.jpeg   → adventure-activity-1.jpg
WhatsApp Image 2026-03-31 at 10.41.22 AM (2).jpeg → fort-view-1.jpg
WhatsApp Image 2026-03-31 at 10.41.22 AM (4).jpeg → boat-interior-1.jpg
WhatsApp Image 2026-03-31 at 10.42.48 AM.jpeg   → sunset-coast-1.jpg
WhatsApp Image 2026-03-31 at 10.42.49 AM.jpeg   → tropical-setting-1.jpg
WhatsApp Image 2026-03-31 at 10.42.50 AM.jpeg   → luxury-yacht-1.jpg
WhatsApp Image 2026-03-31 at 10.45.18 AM (1).jpeg → creek-safari-1.jpg
WhatsApp Image 2026-03-31 at 10.45.18 AM (2).jpeg → beach-dunes-1.jpg
WhatsApp Image 2026-03-31 at 10.45.18 AM.jpeg   → water-adventure-1.jpg
WhatsApp Image 2026-03-31 at 10.45.19 AM.jpeg   → coastal-exploration-1.jpg
WhatsApp Image 2026-03-31 at 10.45.20 AM.jpeg   → premium-experience-1.jpg
```

### Videos to Rename:
```
Current                                        → New Name
WhatsApp Video 2026-03-31 at 10.41.20 AM.mp4 → boat-tour-highlight.mp4
WhatsApp Video 2026-03-31 at 10.41.21 AM.mp4 → sunset-sailing-experience.mp4
WhatsApp Video 2026-03-31 at 10.45.18 AM.mp4 → adventure-montage.mp4
```

---

## 📁 Step 2: Organize Folder Structure

**Create this structure:**
```
public/assets/new/
├── images/
│   ├── boats/
│   │   ├── luxury-boat-1.jpg
│   │   ├── boat-interior-1.jpg
│   │   └── luxury-yacht-1.jpg
│   ├── coastal/
│   │   ├── coastal-view-1.jpg
│   │   ├── sunset-sail-1.jpg
│   │   ├── sunset-coast-1.jpg
│   │   └── coastal-exploration-1.jpg
│   ├── adventures/
│   │   ├── adventure-activity-1.jpg
│   │   ├── creek-safari-1.jpg
│   │   ├── water-adventure-1.jpg
│   │   └── beach-dunes-1.jpg
│   ├── wildlife/
│   │   ├── marine-life-1.jpg
│   │   └── tropical-setting-1.jpg
│   ├── premium/
│   │   └── premium-experience-1.jpg
│   └── historical/
│       └── fort-view-1.jpg
├── videos/
│   ├── boat-tour-highlight.mp4
│   ├── sunset-sailing-experience.mp4
│   └── adventure-montage.mp4
└── thumbnails/
    ├── boat-tour-highlight.jpg
    ├── sunset-sailing-experience.jpg
    └── adventure-montage.jpg
```

---

## 🔄 Step 3: Quick Rename Command

Run this in terminal to batch rename:

```bash
# Navigate to the assets folder
cd public/assets/new

# Rename images (you'll need to map exact names)
# Option 1: Manual rename using mv
mv "WhatsApp Image 2026-03-31 at 10.41.19 AM (1).jpeg" "coastal-view-1.jpg"
mv "WhatsApp Image 2026-03-31 at 10.41.20 AM (1).jpeg" "luxury-boat-1.jpg"
# ... continue for all images

# Then organize into folders
mkdir -p images/boats images/coastal images/adventures images/wildlife images/premium images/historical
mkdir -p videos thumbnails

# Move files to appropriate folders
# Note: These are examples - adjust based on what's actually in each image
```

---

## 🚀 Step 4: Generate Gallery Configuration

**Copy this into `src/config/gallery.ts`** in the `GALLERY_IMAGES` array:

```typescript
  // ============================================
  // NEW CLIENT ASSETS - Added March 31, 2026
  // ============================================
  
  // Luxury Boats
  {
    id: "new-luxury-boat-1",
    type: "image",
    src: "/assets/new/images/boats/luxury-boat-1.jpg",
    alt: "Premium luxury boat with modern amenities",
    title: "Premium Vessel",
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
    alt: "Luxury boat interior and amenities",
    title: "Interior Comfort",
    description: "Explore the luxurious interior features",
    category: "boats",
    featured: false,
    metadata: {
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
      tags: ["yacht", "luxury", "spacious", "premium"],
    },
  },

  // Coastal Views
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
      tags: ["beach", "dunes", "coastal"],
    },
  },

  // Wildlife & Marine
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
      location: "Fort Jesus, Mombasa",
      tags: ["historical", "cultural", "landmark"],
    },
  },
```

**Add to `GALLERY_VIDEOS` array:**

```typescript
  // ============================================
  // NEW CLIENT VIDEOS - Added March 31, 2026
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
      tags: ["video", "adventure", "montage", "action"],
    },
  },
```

---

## 🎬 Step 5: Generate Video Thumbnails

For each video, create a thumbnail (poster image) at 30% into the video:

```bash
# Using ffmpeg (install if needed: apt-get install ffmpeg)
ffmpeg -i public/assets/new/videos/boat-tour-highlight.mp4 -ss 00:00:03 -vframes 1 public/assets/new/thumbnails/boat-tour-highlight.jpg

ffmpeg -i public/assets/new/videos/sunset-sailing-experience.mp4 -ss 00:00:05 -vframes 1 public/assets/new/thumbnails/sunset-sailing-experience.jpg

ffmpeg -i public/assets/new/videos/adventure-montage.mp4 -ss 00:00:05 -vframes 1 public/assets/new/thumbnails/adventure-montage.jpg
```

---

## ✅ Verification Checklist

After organizing:

- [ ] All images renamed to descriptive names
- [ ] All videos renamed to descriptive names
- [ ] Images organized in category folders
- [ ] Video thumbnails generated
- [ ] Gallery configuration updated in `src/config/gallery.ts`
- [ ] New gallery items have proper metadata
- [ ] Gallery page tested and displays new assets

---

## 🎉 Next: Update Gallery Page

Once configuration is done, update `src/app/(marketing)/gallery/page.tsx` to use the new system:

```typescript
import { getAllGalleryItems } from "@/config/gallery"

export default function GalleryPage() {
  const galleryItems = getAllGalleryItems()
  
  return (
    // Your existing gallery grid layout
    // Just use galleryItems instead of old data source
  )
}
```

---

## 📚 Reference

- **Total assets**: 15 images + 3 videos
- **Recommended**: Mark 5-6 as featured
- **Professional naming**: Use hyphens, lowercase, descriptive
- **Professional structure**: Organize by category
- **SEO**: Each item has alt text and description

---

**This professional organization will make your website look enterprise-level!** 🚀
