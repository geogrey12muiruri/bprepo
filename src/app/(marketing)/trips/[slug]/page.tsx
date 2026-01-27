import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { trips } from "@/data/trips";
import { formatPrice, formatDuration } from "@/lib/format";
import { generateJsonLD } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

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

  return {
    title: `${trip.name} | BluePineapple`,
    description: trip.fullDescription,
    openGraph: {
      title: trip.name,
      description: trip.fullDescription,
      images: [{ url: trip.image, width: 1200, height: 630, alt: trip.name }],
    },
  };
}

export async function generateStaticParams(): Promise<
  Array<{ readonly slug: string }>
> {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export default async function TripDetailPage({
  params,
}: TripDetailPageProps) {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);

  if (!trip) {
    notFound();
  }

  const isComingSoon = trip.status === "coming-soon";

  const jsonLD = generateJsonLD({
    "@type": "TouristAttraction",
    name: trip.name,
    description: trip.fullDescription,
    image: trip.image,
    ...(trip.rating && {
      rating: {
        "@type": "AggregateRating",
        ratingValue: trip.rating.toString(),
        reviewCount: trip.reviewCount || 0,
      },
    }),
    offers: {
      "@type": "Offer",
      price: trip.pricePerPerson.toString(),
      priceCurrency: "KES",
      availability: isComingSoon ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />

      <div className="py-12 md:py-20 bg-neutral-50/50">
        <Container>
          {/* Breadcrumb / Back Link */}
          <Link
            href={ROUTES.trips}
            className="inline-flex items-center gap-2 mb-8 text-neutral-400 hover:text-teal-600 transition-colors group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-xs font-black uppercase tracking-widest">Back to Experiences</span>
          </Link>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">

            {/* Left Column: Visuals & Details */}
            <div className="lg:col-span-8">
              {/* Cinematic Visual Header */}
              <div className="relative aspect-video overflow-hidden rounded-[2.5rem] mb-12 shadow-2xl bg-neutral-200 border-8 border-white">
                {trip.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={trip.poster}
                    className="h-full w-full object-cover"
                  >
                    <source src={trip.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={trip.image}
                    alt={trip.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}

                {isComingSoon && (
                  <div className="absolute top-6 right-6 z-10 bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-2xl backdrop-blur-md uppercase tracking-tight">
                    Coming Soon — Watch this space
                  </div>
                )}
              </div>

              <div className="px-4 md:px-0">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-teal-100 px-4 py-1.5 border border-teal-200">
                    <span className="text-xs font-black text-teal-700 uppercase tracking-widest">
                      {trip.category}
                    </span>
                  </div>
                  <div className="rounded-full bg-blue-100 px-4 py-1.5 border border-blue-200">
                    <span className="text-xs font-black text-blue-700 uppercase tracking-widest">
                      {trip.boatType}
                    </span>
                  </div>
                </div>

                <Heading level="h1" size="3xl" className="mb-6 !leading-tight tracking-tight text-neutral-900">
                  {trip.name}
                </Heading>

                <div className="mb-10 flex flex-wrap items-center gap-6 text-sm font-bold text-neutral-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    <span className="text-neutral-900">{trip.rating || "New"}</span>
                    {trip.reviewCount && <span className="opacity-50">({trip.reviewCount})</span>}
                  </div>
                  <span className="opacity-20 hidden md:inline">|</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl opacity-60">🕐</span>
                    <span className="text-neutral-900">{formatDuration(trip.durationHours)}</span>
                  </div>
                </div>

                <div className="prose prose-lg prose-neutral mb-16 max-w-none">
                  <p className="text-xl text-neutral-600 leading-relaxed font-medium mb-8">
                    {trip.description}
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    {trip.fullDescription}
                  </p>
                </div>

                {/* Dynamic Details Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-neutral-200 pt-16">
                  {trip.highlights && trip.highlights.length > 0 && (
                    <div className="space-y-6">
                      <Heading level="h2" size="xl" className="tracking-tight">
                        Highlights
                      </Heading>
                      <ul className="space-y-4">
                        {trip.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-4 text-neutral-700 text-lg">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-xs">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-6">
                    <Heading level="h2" size="xl" className="tracking-tight">
                      Experience Safety
                    </Heading>
                    <p className="text-neutral-600 leading-relaxed">
                      Your safety is our absolute priority. This experience includes:
                    </p>
                    <ul className="space-y-4">
                      {["Certified Life Jackets", "Onboard First Aid", "GPS & Communication", "Experienced Captain"].map((item) => (
                        <li key={item} className="flex items-start gap-4 text-neutral-700 font-semibold uppercase tracking-wider text-xs">
                          <span className="text-teal-600">⚓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Booking */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Card className="p-8 shadow-2xl border-none rounded-[2rem] bg-white ring-1 ring-black/5">
                <div className="mb-8 p-6 rounded-2xl bg-neutral-50/80 border border-neutral-100 items-center justify-center text-center">
                  <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">Starting From</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-teal-600 tracking-tighter">
                      {formatPrice(trip.pricePerPerson)}
                    </span>
                    <span className="text-neutral-400 font-bold uppercase text-xs tracking-widest">/ Person</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {isComingSoon ? (
                    <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 text-center">
                      <p className="text-amber-900 font-bold mb-1">Coming Soon</p>
                      <p className="text-xs text-amber-700/80">Follow us for launch updates</p>
                    </div>
                  ) : (
                    <Button className="w-full h-16 text-lg rounded-2xl font-black shadow-lg shadow-teal-700/20" size="lg">
                      Book This Experience
                    </Button>
                  )}

                  <button
                    type="button"
                    className="w-full h-16 border-2 border-neutral-100 text-neutral-600 rounded-2xl font-bold hover:bg-neutral-50 transition-all active:scale-95"
                  >
                    Ask a Question
                  </button>
                </div>

                <div className="pt-8 border-t border-neutral-100">
                  <div className="flex items-center gap-4 text-neutral-600 mb-2">
                    <span className="text-2xl">🛥️</span>
                    <div className="text-sm">
                      <p className="font-bold text-neutral-900">Vessel Option</p>
                      <p className="opacity-70">{trip.boatType}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Certified Tourism Partner</p>
                  <div className="flex gap-4 opacity-30 grayscale">
                    <div className="w-10 h-10 bg-neutral-200 rounded-full" />
                    <div className="w-10 h-10 bg-neutral-200 rounded-full" />
                    <div className="w-10 h-10 bg-neutral-200 rounded-full" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
