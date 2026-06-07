import type { SupabaseClient } from "@supabase/supabase-js"
import type { HeritageUser } from "@/types/auth"
import type { ArtisanProfile, ArtisanCategory } from "@/types/artisan"
import type { ArtisanService } from "@/types/service"
import type { CertifiedHeritageItem } from "@/types/certified-heritage"
import type { ProfileRow, ArtisanProfileRow, ArtisanServiceRow, CertifiedHeritageRow } from "@/lib/supabase/types"

export const artisanCategories: ArtisanCategory[] = [
  { id: "hand-weaving", label: { en: "Hand Weaving", ar: "النسيج اليدوي" } },
  { id: "pottery", label: { en: "Pottery and Ceramics", ar: "الفخار والخزف" } },
  { id: "palm-weaving", label: { en: "Palm Weaving", ar: "الصناعات السعفية" } },
  { id: "carpentry", label: { en: "Traditional Carpentry", ar: "النجارة التقليدية" } },
  { id: "jewelry", label: { en: "Traditional Jewelry", ar: "الحلي التقليدية" } },
  { id: "leather", label: { en: "Leather Tanning", ar: "دباغة الجلود" } },
  { id: "clothing", label: { en: "Traditional Clothing", ar: "اللباس التقليدي" } },
  { id: "food", label: { en: "Traditional Food", ar: "الأكل التقليدي" } },
  { id: "guide", label: { en: "Cultural Guide", ar: "دليل ثقافي" } },
  { id: "workshop", label: { en: "Heritage Workshop", ar: "ورشة تراثية" } },
  { id: "other", label: { en: "Other", ar: "أخرى" } },
]

export function mapProfile(row: ProfileRow): HeritageUser {
  return {
    id: row.id,
    name: row.name ?? row.email,
    email: row.email,
    role: row.role,
    subscriptionStatus: row.subscription_status,
    createdAt: row.created_at,
  }
}

export function mapArtisanProfile(row: ArtisanProfileRow): ArtisanProfile {
  return {
    id: row.id,
    userId: row.user_id,
    displayName: row.display_name,
    workshopName: row.workshop_name ?? undefined,
    bio: {
      en: row.bio_en ?? "",
      ar: row.bio_ar ?? "",
    },
    location: row.location ?? "",
    categories: row.categories ?? [],
    profileImage: row.profile_image ?? undefined,
    coverImage: row.cover_image ?? undefined,
    phone: row.phone ?? undefined,
    email: row.email ?? undefined,
    whatsapp: row.whatsapp ?? undefined,
    isVerified: row.is_verified,
    isPublic: row.is_public,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapArtisanService(row: ArtisanServiceRow): ArtisanService {
  return {
    id: row.id,
    artisanId: row.artisan_id,
    title: {
      en: row.title_en,
      ar: row.title_ar ?? row.title_en,
    },
    description: {
      en: row.description_en ?? "",
      ar: row.description_ar ?? row.description_en ?? "",
    },
    category: row.category,
    location: row.location ?? "",
    images: row.images ?? [],
    contactMethod: {
      phone: row.phone ?? undefined,
      email: row.email ?? undefined,
      whatsapp: row.whatsapp ?? undefined,
    },
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapCertifiedItem(row: CertifiedHeritageRow): CertifiedHeritageItem {
  return {
    id: row.id,
    type: row.type,
    title: {
      en: row.title_en,
      ar: row.title_ar ?? row.title_en,
    },
    summary: {
      en: row.description_en ?? "",
      ar: row.description_ar ?? row.description_en ?? "",
    },
    author: "Wadi Souf Heritage",
    readTime: row.type === "document" ? "PDF" : "10 min",
    isLocked: true,
    isPublished: row.is_published,
    publishedAt: row.created_at,
  }
}

export function getCategoryLabel(categoryId: string, language: "en" | "ar") {
  return artisanCategories.find((category) => category.id === categoryId)?.label[language] ?? categoryId
}

export async function getCurrentProfile(client: SupabaseClient, userId: string) {
  const { data, error } = await client.from("profiles").select("*").eq("id", userId).single<ProfileRow>()
  if (error) throw error
  return mapProfile(data)
}

export async function getPublicArtisans(client: SupabaseClient) {
  const { data, error } = await client.from("artisan_profiles").select("*").eq("is_public", true).order("created_at", { ascending: false }).returns<ArtisanProfileRow[]>()
  if (error) throw error
  return data.map(mapArtisanProfile)
}

export async function getArtisanById(client: SupabaseClient, id: string) {
  const { data, error } = await client.from("artisan_profiles").select("*").eq("id", id).single<ArtisanProfileRow>()
  if (error) throw error
  return mapArtisanProfile(data)
}

export async function getServicesForArtisan(client: SupabaseClient, artisanId: string) {
  const { data, error } = await client.from("artisan_services").select("*").eq("artisan_id", artisanId).eq("is_published", true).order("created_at", { ascending: false }).returns<ArtisanServiceRow[]>()
  if (error) throw error
  return data.map(mapArtisanService)
}

export async function getPublicServices(client: SupabaseClient) {
  const { data, error } = await client.from("artisan_services").select("*").eq("is_published", true).order("created_at", { ascending: false }).returns<ArtisanServiceRow[]>()
  if (error) throw error
  return data.map(mapArtisanService)
}

export async function getOwnServices(client: SupabaseClient, artisanId: string) {
  const { data, error } = await client.from("artisan_services").select("*").eq("artisan_id", artisanId).order("created_at", { ascending: false }).returns<ArtisanServiceRow[]>()
  if (error) throw error
  return data.map(mapArtisanService)
}

export async function getServiceById(client: SupabaseClient, id: string) {
  const { data, error } = await client.from("artisan_services").select("*").eq("id", id).single<ArtisanServiceRow>()
  if (error) throw error
  return mapArtisanService(data)
}

export async function getOwnArtisanProfile(client: SupabaseClient, userId: string) {
  const { data, error } = await client.from("artisan_profiles").select("*").eq("user_id", userId).maybeSingle<ArtisanProfileRow>()
  if (error) throw error
  return data ? mapArtisanProfile(data) : null
}

export async function getCertifiedItemsByType(client: SupabaseClient, type: string) {
  const { data, error } = await client.from("certified_heritage_items").select("*").eq("type", type).eq("is_published", true).order("created_at", { ascending: false }).returns<CertifiedHeritageRow[]>()
  if (error) throw error
  return data.map(mapCertifiedItem)
}

export async function getAdminUsers(client: SupabaseClient) {
  const { data, error } = await client.from("profiles").select("*").order("created_at", { ascending: false }).returns<ProfileRow[]>()
  if (error) throw error
  return data.map(mapProfile)
}

export async function getAdminArtisans(client: SupabaseClient) {
  const { data, error } = await client.from("artisan_profiles").select("*").order("created_at", { ascending: false }).returns<ArtisanProfileRow[]>()
  if (error) throw error
  return data.map(mapArtisanProfile)
}

export async function getAdminServices(client: SupabaseClient) {
  const { data, error } = await client.from("artisan_services").select("*").order("created_at", { ascending: false }).returns<ArtisanServiceRow[]>()
  if (error) throw error
  return data.map(mapArtisanService)
}

export async function getAdminCertifiedItems(client: SupabaseClient) {
  const { data, error } = await client.from("certified_heritage_items").select("*").order("created_at", { ascending: false }).returns<CertifiedHeritageRow[]>()
  if (error) throw error
  return data.map(mapCertifiedItem)
}
