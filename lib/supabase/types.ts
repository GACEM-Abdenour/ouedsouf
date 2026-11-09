import type { UserRole } from "@/types/auth"
import type { CertifiedPaymentStatus } from "@/types/certified-payment"
import type { SubscriptionStatus } from "@/types/subscription"
import type { CertifiedContentType } from "@/types/certified-heritage"

export interface ProfileRow {
  id: string
  name: string | null
  email: string
  role: UserRole
  subscription_status: SubscriptionStatus
  subscription_started_at: string | null
  subscription_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface ArtisanProfileRow {
  id: string
  user_id: string
  display_name: string
  workshop_name: string | null
  bio_en: string | null
  bio_ar: string | null
  location: string | null
  categories: string[] | null
  profile_image: string | null
  cover_image: string | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  is_verified: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface CertifiedPaymentRow {
  id: string
  user_id: string
  amount: number | string
  currency: string
  payment_method: string | null
  receipt_path: string
  status: CertifiedPaymentStatus
  admin_note: string | null
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
  updated_at: string
}

export interface ArtisanServiceRow {
  id: string
  artisan_id: string
  title_en: string
  title_ar: string | null
  description_en: string | null
  description_ar: string | null
  category: string
  location: string | null
  images: string[] | null
  phone: string | null
  email: string | null
  whatsapp: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CertifiedHeritageRow {
  id: string
  title_en: string
  title_ar: string | null
  description_en: string | null
  description_ar: string | null
  content_en: string | null
  content_ar: string | null
  type: CertifiedContentType
  image_url: string | null
  is_published: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}
