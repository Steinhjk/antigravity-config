'use client'

import { useState, useEffect } from 'react'

const AGE_VERIFIED_KEY = 'age_verified'

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verified = localStorage.getItem(AGE_VERIFIED_KEY)
    if (!verified) {
      setShowModal(true)
    }
    setIsLoading(false)
  }, [])

  const handleConfirmAge = () => {
    localStorage.setItem(AGE_VERIFIED_KEY, 'true')
    document.cookie = `${AGE_VERIFIED_KEY}=true; max-age=31536000; path=/`
    setShowModal(false)
  }

  const handleExit = () => {
    window.location.href = 'https://www.google.com'
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-300 flex items-center justify-center z-50">
        <div className="animate-pulse text-white text-xl">Cargando...</div>
      </div>
    )
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-100 rounded-2xl max-w-md w-full p-8 text-center animate-scale-up border border-gray-700">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Contenido para Adultos
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Este sitio web contiene material explícito para adultos.
            Debes tener al menos 18 años de edad para acceder.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleConfirmAge}
            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Soy mayor de 18 años - Entrar
          </button>
          <button
            onClick={handleExit}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Soy menor de edad - Salir
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Al entrar, confirmas que tienes la edad legal en tu país para ver
          contenido para adultos y aceptas nuestros términos de uso.
        </p>
      </div>
    </div>
  )
}
