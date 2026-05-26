"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Sheet } from "@/components/ui/Sheet";
import { ReviewForm, ReviewResponse } from "@/components/ui/ReviewForm";

interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  trip?: string;
  images?: string[]; // Dynamic uploaded image URLs
}

function StarRating({
  rating,
  size = "sm",
  variant = "dark",
}: {
  rating: number;
  size?: "sm" | "md";
  variant?: "dark" | "light";
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size === "md" ? "w-4 h-4" : "w-3.5 h-3.5"} ${
            star <= rating
              ? "text-amber-400 fill-amber-400"
              : variant === "light"
                ? "text-neutral-300"
                : "text-neutral-600"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, variant }: { review: Review; variant: "dark" | "light" }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;
  const displayText = !expanded && isLong ? review.text.slice(0, 160).trim() + "…" : review.text;
  const isLight = variant === "light";

  // Determine source icon (simulated for now)
  const isGoogle = review.id === "r1" || review.id === "r3" || review.id === "r5" || review.id.startsWith("review-");

  return (
    <div
      className={[
        "break-inside-avoid mb-5 group relative flex flex-col gap-4 rounded-2xl p-5 sm:p-6 transition-all duration-300",
        isLight
          ? "bg-white border border-neutral-200 hover:border-brand-blue/40"
          : "bg-white/[0.03] border border-white/10 hover:border-teal-500/30 hover:bg-white/[0.05]",
      ].join(" ")}
    >
      {/* Subtle accent gradient */}
      <div
        className={[
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          isLight
            ? "bg-gradient-to-br from-brand-blue/[0.06] via-transparent to-transparent"
            : "bg-gradient-to-br from-teal-500/5 via-transparent to-transparent",
        ].join(" ")}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={[
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden",
              isLight ? "bg-neutral-100 border border-neutral-200" : "bg-neutral-800 border border-white/10",
            ].join(" ")}
          >
            {!isLight && <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-teal-800/20" />}
            <span
              className={[
                "relative text-[11px] font-bold",
                isLight ? "text-brand-blue" : "text-teal-400",
              ].join(" ")}
            >
              {review.initials}
            </span>
          </div>
          <div>
            <span
              className={[
                "block text-sm font-semibold leading-tight",
                isLight ? "text-neutral-950" : "text-white",
              ].join(" ")}
            >
              {review.author}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] text-neutral-500">{review.date}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-neutral-700" />
              {isGoogle ? (
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-3.28 5.32-7.84 5.32-3.92 0-7.16-3.24-7.16-7.2s3.24-7.2 7.16-7.2c2.24 0 3.72.96 4.56 1.76l2.6-2.52C18.04 2.8 15.48 1.52 12.48 1.52 6.44 1.52 1.52 6.44 1.52 12.48s4.92 10.96 10.96 10.96c6.28 0 10.48-4.44 10.48-10.64 0-.72-.08-1.28-.16-1.88h-10.32z"/>
                  </svg>
                  <span className="text-[9px] text-neutral-500">Google</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm0 17.5c-3.038 0-5.5-2.462-5.5-5.5s2.462-5.5 5.5-5.5 5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5z"/>
                    <circle cx="12" cy="12" r="2.5"/>
                  </svg>
                  <span className="text-[9px] text-neutral-500">TripAdvisor</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={review.rating} variant={variant} />
        </div>
      </div>

      {/* Review text */}
      <div className="relative z-10 flex-1 flex flex-col justify-between gap-3">
        <p
          className={[
            "text-[13px] sm:text-sm leading-relaxed italic",
            isLight ? "text-neutral-700" : "text-neutral-300",
          ].join(" ")}
        >
          &ldquo;{displayText}&rdquo;
        </p>

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 my-1.5 relative z-10">
            {review.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/5 shadow-md group/img cursor-zoom-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${review.author}'s review travel photo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-2 flex items-center justify-between">
          {/* Trip badge */}
          {review.trip && (
            <span
              className={[
                "px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider rounded-md",
                isLight
                  ? "bg-neutral-100 border border-neutral-200 text-neutral-600"
                  : "bg-white/5 border border-white/10 text-neutral-400",
              ].join(" ")}
            >
              {review.trip}
            </span>
          )}

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={[
                "text-[11px] font-medium transition-colors",
                isLight ? "text-brand-blue hover:text-blue-900" : "text-teal-400 hover:text-teal-300",
              ].join(" ")}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [reviewsState, setReviewsState] = useState<Review[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Safely compute average rating
  const avgRating = reviewsState.length > 0
    ? (reviewsState.reduce((s, r) => s + r.rating, 0) / reviewsState.length).toFixed(1)
    : "0.0";
    
  const isLight = variant === "light";

  // Dynamic fetch reviews on page load
  useEffect(() => {
    let active = true;
    
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to load reviews from feed.");
        }
        const data = await response.json();
        if (active) {
          setReviewsState(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading reviews feed:", error);
        if (active) {
          setIsLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      active = false;
    };
  }, []);

  const handleReviewSubmit = (newReview: ReviewResponse) => {
    const addedReview: Review = {
      id: newReview.id,
      author: newReview.author,
      initials: newReview.initials,
      rating: newReview.rating,
      date: newReview.date,
      text: newReview.text,
      trip: newReview.trip,
      images: newReview.images,
    };

    setReviewsState((prev) => [addedReview, ...prev]);
  };

  return (
    <section className={isLight ? "py-12 sm:py-16 bg-stone-50 border-t border-neutral-200" : "py-12 sm:py-16 bg-neutral-900"}>
      <Container>
        {/* Section header */}
        <div className="mb-8 sm:mb-10">
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isLight ? "text-brand-blue" : "text-teal-400"}`}>
            Guest Reviews
          </span>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <Heading level="h2" size="lg" className={`${isLight ? "text-neutral-950" : "text-white"} !font-bold`}>
                What Our Guests Say
              </Heading>
              
              {/* Write a Review Button on Mobile/Tablet */}
              <button
                onClick={() => setIsSheetOpen(true)}
                className={`inline-flex sm:hidden items-center justify-center gap-2 px-4 py-2 border rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 w-fit ${
                  isLight 
                    ? "border-brand-blue text-brand-blue hover:bg-brand-blue/5" 
                    : "border-teal-500 text-teal-400 hover:bg-teal-500/10"
                }`}
                id="btn-write-review-mobile"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a Review
              </button>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
              {/* Aggregate score */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-black ${isLight ? "text-neutral-950" : "text-white"}`}>{avgRating}</span>
                  <div>
                    <StarRating rating={5} size="md" variant={variant} />
                    <span className={`block text-[10px] mt-0.5 ${isLight ? "text-neutral-500" : "text-neutral-500"}`}>
                      {reviewsState.length} verified reviews
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Write a Review Button on Desktop */}
              <button
                onClick={() => setIsSheetOpen(true)}
                className={`hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 border rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  isLight 
                    ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white" 
                    : "border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white"
                }`}
                id="btn-write-review-desktop"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Masonry Columns / Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`animate-pulse rounded-2xl p-6 border ${
                  isLight ? "bg-white border-neutral-200" : "bg-white/[0.03] border-white/10"
                } flex flex-col gap-4`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${isLight ? "bg-neutral-100" : "bg-neutral-800"}`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-3 w-1/3 rounded ${isLight ? "bg-neutral-200" : "bg-neutral-800"}`} />
                    <div className={`h-2.5 w-1/4 rounded ${isLight ? "bg-neutral-200" : "bg-neutral-800"}`} />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className={`h-3 w-full rounded ${isLight ? "bg-neutral-200" : "bg-neutral-800"}`} />
                  <div className={`h-3 w-5/6 rounded ${isLight ? "bg-neutral-200" : "bg-neutral-800"}`} />
                  <div className={`h-3 w-4/5 rounded ${isLight ? "bg-neutral-200" : "bg-neutral-800"}`} />
                </div>
              </div>
            ))}
          </div>
        ) : reviewsState.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-sm ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {reviewsState.map((review) => (
              <ReviewCard key={review.id} review={review} variant={variant} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <p className={`mt-6 text-center text-[11px] ${isLight ? "text-neutral-600" : "text-neutral-600"}`}>
          Reviews from Google, TripAdvisor, and direct guest feedback.
        </p>
      </Container>

      {/* Review Submission Drawer */}
      <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <ReviewForm
          variant={variant}
          onClose={() => setIsSheetOpen(false)}
          onSubmitSuccess={(data) => {
            handleReviewSubmit(data);
            // Close drawer after success checkmark animation
            setTimeout(() => {
              setIsSheetOpen(false);
            }, 3000);
          }}
        />
      </Sheet>
    </section>
  );
}
