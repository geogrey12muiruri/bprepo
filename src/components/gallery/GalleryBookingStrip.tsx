'use client'

import { useEffect, useState } from 'react'

export function GalleryBookingStrip() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsVisible(scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="backdrop-blur-md bg-black/80 border-t border-white/10 px-4 py-3 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">Ready to experience this?</p>
            <p className="text-xs text-white/60">Book your Mombasa adventure</p>
          </div>

          {/* Right: WhatsApp Button */}
          <a
            href="https://wa.me/254708485978?text=Hi%20Blue%20Pineapple%2C%20I%27d%20like%20to%20book%20a%20trip%20I%20saw%20in%20your%20gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
