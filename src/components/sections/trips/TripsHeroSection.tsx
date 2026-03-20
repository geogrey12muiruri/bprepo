import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export function TripsHeroSection() {
  return (
    <div className="relative py-10 sm:py-12 md:py-16 bg-neutral-900">
      <Container>
        <div className="max-w-3xl">
          <span className="text-[10px] sm:text-xs font-black text-teal-400 uppercase tracking-[0.3em]">
            Discover Kenya
          </span>
          <Heading level="h1" size="3xl" className="mt-3 mb-4 text-white !font-bold">
            Coastal Experiences
          </Heading>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
            From historic Fort Jesus tours to sunset sailings and mangrove adventures.
          </p>
        </div>
      </Container>
      
      {/* Decorative wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
    </div>
  );
}
