import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { getAbsoluteUrl } from "@/lib/seo";
import {
  getAllGalleryItems,
  getGalleryImages,
  getGalleryVideos,
} from "@/config/gallery";
import { GalleryClientShell } from "@/components/gallery/GalleryClientShell";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore our gallery of stunning coastal moments. See the beauty of Mombasa marine adventures, Fort Jesus tours, and sunset sailings with BluePineapple.",
  alternates: { canonical: getAbsoluteUrl("/gallery") },
  openGraph: {
    title: "Gallery | BluePineapple",
    description: "Explore our gallery of stunning coastal moments.",
    url: getAbsoluteUrl("/gallery"),
    type: "website",
  },
};

/**
 * Professional Gallery Page
 * Uses centralized asset management system from src/config/gallery.ts
 * Phase 2: Added client-side filtering, lightbox, mobile booking strip, and JSON-LD
 */
export default function GalleryPage() {
  // Get all gallery items (images + videos)
  const galleryItems = getAllGalleryItems();

  const getVideoUploadDate = (date?: string) => {
    // Prefer an explicit date from content metadata (YYYY-MM-DD).
    // Fall back to a stable value so Google can validate required fields.
    const baseDate = date || "2026-03-31";
    return `${baseDate}T00:00:00+03:00`;
  };

  // Build JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "BluePineapple Gallery",
    description:
      "Gallery of stunning coastal moments and marine adventures in Mombasa",
    url: getAbsoluteUrl("/gallery"),
    image: galleryItems
      .filter((item) => item.type === "image")
      .slice(0, 5)
      .map((item) => getAbsoluteUrl(item.src)),
    associatedMedia: galleryItems.map((item) => ({
      "@type": item.type === "image" ? "ImageObject" : "VideoObject",
      url: getAbsoluteUrl(item.src),
      name: item.title,
      description: item.description,
      ...(item.type === "video" && {
        thumbnailUrl: getAbsoluteUrl(item.poster || ""),
        uploadDate: getVideoUploadDate(item.metadata?.date),
        contentUrl: getAbsoluteUrl(item.src),
      }),
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-16 sm:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4">
            <span className="text-[10px] sm:text-xs font-black text-teal-400 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
              Visual Journey
            </span>
          </div>
          <Heading
            level="h1"
            size="2xl"
            className="mb-4 sm:mb-5 md:mb-6 text-white"
          >
            Moments Captured at Sea
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            A visual journey through the turquoise waters of Mombasa and Diani.
            Experience the luxury, beauty, and adventure.
          </p>
        </div>

        {/* Gallery Client Shell - handles filtering, lightbox, and booking strip */}
        <GalleryClientShell galleryItems={galleryItems} />

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 pt-12 sm:pt-16 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 mb-1 sm:mb-2">
                {getGalleryImages().length}+
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
                Images
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 mb-1 sm:mb-2">
                {getGalleryVideos().length}
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
                Videos
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 mb-1 sm:mb-2">
                10+
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
                Trips
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-400 mb-1 sm:mb-2">
                4.9/5
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
                Rated
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
