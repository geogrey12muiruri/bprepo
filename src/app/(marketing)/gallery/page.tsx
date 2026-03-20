import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore our gallery of stunning coastal moments. See the beauty of Mombasa marine adventures, Fort Jesus tours, and sunset sailings with BluePineapple.",
  alternates: { canonical: "https://www.bluepineappleholdings.com/gallery" },
  openGraph: {
    title: "Gallery | BluePineapple",
    description: "Explore our gallery of stunning coastal moments.",
    url: "https://www.bluepineappleholdings.com/gallery",
    type: "website",
  },
};

export default function GalleryPage() {
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
          <Heading level="h1" size="2xl" className="mb-4 sm:mb-5 md:mb-6 text-white">
            Moments Captured at Sea
          </Heading>
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            A visual journey through the turquoise waters of Mombasa and Diani.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {galleryImages.map((item, idx) => {
            const isFeatured = item.featured;
            
            return (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ${
                  isFeatured ? "sm:col-span-2 lg:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <div className={`relative ${isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
