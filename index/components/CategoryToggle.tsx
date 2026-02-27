'use client'

import { Category } from '@/types'

interface CategoryToggleProps {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'onlyfans', label: 'OnlyFans', icon: 'OF' },
  { id: 'porno', label: 'Porno', icon: 'PH' },
  { id: 'webcams', label: 'Webcams', icon: 'CAM' },
]

export default function CategoryToggle({
  activeCategory,
  onCategoryChange,
}: CategoryToggleProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-dark-200 rounded-xl p-1.5 border border-gray-700">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`
              relative px-6 py-3 rounded-lg font-medium transition-all duration-300 min-w-[120px]
              ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-dark-100'
              }
            `}
          >
            <span className="block text-xs font-bold mb-0.5 opacity-60">
              {cat.icon}
            </span>
            <span className="block text-sm">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
