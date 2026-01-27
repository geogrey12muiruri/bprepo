import type { Boat } from "@/types/boat";

export const boats: ReadonlyArray<Boat> = [
  {
    id: "setting-sons",
    name: "Setting Sons",
    capacity: 35,
    description: "This beautifully crafted bespoke boat was designed specifically as a passenger boat to ride the Mombasa waves and operate in shallow waters. Even at high speeds and choppy conditions, splashback is minimal. Passenger safety is prioritized with protection rails, easy access steps, onboard GPS system, and a 360° surveillance camera. Fully insured and certified to carry 35 passengers, offering peace of mind on every voyage.",
    image: "/images/vessels/boat.jpeg",
    video: "/videos/vessels/settings.mp4",
    poster: "/images/vessels/boat.jpeg",
  },
  {
    id: "hunky-dory",
    name: "Hunky Dory",
    capacity: 14,
    description: "A brand new glass-bottomed boat, perfect for short journeys along the Mombasa coastline. Fully insured and certified to carry up to 14 passengers and fitted with a 360° surveillance camera. Designed for comfort and safety with padded seats and guide rails. Guests can view marine life through the glass bottom or use snorkeling equipment for a closer experience.",
    image: "/images/vessels/boat2.jpeg",
    video: "/videos/vessels/hunky.mp4",
    poster: "/images/vessels/boat2.jpeg",
  },
];
