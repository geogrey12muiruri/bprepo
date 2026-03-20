import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { 
  Star, Clock, Anchor, Ship, MapPin, Users, Ticket,
  Waves, Landmark, Sun, Compass, Info, CheckCircle2, ArrowRight
} from "lucide-react";
import { trips } from "@/data/trips";
import type { Trip } from "@/types/trip";
import { formatPrice, formatDuration } from "@/lib/format";
import { generateJsonLD } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";
import { TripCard } from "@/components/ui/TripCard";
import { PricingCard } from "@/components/trips/PricingCard";
import { TripJourneyTimeline } from "@/components/sections/TripJourneyTimeline";

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
    title: `${trip.name} | BluePineapple`,
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
      title: `${trip.name} | BluePineapple`,
      description: trip.fullDescription || trip.description,
      url: tripUrl,
      type: "website",
      images: [{ url: tripImage, width: 1200, height: 630, alt: `${trip.name} - BluePineapple boat trip experience` }],
    },
    twitter: { card: "summary_large_image", title: `${trip.name} | BluePineapple`, description: trip.fullDescription || trip.description, images: [tripImage] },
  };
}

export async function generateStaticParams(): Promise<Array<{ readonly slug: string }>> {
  return trips.map((trip) => ({ slug: trip.slug }));
}

function QuickFactsStrip({ trip }: { trip: Trip }) {
  const departureTimes = trip.departureTimes ? trip.departureTimes.split(",").map(t => t.trim()) : [];
  const vesselSlug = trip.boatType === "Big Boat" ? "setting-sons" : null;
  
  const facts = [
    { icon: Clock, label: "Duration", value: formatDuration(trip.durationHours) },
  ];
  
  if (trip.rating) {
    facts.unshift({ icon: Star, label: "Rating", value: `${trip.rating} (${trip.reviewCount || "new"})` });
  }
  
  return (
    <div className="bg-neutral-800/50 border-b border-white/5 py-5 sm:py-6">
      <Container>
        {/* Mobile: Stack facts vertically, desktop: horizontal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6 md:gap-10">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <fact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{fact.label}</p>
                <p className="text-sm font-bold text-neutral-900">{fact.value}</p>
              </div>
            </div>
          ))}
          
          {/* Vessel as link */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Vessel</p>
              {vesselSlug ? (
                <Link href={`${ROUTES.boats}/${vesselSlug}`} className="text-sm font-bold text-teal-600 hover:text-teal-500 transition-colors">
                  {trip.boatType}
                </Link>
              ) : (
                <p className="text-sm font-bold text-neutral-900">{trip.boatType}</p>
              )}
            </div>
          </div>
          
          {/* Departure Times as interactive chips */}
          {departureTimes.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Departure Times</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {departureTimes.map((time) => (
                    <button
                      key={time}
                      className="px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-teal-600 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

const journeyAssets = {
  journey: "/images/fort/fort3.jpeg",
  coastal: "/images/fort/coastal.jpg",
  fort: "/images/fort/fortj.jpg",
};

function JourneySection({ trip }: { trip: Trip }) {
  const sections = [
    {
      icon: Waves,
      title: "The Journey",
      description: "As the boat glides effortlessly away from the powder-white sands of Mombasa Beach, relax and enjoy the ride. The craft is fully equipped with life jackets, GPS navigation, and CCTV for a safe experience.",
      image: journeyAssets.journey,
    },
    {
      icon: Compass,
      title: "Coastal Views",
      description: "Cruise past Nyali, the pristine waters of Mombasa Marine Park, Likoni, and Shelly Beach. Spot landmarks including Ras Serani Lighthouse, State House, and Mombasa Hospital from the water.",
      image: journeyAssets.coastal,
    },
    {
      icon: Landmark,
      title: "Fort Jesus",
      description: "Arrive at the magnificent Fort Jesus, a UNESCO World Heritage Site. Step ashore and explore Old Town's narrow streets filled with antique treasures and Swahili artistry.",
      image: journeyAssets.fort,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {sections.map((section, idx) => (
        <Link 
          key={idx} 
          href="#itinerary"
          className="group block relative overflow-hidden rounded-xl sm:rounded-2xl aspect-video sm:aspect-[4/5]"
        >
          <Image
            src={section.image}
            alt={section.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 150 + 200}ms` }}>
              <section.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <Heading level="h3" className={`text-white mb-1 !font-bold text-base sm:text-lg group-hover:translate-x-1 transition-transform duration-300 animate-fade-in-up [animation-delay:${idx * 150 + 300}ms]`}>
              {section.title}
            </Heading>
            <p className={`text-white/70 text-xs line-clamp-2 group-hover:opacity-80 transition-opacity duration-300 animate-fade-in-up [animation-delay:${idx * 150 + 400}ms]`}>
              {section.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ItineraryTimeline({ trip }: { trip: Trip }) {
  const highlights = trip.highlights || [
    "Depart from Mombasa Beach",
    "Cruise past Nyali Beach",
    "Pass Mombasa Marine Park",
    "View Likoni & Shelly Beach",
    "Arrive at Fort Jesus Harbour",
    "Explore Old Town",
    "Return journey",
  ];

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-teal-500 via-teal-400 to-amber-500 hidden sm:block" />
      
      <div className="space-y-0">
        {highlights.map((item, idx) => (
          <div key={idx} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                idx === highlights.length - 1 
                  ? "bg-amber-500 text-white" 
                  : "bg-teal-500 text-white"
              }`}>
                {idx === highlights.length - 1 ? (
                  <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <span className="text-sm font-bold">{idx + 1}</span>
                )}
              </div>
            </div>
            <div className="pt-1.5">
              <p className="text-sm sm:text-base font-medium text-neutral-800">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetyFeatures({ trip }: { trip: Trip }) {
  const features = trip.features?.length ? trip.features : [
    "Certified Life Jackets",
    "GPS Navigation",
    "CCTV Surveillance",
    "Experienced Captain",
    "Full Insurance",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" strokeWidth={2} />
          <span className="text-sm font-medium text-neutral-200">{feature}</span>
        </div>
      ))}
    </div>
  );
}

function DepartureDetails({ trip }: { trip: Trip }) {
  // Parse departure times into array for pill rendering
  const departureTimesArray = trip.departureTimes 
    ? trip.departureTimes.split(",").map(t => t.trim()).filter(Boolean)
    : [];
  
  const returnTimesArray = trip.returnTimes
    ? trip.returnTimes.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  const details = [
    ...(trip.departurePoints ? [{ icon: MapPin, label: "Departure Point", value: trip.departurePoints, isArray: false }] : []),
    ...(trip.departureTimes ? [{ icon: Clock, label: "Departure Times", value: trip.departureTimes, isArray: true, times: departureTimesArray }] : []),
    ...(trip.returnTimes ? [{ icon: Clock, label: "Return Times", value: trip.returnTimes, isArray: true, times: returnTimesArray }] : []),
    ...(trip.stops ? [{ icon: Anchor, label: "Stops", value: trip.stops, isArray: false }] : []),
    { icon: Ship, label: "Vessel", value: trip.boatType, isArray: false },
  ];

  return (
    <Card className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <Heading level="h3" size="md" className="mb-5 !font-bold text-white">Trip Details</Heading>
      <div className="space-y-4">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-start gap-3">
            <detail.icon className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{detail.label}</p>
              {/* Render times as pills if it's an array with values, otherwise as plain text */}
              {(detail.isArray && detail.times && detail.times.length > 0) ? (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {detail.times.map((time, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/10 text-neutral-200 text-xs font-medium rounded font-mono">
                      {time}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-neutral-300">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
        {/* Minimum booking info - Enhancement 4 */}
        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-neutral-500 flex items-center gap-1.5">
            <Info className="w-3 h-3" />
            Minimum booking: 6 passengers
          </p>
        </div>
      </div>
    </Card>
  );
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
        <div className="bg-neutral-800/50 py-12 sm:py-16">
          <Container>
            <Heading level="h2" size="lg" className="mb-8 text-center !font-bold tracking-tight text-white">More Experiences</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
