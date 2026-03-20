import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { boats } from "@/data/boats";
import { formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/routes";
import { ArrowLeft, Users, Shield, Clock, Calendar, CheckCircle2, Navigation, Camera, Anchor } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const boat = boats.find((b) => b.id === slug);

  if (!boat) {
    return { title: "Boat Not Found" };
  }

  return {
    title: `${boat.name} | BluePineapple Fleet`,
    description: boat.description,
    openGraph: {
      title: `${boat.name} | BluePineapple Fleet`,
      description: boat.description,
      images: [boat.image],
    },
  };
}

export async function generateStaticParams() {
  return boats.map((boat) => ({ slug: boat.id }));
}

const featureIcons: Record<string, typeof Shield> = {
  "GPS": Navigation,
  "Surveillance": Camera,
  "Insured": Shield,
  "Life Jackets": Anchor,
};

export default async function BoatDetailPage({ params }: Props) {
  const { slug } = await params;
  const boat = boats.find((b) => b.id === slug);

  if (!boat) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="pt-16 sm:pt-20 pb-6 bg-neutral-900 border-b border-white/5">
        <Container>
          <div className="flex items-center justify-between mb-4">
            <Link 
              href={ROUTES.boats}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">
              Premium Vessel
            </span>
          </div>
          <Heading level="h1" size="xl" className="mb-2 text-white !font-bold">
            {boat.name}
          </Heading>
          <div className="flex items-center gap-4 text-neutral-400 text-xs">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Up to {boat.capacity} guests</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Fully Insured & Certified</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Image */}
      <Container className="py-6">
        <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9] overflow-hidden rounded-xl">
          <Image
            src={boat.image}
            alt={boat.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </Container>

      {/* Details */}
      <Container className="pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="p-5 sm:p-6 bg-white/5 rounded-xl border border-white/5">
              <Heading level="h3" size="md" className="text-white mb-3 !font-semibold">
                About This Vessel
              </Heading>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {boat.description}
              </p>
            </div>

            {/* Features */}
            <div className="p-5 sm:p-6 bg-white/5 rounded-xl border border-white/5">
              <Heading level="h3" size="md" className="text-white mb-4 !font-semibold">
                Features & Amenities
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {boat.features.map((feature, idx) => {
                  const Icon = Object.entries(featureIcons).find(([key]) => feature.includes(key))?.[1] || CheckCircle2;
                  return (
                    <div key={idx} className="flex items-center gap-2.5 p-3 bg-white/5 rounded-lg">
                      <Icon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span className="text-neutral-200 text-xs">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-5 sm:p-6 bg-white/5 rounded-xl border border-white/5">
              <Heading level="h3" size="md" className="text-white mb-4 !font-semibold">
                Charter Rates
              </Heading>
              
              <div className="space-y-3 mb-6">
                {boat.hourlyRate && (
                  <div className="flex items-center justify-between p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                    <div>
                      <p className="text-white font-semibold text-sm">Hourly</p>
                      <p className="text-neutral-400 text-xs">Perfect for short trips</p>
                    </div>
                    <p className="text-teal-400 font-bold text-lg">{formatPrice(boat.hourlyRate)}</p>
                  </div>
                )}
                {boat.dailyRate && (
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                    <div>
                      <p className="text-white font-semibold text-sm">Daily</p>
                      <p className="text-neutral-400 text-xs">Full day adventure</p>
                    </div>
                    <p className="text-white font-bold text-lg">{formatPrice(boat.dailyRate)}</p>
                  </div>
                )}
              </div>

              <Link
                href={ROUTES.contact}
                className="block w-full py-3 bg-teal-500 hover:bg-teal-400 text-white text-center rounded-lg font-semibold text-sm transition-colors"
              >
                Book This Vessel
              </Link>
              
              <p className="text-neutral-500 text-[10px] text-center mt-3">
                Reservations should be made in advance
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
