'use client'

import Link from 'next/link'
import AuthButton from './AuthButton'

interface NavbarProps {
  user: { email: string } | null
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-dark-300/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/index" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PI</span>
            </div>
            <span className="text-lg font-bold text-white hidden sm:block">
              Porn Index
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/index"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Rankings
            </Link>
            <Link
              href="/bienestar"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Bienestar
            </Link>
            <AuthButton user={user} />
          </div>
        </div>
      </div>
    </nav>
  )
}
