"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConfigNotice } from "@/components/common/config-notice"
import { MarketplaceDisclaimer } from "@/components/artisans/MarketplaceDisclaimer"
import { ServiceCard } from "@/components/artisans/ServiceCard"
import { getCategoryLabel } from "@/lib/marketplace"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getArtisanById, getServicesForArtisan } from "@/lib/supabase/queries"
import { useLanguage } from "@/context/language-context"
import type { ArtisanProfile } from "@/types/artisan"
import type { ArtisanService } from "@/types/service"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ArtisanProfilePage() {
  const params = useParams<{ id: string }>()
  const { language } = useLanguage()
  const [artisan, setArtisan] = useState<ArtisanProfile | null>(null)
  const [services, setServices] = useState<ArtisanService[]>([])
  const [missing, setMissing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    async function loadArtisan() {
      if (!supabase) return
      try {
        const [profile, publishedServices] = await Promise.all([
          getArtisanById(supabase, params.id),
          getServicesForArtisan(supabase, params.id),
        ])
        setArtisan(profile)
        setServices(publishedServices)
      } catch (loadError) {
        setMissing(true)
        setError(loadError instanceof Error ? loadError.message : "Unable to load artisan.")
      }
    }

    void loadArtisan()
  }, [params.id, supabase])

  if (missing && supabase) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        {!supabase && <div className="container mx-auto px-4 py-8"><ConfigNotice /></div>}
        {error && supabase && <div className="container mx-auto px-4 py-8"><p className="text-sm text-destructive">{error}</p></div>}
        {artisan && (
          <>
            <section className="bg-primary/5">
              <div className="container mx-auto px-4 py-10">
                <div className="relative h-56 overflow-hidden rounded-lg bg-muted md:h-72">
                  {artisan.coverImage || artisan.profileImage ? <Image src={artisan.coverImage ?? artisan.profileImage!} alt={artisan.displayName} fill className="object-cover" sizes="100vw" /> : null}
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px]">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-serif text-primary">{artisan.workshopName ?? artisan.displayName}</h1>
                    <p className="text-muted-foreground">{artisan.bio[language]}</p>
                    <div className="flex flex-wrap gap-2">{artisan.categories.map((item) => <Badge key={item} variant="secondary">{getCategoryLabel(item, language)}</Badge>)}</div>
                  </div>
                  <div className="space-y-2 rounded-lg border border-primary/10 bg-background p-5 text-sm">
                    <p><strong>{language === "en" ? "Location:" : "الموقع:"}</strong> {artisan.location}</p>
                    {artisan.phone && <p><strong>{language === "en" ? "Phone:" : "الهاتف:"}</strong> {artisan.phone}</p>}
                    {artisan.email && <p><strong>{language === "en" ? "Email:" : "البريد:"}</strong> {artisan.email}</p>}
                    {artisan.whatsapp && <Button asChild className="mt-2 w-full rounded-full bg-secondary hover:bg-accent"><a href={`https://wa.me/${artisan.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a></Button>}
                  </div>
                </div>
              </div>
            </section>
            <section className="py-16">
              <div className="container mx-auto space-y-8 px-4">
                <MarketplaceDisclaimer />
                <h2 className="text-3xl font-serif text-primary">{language === "en" ? "Published services" : "الخدمات المنشورة"}</h2>
                <div className="grid gap-6 md:grid-cols-3">{services.map((service) => <ServiceCard key={service.id} service={service} />)}</div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
