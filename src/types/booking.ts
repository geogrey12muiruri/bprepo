export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  readonly id: string;
  readonly tripId: string;
  readonly bookerName: string;
  readonly bookerEmail: string;
  readonly bookerPhone: string;
  readonly participants: number;
  readonly date: string;
  readonly totalPrice: number;
  readonly specialRequests: string;
  readonly status: BookingStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type BookingFormData = {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly participants: number;
  readonly date: string;
  readonly specialRequests?: string;
};
