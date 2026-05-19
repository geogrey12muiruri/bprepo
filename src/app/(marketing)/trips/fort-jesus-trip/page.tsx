import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { trips } from "@/data/trips";
import { generateJsonLD } from "@/lib/seo";
import { SITE_URL, BUSINESS_NAME } from "@/constants/contacts";
import { PricingCard } from "@/components/trips/PricingCard";
import { QuickFactsStrip } from "@/components/trips/QuickFactsStrip";
import { ItineraryTimeline } from "@/components/trips/ItineraryTimeline";
import { SafetyFeatures } from "@/components/trips/SafetyFeatures";
import { DepartureDetails } from "@/components/trips/DepartureDetails";
import { FortJesusHero } from "@/components/trips/FortJesusHero";
import { HopOnHopOffSection } from "@/components/trips/HopOnHopOffSection";

const SLUG = "fort-jesus-trip";

export async function generateMetadata(): Promise<Metadata> {
  const trip = trips.find((t) => t.slug === SLUG);

  if (!trip) {
    return { title: "Experience Not Found" };
  }

  // From [slug]/page.tsx
  const seo = {
    title: "Fort Jesus Boat Tour from Mombasa Beach | Blue Pineapple",
    keywords: [
      "Fort Jesus boat tour Mombasa",
      "Fort Jesus harbour tour",
      "boat trip to Fort Jesus from Mombasa Beach",
      "UNESCO Fort Jesus Mombasa",
      "Mombasa Old Town boat tour",
      "Fort Jesus tour price Kenya",
      "Mombasa Marine Park boat trip",
    ],
  };
  const tripImage = trip.image.startsWith("http")
    ? trip.image
    : `https://www.bluepineappleholdings.com${trip.image}`;

  const description = trip.seoDescription
    ?? (trip.fullDescription ? trip.fullDescription.slice(0, 155).trim() + "..." : trip.description);

  const title = trip.seoTitle ?? trip.name;

  return {
    title,
    description,
    keywords: seo.keywords,
    openGraph: {
      title: trip.seoTitle ?? trip.name,
      description,
      url: `${SITE_URL}/trips/${trip.slug}`,
      siteName: BUSINESS_NAME,
      images: [
        {
          url: tripImage,
          width: 1200,
          height: 630,
          alt: trip.heroImageAlt ?? trip.name,
        },
      ],
      type: "website",
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image",
      title: trip.seoTitle ?? trip.name,
      description,
      images: [tripImage],
    },
    alternates: {
      canonical: `${SITE_URL}/trips/${trip.slug}`,
    },
  };
}

export default async function FortJesusTripPage() {
  const trip = trips.find((t) => t.slug === SLUG);

  if (!trip) {
    notFound();
  }

  const isComingSoon = trip.status === "coming-soon";
  const tripImage = trip.image.startsWith('http') ? trip.image : `https://bluepineappleholdings.com${trip.image}`;
  const tripUrl = `https://bluepineappleholdings.com/trips/${SLUG}`;

  const jsonLD = generateJsonLD({
    "@type": "TouristTrip",
    "@id": `${tripUrl}#trip`,
    name: trip.name,
    description: trip.fullDescription || trip.description,
    image: [tripImage],
    url: tripUrl,
    touristType: ["Family", "History Enthusiasts", "Cultural Tourists"],
    provider: { 
      "@type": "LocalBusiness", 
      "@id": "https://bluepineappleholdings.com/#organization", 
      name: "Blue Pineapple Coastal Services",
      priceRange: `KES ${trip.pricePerPerson}–${trip.pricePerPerson * 2}`
    },
    location: { "@type": "Place", name: "Mombasa, Kenya", address: { "@type": "PostalAddress", addressLocality: "Mombasa", addressCountry: "KE" } },
    duration: `PT${trip.durationHours}H`,
    ...(trip.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: trip.rating.toString(), reviewCount: trip.reviewCount || 0 } }),
    offers: { 
      "@type": "Offer", 
      price: trip.pricePerPerson, 
      priceCurrency: "KES", 
      availability: isComingSoon ? "https://schema.org/PreOrder" : "https://schema.org/InStock", 
      url: tripUrl, 
      validFrom: new Date().getFullYear().toString() 
    },
    itinerary: { "@type": "ItemList", itemListElement: trip.highlights?.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h })) || [] },
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experiences",
        item: `${SITE_URL}/trips`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: trip.seoTitle ?? trip.name,
        item: `${SITE_URL}/trips/${trip.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-stone-50 text-neutral-950">
        
        {/* New Specialized Hero Carousel */}
        <FortJesusHero trip={trip} />

        <QuickFactsStrip trip={trip} />

        {/* anchor for time-pill click → scroll target */}
        <div id="plan-trip-anchor" />

        {/* Make Hop-On Hop-Off the primary content block (above the fold after hero) */}
        <div className="py-8 sm:py-10 md:py-12 lg:py-14 pb-28 lg:pb-14">
          <Container>
            <HopOnHopOffSection />
          </Container>
        </div>

        <Container className="py-6 sm:py-10 md:py-12 lg:py-16 pb-28 lg:pb-20">
          {/* In-page navigation */}
          <div className="mb-10 sm:mb-12">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {[
                { href: "#hop-on-hop-off", label: "Route & Fares" },
                { href: "#safety", label: "Safety & Comfort" },
                { href: "#departure", label: "Departure" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-neutral-200 bg-white hover:border-brand-blue hover:text-brand-blue text-neutral-700 text-xs font-semibold transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-12 lg:space-y-16">
              {/* Safety Features */}
              <section id="safety" className="scroll-mt-24 border-t border-neutral-200 pt-8">
                <Heading level="h2" size="xl" className="mb-5 lg:mb-6 !font-bold tracking-tight text-neutral-950">Safety & Comfort</Heading>
                <SafetyFeatures trip={trip} />
              </section>

              {/* Itinerary fallback (only if no hop-on/off route exists) */}
              {(!trip.stopOvers || trip.stopOvers.length === 0) && (
                <section className="pt-8 border-t border-neutral-200">
                  <Heading level="h2" size="xl" className="mb-6 lg:mb-8 !font-bold tracking-tight text-neutral-950">
                    Itinerary
                  </Heading>
                  <ItineraryTimeline trip={trip} />
                </section>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-8 order-first lg:order-last">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* PricingCard in Sidebar */}
                <PricingCard trip={trip} isComingSoon={isComingSoon} />
                
                {/* Departure Details in Sidebar */}
                <div id="departure" className="scroll-mt-24">
                  <DepartureDetails trip={trip} />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>
    </>
  );
}
