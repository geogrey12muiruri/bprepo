export type Boat = {
  readonly id: string;
  readonly name: string;
  readonly capacity: number;
  readonly description: string;
  readonly image: string;
  readonly features: string[];
  readonly video?: string;
  readonly poster?: string;
  readonly hourlyRate?: number; // Charter hourly rate in KSH
  readonly dailyRate?: number; // Charter daily rate in KSH
  readonly gallery?: readonly string[]; // Additional images for gallery
};
