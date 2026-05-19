# Blue Pineapple Website — Build Specification (UI/UX + Frontend + Backend)

Last updated: 2026-05-15

This document is a build-ready specification for recreating the Blue Pineapple marketing website **with the exact pages and content currently represented in this repository**.

It is written for:
- UI/UX designers (IA, page layouts, components, interaction design)
- Frontend developers (Next.js app router structure, component contracts, performance/SEO requirements)
- Backend developers (current state is mostly static + WhatsApp booking; includes a proposed API/CMS plan to make content scalable)

If there is any ambiguity between this spec and the codebase, treat the codebase as source of truth and use the file references throughout this doc to validate exact copy, links, and assets.

---

## 1) Product Summary

**Goal**
- Drive bookings/enquiries for trips + vessel charters.
- Showcase experiences, fleet, and gallery to build trust.

**Primary conversion**
- “Book via WhatsApp” (site-wide CTA).
- Deep-link messaging via `buildWhatsAppUrl(...)`.

**Secondary conversions**
- Trip detail “Book” CTAs.
- Contact page WhatsApp CTA.
- Fleet page “Enquire Now” / vessel “Book This Vessel”.

**Current runtime**
- Next.js App Router (`src/app/*`) with SSG/static data.
- Content is stored in TS modules (`src/data/*`, `src/content/*`, `src/config/*`).

---

## 2) Information Architecture (Routes)

All routes are in `src/app`:
- `/` — Home / Landing page (`src/app/page.tsx`)
- `/trips` — Experiences listing (`src/app/(marketing)/trips/page.tsx`)
- `/trips/[slug]` — Experience detail (`src/app/(marketing)/trips/[slug]/page.tsx`)
- `/trips/fort-jesus-trip` — Dedicated Fort Jesus page (exists alongside the dynamic route) (`src/app/(marketing)/trips/fort-jesus-trip/page.tsx`)
- `/boats` — Fleet listing (`src/app/(marketing)/boats/page.tsx`)
- `/boats/[slug]` — Vessel detail (`src/app/(marketing)/boats/[slug]/page.tsx`)
- `/gallery` — Gallery (images + videos) (`src/app/(marketing)/gallery/page.tsx`)
- `/contact` — Contact + (currently non-functional) form (`src/app/(marketing)/contact/page.tsx`)
- `/sitemap.xml` — Sitemap (`src/app/sitemap.ts`)

**Global layout**
- Fixed header + footer on all pages (`src/app/layout.tsx`)
- Main content is padded `pt-14` to offset header; full-bleed hero sections compensate with `-mt-14` (see Home hero).

---

## 3) Source of Truth for Content (Exact Copy + Assets)

The “exact contents” of the site come from these modules:

**Contacts / business identity**
- `src/constants/contacts.ts` (phone, email, business name, minimum booking hours, addresses)

**Trips (experiences)**
- `src/data/trips.ts` (names, descriptions, full descriptions, duration, price, stops, discounts, media)
- `src/content/trips/fort-jesus-trip.ts` (Fort Jesus specific structured content referenced by trips)

**Boats (fleet)**
- `src/data/boats.ts` (vessel names, descriptions, pricing, feature list, galleries)

**Gallery**
- `src/config/gallery.ts` (complete gallery CMS-like list, categories, featured flags, metadata, videos)

**Home “preview” sections**
- `src/config/assets.ts` (hero playlist & curated images, coastal life preview images)

**Navigation**
- `src/lib/routes.ts` (canonical route helpers)
- `src/components/layout/Header.tsx` (labels + nav ordering)

**SEO**
- `src/app/page.tsx` and other route files contain per-page metadata
- `src/lib/seo.ts` for canonical URLs + JSON-LD helpers

Important: if a designer needs to “see” the exact wording for a section, pull it from these files rather than rewriting from memory.

---

## 4) Design System & Global UI Guidelines

**Visual style**
- Dark-first UI with teal accent; gradients and glow accents are used in hero + section backgrounds.
- Typography uses Inter via `next/font/google` in `src/app/layout.tsx`.
- Tailwind CSS is used across the app; tokens live in `src/styles/tokens.css`.

**Core primitives**
- `Container` — page max-width and padding (`src/components/ui/Container.tsx`)
- `Heading` — consistent heading sizes (`src/components/ui/Heading.tsx`)
- `Button`, `Card`, `Sheet` — shared UI components (`src/components/ui/*`)

**Breakpoints**
- Mobile-first; `sm`, `md`, `lg`, `xl` patterns are used throughout.

**Motion**
- Hero respects `prefers-reduced-motion` and `navigator.connection.saveData` (see hero behavior spec below).

---

## 5) Page Specifications (UI/UX + Functional Requirements)

### 5.1 Home (`/`)
Source: `src/app/page.tsx`, sections in `src/components/sections/home/*`

**Sections in order**
1) Hero (`Hero`)
2) Why Choose Us (`WhyChooseUs`)
3) Services (`Services`)
4) Popular Trips (`PopularTrips`)
5) Boats Preview (`BoatsPreview`)
6) Coastal Life (`CoastalLife`)

**Hero requirements**
Source: `src/components/sections/home/Hero.tsx`
- Full-viewport hero with a background that can:
  - Crossfade between a list of curated images (derived from playlist posters + `ASSETS.marketing.hero.desktopImages`)
  - Optionally play a background video (desktop only) when:
    - NOT reduced motion
    - NOT data saver
    - NOT small screens
- Hero CTAs:
  - Primary CTA: “Experience Fort Jesus” → `/trips/fort-jesus-trip`
  - Secondary: video play/pause button (only when video can play)
- Trust stats row (3 items): “Certified Safe”, “20+ Years Experience”, “4.8 Rating from 124+”
- Bottom service links (3 quick links):
  - Boat Trips → `/trips`
  - Private Charter → `/contact`
  - Fort Jesus → `/trips/fort-jesus-trip`

**Coastal Life (“Moments from the Coast”)**
Source: `src/components/sections/home/CoastalLife.tsx`, data in `src/config/assets.ts`
- Left column: heading + body copy + CTA button “View Full Gallery” → `/gallery`
- Right column: responsive grid:
  - 1 “feature” image spans 2 cols/rows on md+
  - 4 standard images fill the grid
- Uses `next/image` with correct `sizes` for responsive performance.

Acceptance criteria (Home)
- Hero loads quickly on mobile (no video autoplay, images optimized).
- No layout shift for hero and gallery grid.
- All CTAs route correctly.

---

### 5.2 Trips Listing (`/trips`)
Source: `src/app/(marketing)/trips/page.tsx`, `src/components/trips/TripsGrid.tsx`, `src/components/sections/trips/TripsHeroSection.tsx`

**Purpose**
- Browse all experiences; click through to detail pages.

**Layout**
- Hero section (TripsHeroSection) at top
- Grid of trips (TripsGrid)
- Reviews section at bottom

**Data**
- `trips` array in `src/data/trips.ts`

Acceptance criteria
- Grid items show: trip image(s), name, duration, price, and category badge.
- Clicking any card routes to `/trips/[slug]`.

---

### 5.3 Trip Detail (`/trips/[slug]`)
Source: `src/app/(marketing)/trips/[slug]/page.tsx`

**Purpose**
- Present one experience in depth with pricing CTA, safety, departure, and related trips.

**Behavior by slug**
- For `fort-jesus-trip`: uses a bespoke hero component `FortJesusHero` and shows Hop-on-Hop-off details.
- For other slugs: uses a generic hero (image background + gradient overlay).

**Page structure**
- JSON-LD injection:
  - `TouristTrip` schema for the trip
  - BreadcrumbList schema
- Hero section
- `QuickFactsStrip`
- Main content column:
  - “Your Experience” → `JourneySection`
  - Optional timeline (non-fort-jesus)
  - “Safety & Comfort” → `SafetyFeatures`
  - Departure details → `DepartureDetails`
- Sidebar:
  - Sticky on desktop: `PricingCard`
- Related trips (non-fort-jesus):
  - 3 other trips rendered via `TripCard`
- Reviews section
- Mobile-only floating CTA: `MobileFloatingCTA`

**Exact content fields**
All trip content is sourced from `src/data/trips.ts` and optional content modules it references.

Acceptance criteria
- SSG: routes pre-render via `generateStaticParams()`.
- Correct canonical URL, OG images, meta description.
- Fort Jesus page must show hop-on-hop-off pricing model + journey stops content.

---

### 5.4 Fleet Listing (`/boats`)
Source: `src/app/(marketing)/boats/page.tsx`

**Purpose**
- Showcase available vessels; support charter enquiries.

**Layout**
- Header area (title, subtitle)
- Vessel card grid (2 columns on `sm+`)
- Comparison table (“Which vessel suits you?”) for Setting Sons vs Hunky Dory
- CTA section (“Ready to charter?”) with WhatsApp enquiry deep link

**Data**
- `boats` array in `src/data/boats.ts`

Acceptance criteria
- Each vessel card routes to `/boats/[slug]`.
- Pricing displayed using `formatPrice`.
- CTA opens WhatsApp with a general enquiry message.

---

### 5.5 Vessel Detail (`/boats/[slug]`)
Source: `src/app/(marketing)/boats/[slug]/page.tsx`

**Purpose**
- Provide vessel details + charter rates; encourage booking via WhatsApp.

**Structure**
- Top header with back link to `/boats`
- Main hero image
- Two-column layout (desktop):
  - Main column: description, features grid
  - Sidebar: sticky pricing card with WhatsApp booking deep link, minimum charter hours, advance booking note

**Data**
- Boat data from `src/data/boats.ts`
- Min charter hours & min advance booking hours from `src/constants/contacts.ts`

Acceptance criteria
- `generateStaticParams()` pre-renders all boat slugs.
- Metadata is per-vessel.
- WhatsApp deep link includes vessel name message.

---

### 5.6 Gallery (`/gallery`)
Source: `src/app/(marketing)/gallery/page.tsx`, `src/config/gallery.ts`, `src/components/gallery/*`

**Purpose**
- Rich media gallery with filtering and lightbox; supports bookings via a mobile strip/CTA.

**Data**
- Centralized “CMS-like” source: `src/config/gallery.ts`
  - `GALLERY_IMAGES`, `GALLERY_VIDEOS`, helpers `getAllGalleryItems()`, etc.

**Functional requirements**
- Client-side filtering (by category and/or media type as implemented in `GalleryClientShell`)
- Lightbox for images/videos
- JSON-LD: ImageGallery with associatedMedia entries (ImageObject/VideoObject)
- Stats footer showing image/video counts

Acceptance criteria
- All items render with correct alt/title/description.
- Video items show poster thumbnails and play in lightbox.

---

### 5.7 Contact (`/contact`)
Source: `src/app/(marketing)/contact/page.tsx`

**Purpose**
- Give direct contact methods; provide a form for message capture (currently UI-only).

**Functional requirements**
- WhatsApp CTA at top (primary)
- Cards for Email, Phone, Location
- Form fields: name, email, phone (optional), subject, message

Backend note
- The form currently has no submit handler or API route. See Backend spec for recommended implementation.

Acceptance criteria
- All contact links (`tel:`, `mailto:`, WhatsApp) work.
- Form validates required fields client-side.

---

## 6) Frontend Engineering Specification

**Framework**
- Next.js App Router, React 19, Tailwind 4.

**Rendering strategy**
- Most marketing pages are static/SSG using local TS content arrays.
- Dynamic routes `/trips/[slug]` and `/boats/[slug]` use `generateStaticParams()` for pre-rendering.

**Key modules**
- Routing helpers: `src/lib/routes.ts`
- WhatsApp message building: `src/lib/whatsapp.ts`
- Formatting helpers: `src/lib/format.ts`
- SEO helpers + JSON-LD: `src/lib/seo.ts`

**Performance requirements**
- Use `next/image` for all images; always provide `sizes`.
- Avoid mounting dozens of large images at once in above-the-fold sections.
- Respect reduced motion and data saver signals for video/animation.

**Accessibility**
- All interactive controls have `aria-label` where needed.
- Images must have meaningful `alt` text in content lists (gallery/trips/boats).

---

## 7) Backend / Content Platform Specification (Current + Recommended)

### 7.1 Current state (in repo)
- No server-side database.
- Booking/enquiries are routed via WhatsApp deep links.
- Content is authored in code:
  - Trips: `src/data/trips.ts`
  - Boats: `src/data/boats.ts`
  - Gallery: `src/config/gallery.ts`

This is acceptable for an MVP but becomes hard to scale for non-dev updates.

### 7.2 Recommended backend scope (to make it scalable)

**A) Contact form submission**
Implement a real submission pipeline:
- `POST /api/contact` (Next.js route handler under `src/app/api/contact/route.ts`)
- Validates payload (name, email, subject, message, phone optional)
- Sends:
  - Email via SMTP provider OR transactional email API
  - Or stores to a DB table + admin notification
- Anti-spam:
  - honeypot field + rate limiting + basic abuse protection

**B) Content management (Trips, Boats, Gallery)**
Two options:
1) Headless CMS (preferred for non-dev editing): store the same fields currently in TS.
2) Lightweight DB + admin UI (custom):
   - tables: `trips`, `boats`, `gallery_items`
   - an admin page protected by auth

**C) Booking pipeline (optional)**
If WhatsApp-only is not sufficient, add:
- Availability inquiry form (trip + date + pax + phone) → WhatsApp + backend log
- Payment integration (future milestone)

---

## 8) Content Models (Field Contracts)

### Trip (Experience)
Source model: `src/types/trip.ts` and `src/data/trips.ts`
Required fields (as implemented today):
- `id`, `slug`, `name`, `description`, `fullDescription?`
- `durationHours`, `boatType`, `pricePerPerson`, `departureTimes`
- `status` (`available` / `coming-soon`)
- Media: `image`, `poster?`, `video?`, `galleryImages?`
- SEO: `seoTitle?`, `seoDescription?`, `heroImageAlt?`
- Fort Jesus specifics: `pricingModel?`, `stops?`, `discounts?`, `features?`, `journeyStops?`, `returnNote?`, `stopOvers?`

### Boat (Fleet)
Source model: `src/types/boat.ts` and `src/data/boats.ts`
Fields:
- `id`, `name`, `description`, `capacity`
- `hourlyRate?`, `dailyRate?`, `bestFor?`
- Media: `image`, `video?`, `poster?`, `gallery[]`
- `features[]`

### GalleryItem
Source model: `src/config/gallery.ts`
Fields:
- `id`, `type` (`image` | `video`)
- `src`, `poster?`
- `alt`, `title`, `description?`
- `category`, `featured`
- `metadata?` (date/location/trip/boat/tags)

---

## 9) Analytics / SEO / Ops Requirements

**SEO**
- Per-page metadata exists; preserve canonical URLs and OG image config.
- Sitemap is generated via `src/app/sitemap.ts`.
- Structured data:
  - Home has LocalBusiness JSON-LD (`src/app/page.tsx`)
  - Trip detail has TouristTrip + breadcrumbs (`src/app/(marketing)/trips/[slug]/page.tsx`)
  - Gallery has ImageGallery JSON-LD (`src/app/(marketing)/gallery/page.tsx`)

**Operational**
- Production build requires network access to fetch Google Fonts (Inter) via `next/font/google`.

---

## 10) Delivery Plan (Milestones)

### Milestone 1 — UI parity (static build)
- Implement/verify all routes listed in IA.
- Ensure content lists match source modules exactly.
- Ensure responsive behavior and CTA flows.

### Milestone 2 — Performance hardening
- Audit largest images, ensure correct `sizes`, and consider conversion to modern formats.
- Ensure hero video is gated by device capabilities and user preferences.

### Milestone 3 — Backend integration
- Implement contact form endpoint + notifications.
- Move trips/boats/gallery to CMS or DB + admin UI.

---

## 11) Acceptance Checklist (Definition of Done)
- All pages render and match existing copy/assets.
- Navigation labels and ordering match header.
- WhatsApp deep links work on mobile + desktop.
- `npm run build` succeeds.
- No critical Lighthouse issues: LCP/CLS in hero and media pages.

