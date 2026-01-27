export const ROUTES = {
  home: "/",
  trips: "/trips",
  trip: (slug: string) => `/trips/${slug}`,
  boats: "/boats",
  gallery: "/gallery",
  contact: "/contact",
  booking: (tripId: string) => `/trips/${tripId}#booking`,
} as const;
