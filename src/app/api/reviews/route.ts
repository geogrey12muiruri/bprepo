import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Determine if Cloudinary credentials are fully configured in environmental variables
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

// In serverless (Vercel/AWS Lambda), /tmp is the only writable directory
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const DATA_DIR = isServerless ? "/tmp/data" : path.join(process.cwd(), "src/data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

/**
 * Ensures reviews database exists (seeded from bundled file in serverless)
 */
async function ensureDb() {
  if (!isServerless) {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(REVIEWS_FILE);
  } catch {
    const seedData = [];
    try {
      if (isServerless) {
        // Try to read from bundled source in serverless
        const bundledPath = path.join(process.cwd(), "src/data/reviews.json");
        const bundled = await fs.readFile(bundledPath, "utf8");
        const parsed = JSON.parse(bundled);
        if (Array.isArray(parsed)) {
          seedData.push(...parsed);
        }
      }
    } catch {
      // No bundled data available
    }
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(seedData, null, 2), "utf8");
  }
}

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
 * GET Handler - returns list of verified guest reviews
 */
export async function GET() {
  try {
    await ensureDb();
    const data = await fs.readFile(REVIEWS_FILE, "utf8");
    const reviews = JSON.parse(data);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews failed:", error);
    return NextResponse.json(
      { error: "Failed to load reviews database" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler - uploads images to Cloudinary and persists a new guest review
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDb();

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

    // Process image uploads
    const imageUrls: string[] = [];
    const files = formData.getAll("images") as File[];

    // Check Cloudinary config before processing any images
    if (files.length > 0 && !isCloudinaryConfigured) {
      return NextResponse.json(
        { error: "Image uploads require Cloudinary configuration" },
        { status: 500 }
      );
    }

    for (const file of files) {
      // Validate it is an actual file payload
      if (!file || typeof file === "string" || !file.name) {
        continue;
      }

      // Read file buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload directly to Cloudinary
      console.info(`Uploading image "${file.name}" directly to Cloudinary...`);
      const secureUrl = await uploadToCloudinary(buffer);
      if (secureUrl) {
        imageUrls.push(secureUrl);
      }
    }

    // Load existing reviews database
    const dbData = await fs.readFile(REVIEWS_FILE, "utf8");
    const reviews = JSON.parse(dbData);

    // Compute author initials
    const initials = author
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "G";

    // Format current date (e.g., "May 2026")
    const dateFormatted = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Create persistent Review object matching the frontend interface specs
    const newReview = {
      id: `review-${Date.now()}`,
      author,
      initials,
      rating,
      date: dateFormatted,
      trip,
      text,
      images: imageUrls,
    };

    // Prepend to array so it appears first
    reviews.unshift(newReview);

    // Write back to database
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf8");

    return NextResponse.json(newReview);
  } catch (error) {
    console.error("POST /api/reviews failed:", error);
    return NextResponse.json(
      { error: "Internal server error during upload" },
      { status: 500 }
    );
  }
}