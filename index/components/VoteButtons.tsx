'use client'

import { VoteType } from '@/types'
import { formatNumber } from '@/lib/utils'

interface VoteButtonsProps {
  siteId: string
  upvotes: number
  downvotes: number
  userVote?: VoteType
  isAuthenticated: boolean
  onVote: (siteId: string, voteType: VoteType) => void
}

export default function VoteButtons({
  siteId,
  upvotes,
  downvotes,
  userVote,
  isAuthenticated,
  onVote,
}: VoteButtonsProps) {
  const handleVote = (voteType: VoteType) => {
    if (!isAuthenticated) return
    onVote(siteId, voteType)
  }

  return (
    <div className="flex items-center gap-3">
      {/* Upvote */}
      <button
        onClick={() => handleVote('up')}
        disabled={!isAuthenticated}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
          ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          ${
            userVote === 'up'
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-dark-200 text-gray-400 hover:text-green-400 border border-transparent'
          }
        `}
        title={isAuthenticated ? 'Votar positivo' : 'Inicia sesión para votar'}
      >
        <svg
          className="w-4 h-4"
          fill={userVote === 'up' ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        <span className="text-sm font-medium">{formatNumber(upvotes)}</span>
      </button>

      {/* Downvote */}
      <button
        onClick={() => handleVote('down')}
        disabled={!isAuthenticated}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
          ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          ${
            userVote === 'down'
              ? 'bg-red-500/20 text-red-400 border border-red-500/50'
              : 'bg-dark-200 text-gray-400 hover:text-red-400 border border-transparent'
          }
        `}
        title={isAuthenticated ? 'Votar negativo' : 'Inicia sesión para votar'}
      >
        <svg
          className="w-4 h-4"
          fill={userVote === 'down' ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
          />
        </svg>
        <span className="text-sm font-medium">{formatNumber(downvotes)}</span>
      </button>
    </div>
  )
}
