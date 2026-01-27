export type Trip = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly fullDescription: string;
  readonly durationHours: number;
  readonly boatType: "Small Boat" | "Big Boat" | "Small & Big Boat";
  readonly pricePerPerson: number;
  readonly status?: "available" | "coming-soon";
  readonly image: string;
  readonly video?: string;
  readonly poster?: string;
  readonly category: "cultural" | "adventure" | "leisure" | "family";
  // Keeping these for UI details
  readonly rating?: number;
  readonly reviewCount?: number;
  readonly highlights?: ReadonlyArray<string>;
};
