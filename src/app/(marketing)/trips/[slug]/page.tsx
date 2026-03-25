import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { 
  Star, Clock, Ship, ArrowRight
} from "lucide-react";
import { trips } from "@/data/trips";
import type { Trip } from "@/types/trip";
import { formatDuration } from "@/lib/format";
import { generateJsonLD } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { SITE_URL, BUSINESS_NAME } from "@/constants/contacts";
import { TripCard } from "@/components/ui/TripCard";
import { PricingCard } from "@/components/trips/PricingCard";
import { TripJourneyTimeline } from "@/components/sections/TripJourneyTimeline";
import { QuickFactsStrip } from "@/components/trips/QuickFactsStrip";
import { JourneySection } from "@/components/trips/JourneySection";
import { ItineraryTimeline } from "@/components/trips/ItineraryTimeline";
import { SafetyFeatures } from "@/components/trips/SafetyFeatures";
import { DepartureDetails } from "@/components/trips/DepartureDetails";
import { ReviewsSection } from "@/components/ui/ReviewsSection";

type TripDetailPageProps = {
  readonly params: Promise<{ readonly slug: string }>;
};

// Per-trip SEO config: keyword-rich titles and search-intent keywords
const tripSeoConfig: Record<string, { title: string; keywords: string[] }> = {
  "fort-jesus-trip": {
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
  },
  "creek-safaris-mangrove": {
    title: "Mangrove Creek Safari Mombasa — Mtwapa & Tudor Creek | Blue Pineapple",
    keywords: [
      "mangrove creek safari Mombasa",
      "Mtwapa creek boat safari",
      "Tudor Creek boat trip",
      "mangrove forest boat tour Kenya",
      "creek safari Mombasa price",
      "nature boat trip Mombasa",
    ],
  },
  "sunset-sailing": {
    title: "Sunset Sailing Mombasa — Indian Ocean Dhow Cruise | Blue Pineapple",
    keywords: [
      "sunset sailing Mombasa",
      "sunset boat cruise Mombasa price",
      "evening dhow cruise Mombasa",
      "Mombasa sunset tour",
      "romantic boat trip Mombasa",
      "Swahili sunset cruise Kenya",
    ],
  },
  "diani-experience": {
    title: "Diani Beach Boat Trip from Mombasa — Full Day Experience | Blue Pineapple",
    keywords: [
      "Diani Beach boat trip from Mombasa",
      "Mombasa to Diani boat",
      "Diani day trip by boat",
      "Diani boat excursion price",
      "Mombasa Diani boat tour Kenya",
    ],
  },
  "snorkelling-reef": {
    title: "Snorkelling Reef Trip Mombasa — Coral Gardens Indian Ocean | Blue Pineapple",
    keywords: [
      "snorkelling Mombasa reef",
      "coral reef snorkelling Kenya",
      "snorkelling trip Mombasa price",
      "Indian Ocean reef snorkel",
      "Mombasa marine park snorkelling",
    ],
  },
  "birthdays-anniversaries": {
    title: "Private Birthday & Anniversary Boat Party Mombasa | Blue Pineapple",
    keywords: [
      "birthday boat party Mombasa",
      "anniversary boat trip Mombasa",
      "private boat hire Mombasa celebration",
      "boat party Mombasa Indian Ocean",
      "private charter Mombasa birthday",
    ],
  },
  "malindi-trip": {
    title: "Mombasa to Malindi Boat Trip — Kenya Coastal Experience | Blue Pineapple",
    keywords: [
      "Mombasa to Malindi boat trip",
      "Malindi boat tour from Mombasa",
      "Kenya coastal boat trip Malindi",
      "Malindi day trip by boat",
    ],
  },
};

export async function generateMetadata({
  params,
}: TripDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);

  if (!trip) {
    return { title: "Experience Not Found" };
  }

  const seo = tripSeoConfig[slug];
  const tripUrl = `https://www.bluepineappleholdings.com/trips/${slug}`;
  const tripImage = trip.image.startsWith("http")
    ? trip.image
    : `https://www.bluepineappleholdings.com${trip.image}`;

  // Meta description — prefer handcrafted, fall back to truncated fullDescription
  const description = trip.seoDescription
    ?? (trip.fullDescription ? trip.fullDescription.slice(0, 155).trim() + "..." : trip.description);

  // Page title — prefer handcrafted seoTitle for <title> tag
  const title = trip.seoTitle ?? trip.name;

  return {
    title,
    description,
    keywords: seo?.keywords ?? [
      `${trip.name} Mombasa`,
      "boat trip Kenya",
      "Blue Pineapple coastal services",
    ],
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

export async function generateStaticParams(): Promise<Array<{ readonly slug: string }>> {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);

  if (!trip) {
    notFound();
  }

  const isComingSoon = trip.status === "coming-soon";
  const tripImage = trip.image.startsWith('http') ? trip.image : `https://bluepineappleholdings.com${trip.image}`;
  const tripUrl = `https://bluepineappleholdings.com/trips/${slug}`;

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

      <div className="min-h-screen bg-neutral-900">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden isolate">
          <Image src={trip.image} alt={trip.heroImageAlt ?? trip.name} fill className="object-cover [transform:translateZ(0)]" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {isComingSoon && (
            <div className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
              Coming Soon
            </div>
          )}

          <Container className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12">
            <Link href={ROUTES.trips} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm font-medium transition-colors animate-fade-in">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Experiences
            </Link>
            <div className="flex items-center gap-3 mb-3 animate-fade-in-up [animation-delay:100ms]">
              <span className="px-3 py-1 bg-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-full">
                {trip.category}
              </span>
              {trip.rating && (
                <div className="flex items-center gap-1.5 bg-neutral-900/60 sm:bg-white/20 sm:backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-bold text-sm">{trip.rating}</span>
                </div>
              )}
            </div>
            <Heading level="h1" className="text-white mb-2 !font-bold text-3xl sm:text-4xl md:text-5xl animate-fade-in-up [animation-delay:200ms]">
              {trip.seoTitle ?? trip.name}
            </Heading>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl animate-fade-in-up [animation-delay:300ms]">
              {trip.description}
            </p>
          </Container>
        </div>

        <QuickFactsStrip trip={trip} />

        <Container className="py-8 sm:py-12 md:py-16 lg:py-20 pb-28 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8 order-2 lg:order-1 space-y-12 lg:space-y-16">
              
              {/* Journey Sections */}
              <section className="pb-8 border-b border-white/10">
                <Heading level="h2" size="xl" className="mb-6 lg:mb-8 !font-bold tracking-tight text-white">Your Experience</Heading>
                <JourneySection trip={trip} />
              </section>

              {/* Journey Highlights — only for trips with journey data */}
              {trip.journeyStops && trip.returnNote && (
                <section className="pt-8 border-t border-white/10">
                  <TripJourneyTimeline 
                    stops={trip.journeyStops} 
                    returnNote={trip.returnNote} 
                  />
                </section>
              )}

              {/* Safety Features */}
              <section className="pt-8 border-t border-white/10">
                <Heading level="h2" size="xl" className="mb-6 lg:mb-8 !font-bold tracking-tight text-white">Safety & Comfort</Heading>
                <SafetyFeatures trip={trip} />
              </section>

              {/* Departure Details - Moved to main content */}
              <section className="pt-8 border-t border-white/10">
                <DepartureDetails trip={trip} />
              </section>

            </div>

            {/* Sidebar - Sticky on desktop, fixed bottom on mobile */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="lg:sticky lg:top-8">
                <PricingCard trip={trip} isComingSoon={isComingSoon} />
              </div>
            </div>

          </div>
        </Container>

        {/* Related Trips */}
        {/* isolate: creates a hard stacking context boundary — prevents bg-neutral-800/50's
            semi-transparent layer from bleeding into compositor layers above/below on mobile.
            contain: scopes any card hover repaints to within this section only. */}
        {slug !== "fort-jesus-trip" && (
          <div className="isolate bg-neutral-800 py-12 sm:py-16">
            <Container>
              <Heading level="h2" size="lg" className="mb-8 text-center !font-bold tracking-tight text-white">More Experiences</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" style={{ contain: 'layout style paint' }}>
                {trips.filter((t) => t.slug !== slug && t.status !== "coming-soon").slice(0, 3).map((relatedTrip) => (
                  <TripCard key={relatedTrip.id} trip={relatedTrip} variant="dark" />
                ))}
              </div>
            </Container>
          </div>
        )}

        <ReviewsSection />
      </div>
    </>
  );
}
