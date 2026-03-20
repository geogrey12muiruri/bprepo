export type Trip = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly fullDescription: string;
  readonly durationHours: number;
  readonly boatType: "Small Boat" | "Big Boat" | "Small & Big Boat";
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
  readonly video?: string;
  readonly poster?: string;
  readonly category: "cultural" | "adventure" | "leisure" | "family";
  readonly features?: ReadonlyArray<string>;
  readonly rating?: number;
  readonly reviewCount?: number;
  readonly highlights?: ReadonlyArray<string>;
};
