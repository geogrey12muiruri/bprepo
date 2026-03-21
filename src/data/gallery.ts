import { GalleryImage } from "@/types/gallery"

export interface GalleryItem {
  id: string
  src: string
  alt: string
  featured: boolean
}

export const galleryImages: GalleryItem[] = [
  { id: "1", src: "/images/gallery/hero.jpeg", alt: "Boat adventure at sunset", featured: true },
  { id: "2", src: "/images/fort/fort1.jpeg", alt: "Fort Jesus from the sea", featured: false },
  { id: "3", src: "/images/creek.jpg", alt: "Crystal clear creek waters", featured: false },
  { id: "4", src: "/images/services/img1.png", alt: "Coastal experience", featured: false },
  { id: "5", src: "/images/fort/coastal.jpg", alt: "Sunset sailing on the coast", featured: true },
  { id: "6", src: "/images/services/img2.png", alt: "Marine life and mangroves", featured: false },
]
