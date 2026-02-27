import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function getScoreColor(score: number): string {
  if (score > 500) return 'text-green-400'
  if (score > 100) return 'text-green-300'
  if (score > 0) return 'text-gray-300'
  if (score > -100) return 'text-orange-300'
  return 'text-red-400'
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    onlyfans: 'OnlyFans / Creadoras',
    porno: 'Videos Porno',
    webcams: 'Webcams en Vivo',
  }
  return labels[category] || category
}

export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    onlyfans: '',
    porno: '',
    webcams: '',
  }
  return emojis[category] || ''
}
