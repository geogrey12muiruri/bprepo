import { WHATSAPP_NUMBER } from "@/constants/contacts"

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildBookingMessage(name: string, packageLabel?: string): string {
  const base = `Hi Blue Pineapple, I'd like to book the ${name}`
  return packageLabel ? `${base} — ${packageLabel}` : base
}

export function buildEnquiryMessage(subject: string): string {
  return `Hi Blue Pineapple, I have a question about ${subject}`
}

export function buildCharterMessage(boatName: string): string {
  return `Hi Blue Pineapple, I'd like to book the ${boatName}`
}

export function buildGeneralBookingMessage(): string {
  return "Hi Blue Pineapple, I'd like to make a booking"
}

export function buildGeneralEnquiryMessage(): string {
  return "Hi Blue Pineapple, I'd like to enquire about chartering a boat"
}
