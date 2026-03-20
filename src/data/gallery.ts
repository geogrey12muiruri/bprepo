import { GalleryImage } from "@/types/gallery"

export interface GalleryItem {
  id: string
  src: string
  alt: string
  featured: boolean
}

export const galleryImages: GalleryItem[] = [
  { id: "1", src: "/images/gallery/img1.png", alt: "Boat adventure at sunset", featured: true },
  { id: "2", src: "/images/gallery/img2.png", alt: "Fort Jesus from the sea", featured: false },
  { id: "3", src: "/images/gallery/img3.png", alt: "Crystal clear waters", featured: false },
  { id: "4", src: "/images/gallery/img4.png", alt: "Coastal scenery", featured: false },
  { id: "5", src: "/images/gallery/img5.png", alt: "Sunset sailing", featured: true },
  { id: "6", src: "/images/gallery/img6.png", alt: "Marine life", featured: false },
]
