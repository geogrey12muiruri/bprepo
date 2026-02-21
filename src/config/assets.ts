export const ASSETS = {
    marketing: {
        hero: {
            video: "/videos/hero/IMG_5880.mp4",
            poster: "/images/hero/IMG_5880-poster.jpg",
            desktopImages: [
                "/images/gallery/hero.jpeg",
                "/assets/fleet/setting-sons/high-res.jpg",
                "/images/gallery/WhatsApp Image 2026-02-12 at 5.51.55 PM.jpeg",
            ]
        },
        services: {
            boatTrips: {
                video: "/videos/services/IMG_6071.mp4",
                poster: "/images/services/IMG_6071-poster.jpg",
                image: "/images/hero/hero-main.jpg",
            },
            privateCharter: {
                video: "/videos/hero/IMG_5935.mp4",
                poster: "/images/hero/IMG_5880-poster.jpg", // Fallback
            },
            fortJesus: {
                image: "/images/services/img3.png", // Updated to img3
            },
            watersports: {
                image: "/images/services/img4.png", // Updated to img4
            },
            sunsetSailing: {
                video: "/videos/hero/IMG_5883.mp4", // Safe sunset video
                poster: "/images/hero/IMG_5883-poster.jpg",
                image: "/images/hero/IMG_5883-poster.jpg",
            },
            birthdays: {
                video: "/videos/hero/IMG_5880.mp4", // Safe generic ocean video
                poster: "/images/hero/IMG_5880-poster.jpg",
                image: "/images/hero/hero-main.jpg",
            }
        }
    },
    fleet: {
        settingSons: {
            main: "/assets/fleet/setting-sons/high-res.jpg",
            video: "/assets/fleet/setting-sons/showcase.mp4",
        },
        hunkyDory: {
            main: "/assets/fleet/hunky-dory/hunkey.jpeg",
            video: "/assets/fleet/hunky-dory/showcase.mp4",
        },
    },
    gallery: {
        images: {
            coastalView: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM (2).jpeg",
            boatFleet: "/images/gallery/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
            luxuryMarine: "/images/gallery/hero.jpeg",
            fleetShowcase: "/assets/fleet/hunky-dory/hunkey.jpeg", // New image
            // Keeping distinct service images for variety
            marinaSunset: "/assets/fleet/hunky-dory/hunkey.jpeg",
            creekSafari: "/images/services/WhatsApp Image 2026-01-17 at 1.36.13 PM.jpeg",
            historicTours: "/images/services/IMG_6071-poster.jpg",
        }
    }
} as const;
