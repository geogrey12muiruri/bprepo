# Backend & API Specification — Blue Pineapple Website

Last updated: 2026-05-15

This repo is currently a static marketing site with WhatsApp-driven conversion. This spec defines:
- What “backend” functionality exists today
- What to build to support a scalable, production-grade implementation

---

## 1) Current State (As Implemented)

### 1.1 No persistent backend
- No database
- No authentication
- No admin UI

### 1.2 Contact form is UI-only
Route: `src/app/(marketing)/contact/page.tsx`
- The form has fields and client-side required validation.
- There is no submit handler and no API endpoint.

### 1.3 Bookings via WhatsApp deep links
- “Book now” CTAs create WhatsApp links using helpers:
  - `src/lib/whatsapp.ts`
- Content used in messages is derived from:
  - Trip or boat name
  - General booking/enquiry templates

### 1.4 Content authored in code
Canonical sources:
- Trips: `src/data/trips.ts` (+ `src/content/trips/*`)
- Boats: `src/data/boats.ts`
- Gallery: `src/config/gallery.ts`
- Global contacts: `src/constants/contacts.ts`

---

## 2) Backend Scope Recommendation (Build Plan)

### Phase A — Contact message submission (minimal backend)
Add:
- `POST /api/contact`
- Store submissions + notify staff

Goals:
- Replace UI-only form with a real intake pipeline
- Reduce spam (rate limit + honeypot)
- Provide a traceable record of inbound requests

### Phase B — Content platform (make content editable without code)
Move Trips/Boats/Gallery from TS files to a CMS or DB-backed admin interface.

Goals:
- Non-dev content updates
- Rich media management
- “Featured” controls + ordering + categories

### Phase C — Booking pipeline (optional)
Add structured booking enquiries:
- Trip selection + desired date/time + pax + hotel/pickup notes
- Optional payment workflow (future)

---

## 3) API Specifications

### 3.1 `POST /api/contact`

**Request body (JSON)**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254 708 485 978",
  "subject": "Booking inquiry",
  "message": "I want to book Fort Jesus for 4 people next week.",
  "company": ""
}
```

Notes:
- `company` is a honeypot field: UI renders it hidden; backend rejects if non-empty.
- Server validates:
  - `name`: required, min length
  - `email`: required, valid format
  - `subject`: required
  - `message`: required, min length
  - `phone`: optional (if present, validate basic phone string)

**Responses**
- `200 OK`
```json
{ "ok": true }
```
- `400 Bad Request` (validation error)
- `429 Too Many Requests` (rate limit)
- `500 Internal Server Error`

**Rate limiting**
- Per-IP + per-user-agent window:
  - e.g. 10 requests / 10 minutes
- Include a stricter burst control for repeated failures.

**Storage**
One of:
- Email-only (fastest): forward to `EMAIL` from `src/constants/contacts.ts`
- Database:
  - Table `contact_submissions`
  - Fields: id, created_at, name, email, phone, subject, message, page_url, user_agent, ip_hash

---

## 4) Content Models (Backend-Ready Schemas)

These models mirror the fields already in code so the “exact content” is portable.

### 4.1 Trip
Source today: `src/data/trips.ts`

Fields:
- `id` (string, stable identifier)
- `slug` (string, unique)
- `name` (string)
- `description` (string)
- `fullDescription` (string, long)
- `category` (enum/string)
- `status` (enum: `available`, `coming-soon`)

Commerce:
- `durationHours` (number)
- `boatType` (string)
- `pricePerPerson` (number, KES)
- `departureTimes` (string)
- `departurePoints` (string, optional)

Media:
- `image` (string URL/path)
- `poster` (string URL/path, optional)
- `video` (string URL/path, optional)
- `galleryImages` (string[], optional)

SEO:
- `seoTitle` (string, optional)
- `seoDescription` (string, optional)
- `heroImageAlt` (string, optional)

Fort Jesus / advanced itinerary fields (optional):
- `pricingModel` (enum/string)
- `stops` (string)
- `discounts` (json object)
- `features` (string[])
- `journeyStops` (json array)
- `returnNote` (string)
- `stopOvers` (json array)

### 4.2 Boat
Source today: `src/data/boats.ts`

Fields:
- `id` (string)
- `name` (string)
- `description` (string)
- `capacity` (number)
- `hourlyRate` (number, optional)
- `dailyRate` (number, optional)
- `bestFor` (string, optional)
- `features` (string[])
- `image` (string)
- `poster` (string, optional)
- `video` (string, optional)
- `gallery` (string[])

### 4.3 Gallery Item
Source today: `src/config/gallery.ts`

Fields:
- `id` (string)
- `type` (enum: `image`, `video`)
- `src` (string)
- `poster` (string, optional)
- `alt` (string)
- `title` (string)
- `description` (string, optional)
- `category` (enum/string)
- `featured` (boolean)
- `metadata` (json, optional: date/location/trip/boat/tags)

---

## 5) Admin & Ops Requirements (If building a CMS-lite)

Minimum features:
- CRUD for trips/boats/gallery items
- Drag-drop ordering for “featured” lists (home/gallery)
- Media upload to object storage (S3-compatible)
- Content validation (required fields, alt text enforcement)

Auth:
- Password + 2FA or magic link, role-based access for editors vs admins.

---

## 6) Integrations (Optional)

Depending on business needs:
- Analytics events for CTA clicks (WhatsApp, Book buttons, trip views)
- Email provider for contact submissions
- Payment provider for deposits
- SMS confirmations for bookings

