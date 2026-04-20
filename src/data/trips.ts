import type { Trip } from "@/types/trip";
import { ASSETS } from "@/config/assets";
import { FORT_JESUS_TRIP_CONTENT } from "@/content/trips/fort-jesus-trip";

export const trips: ReadonlyArray<Trip> = [
  {
    id: "creek-safaris-mangrove",
    slug: "creek-safaris-mangrove",
    name: "Creek Safaris / Mangrove",
    description: "Glide through tranquil estuaries like Mtwapa and Tudor Creek aboard a glass-bottomed boat — nature at its best.",
    fullDescription: "Glide through Mombasa's most serene waterways on a mangrove creek safari with Blue Pineapple. Your glass-bottomed boat weaves through the calm, sheltered estuaries of Mtwapa Creek and Tudor Creek — two of the most biodiverse coastal environments on Kenya's shoreline. Towering mangrove forests line both banks, providing habitat for kingfishers, herons, and the occasional monitor lizard. Through the glass hull beneath your feet, the water reflects the green canopy above, creating an otherworldly sense of calm that feels entirely removed from the bustle of Mombasa. This 3-hour trip departs twice daily and is perfect for nature lovers, families, and anyone who wants to experience the quieter, wilder side of the Kenyan coast.",
    durationHours: 3,
    boatType: "Glass-bottomed Boat",
    pricePerPerson: 4000,
    departureTimes: "11.00 am and 2.00 pm",
    status: "available",
    image: "/images/newimages/creeksafaris.jpg",
    galleryImages: [
      "/images/newimages/creeksafaris.jpg",
      "/images/mangroove.jpg"
    ],
    poster: "/images/mangroove.jpg",
    category: "leisure",
  },

  {
    id: "fort-jesus-trip",
    slug: "fort-jesus-trip",
    name: "Fort Jesus",
    pricingModel: "hop_on_hop_off",
    description: "Hop on anywhere from Mtwapa Beach to Fort Jesus — like a water matatu along the Mombasa North Coast.",
    fullDescription: "Blue Pineapple Coastal Services is launching a hop-on hop-off boat service along the Mombasa North Coast — operating like a water matatu from Mtwapa Beach all the way to Fort Jesus.\n\nBoard at any of our 9 stops (Serena, Bamburi, Whitesands, Pirates, Mombasa Beach, Nyali, English Point) and pay only for the stops you travel.\n\nPerfect for tourists, hotel guests, and local residents — with child fares, under-5s free, and launch discounts for Kenyan residents and the local community.",
    seoTitle: "Fort Jesus Historical Boat Tour from Mombasa",
    seoDescription: "Experience a historic Fort Jesus boat tour from Mombasa Beach. Enjoy scenic coastal views, a UNESCO World Heritage Site, and optional stops. Book today!",
    heroImageAlt: "Blue Pineapple boat approaching the historic Fort Jesus harbour on the Mombasa coastline, Kenya",
    durationHours: 8,
    boatType: "Big Boat",
    pricePerPerson: 500,
    departureTimes: "9:30 AM daily",
    departurePoints: "Hop on at any stop along the route",
    stops: "Mtwapa Beach → Fort Jesus (9 stops)",
    discounts: {
      kenyansPercent: 25,
      childrenMinAge: 5,
      childrenMaxAge: 15,
      childrenPercent: 50,
      underFiveFree: true,
      launchDiscount: {
        percent: 50,
      },
    },
    features: [
      "Life jackets for all passengers",
      "GPS navigation system",
      "CCTV surveillance",
      "Experienced captain with 20+ years experience",
      "Fully insured & certified",
      "European safety standards",
    ],
    status: "available",
    image: "/images/newimages/fortwater.jpg",
    galleryImages: [
      "/images/newimages/fortwater.jpg",
      "/images/fortjesus.png"
    ],
    video: "/videos/services/IMG_6071.mp4",
    poster: "/images/fortjesus.png",
    category: "cultural",
    stopOvers: FORT_JESUS_TRIP_CONTENT.stopOvers,
    journeyStops: [
      {
        id: "depart",
        label: "Depart from Mombasa Beach",
        detail: "Step aboard at Mombasa Beach — your captain and crew will brief you on safety before casting off. Life jackets are distributed and the GPS system is confirmed active.",
        tags: ["Departure point", "Access via Maasai Bar"],
        icon: "depart",
        variant: "default"
      },
      {
        id: "nyali",
        label: "Cruise past Nyali Beach",
        detail: "The boat hugs the coastline past Nyali's white-sand shores. A great moment to settle in, take photos, and feel the ocean breeze. Bamburi Beach is a possible stop on request.",
        tags: ["Scenic"],
        icon: "scenic"
      },
      {
        id: "marine-park",
        label: "Pass Mombasa Marine Park",
        detail: "Glide over the crystal-clear waters of Mombasa Marine Park. Keep an eye out for marine life — turtles and reef fish are commonly spotted here.",
        tags: ["Protected waters"],
        icon: "marine"
      },
      {
        id: "likoni",
        label: "View Likoni & Shelly Beach",
        detail: "From the water you'll spot the Likoni ferry crossing, Ras Serani Lighthouse, State House, and Mombasa Hospital — a rare perspective of the city most visitors never see.",
        tags: ["Landmarks"],
        icon: "landmark"
      },
      {
        id: "harbour",
        label: "Arrive at Fort Jesus Harbour",
        detail: "Dock at the historic harbour beneath the imposing walls of Fort Jesus. Built by the Portuguese in 1593, the fort commands panoramic views of the old harbour and Mombasa's ancient skyline.",
        tags: ["UNESCO World Heritage Site"],
        icon: "heritage"
      },
      {
        id: "old-town",
        label: "Explore Old Town",
        detail: "Step into Old Town's winding streets lined with carved Swahili doorways, antique shops, and the smell of Kenyan coastal spices. A living piece of history that feels entirely apart from modern Mombasa.",
        tags: ["~1 hr ashore", "Optional"],
        icon: "explore",
        variant: "final"
      }
    ],
    returnNote: "Return journey back to Mombasa Beach — same scenic route in reverse.",
  },
  {
    id: "sunset-sailing",
    slug: "sunset-sailing",
    name: "Sunset",
    description: "A premier experience with Swahili snacks and Instagram-worthy sunset photo opportunities.",
    fullDescription: "As the afternoon light turns gold, step aboard the Blue Pineapple for a 1.5-hour sunset sailing along the Mombasa coastline — one of the most beautiful evening experiences the Indian Ocean has to offer. The boat drifts gently through calm waters as the sky transforms through layers of amber, coral, and deep blue. Swahili snacks are served on board, creating a relaxed, social atmosphere ideal for couples, small groups, and anyone who wants to end their day at sea. The views of the Mombasa coastline at dusk are genuinely Instagram-worthy — distant dhow silhouettes, the lighthouse, and the last light catching the water's surface. Departures at 5:30 PM daily.",
    durationHours: 1.5,
    boatType: "Small & Big Boat",
    pricePerPerson: 3000,
    departureTimes: "5.30 pm",
    status: "available",
    image: "/images/creek.jpg",
    video: ASSETS.marketing.services.sunsetSailing.video,
    poster: "/images/creek.jpg",
    category: "leisure",
  },
  {
    id: "birthdays-anniversaries",
    slug: "birthdays-anniversaries",
    name: "Birthdays & Anniversaries",
    description: "Celebrate milestones aboard on the crystal clear waters of the Indian Ocean in Mombasa.",
    fullDescription: "Mark life's most meaningful moments on the Indian Ocean with a private Blue Pineapple cruise. Whether it's a birthday, anniversary, engagement, or simply a gathering of people who deserve something extraordinary, our private charters create a setting that feels personalised and genuinely special. The vessel is available all day upon request — bring your own food, decorations, and music, or ask us to help arrange it. As the boat moves through Mombasa's coastal waters beneath the African sky, the pace of normal life fades away completely. Service is attentive, the views are breathtaking, and the memories will last far longer than the day.",
    durationHours: 1,
    boatType: "Small & Big Boat",
    pricePerPerson: 2000,
    departureTimes: "All day upon request",
    status: "available",
    image: "/images/services/img1.png",
    poster: "/images/services/img1.png",
    category: "family",
  },
  {
    id: "snorkelling-reef",
    slug: "snorkelling-reef",
    name: "Snorkelling Reef",
    description: "Float above vibrant coral gardens surrounded by a dazzling array of tropical fish.",
    fullDescription: "Dive beneath the surface of the Indian Ocean on a Blue Pineapple snorkelling reef trip — one of the most accessible and awe-inspiring experiences available off the Mombasa coast. Your guide will take you to carefully selected shallow reef sites within Mombasa Marine Park, where visibility is exceptional and the marine life is extraordinary. Float above brain coral, staghorn formations, and sea fans as shoals of parrotfish, angelfish, and butterflyfish move around you in vivid colour. No experience is needed — our crew provides full safety briefings, snorkel equipment, and stays in the water with you throughout. Trips run from 9 AM through 5 PM, bookable at any time that suits your schedule.",
    durationHours: 1,
    boatType: "Small & Big Boat",
    pricePerPerson: 2000,
    departureTimes: "9.00 am through to 5.00 pm. Please request a time",
    status: "available",
    image: "/images/newimages/snorkling.jpg",
    galleryImages: [
      "/images/newimages/snorkling.jpg",
      "/images/services/img2.png"
    ],
    poster: "/images/services/img2.png",
    category: "adventure",
  },
];
