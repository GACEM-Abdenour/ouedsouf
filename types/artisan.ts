export interface LocalizedText {
  en: string
  ar: string
}

export interface ArtisanCategory {
  id: string
  label: LocalizedText
}

export interface ArtisanProfile {
  id: string
  userId: string
  displayName: string
  workshopName?: string
  bio: LocalizedText
  location: string
  categories: string[]
  profileImage?: string
  coverImage?: string
  phone?: string
  email?: string
  whatsapp?: string
  isVerified: boolean
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
