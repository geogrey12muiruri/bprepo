export type JourneyStopIcon = 
  | "depart" 
  | "scenic" 
  | "landmark" 
  | "marine" 
  | "heritage" 
  | "explore";

export interface JourneyStop {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly tags: ReadonlyArray<string>;
  readonly icon: JourneyStopIcon;
  readonly variant?: "default" | "highlight" | "final";
}

export interface StopOver {
  readonly id: string;
  readonly label: string;
  readonly variant?: "default" | "final";
}

export type Trip = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly fullDescription: string;
  readonly seoTitle?: string;
  readonly seoDescription?: string;
  readonly heroImageAlt?: string;
  readonly durationHours: number;
  readonly boatType: "Small Boat" | "Big Boat" | "Small & Big Boat" | "Glass-bottomed Boat";
  readonly pricingModel?: "fixed" | "hop_on_hop_off";
  readonly pricePerPerson: number;
  readonly priceOneWay?: number;
  readonly priceReturn?: number;
  readonly departureTimes?: string;
  readonly returnTimes?: string;
  readonly departurePoints?: string;
  readonly stops?: string;
  readonly discounts?: {
    readonly kenyansPercent?: number;
    readonly childrenMinAge?: number;
    readonly childrenMaxAge?: number;
    readonly childrenPercent?: number;
    readonly underFiveFree?: boolean;
    readonly launchDiscount?: {
      readonly percent: number;
      readonly months?: string[];
    };
  };
  readonly status?: "available" | "coming-soon";
  readonly image: string;
  readonly galleryImages?: ReadonlyArray<string>;
  readonly video?: string;
  readonly poster?: string;
  readonly category: "cultural" | "adventure" | "leisure" | "family";
  readonly features?: ReadonlyArray<string>;
  readonly rating?: number;
  readonly reviewCount?: number;
  readonly highlights?: ReadonlyArray<string>;
  readonly journeyStops?: ReadonlyArray<JourneyStop>;
  readonly returnNote?: string;
  readonly stopOvers?: ReadonlyArray<StopOver>;
};
