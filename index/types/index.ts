export type Category = 'onlyfans' | 'porno' | 'webcams'

export type VoteType = 'up' | 'down'

export interface Site {
  id: string
  name: string
  url: string
  category: Category
  description: string | null
  thumbnail_url: string | null
  preview_url: string | null
  upvotes: number
  downvotes: number
  score: number
  created_at: string
}

export interface Vote {
  id: string
  user_id: string
  site_id: string
  vote_type: VoteType
  created_at: string
}

export interface UserMetadata {
  user_id: string
  ip_address: string | null
  age_verified: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
}

// Tipo para la respuesta de votos del usuario
export interface UserVotesMap {
  [siteId: string]: VoteType
}

// Props de componentes
export interface SiteCardProps {
  site: Site
  rank: number
  userVote?: VoteType
  isAuthenticated: boolean
  onVote: (siteId: string, voteType: VoteType) => void
}

export interface VoteButtonsProps {
  siteId: string
  upvotes: number
  downvotes: number
  userVote?: VoteType
  isAuthenticated: boolean
  onVote: (siteId: string, voteType: VoteType) => void
}

export interface CategoryToggleProps {
  activeCategory: Category
  onCategoryChange: (category: Category) => void
}

// Database types para Supabase
export interface Database {
  public: {
    Tables: {
      sites: {
        Row: Site
        Insert: Omit<Site, 'id' | 'score' | 'created_at' | 'upvotes' | 'downvotes'> & {
          id?: string
          upvotes?: number
          downvotes?: number
          created_at?: string
        }
        Update: Partial<Omit<Site, 'id' | 'score'>>
      }
      votes: {
        Row: Vote
        Insert: Omit<Vote, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<Vote, 'id'>>
      }
      user_metadata: {
        Row: UserMetadata
        Insert: Omit<UserMetadata, 'created_at'> & {
          created_at?: string
        }
        Update: Partial<Omit<UserMetadata, 'user_id'>>
      }
    }
  }
}
