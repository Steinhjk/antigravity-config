'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AgeVerification from '@/components/AgeVerification'

const AGE_VERIFIED_KEY = 'age_verified'

export default function LandingPage() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState<boolean | null>(null)

  useEffect(() => {
    const verified = localStorage.getItem(AGE_VERIFIED_KEY)
    if (verified === 'true') {
      router.push('/index')
    } else {
      setIsVerified(false)
    }
  }, [router])

  // Escuchar cambios en localStorage para redirigir cuando se verifique
  useEffect(() => {
    const handleStorage = () => {
      const verified = localStorage.getItem(AGE_VERIFIED_KEY)
      if (verified === 'true') {
        router.push('/index')
      }
    }

    // También verificar periódicamente por si el componente AgeVerification actualiza
    const interval = setInterval(() => {
      const verified = localStorage.getItem(AGE_VERIFIED_KEY)
      if (verified === 'true') {
        router.push('/index')
      }
    }, 500)

    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [router])

  if (isVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-300">
        <div className="animate-pulse text-white">Cargando...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-300">
      <AgeVerification />

      {/* Background content (blurred) */}
      <div className="blur-lg opacity-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Porn Index</h1>
            <p className="text-gray-400">El mejor ranking de sitios para adultos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-dark-100 rounded-xl h-64 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
