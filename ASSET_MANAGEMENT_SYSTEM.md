# 🎨 Professional Asset Management Guide

## Overview

This is a **senior-level, scalable asset management system** for your gallery without needing a CMS. This approach provides:

✅ Centralized asset configuration  
✅ Type-safe asset references  
✅ Organized file structure  
✅ Easy automation & bulk updates  
✅ Professional workflow  
✅ Future-proof design  

---

## 📁 Asset Organization Structure

```
public/
├── images/
│   ├── gallery/          → Gallery-specific images
│   ├── hero/             → Hero section images & posters
│   ├── fort/             → Fort Jesus content
│   ├── services/         → Service category images
│   ├── testimonials/     → User testimonials
│   └── vessels/          → Boat/vessel imagery
├── videos/
│   ├── hero/             → Hero video content
│   ├── services/         → Service showcase videos
│   └── raw/              → Original unprocessed videos
└── assets/
    ├── fleet/            → Boat fleet content
    │   ├── setting-sons/ → Setting Sons boat assets
    │   └── hunky-dory/   → Hunky Dory boat assets
    ├── marketing/        → Marketing campaign assets
    └── new/              → ⭐ YOUR NEW ASSETS GO HERE
```

---

## 🚀 Adding Your New Assets (Step-by-Step)

### Step 1: Organize New Assets
```bash
# Your new assets are in: public/assets/new/

# Organize them by type:
public/assets/new/
├── images/
│   ├── boat-1.jpg
│   ├── coastal-view.jpg
│   └── sunset.jpg
├── videos/
│   ├── boat-tour-1.mp4
│   └── adventure-highlight.mp4
└── thumbnails/
    ├── boat-tour-1-thumb.jpg
    └── adventure-highlight-thumb.jpg
```

### Step 2: Add to Gallery Configuration
Edit `src/config/gallery.ts`:

```typescript
export const GALLERY_IMAGES: GalleryItem[] = [
  // ... existing items ...
  
  // NEW ASSETS from client
  {
    id: "new-boat-1",
    type: "image",
    src: "/assets/new/images/boat-1.jpg",
    alt: "Our newest luxury boat in action",
    title: "Premium Yacht Experience",
    description: "Experience our latest addition to the fleet",
    category: "boats",
    featured: true, // Makes it prominent in gallery
    metadata: {
      date: "2026-03-15",
      boat: "New Yacht Name",
      tags: ["new", "luxury", "premium", "yacht"],
    },
  },
  {
    id: "new-coastal-1",
    type: "image",
    src: "/assets/new/images/coastal-view.jpg",
    alt: "Stunning coastal landscape",
    title: "Coastal Beauty",
    description: "Discover pristine coastal landscapes",
    category: "coastal",
    featured: false,
    metadata: {
      location: "Mombasa Coast",
      tags: ["scenic", "coastal", "nature"],
    },
  },
];

export const GALLERY_VIDEOS: GalleryItem[] = [
  // ... existing videos ...
  
  {
    id: "new-boat-tour",
    type: "video",
    src: "/assets/new/videos/boat-tour-1.mp4",
    poster: "/assets/new/thumbnails/boat-tour-1-thumb.jpg",
    alt: "Boat tour highlight video",
    title: "Exclusive Boat Tour",
    description: "Take a virtual tour of our amazing yacht",
    category: "boats",
    featured: true,
    metadata: {
      tags: ["video", "tour", "boat"],
    },
  },
];
```

---

## 💡 Key Concepts

### 1. **Gallery Item Structure**
Each asset has these properties:
- `id` - Unique identifier (use descriptive name)
- `type` - "image" or "video"
- `src` - Path to main asset
- `alt` - SEO-friendly alt text
- `title` - Display title
- `description` - SEO description
- `category` - Categorization for filtering
- `featured` - Prominent display flag
- `metadata` - Extra info (date, location, boat, tags)

### 2. **Categories**
Use these standard categories:
- `boats` - Boat/yacht related
- `trips` - Trip experiences
- `coastal` - Scenic coastal views
- `wildlife` - Marine life & nature
- `adventures` - Activity/adventure content
- `marine-life` - Underwater/wildlife content

### 3. **Featured vs Regular**
- `featured: true` → Larger grid display, comes first
- `featured: false` → Regular grid display

### 4. **Metadata Tags**
Use tags for filtering:
```typescript
metadata: {
  tags: ["luxury", "yacht", "sunset", "romantic"],
}
```

---

## 🔧 Using Assets in Components

### In Gallery Page
```typescript
import { getAllGalleryItems, getFeaturedGalleryItems } from "@/config/gallery"

export default function GalleryPage() {
  const allItems = getAllGalleryItems()  // All images + videos
  const featured = getFeaturedGalleryItems()  // Only featured items
  
  return (
    <div className="gallery-grid">
      {allItems.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### Get Items by Category
```typescript
import { getGalleryByCategory } from "@/config/gallery"

const boatGallery = getGalleryByCategory("boats")
const coastalGallery = getGalleryByCategory("coastal")
```

### Get Items by Tag
```typescript
import { getGalleryByTag } from "@/config/gallery"

const luxuryBoats = getGalleryByTag("luxury")
const videoContent = getGalleryByTag("video")
```

### Get Videos Only
```typescript
import { getGalleryVideos } from "@/config/gallery"

const videos = getGalleryVideos()
```

---

## 🛠️ Helper Utilities

Available in `src/lib/assetManager.ts`:

```typescript
import {
  getVideoPoster,          // Get video poster image
  isVideoAsset,           // Check if asset is video
  isImageAsset,           // Check if asset is image
  getFileName,            // Extract filename from path
  categorizeAsset,        // Auto-categorize from path
  normalizeAssetPaths,    // Ensure consistent formatting
} from "@/lib/assetManager"

// Examples:
const poster = getVideoPoster("/videos/hero/boat.mp4")
const isVideo = isVideoAsset("/videos/tour.mp4")  // true
const isImage = isImageAsset("/images/boat.jpg")   // true
```

---

## ⚡ Workflow: Adding New Images

### Quick Process:
1. **Upload to correct folder**: `public/assets/new/images/`
2. **Add to gallery.ts**: Copy template from existing items, update details
3. **Set metadata**: Add tags, category, date
4. **Set featured**: true if prominent, false otherwise
5. **Test**: Visit gallery page to verify display

### Template
```typescript
{
  id: "unique-id",
  type: "image",
  src: "/assets/new/images/filename.jpg",
  alt: "SEO-friendly description",
  title: "Display Title",
  description: "Detailed description for metadata",
  category: "boats", // or trips, coastal, wildlife, adventures
  featured: true,
  metadata: {
    location: "Location if applicable",
    boat: "Boat name if applicable",
    date: "2026-03-15",
    tags: ["tag1", "tag2", "tag3"],
  },
},
```

---

## 📹 Workflow: Adding New Videos

Videos need TWO files:
1. **Video file**: `video.mp4` (the actual video)
2. **Poster/thumbnail**: `video-thumb.jpg` (preview image)

Process:
1. Upload video to `public/assets/new/videos/`
2. Upload poster to `public/assets/new/thumbnails/` (or `public/assets/new/images/`)
3. Add to `GALLERY_VIDEOS` in gallery.ts with both paths

```typescript
{
  id: "video-id",
  type: "video",
  src: "/assets/new/videos/tour.mp4",
  poster: "/assets/new/thumbnails/tour-thumb.jpg",  // Must have poster
  alt: "Video description",
  title: "Video Title",
  // ... rest of properties
},
```

---

## 💪 Advanced: Automation Script

When you have many assets to add, create a script to generate the template:

```typescript
// scripts/generate-gallery-items.ts
import fs from "fs"

interface AssetFile {
  filename: string
  type: "image" | "video"
  category: string
  featured: boolean
}

const assets: AssetFile[] = [
  {
    filename: "boat-1.jpg",
    type: "image",
    category: "boats",
    featured: true,
  },
  // ... more assets
]

const generated = assets.map((asset, idx) => ({
  id: `new-${asset.category}-${idx + 1}`,
  type: asset.type,
  src: `/assets/new/${asset.type}s/${asset.filename}`,
  alt: `${asset.category} asset ${idx + 1}`,
  title: asset.filename.replace(/[-_]/g, " "),
  category: asset.category,
  featured: asset.featured,
  metadata: { tags: [asset.category] },
}))

console.log(JSON.stringify(generated, null, 2))
```

---

## 📊 Best Practices

### ✅ DO:
- Keep descriptions short and keyword-rich (SEO)
- Use consistent naming: `boat-tour-1.jpg` not `DSC_1234.jpg`
- Organize by category in folder structure
- Always provide alt text and titles
- Use featured flag strategically (max 40% featured)
- Add metadata tags for filtering

### ❌ DON'T:
- Mix naming conventions
- Leave alt text empty
- Upload raw unprocessed files
- Duplicate asset configuration
- Hardcode paths in components

---

## 🎯 Scaling Tips

### For 100+ assets:
1. Use the automation script above
2. Create category folders: `public/assets/new/boats/`, `public/assets/new/coastal/`
3. Generate IDs programmatically
4. Consider a JSON data file per category

### For dynamic updates:
1. Store gallery data in a JSON file (not TypeScript hardcoded)
2. Load at build time with getStaticProps
3. Or use a lightweight database (Supabase, etc.)
4. Export to JSON for flexibility

### Future CMS Migration:
Your current structure is **CMS-ready**:
- It's a single source of truth
- Data structure is normalized and typed
- Easy to move to headless CMS later
- Zero breaking changes needed

---

## 🔍 Verify Your Setup

Check that you have:

- ✅ `src/config/gallery.ts` - Gallery configuration
- ✅ `src/lib/assetManager.ts` - Asset utilities  
- ✅ `public/assets/new/` - Your new assets folder
- ✅ Gallery page updated to use new config

---

## 📞 Quick Reference

```typescript
// Import these in components:
import {
  getAllGalleryItems,
  getFeaturedGalleryItems,
  getGalleryByCategory,
  getGalleryByTag,
  getGalleryImages,
  getGalleryVideos,
  getRandomGalleryItems,
} from "@/config/gallery"
```

---

**This is professional, enterprise-level asset management—no CMS needed!** 🚀
