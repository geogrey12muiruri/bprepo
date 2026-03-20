# SEO Setup Guide - Google Search Console & Analytics

## Phase 3 Implementation Complete ✅

### What Was Implemented:

1. **Enhanced Image Alt Text** ✅
   - All images now have descriptive, keyword-rich alt text
   - Includes location (Mombasa, Kenya) and context
   - Better for accessibility and image search

2. **Internal Linking Strategy** ✅
   - Related trips section on trip detail pages
   - Contextual links in content (PopularTrips section)
   - Footer navigation links
   - Better site structure for search engines

3. **Heading Structure** ✅
   - Proper H1-H6 hierarchy maintained
   - H1 on each page (trip name on detail pages)
   - H2 for main sections
   - Consistent structure across site

4. **Performance Optimizations** ✅
   - Already using Next.js Image optimization
   - Lazy loading implemented
   - Static generation for better performance

---

## Google Search Console Setup

### Step 1: Verify Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://bluepineappleholdings.com`
4. Choose verification method:
   - **Recommended**: HTML tag (add to `<head>`)
   - Or: DNS record
   - Or: Google Analytics (if you have it)

### Step 2: Add Verification Meta Tag

Once you get the verification code, add it to `/src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  // ... existing metadata
  verification: {
    google: "your-verification-code-here",
  },
};
```

### Step 3: Submit Sitemap

1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Wait for indexing (can take 24-48 hours)

### Step 4: Monitor

- Check "Coverage" for indexing status
- Monitor "Performance" for search queries
- Review "Enhancements" for rich results

---

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Create new property: "BluePineapple"
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Install GA4

Create `/src/lib/analytics.ts`:

```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

### Step 3: Add to Layout

Add to `/src/app/layout.tsx`:

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>
        {/* ... */}
      </body>
    </html>
  );
}
```

### Step 4: Add Environment Variable

Add to `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Performance Monitoring

### Core Web Vitals

Test your site with:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

### Key Metrics to Monitor:

1. **LCP (Largest Contentful Paint)** - Should be < 2.5s
2. **FID (First Input Delay)** - Should be < 100ms
3. **CLS (Cumulative Layout Shift)** - Should be < 0.1

---

## Local SEO Setup

### Google Business Profile

1. Go to [Google Business Profile](https://business.google.com)
2. Create/claim your business
3. Add details:
   - Business name: "Blue Pineapple Coastal Services"
   - Address: Mombasa Marina, Mombasa, Kenya
   - Phone: +254 708 485 978
   - Website: https://bluepineappleholdings.com
   - Category: "Boat Tour Agency" or "Tourist Attraction"
4. Add photos
5. Enable messaging
6. Get reviews

### Benefits:
- Appear in local search results
- Google Maps visibility
- Review collection
- Business insights

---

## Schema Validation

### Test Your Structured Data:

1. [Schema.org Validator](https://validator.schema.org/)
2. [Google Rich Results Test](https://search.google.com/test/rich-results)
3. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## SEO Checklist

### Technical ✅
- [x] robots.txt
- [x] XML sitemap
- [x] Canonical URLs
- [x] Meta tags
- [x] OpenGraph tags
- [x] Structured data (LocalBusiness, TouristTrip)
- [x] Image alt text
- [x] Internal linking

### Content
- [x] Keyword optimization
- [x] Descriptive titles
- [x] Meta descriptions
- [x] Heading structure

### Setup Required
- [ ] Google Search Console verification
- [ ] Sitemap submission
- [ ] Google Analytics installation
- [ ] Google Business Profile
- [ ] Performance monitoring

---

## Next Steps After Setup

1. **Monitor Search Console** - Check indexing status weekly
2. **Track Analytics** - Monitor organic traffic
3. **Optimize Based on Data** - Use insights to improve
4. **Build Backlinks** - Reach out to travel blogs, directories
5. **Content Updates** - Keep content fresh and relevant
6. **Local Citations** - List on travel directories

---

## Key URLs to Monitor

- Sitemap: https://bluepineappleholdings.com/sitemap.xml
- Robots: https://bluepineappleholdings.com/robots.txt
- Home: https://bluepineappleholdings.com
- Search Console: https://search.google.com/search-console
