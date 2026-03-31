'use client'

import { GalleryCategory } from './GalleryClientShell'

interface FilterBarProps {
  activeCategory: GalleryCategory | 'all'
  onSelect: (category: GalleryCategory | 'all') => void
  counts: Record<string, number>
}

const CATEGORIES: Array<{ id: GalleryCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'boats', label: 'Boats' },
  { id: 'trips', label: 'Trips' },
  { id: 'coastal', label: 'Coastal' },
  { id: 'adventures', label: 'Adventures' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'marine-life', label: 'Marine Life' },
]

export function GalleryFilterBar({
  activeCategory,
  onSelect,
  counts,
}: FilterBarProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      {/* Scrollable pill strip */}
      <div className="flex overflow-x-auto gap-2 pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map(({ id, label }) => {
          const isActive = activeCategory === id
          const count = counts[id] || 0

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-teal-500 text-white border border-teal-500'
                  : 'border border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              <span>{label}</span>
              <span className="text-xs opacity-60">{count}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
