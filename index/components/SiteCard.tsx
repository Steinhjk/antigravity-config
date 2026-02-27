'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Site, VoteType } from '@/types'
import { getScoreColor } from '@/lib/utils'
import VoteButtons from './VoteButtons'
import PixelOverlay from './PixelOverlay'

interface SiteCardProps {
  site: Site
  rank: number
  userVote?: VoteType
  isAuthenticated: boolean
  onVote: (siteId: string, voteType: VoteType) => void
}

export default function SiteCard({
  site,
  rank,
  userVote,
  isAuthenticated,
  onVote,
}: SiteCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-black'
    if (rank === 2) return 'bg-gray-300 text-black'
    if (rank === 3) return 'bg-amber-600 text-white'
    return 'bg-dark-200 text-gray-400'
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          bg-dark-100 rounded-xl overflow-hidden border border-gray-800
          transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10
          ${!isAuthenticated ? 'overflow-hidden' : ''}
        `}
      >
        {/* Thumbnail con preview en hover */}
        <div className="relative aspect-video bg-dark-200 overflow-hidden">
          {!isAuthenticated && <PixelOverlay />}

          {site.thumbnail_url && !imageError ? (
            <Image
              src={site.thumbnail_url}
              alt={site.name}
              fill
              className={`
                object-cover transition-all duration-500
                ${isHovered ? 'scale-110' : 'scale-100'}
                ${!isAuthenticated ? 'blur-xl' : ''}
              `}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">
                {site.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Preview adicional en hover */}
          {isHovered && site.preview_url && isAuthenticated && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center animate-fade-in">
              <Image
                src={site.preview_url}
                alt={`Preview de ${site.name}`}
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Rank badge */}
          <div
            className={`
              absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center
              font-bold text-sm ${getRankBadgeColor(rank)}
            `}
          >
            {rank}
          </div>

          {/* Score badge */}
          <div
            className={`
              absolute top-2 right-2 px-2 py-1 rounded-full bg-black/70
              text-xs font-semibold ${getScoreColor(site.score)}
            `}
          >
            {site.score > 0 ? '+' : ''}{site.score}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{site.name}</h3>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-400 hover:text-primary-300 truncate block"
              >
                {new URL(site.url).hostname}
              </a>
            </div>
          </div>

          {site.description && (
            <p className="text-xs text-gray-400 line-clamp-2 mb-3">
              {site.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <VoteButtons
              siteId={site.id}
              upvotes={site.upvotes}
              downvotes={site.downvotes}
              userVote={userVote}
              isAuthenticated={isAuthenticated}
              onVote={onVote}
            />

            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-primary-400 transition-colors flex items-center gap-1"
            >
              Visitar
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
