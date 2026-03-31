'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { GalleryItem } from '@/config/gallery'
import { MobileOptimizedVideo } from '@/components/ui/MobileOptimizedVideo'

interface LightboxProps {
  items: GalleryItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const mediaWrapperRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [startX, setStartX] = useState(0)

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
        onNavigate(newIndex)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
        onNavigate(newIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, items.length, onClose, onNavigate])

  // Touch/swipe navigation
  const handlePointerDown = (e: React.PointerEvent) => {
    setStartX(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startX === 0) return

    const deltaX = e.clientX - startX
    const threshold = 50

    if (deltaX > threshold) {
      // Swiped right → go to previous
      const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
      onNavigate(newIndex)
    } else if (deltaX < -threshold) {
      // Swiped left → go to next
      const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
      onNavigate(newIndex)
    }

    setStartX(0)
  }

  if (!isOpen || items.length === 0) return null

  const currentItem = items[currentIndex]
  const isVideo = currentItem.type === 'video'

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-white/10">
        <div className="text-sm text-white/60">
          {currentIndex + 1} / {items.length}
        </div>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors text-2xl leading-none p-2"
          aria-label="Close lightbox"
        >
          ✕
        </button>
      </div>

      {/* Media container */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden touch-action[pan-y]"
        ref={mediaWrapperRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Left arrow (desktop only) */}
        <button
          onClick={() => {
            const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
            onNavigate(newIndex)
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow (desktop only) */}
        <button
          onClick={() => {
            const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
            onNavigate(newIndex)
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Media content */}
        <div className="w-full h-full relative flex items-center justify-center px-4">
          {isVideo ? (
            <div className="w-full max-w-4xl">
              <MobileOptimizedVideo
                src={currentItem.src}
                poster={currentItem.poster || ''}
                alt={currentItem.alt}
                title={currentItem.title}
                aspectRatio="16-9"
                controls={true}
                autoplay={false}
                showPlayButton={false}
              />
            </div>
          ) : (
            <div className="relative w-full h-[70vh] max-w-4xl">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/80 backdrop-blur-sm px-4 py-4 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-4xl mx-auto">
          {/* Title and metadata */}
          <p className="text-base font-medium text-white mb-1">{currentItem.title}</p>
          {currentItem.metadata?.location && (
            <p className="text-sm text-white/60 mb-3">{currentItem.metadata.location}</p>
          )}

          {/* WhatsApp booking button */}
          <a
            href="https://wa.me/254708485978?text=Hi%20Blue%20Pineapple%2C%20I%27d%20like%20to%20book%20a%20trip%20I%20saw%20in%20your%20gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Book this experience →
          </a>
        </div>
      </div>
    </div>
  )
}
