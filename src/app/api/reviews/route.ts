import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Define paths in workspace
const DATA_DIR = path.join(process.cwd(), "src/data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const UPLOADS_DIR = path.join(process.cwd(), "public/uploads");

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

/**
 * Ensures required directories and reviews database file exist
 */
async function ensureDbAndUploadsDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  try {
    await fs.access(REVIEWS_FILE);
  } catch {
    await fs.writeFile(REVIEWS_FILE, JSON.stringify([], null, 2), "utf8");
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
 * Helper to write buffer to public/uploads local directory
 */
async function saveFileLocally(fileName: string, buffer: Buffer): Promise<string> {
  const fileExt = path.extname(fileName) || ".jpg";
  const sanitizedBase = path.basename(fileName, fileExt).replace(/[^a-zA-Z0-9]/g, "_");
  const uniqueName = `${Date.now()}-${sanitizedBase}${fileExt}`;
  const filePath = path.join(UPLOADS_DIR, uniqueName);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${uniqueName}`;
}

/**
 * GET Handler - returns list of verified guest reviews
 */
export async function GET() {
  try {
    await ensureDbAndUploadsDir();
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
 * POST Handler - uploads images (Cloudinary with local disk fallback) and persists a new guest review
 */
export async function POST(req: NextRequest) {
  try {
    await ensureDbAndUploadsDir();

    // Parse form-data
    const formData = await req.formData();
    const author = formData.get("author") as string;
    const email = formData.get("email") as string;
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

    for (const file of files) {
      // Validate it is an actual file payload
      if (!file || typeof file === "string" || !file.name) {
        continue;
      }

      // Read file buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (isCloudinaryConfigured) {
        // Upload directly to Cloudinary
        try {
          console.info(`Uploading image "${file.name}" directly to Cloudinary...`);
          const secureUrl = await uploadToCloudinary(buffer);
          if (secureUrl) {
            imageUrls.push(secureUrl);
          }
        } catch (cloudinaryErr) {
          console.error("Cloudinary upload failed, attempting local fallback:", cloudinaryErr);
          // Fallback to local upload so the user experience doesn't break
          const localUrl = await saveFileLocally(file.name, buffer);
          imageUrls.push(localUrl);
        }
      } else {
        // Fallback to local upload when credentials are not configured yet
        console.info(`Cloudinary credentials missing. Saving image "${file.name}" locally to public/uploads/`);
        const localUrl = await saveFileLocally(file.name, buffer);
        imageUrls.push(localUrl);
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
