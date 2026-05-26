import { MarketingHero } from "@/components/sections/home/Hero";
import { CLOUDINARY_HERO_IMAGES } from "@/lib/cloudinaryAssets";

export function TripsHeroSection() {
  return (
    <MarketingHero
      badge="Boat trips • Mombasa"
      title="Choose your next coastal experience"
      subtitle="Fort Jesus harbour tours, mangrove creek safaris, snorkelling reefs and sunset sailings — curated for comfort, safety and unforgettable views."
      primaryCta={{ href: "#trips", label: "Browse trips" }}
      secondaryCta={{ href: "/contact", label: "Private charter" }}
      backgroundImages={CLOUDINARY_HERO_IMAGES}
      showVideoControls={false}
      contentAlign="center"
      titleStyle="clean"
      carouselStyle="cinematic"
    />
  );
}
