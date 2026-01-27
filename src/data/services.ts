import { Service } from "@/types/service";
import { ROUTES } from "@/lib/routes";

export const services: ReadonlyArray<Service> = [
    {
        id: "boat-trips",
        title: "Boat Trips",
        description: "Explore the Indian Ocean with our curated collection of boat trips and coastal experiences.",
        href: ROUTES.trips,
        image: "/images/hero/hero-main.jpg",
        video: "/videos/services/IMG_6071.mp4",
        poster: "/images/services/IMG_6071-poster.jpg",
    },
    {
        id: "private-charter",
        title: "Private Charter",
        description: "Book a private vessel for a personalized journey. Tailored for groups, families, and special events.",
        href: ROUTES.contact,
        image: "/images/vessels/boat.jpeg",
        video: "/videos/hero/IMG_5935.mp4",
        poster: "/images/hero/IMG_5935-poster.jpg",
    },
    {
        id: "fort-jesus-trip",
        title: "Fort Jesus Trip",
        description: "A cultural and historical voyage to the iconic UNESCO World Heritage site.",
        image: "", // Empty image for asset-less state
        isDisabled: true,
        statusMessage: "Coming soon — watch this space",
    },
];
