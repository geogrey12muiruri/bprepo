import { Boat } from "@/types/boat";
import { ASSETS } from "@/config/assets";

export const boats: Boat[] = [
    {
        id: "setting-sons",
        name: "Setting Sons",
        description: "This beautifully crafted bespoke boat was designed specifically as a passenger boat to ride the Mombasa waves and operate in shallow waters. Even at high speeds and choppy conditions, splashback is minimal. Passenger safety is prioritized with protection rails, easy access steps, onboard GPS system, and a 360° surveillance camera. Fully insured and certified to carry 35 passengers, offering peace of mind on every voyage.",
        capacity: 35,
        hourlyRate: 8000,
        dailyRate: 32000,
        bestFor: "Large groups, corporate events",
        image: ASSETS.fleet.settingSons.main,
        video: ASSETS.fleet.settingSons.video,
        poster: ASSETS.fleet.settingSons.poster,
        features: ["Fully Insured", "Life Jackets", "GPS System", "360° Surveillance Camera", "Protection Rails"],
        gallery: [
            "/assets/fleet/settinssons2.jpeg",
            "/assets/fleet/settingsons1.jpeg",
            "/assets/fleet/setting-sons/main.jpg",
            "/assets/fleet/WhatsApp Image 2026-02-12 at 5.51.54 PM.jpeg",
            "/assets/fleet/WhatsApp Image 2026-02-12 at 5.51.55 PM (1).jpeg",
            "/assets/fleet/WhatsApp Image 2026-02-12 at 5.51.55 PM (2).jpeg",
        ],
    },
    {
        id: "hunky-dory",
        name: "Hunky Dory",
        description: "A brand new glass-bottomed boat, perfect for short journeys along the Mombasa coastline. Fully insured and certified to carry up to 14 passengers and fitted with a 360° surveillance camera. Designed for comfort and safety with padded seats and guide rails. Guests can view marine life through the glass bottom or use snorkeling equipment for a closer experience.",
        capacity: 14,
        hourlyRate: 5000,
        dailyRate: 20000,
        bestFor: "Small groups, families, glass-bottom views",
        image: ASSETS.fleet.hunkyDory.main,
        video: ASSETS.fleet.hunkyDory.video,
        poster: ASSETS.fleet.hunkyDory.poster,
        features: ["Fully Insured", "Life Jackets", "Glass Bottom", "360° Surveillance Camera", "Snorkeling Gear"],
        gallery: [
            "/assets/fleet/hunky-dory/hunkey.jpeg",
            "/assets/fleet/hunky-dory/high-res.jpg",
            "/assets/fleet/hunky-dory/main.jpg",
            "/assets/fleet/WhatsApp Image 2026-02-12 at 5.52.08 PM.jpeg",
            "/assets/fleet/WhatsApp Image 2026-02-12 at 5.52.09 PM.jpeg",
        ],
    },
];
