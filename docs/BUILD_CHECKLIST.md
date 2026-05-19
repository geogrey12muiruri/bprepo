# Build Checklist — Blue Pineapple Website

Last updated: 2026-05-15

Use this as an execution checklist across UI/UX, frontend, and backend.

---

## UI/UX Team Checklist

- Produce a sitemap + user flows matching `docs/BUILD_SPEC_WEBSITE.md`.
- Deliver responsive designs for:
  - Home
  - Trips listing
  - Trip detail (Fort Jesus variant + generic variant)
  - Fleet listing
  - Vessel detail
  - Gallery (filters + lightbox)
  - Contact
- Define component specs for:
  - Header (desktop nav + mobile drawer)
  - Trip cards (listing + related)
  - Pricing card (desktop sticky + mobile floating CTA)
  - Gallery card + lightbox behaviors
- Provide an “asset usage guide”:
  - Which images/videos appear above the fold per page
  - Cropping recommendations for 16:9 / 21:9 / square where used
- Accessibility pass:
  - Focus states, keyboard nav, contrast checks, alt text rules

Deliverables:
- Figma file with page frames + reusable components
- Token guidance (colors, typography, spacing) consistent with Tailwind usage

---

## Frontend Team Checklist

### Routes & layout
- Ensure all routes exist and match `docs/BUILD_SPEC_WEBSITE.md`.
- Verify header padding behavior (fixed header + `main pt-14` in `src/app/layout.tsx`).

### Content fidelity
- Confirm the rendered text matches:
  - `src/data/trips.ts`
  - `src/data/boats.ts`
  - `src/config/gallery.ts`
  - `src/constants/contacts.ts`
- Confirm nav labels and ordering match `src/components/layout/Header.tsx`.

### Media & performance
- Enforce `next/image` everywhere; include `sizes`.
- Ensure hero video is gated by:
  - reduced motion
  - data saver
  - mobile breakpoint
- Avoid loading all gallery media at once above the fold.

### SEO
- Preserve per-page metadata patterns.
- Validate JSON-LD on:
  - Home
  - Trip detail
  - Gallery
- Confirm canonical URLs use `getAbsoluteUrl(...)`.
- Ensure `src/app/sitemap.ts` is correct and up to date.

### QA
- Run:
  - `npm run lint`
  - `npm run build`
- Verify:
  - 404 behavior
  - all CTAs open correct routes or WhatsApp links
  - mobile drawer works and traps intended interactions

---

## Backend Team Checklist (If implementing backend scope)

### Contact submissions
- Implement `POST /api/contact` as specified in `docs/BACKEND_AND_API_SPEC.md`.
- Add:
  - server-side validation
  - rate limiting
  - honeypot support
  - notification delivery (email) and/or DB storage

### Content scalability
- Choose approach:
  - Headless CMS integration, or
  - DB + admin UI
- Mirror content models for:
  - Trips
  - Boats
  - Gallery items
- Provide migration from existing TS content lists to the new source.

### Ops
- Decide on hosting:
  - app hosting
  - media storage (S3-compatible)
  - email provider

---

## Project Milestones (Parallelizable)

1) UI parity (static): match all pages + content
2) Performance pass: optimize largest assets, verify LCP/CLS
3) Backend: contact endpoint + notifications
4) CMS: move trips/boats/gallery out of code
5) Booking expansion: structured enquiry + optional payment

