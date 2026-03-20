export type GalleryCategory = "trips" | "boats" | "wildlife" | "coastline"

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  tripSlug?: string
}
