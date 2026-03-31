import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { getAbsoluteUrl } from "@/lib/seo";
import {
  getAllGalleryItems,
  getGalleryImages,
  getGalleryVideos,
} from "@/config/gallery";

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
 * Professional Gallery Component
 * Uses centralized asset management system from src/config/gallery.ts
 * Supports images and videos with professional metadata
 */
export default function GalleryPage() {
  // Get all gallery items (images + videos)
  const galleryItems = getAllGalleryItems();

  return (
    <div className="min-h-screen bg-neutral-900 pt-16 sm:pt-20">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {galleryItems.map((item) => {
            const isFeatured = item.featured;
            const isVideo = item.type === "video";

            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${
                    isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  {isVideo ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        poster={item.poster}
                        preload="metadata"
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg
                            className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={isFeatured}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    {isVideo && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm3.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                        </svg>
                        Video
                      </div>
                    )}
                    {item.featured && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-teal-500/80 backdrop-blur-sm border border-teal-400/50 text-white text-xs font-semibold ml-2">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                </div>

                {/* Info on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  )}
                  {item.metadata?.location && (
                    <div className="flex items-center gap-1 mt-2 text-teal-300 text-xs">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item.metadata.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
