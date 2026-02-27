import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Porn Index - Ranking de Sitios para Adultos',
  description: 'El mejor índice de sitios web para adultos. Rankings, votaciones y reviews de OnlyFans, páginas porno y webcams.',
  robots: 'noindex, nofollow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-dark-300 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
