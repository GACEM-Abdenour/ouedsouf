import type { LocalizedText } from "./artisan"

export interface ArtisanService {
  id: string
  artisanId: string
  title: LocalizedText
  description: LocalizedText
  category: string
  location: string
  images: string[]
  contactMethod: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
