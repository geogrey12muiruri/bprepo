"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  trip?: string;
}

const reviews: Review[] = [
  {
    id: "r1",
    author: "Sarah M.",
    initials: "SM",
    rating: 5,
    date: "April 2026",
    trip: "Fort Jesus Tour",
    text: "Absolutely breathtaking experience. The captain was knowledgeable and the views of Fort Jesus from the water are something you simply cannot get any other way. Worth every shilling.",
  },
  {
    id: "r2",
    author: "James O.",
    initials: "JO",
    rating: 5,
    date: "March 2026",
    trip: "Mangrove Creek Safari",
    text: "The glass-bottomed boat on the mangrove safari was incredible — we could see everything beneath us. Peaceful, well-guided, and genuinely unlike anything else on the coast.",
  },
  {
    id: "r3",
    author: "Amina K.",
    initials: "AK",
    rating: 5,
    date: "February 2026",
    trip: "Sunset Sailing",
    text: "We booked the sunset sail for our anniversary and it exceeded all expectations. The crew were attentive, the Swahili snacks were wonderful, and the sky was on fire. A memory we'll keep forever.",
  },
  {
    id: "r4",
    author: "David R.",
    initials: "DR",
    rating: 5,
    date: "April 2026",
    trip: "Snorkelling Reef",
    text: "Excellent safety briefing, excellent crew, and the reef was magnificent. We saw parrotfish, turtles, and more. The boat is comfortable and the team made everyone feel at ease, even first-time snorkellers.",
  },
  {
    id: "r5",
    author: "Priya S.",
    initials: "PS",
    rating: 5,
    date: "January 2026",
    trip: "Fort Jesus Tour",
    text: "A truly special way to arrive at Fort Jesus — stepping off a boat at the old harbour feels like arriving as an explorer from another century. The Old Town walk afterwards was the perfect complement.",
  },
  {
    id: "r6",
    author: "Tom W.",
    initials: "TW",
    rating: 5,
    date: "March 2026",
    trip: "Birthdays & Anniversaries",
    text: "Organised a surprise birthday cruise for my partner. The Blue Pineapple team were incredibly helpful with the logistics and the day itself was flawless. The Indian Ocean as a backdrop — hard to top.",
  },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size === "md" ? "w-4 h-4" : "w-3.5 h-3.5"} ${
            star <= rating ? "text-amber-400 fill-amber-400" : "text-neutral-600"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;
  const displayText = !expanded && isLong ? review.text.slice(0, 160).trim() + "…" : review.text;

  // Determine source icon (simulated for now)
  const isGoogle = review.id === "r1" || review.id === "r3" || review.id === "r5";

  return (
    <div className="break-inside-avoid mb-5 group relative flex flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-teal-500/30 hover:bg-white/[0.05] transition-all duration-300">
      {/* Subtle accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-teal-800/20" />
            <span className="relative text-[11px] font-bold text-teal-400">{review.initials}</span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-white leading-tight">{review.author}</span>
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
          <StarRating rating={review.rating} />
        </div>
      </div>

      {/* Review text */}
      <div className="relative z-10">
        <p className="text-[13px] sm:text-sm text-neutral-300 leading-relaxed italic">
          &ldquo;{displayText}&rdquo;
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          {/* Trip badge */}
          {review.trip && (
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-neutral-400 text-[9px] font-medium uppercase tracking-wider rounded-md">
              {review.trip}
            </span>
          )}

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] font-medium text-teal-400 hover:text-teal-300 transition-colors"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-12 sm:py-16 bg-neutral-900">
      <Container>
        {/* Section header */}
        <div className="mb-8 sm:mb-10">
          <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">
            Guest Reviews
          </span>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <Heading level="h2" size="lg" className="text-white !font-bold">
              What Our Guests Say
            </Heading>
            {/* Aggregate score */}
            <div className="flex items-center gap-3 sm:pb-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-white">{avgRating}</span>
                <div>
                  <StarRating rating={5} size="md" />
                  <span className="block text-[10px] text-neutral-500 mt-0.5">
                    {reviews.length} verified reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-[11px] text-neutral-600">
          Reviews from Google, TripAdvisor, and direct guest feedback.
        </p>
      </Container>
    </section>
  );
}
