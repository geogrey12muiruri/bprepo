'use client'

import { useState } from 'react'
import { GalleryItem } from '@/config/gallery'
import { GalleryFilterBar } from './GalleryFilterBar'
import { GalleryLightbox } from './GalleryLightbox'
import { GalleryBookingStrip } from './GalleryBookingStrip'
import { GalleryGrid } from './GalleryGrid'

export type GalleryCategory = "boats" | "trips" | "coastal" | "wildlife" | "adventures" | "marine-life"

interface GalleryClientShellProps {
  galleryItems: GalleryItem[]
}

export function GalleryClientShell({ galleryItems }: GalleryClientShellProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Derive filtered items based on active category
  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  // Calculate category counts
  const categoryCounts: Record<string, number> = {
    all: galleryItems.length,
    boats: galleryItems.filter((item) => item.category === 'boats').length,
    trips: galleryItems.filter((item) => item.category === 'trips').length,
    coastal: galleryItems.filter((item) => item.category === 'coastal').length,
    wildlife: galleryItems.filter((item) => item.category === 'wildlife').length,
    adventures: galleryItems.filter((item) => item.category === 'adventures').length,
    'marine-life': galleryItems.filter((item) => item.category === 'marine-life').length,
  }

  const handleTileClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleLightboxNavigate = (newIndex: number) => {
    setLightboxIndex(newIndex)
  }

  return (
    <>
      {/* Filter Bar */}
      <GalleryFilterBar
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
        counts={categoryCounts}
      />

      {/* Gallery Grid */}
      <GalleryGrid
        items={filteredItems}
        onTileClick={handleTileClick}
      />

      {/* Lightbox */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleLightboxNavigate}
      />

      {/* Mobile Booking Strip */}
      <GalleryBookingStrip />
    </>
  )
}
