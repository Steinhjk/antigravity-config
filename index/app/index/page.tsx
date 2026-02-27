'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Site, Category, VoteType, UserVotesMap } from '@/types'
import { getCategoryLabel } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import CategoryToggle from '@/components/CategoryToggle'
import SiteCard from '@/components/SiteCard'
import Disclaimers from '@/components/Disclaimers'

const AGE_VERIFIED_KEY = 'age_verified'

export default function IndexPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<{ email: string } | null>(null)
  const [sites, setSites] = useState<Site[]>([])
  const [userVotes, setUserVotes] = useState<UserVotesMap>({})
  const [activeCategory, setActiveCategory] = useState<Category>('porno')
  const [isLoading, setIsLoading] = useState(true)

  // Verificar edad
  useEffect(() => {
    const verified = localStorage.getItem(AGE_VERIFIED_KEY)
    if (!verified) {
      router.push('/')
    }
  }, [router])

  // Obtener usuario
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUser({ email: user.email })
      }
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user?.email) {
        setUser({ email: session.user.email })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // Obtener sitios
  const fetchSites = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('category', activeCategory)
      .order('score', { ascending: false })
      .limit(100)

    if (!error && data) {
      setSites(data as Site[])
    }
    setIsLoading(false)
  }, [activeCategory, supabase])

  // Obtener votos del usuario
  const fetchUserVotes = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setUserVotes({})
      return
    }

    const { data, error } = await supabase
      .from('votes')
      .select('site_id, vote_type')
      .eq('user_id', user.id)

    if (!error && data) {
      const votesMap: UserVotesMap = {}
      data.forEach((vote) => {
        votesMap[vote.site_id] = vote.vote_type as VoteType
      })
      setUserVotes(votesMap)
    }
  }, [supabase])

  useEffect(() => {
    fetchSites()
  }, [fetchSites])

  useEffect(() => {
    if (user) {
      fetchUserVotes()
    }
  }, [user, fetchUserVotes])

  // Manejar voto
  const handleVote = async (siteId: string, voteType: VoteType) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const currentVote = userVotes[siteId]

    // Actualización optimista
    const newVotes = { ...userVotes }
    const newSites = sites.map((site) => {
      if (site.id !== siteId) return site

      let newUpvotes = site.upvotes
      let newDownvotes = site.downvotes

      // Revertir voto anterior
      if (currentVote === 'up') newUpvotes--
      if (currentVote === 'down') newDownvotes--

      // Si es el mismo voto, solo eliminar
      if (currentVote === voteType) {
        delete newVotes[siteId]
      } else {
        // Aplicar nuevo voto
        if (voteType === 'up') newUpvotes++
        if (voteType === 'down') newDownvotes++
        newVotes[siteId] = voteType
      }

      return {
        ...site,
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        score: newUpvotes - newDownvotes,
      }
    })

    setUserVotes(newVotes)
    setSites(newSites)

    // Enviar al servidor
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          voteType: currentVote === voteType ? null : voteType,
        }),
      })

      if (!response.ok) {
        // Revertir en caso de error
        fetchSites()
        fetchUserVotes()
      }
    } catch {
      fetchSites()
      fetchUserVotes()
    }
  }

  return (
    <div className="min-h-screen bg-dark-300">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Top 100 {getCategoryLabel(activeCategory)}
          </h1>
          <p className="text-gray-400">
            Votado por la comunidad. {!user && 'Inicia sesión para votar.'}
          </p>
        </div>

        {/* Category Toggle */}
        <CategoryToggle
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Sites Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-dark-100 rounded-xl h-72 animate-pulse"
              />
            ))}
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">No hay sitios en esta categoría aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sites.map((site, index) => (
              <SiteCard
                key={site.id}
                site={site}
                rank={index + 1}
                userVote={userVotes[site.id]}
                isAuthenticated={!!user}
                onVote={handleVote}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {!isLoading && sites.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Mostrando {sites.length} sitios en {getCategoryLabel(activeCategory)}
            </p>
          </div>
        )}
      </main>

      <Disclaimers />
    </div>
  )
}
