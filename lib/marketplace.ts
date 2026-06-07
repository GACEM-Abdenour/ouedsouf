import type { ArtisanProfile } from "@/types/artisan"
import type { ArtisanService } from "@/types/service"
import { artisanCategories } from "@/lib/supabase/queries"

export function getCategoryLabel(categoryId: string, language: "en" | "ar") {
  return artisanCategories.find((category) => category.id === categoryId)?.label[language] ?? categoryId
}

export function filterMarketplace(artisans: ArtisanProfile[], servicesByArtisan: Record<string, ArtisanService[]>, query = "", category = "all") {
  const normalized = query.trim().toLowerCase()

  return artisans.filter((artisan) => {
    const services = servicesByArtisan[artisan.id] ?? []
    const categoryMatch = category === "all" || artisan.categories.includes(category) || services.some((service) => service.category === category)
    const searchText = [
      artisan.displayName,
      artisan.workshopName,
      artisan.location,
      artisan.bio.en,
      artisan.bio.ar,
      ...artisan.categories,
      ...services.flatMap((service) => [service.title.en, service.title.ar, service.description.en, service.description.ar, service.location]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return categoryMatch && (!normalized || searchText.includes(normalized))
  })
}
