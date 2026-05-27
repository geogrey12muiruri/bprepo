import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Supabase configuration
const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
);

const supabase = isSupabaseConfigured
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!
    )
  : null;

/**
 * Streams image buffer upload directly to Cloudinary folder
 */
async function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "bluepineapple_reviews",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    ).end(buffer);
  });
}

/**
 * Compute author initials
 */
function computeInitials(author: string): string {
  return (
    author
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "G"
  );
}

/**
 * Format current date (e.g., "May 2026")
 */
function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * GET Handler - returns list of verified guest reviews
 */
export async function GET() {
  try {
    if (supabase) {
      // Use Supabase database
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return NextResponse.json(reviews || []);
    }

    // Fallback to JSON file (local dev only)
    const DATA_DIR = path.join(process.cwd(), "src/data");
    const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

    try {
      const data = await fs.readFile(REVIEWS_FILE, "utf8");
      const reviews = JSON.parse(data);
      return NextResponse.json(reviews);
    } catch {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("GET /api/reviews failed:", error);
    return NextResponse.json(
      { error: "Failed to load reviews database" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - uploads images to Cloudinary and persists to Supabase
 */
export async function POST(req: NextRequest) {
  try {
    // Parse form-data
    const formData = await req.formData();
    const author = formData.get("author") as string;
    const ratingStr = formData.get("rating") as string;
    const trip = formData.get("trip") as string;
    const text = formData.get("text") as string;

    // Server-side validation
    if (!author || !ratingStr || !trip || !text) {
      return NextResponse.json(
        { error: "Missing required fields (author, rating, trip, text)" },
        { status: 400 }
      );
    }

    const rating = parseInt(ratingStr, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    // Process image uploads - Cloudinary required for image uploads
    const imageUrls: string[] = [];
    const files = formData.getAll("images") as File[];

    if (files.length > 0 && !isCloudinaryConfigured) {
      return NextResponse.json(
        { error: "Image uploads require Cloudinary configuration" },
        { status: 500 }
      );
    }

    for (const file of files) {
      if (!file || typeof file === "string" || !file.name) {
        continue;
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.info(`Uploading image "${file.name}" directly to Cloudinary...`);
      const secureUrl = await uploadToCloudinary(buffer);
      if (secureUrl) {
        imageUrls.push(secureUrl);
      }
    }

    const initials = computeInitials(author);
    const dateFormatted = formatDate();

    const newReview = {
      id: `review-${Date.now()}`,
      author,
      initials,
      rating,
      date: dateFormatted,
      trip,
      text,
      images: imageUrls,
      created_at: new Date().toISOString(),
    };

    // Save to database
    if (supabase) {
      const { data, error } = await supabase
        .from("reviews")
        .insert([newReview])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert failed:", error);
        throw error;
      }
      return NextResponse.json(data);
    }

    // Fallback to JSON file (local dev only)
    const DATA_DIR = path.join(process.cwd(), "src/data");
    const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      let reviews: unknown[] = [];
      try {
        const data = await fs.readFile(REVIEWS_FILE, "utf8");
        reviews = JSON.parse(data);
      } catch {
        reviews = [];
      }
      reviews.unshift(newReview);
      await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf8");
    } catch (err) {
      console.error("Local file save failed:", err);
    }

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("POST /api/reviews failed:", error);
    return NextResponse.json(
      { error: "Internal server error during upload" },
      { status: 500 }
    );
  }
}