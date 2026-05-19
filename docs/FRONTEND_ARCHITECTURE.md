# Frontend Architecture — Blue Pineapple Website

Last updated: 2026-05-15

This document explains how the current site is structured (routes, composition, shared components, and content flow), so a frontend team can rebuild/extend it consistently.

---

## 1) Stack
- Next.js App Router (`src/app`)
- React 19
- Tailwind CSS 4
- TypeScript

Key scripts: `package.json`
- `npm run dev`
- `npm run build`
- `npm run lint`

---

## 2) Routing Layout

**Root layout**
- `src/app/layout.tsx`
  - Imports Inter via `next/font/google` and applies it as `--font-sans`.
  - Renders `Header`, then `<main className="pt-14">`, then `Footer`.
  - All pages should assume the fixed header and use top padding spacing accordingly.

**Route groups**
- Marketing pages live under `src/app/(marketing)` but still render at top-level routes.

---

## 3) Route → Component Composition Map

### `/` Home
- `src/app/page.tsx`
  - `Hero` → `src/components/sections/home/Hero.tsx`
  - `WhyChooseUs` → `src/components/sections/home/WhyChooseUs.tsx`
  - `Services` → `src/components/sections/home/Services.tsx`
  - `PopularTrips` → `src/components/sections/home/PopularTrips.tsx`
  - `BoatsPreview` → `src/components/sections/home/BoatsPreview.tsx`
  - `CoastalLife` → `src/components/sections/home/CoastalLife.tsx`

### `/trips` Trips listing
- `src/app/(marketing)/trips/page.tsx`
  - `TripsHeroSection` → `src/components/sections/trips/TripsHeroSection.tsx`
  - `TripsGrid` → `src/components/trips/TripsGrid.tsx`
  - `ReviewsSection` → `src/components/ui/ReviewsSection.tsx`

### `/trips/[slug]` Trip detail
- `src/app/(marketing)/trips/[slug]/page.tsx`
  - Hero:
    - `FortJesusHero` (fort-jesus only) → `src/components/trips/FortJesusHero.tsx`
    - otherwise in-file generic hero markup
  - Core sections:
    - `QuickFactsStrip` → `src/components/trips/QuickFactsStrip.tsx`
    - `JourneySection` → `src/components/trips/JourneySection.tsx`
    - `HopOnHopOffSection` (fort-jesus only) → `src/components/trips/HopOnHopOffSection.tsx`
    - `TripJourneyTimeline` (non-fort-jesus) → `src/components/sections/TripJourneyTimeline.tsx`
    - `SafetyFeatures` → `src/components/trips/SafetyFeatures.tsx`
    - `DepartureDetails` → `src/components/trips/DepartureDetails.tsx`
  - Commerce:
    - `PricingCard` → `src/components/trips/PricingCard.tsx`
    - `MobileFloatingCTA` → `src/components/ui/MobileFloatingCTA.tsx`
  - Social proof:
    - `ReviewsSection` → `src/components/ui/ReviewsSection.tsx`
  - Related:
    - `TripCard` → `src/components/ui/TripCard.tsx`

### `/boats` Fleet listing
- `src/app/(marketing)/boats/page.tsx`
  - Uses `boats` data directly from `src/data/boats.ts`

### `/boats/[slug]` Vessel detail
- `src/app/(marketing)/boats/[slug]/page.tsx`
  - Uses `boats` data directly from `src/data/boats.ts`

### `/gallery`
- `src/app/(marketing)/gallery/page.tsx`
  - Data comes from `src/config/gallery.ts`
  - Client shell:
    - `GalleryClientShell` → `src/components/gallery/GalleryClientShell.tsx`

### `/contact`
- `src/app/(marketing)/contact/page.tsx`
  - UI-only form (no API submission currently)

---

## 4) Content Flow (How “exact copy/assets” are wired)

**Trips**
- `src/data/trips.ts` is the canonical list.
- Trip pages are pre-rendered using `generateStaticParams()` in `src/app/(marketing)/trips/[slug]/page.tsx`.

**Fleet**
- `src/data/boats.ts` is the canonical list.
- Boat pages are pre-rendered using `generateStaticParams()` in `src/app/(marketing)/boats/[slug]/page.tsx`.

**Gallery**
- `src/config/gallery.ts` is the canonical list (images + videos).

**Home previews**
- `src/config/assets.ts` supplies:
  - Hero playlist + curated hero images
  - CoastalLife gallery preview list

---

## 5) Shared UI Components (Re-use contracts)

These are intended to be reused rather than reinvented per page:
- Layout: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Navigation helpers: `src/lib/routes.ts`
- SEO helpers: `src/lib/seo.ts`
- Formatting helpers: `src/lib/format.ts`
- WhatsApp deep-link helpers: `src/lib/whatsapp.ts`
- UI primitives: `src/components/ui/*`

---

## 6) Performance & Rendering Notes

- Prefer `next/image` for all images and always pass `sizes`.
- Avoid loading large media on mobile above the fold (hero video is gated by reduced-motion + save-data + viewport size).
- Production build needs network access to fetch Inter via Google Fonts because of `next/font/google` in `src/app/layout.tsx`.

