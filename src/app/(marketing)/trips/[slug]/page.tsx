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
import { TripCard } from "@/components/ui/TripCard";
import { PricingCard } from "@/components/trips/PricingCard";
import { TripJourneyTimeline } from "@/components/sections/TripJourneyTimeline";
import { QuickFactsStrip } from "@/components/trips/QuickFactsStrip";
import { JourneySection } from "@/components/trips/JourneySection";
import { ItineraryTimeline } from "@/components/trips/ItineraryTimeline";
import { SafetyFeatures } from "@/components/trips/SafetyFeatures";
import { DepartureDetails } from "@/components/trips/DepartureDetails";

type TripDetailPageProps = {
  readonly params: Promise<{ readonly slug: string }>;
};

export async function generateMetadata({
  params,
}: TripDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);

  if (!trip) {
    return { title: "Experience Not Found" };
  }

  const tripUrl = `https://www.bluepineappleholdings.com/trips/${slug}`;
  const tripImage = trip.image.startsWith('http') 
    ? trip.image 
    : `https://www.bluepineappleholdings.com${trip.image}`;

  return {
    title: trip.name,
    description: trip.fullDescription || trip.description,
    alternates: {
      canonical: tripUrl,
    },
    keywords: [
      trip.name,
      "boat trips Kenya",
      "coastal experiences Mombasa",
      trip.category,
      trip.boatType,
      "Mombasa tours",
    ],
    openGraph: {
      title: trip.name,
      description: trip.fullDescription || trip.description,
      url: tripUrl,
      type: "website",
      images: [{ url: tripImage, width: 1200, height: 630, alt: `${trip.name} - BluePineapple boat trip experience` }],
    },
    twitter: { card: "summary_large_image", title: trip.name, description: trip.fullDescription || trip.description, images: [tripImage] },
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
    image: tripImage,
    url: tripUrl,
    provider: { "@type": "LocalBusiness", "@id": "https://bluepineappleholdings.com/#organization", name: "Blue Pineapple Coastal Services" },
    location: { "@type": "Place", name: "Mombasa, Kenya", address: { "@type": "PostalAddress", addressLocality: "Mombasa", addressCountry: "KE" } },
    duration: `PT${trip.durationHours}H`,
    ...(trip.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: trip.rating.toString(), reviewCount: trip.reviewCount || 0 } }),
    offers: { "@type": "Offer", price: trip.pricePerPerson.toString(), priceCurrency: "KES", availability: isComingSoon ? "https://schema.org/PreOrder" : "https://schema.org/InStock", url: tripUrl, validFrom: new Date().toISOString() },
    itinerary: { "@type": "ItemList", itemListElement: trip.highlights?.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h })) || [] },
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }} />

      <div className="min-h-screen bg-neutral-900">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <Image src={trip.image} alt={trip.name} fill className="object-cover" priority sizes="100vw" />
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
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-bold text-sm">{trip.rating}</span>
                </div>
              )}
            </div>
            <Heading level="h1" className="text-white mb-2 !font-bold text-3xl sm:text-4xl md:text-5xl animate-fade-in-up [animation-delay:200ms]">
              {trip.name}
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

              {/* Journey Highlights */}
              {trip.journeyStops && trip.returnNote ? (
                <section className="pt-8 border-t border-white/10">
                  <TripJourneyTimeline 
                    stops={trip.journeyStops} 
                    returnNote={trip.returnNote} 
                  />
                </section>
              ) : (
                <section className="pt-8 border-t border-white/10">
                  <Heading level="h2" size="xl" className="mb-6 lg:mb-8 !font-bold tracking-tight text-white">Itinerary</Heading>
                  <ItineraryTimeline trip={trip} />
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
        <div className="isolate bg-neutral-800 py-12 sm:py-16">
          <Container>
            <Heading level="h2" size="lg" className="mb-8 text-center !font-bold tracking-tight text-white">More Experiences</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 [contain:layout_style_paint]">
              {trips.filter((t) => t.slug !== slug && t.status !== "coming-soon").slice(0, 3).map((relatedTrip) => (
                <TripCard key={relatedTrip.id} trip={relatedTrip} variant="dark" />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
