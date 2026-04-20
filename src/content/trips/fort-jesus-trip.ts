import type { StopOver } from "@/types/trip";

export const FORT_JESUS_TRIP_CONTENT = {
  stopOvers: [
    { id: "mtwapa", label: "Mtwapa Beach (Copacabana)" },
    { id: "serena", label: "Serena Hotel" },
    { id: "bamburi-beach-hotel", label: "Bamburi Beach Hotel" },
    { id: "whitesands", label: "Whitesands Hotel" },
    { id: "pirates", label: "Pirates Beach" },
    { id: "mombasa-beach", label: "Mombasa Beach" },
    { id: "nyali", label: "Nyali Beach" },
    { id: "english-point", label: "English Point" },
    { id: "fort-jesus", label: "Fort Jesus", variant: "final" },
  ] satisfies ReadonlyArray<StopOver>,
  heroVideo: {
    src: "/videos/hero/serena2.mp4",
    poster: "/images/hero/serena2-poster.jpg",
  },
  heroImages: [
    "/images/fort/new5.jpg",
    "/images/fort/new3.jpg",
    "/images/newimages/fortwater.jpg",
  ],
  hopOnHopOff: {
    headline: "Hop-On. Hop-Off. Your Coast.",
    subtitle: "Board anywhere from Mtwapa Beach to Fort Jesus",
    routePill: "HOP ON ANYWHERE",
    pricingCards: [
      { label: "1 stop", priceKes: 500 },
      { label: "2 stops", priceKes: 750 },
      { label: "3 stops", priceKes: 1000 },
      { label: "Full route (8 stops)", priceKes: 3000, variant: "full" },
    ],
    pricingNote:
      "4–7 stops: KES 1,400 – 2,600 (add KES 400 per stop after 3)",
    concessions: [
      { tone: "teal", title: "Children 5–15", detail: "50% off adult fare" },
      { tone: "amber", title: "Under 5 years", detail: "Travel completely FREE" },
    ],
    timetable: [
      { label: "Depart Mtwapa Beach", value: "9:30 AM daily" },
      { label: "Arrive Mombasa Beach", value: "approx. 10:30 AM" },
      { label: "Arrive Fort Jesus", value: "approx. 11:30 AM" },
      { label: "Last return to Mtwapa", value: "by 5:30 PM" },
    ],
    fares: {
      oneWay: [
        { stops: 1, adultKes: 500, childKes: 250, under5: "Free" },
        { stops: 2, adultKes: 750, childKes: 375, under5: "Free" },
        { stops: 3, adultKes: 1000, childKes: 500, under5: "Free" },
        { stops: 4, adultKes: 1400, childKes: 700, under5: "Free" },
        { stops: 5, adultKes: 1800, childKes: 900, under5: "Free" },
        { stops: 6, adultKes: 2200, childKes: 1100, under5: "Free" },
        { stops: 7, adultKes: 2600, childKes: 1300, under5: "Free" },
        { stops: 8, adultKes: 3000, childKes: 1500, under5: "Free", highlight: true },
      ],
      returnSummary:
        "Return tickets available — ask on board. 1 stop return KES 800 · 2 stops KES 1,200 · 3 stops KES 1,500 · Full return KES 5,000.",
    },
    howItWorks: [
      { title: "Choose your stop", detail: "Board at any of our 9 stops along the coast." },
      { title: "Step aboard", detail: "Our friendly crew welcomes you onto the boat." },
      { title: "Pay on board", detail: "Pay only for the stops you travel." },
    ],
    discounts: [
      { title: "Kenyan resident discount", detail: "25% off (launch phase)" },
      { title: "Local community discount", detail: "50% off (launch phase)" },
    ],
    footerLine: "Departs daily · Multiple runs until 5:30 PM",
  },
} as const;
