import { Service } from "@/types/service";
import { ASSETS } from "@/config/assets";

export const services: Service[] = [
    {
        id: "boat-trips",
        title: "Boat Trips",
        description: "Experience the magic of the coast with our premium boat excursions. From sunset cruises to full-day safaris.",
        href: "/trips",
        image: ASSETS.marketing.services.boatTrips.image,
        video: ASSETS.marketing.services.boatTrips.video,
        poster: ASSETS.marketing.services.boatTrips.poster,
    },
    {
        id: "private-charter",
        title: "Private Charter",
        description: "Tailor your own maritime adventure. Perfect for exclusive parties, corporate events, or intimate gatherings.",
        href: "/contact",
        image: ASSETS.marketing.services.privateCharter.poster,
        video: ASSETS.marketing.services.privateCharter.video,
        poster: ASSETS.marketing.services.privateCharter.poster,
    },
    {
        id: "fort-jesus",
        title: "Fort Jesus & Historic Tours",
        description: "A journey through history along the coastline of Mombasa's ancient maritime city.",
        href: "/trips/fort-jesus-trip",
        image: ASSETS.gallery.images.historicTours,
        poster: ASSETS.gallery.images.historicTours,
        video: ASSETS.marketing.services.boatTrips.video,
    }
];
