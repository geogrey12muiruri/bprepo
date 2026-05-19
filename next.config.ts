import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Build workers can fail in some sandboxed/CI environments; fall back to in-process build.
    webpackBuildWorker: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images aggressively to reduce repeated on-demand optimization cost.
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
