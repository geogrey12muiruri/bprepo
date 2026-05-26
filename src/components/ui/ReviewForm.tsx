"use client";

import React, { useState, useRef } from "react";
import { Star, Upload, X, Loader2, Check } from "lucide-react";
import { trips } from "@/data/trips";

export interface ReviewSubmitData {
  author: string;
  email: string;
  rating: number;
  trip: string;
  text: string;
  images: string[]; // base64 or object URLs for local display
}

export interface ReviewResponse {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  trip: string;
  text: string;
  images: string[];
}

interface ReviewFormProps {
  onSubmitSuccess: (data: ReviewResponse) => void;
  onClose: () => void;
  variant?: "dark" | "light";
}

export function ReviewForm({ onSubmitSuccess, onClose, variant = "dark" }: ReviewFormProps) {
  const isLight = variant === "light";

  // Form Fields State
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [trip, setTrip] = useState("");
  const [text, setText] = useState("");

  // File Upload State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Star Descriptions
  const ratingLabels: Record<number, string> = {
    1: "Terrible",
    2: "Poor",
    3: "Average",
    4: "Very Good",
    5: "Excellent! Loved it",
  };

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Validate and Add Files
  const validateAndAddFiles = (files: FileList) => {
    setErrorMessage("");
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    // Limit to 3 files total
    if (selectedFiles.length + files.length > 3) {
      setErrorMessage("You can upload a maximum of 3 photos.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate Image Type
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Only image files (JPEG, PNG, WEBP) are supported.");
        continue;
      }

      // Validate Image Size (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage(`Photo "${file.name}" exceeds the 5MB limit.`);
        continue;
      }

      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setFilePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndAddFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(filePreviews[index]);

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    setErrorMessage("");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!author.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!trip) {
      setErrorMessage("Please select which trip you took.");
      return;
    }

    if (!text.trim() || text.length < 10) {
      setErrorMessage("Please write a short description of your experience (min. 10 characters).");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    // Build standard multipart FormData uploader payload
    const formData = new FormData();
    formData.append("author", author.trim());
    formData.append("email", email.trim());
    formData.append("rating", rating.toString());
    formData.append("trip", trip);
    formData.append("text", text.trim());

    // Append actual raw file binaries to the payload
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Smoothly progress uploader animation to 85% while waiting for network response
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload review and photos.");
      }

      const newReview = await response.json();

      // Complete progress bar to 100%
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true);

        // Propagate dynamic review payload back up to update UI state instantly
        onSubmitSuccess(newReview);
      }, 300);
    } catch (err) {
      clearInterval(progressInterval);
      setIsUploading(false);
      const errMsg = err instanceof Error ? err.message : "An error occurred while uploading. Please try again.";
      setErrorMessage(errMsg);
    }
  };

  if (isSuccess) {
    return (
      <div className={`h-full flex flex-col justify-center items-center p-8 text-center ${isLight ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"}`}>
        <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">Review Submitted!</h3>
        <p className={`text-sm max-w-sm mb-8 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
          Thank you, {author}! Your review with your gorgeous travel photos has been submitted. It will appear live shortly once approved by our crew.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-full text-xs uppercase tracking-widest transition-all duration-300"
        >
          Back to Reviews
        </button>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${isLight ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-6 border-b ${isLight ? "border-neutral-200" : "border-white/10"}`}>
        <div>
          <h3 className="text-lg font-bold">Write a Review</h3>
          <p className={`text-xs mt-0.5 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            Share your ocean moments with the crew
          </p>
        </div>
        <button
          onClick={onClose}
          className={`p-2 rounded-full transition-colors ${isLight ? "hover:bg-neutral-100 text-neutral-500" : "hover:bg-white/5 text-neutral-400"}`}
          aria-label="Close"
          id="btn-close-review-form"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">
        {errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-semibold leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* Reviewer Details */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="review-author" className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Your Name *
            </label>
            <input
              id="review-author"
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm ${
                isLight
                  ? "border-neutral-200 bg-neutral-50 text-neutral-950 placeholder-neutral-400"
                  : "border-white/10 bg-white/5 text-white placeholder-neutral-500"
              }`}
              placeholder="e.g. Sarah M."
            />
          </div>

          <div>
            <label htmlFor="review-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Email Address (Private)
            </label>
            <input
              id="review-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm ${
                isLight
                  ? "border-neutral-200 bg-neutral-50 text-neutral-950 placeholder-neutral-400"
                  : "border-white/10 bg-white/5 text-white placeholder-neutral-500"
              }`}
              placeholder="For booking validation only"
            />
          </div>
        </div>

        {/* Trip Dropdown */}
        <div>
          <label htmlFor="review-trip" className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            Which trip did you take? *
          </label>
          <select
            id="review-trip"
            required
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm ${
              isLight
                ? "border-neutral-200 bg-neutral-50 text-neutral-950"
                : "border-white/10 bg-white/5 text-white"
            }`}
          >
            <option value="" disabled className={isLight ? "text-neutral-400" : "text-neutral-500"}>
              Select an experience
            </option>
            {trips.map((t) => (
              <option key={t.id} value={t.name} className={isLight ? "text-neutral-950" : "text-neutral-950 bg-white"}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Star Rating */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            Rating *
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isSelected = star <= (hoverRating !== null ? hoverRating : rating);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 transition-transform active:scale-90"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-7 h-7 transition-all duration-150 ${
                        isSelected
                          ? "text-amber-400 fill-amber-400 scale-105 filter drop-shadow-[0_0_2px_rgba(245,158,11,0.2)]"
                          : isLight
                            ? "text-neutral-300 hover:text-neutral-400"
                            : "text-neutral-600 hover:text-neutral-500"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className={`text-xs font-semibold ${isLight ? "text-neutral-700" : "text-teal-400"}`}>
              {ratingLabels[hoverRating !== null ? hoverRating : rating]}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="review-text" className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
              Your Review *
            </label>
            <span className={`text-[10px] ${text.length < 10 ? "text-neutral-500" : "text-teal-400"}`}>
              {text.length} chars (min. 10)
            </span>
          </div>
          <textarea
            id="review-text"
            required
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm resize-none ${
              isLight
                ? "border-neutral-200 bg-neutral-50 text-neutral-950 placeholder-neutral-400"
                : "border-white/10 bg-white/5 text-white placeholder-neutral-500"
            }`}
            placeholder="Tell us about the crew, the boat, and the views..."
          />
        </div>

        {/* Custom Drag-and-Drop Image Uploader */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            Upload Photos (Max 3, 5MB each)
          </span>

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
              dragActive
                ? "border-teal-400 bg-teal-500/5 scale-[0.99]"
                : isLight
                  ? "border-neutral-200 hover:border-brand-blue/30 hover:bg-neutral-50"
                  : "border-white/10 hover:border-teal-500/30 hover:bg-white/[0.02]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm font-semibold mb-1">Drag & drop your ocean photos</p>
            <p className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-500"}`}>
              or <span className="text-teal-400 font-bold hover:underline">browse files</span>
            </p>
          </div>

          {/* Uploaded Thumbnail Previews */}
          {filePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {filePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-white/10 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Simulated Uploading Progress Bar */}
        {isUploading && (
          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-teal-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Optimizing & uploading photos...
              </span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-150"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isUploading || !author.trim() || !trip || text.length < 10}
            className={`w-full py-3 px-6 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
              isUploading || !author.trim() || !trip || text.length < 10
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5 shadow-none"
                : "bg-teal-500 hover:bg-teal-400 text-white hover:scale-[1.01] active:scale-[0.99] shadow-teal-500/20"
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
