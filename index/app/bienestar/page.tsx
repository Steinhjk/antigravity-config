'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/Navbar'
import WellnessSection from '@/components/WellnessSection'
import Disclaimers from '@/components/Disclaimers'

const AGE_VERIFIED_KEY = 'age_verified'

export default function BienestarPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<{ email: string } | null>(null)

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

  return (
    <div className="min-h-screen bg-dark-300">
      <Navbar user={user} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WellnessSection />
      </main>

      <Disclaimers />
    </div>
  )
}
