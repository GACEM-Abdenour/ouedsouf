"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Hammer, Leaf, Search, Sparkles } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { ArtisanCard } from "@/components/artisans/ArtisanCard"
import { ArtisanFilters } from "@/components/artisans/ArtisanFilters"
import { MarketplaceDisclaimer } from "@/components/artisans/MarketplaceDisclaimer"
import { useLanguage } from "@/context/language-context"
import { filterMarketplace } from "@/lib/marketplace"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { artisanCategories, getPublicArtisans, getPublicServices } from "@/lib/supabase/queries"
import type { ArtisanProfile } from "@/types/artisan"
import type { ArtisanService } from "@/types/service"
import { Button } from "@/components/ui/button"

export default function CraftsPage() {
  const { language } = useLanguage()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([])
  const [servicesByArtisan, setServicesByArtisan] = useState<Record<string, ArtisanService[]>>({})
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    async function loadArtisans() {
      if (!supabase) return

      try {
        const [profiles, services] = await Promise.all([
          getPublicArtisans(supabase),
          getPublicServices(supabase),
        ])

        setArtisans(profiles)
        setServicesByArtisan(
          services.reduce<Record<string, ArtisanService[]>>((acc, service) => {
            acc[service.artisanId] = [...(acc[service.artisanId] ?? []), service]
            return acc
          }, {}),
        )
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load artisans.")
      }
    }

    void loadArtisans()
  }, [supabase])

  const featuredCrafts = artisanCategories.slice(0, 8)
  const filteredArtisans = filterMarketplace(artisans, servicesByArtisan, query, category)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <PageHero
          title={language === "en" ? "Crafts & Artisans" : "الحرف والحرفيون"}
          subtitle={
            language === "en"
              ? "A simple place to discover Wad Souf crafts, find local artisans, and contact them directly."
              : "مكان بسيط لاكتشاف حرف وادي سوف والعثور على الحرفيين والتواصل معهم مباشرة."
          }
          breadcrumb={[{ label: language === "en" ? "Crafts" : "الحرف" }]}
        />

        <section className="py-12">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-lg border border-primary/10 bg-muted/25 p-6">
              <Sparkles className="mb-4 h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-serif text-primary">
                {language === "en" ? "What this page does" : "ما الذي تقدمه هذه الصفحة"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {language === "en"
                  ? "Instead of separating craft information from artisan profiles, this MVP keeps both together: learn the craft category, then contact a real artisan if one is listed."
                  : "بدلا من فصل معلومات الحرف عن ملفات الحرفيين، تجمع هذه النسخة البسيطة بين الاثنين: تعرف على فئة الحرفة ثم تواصل مع الحرفي المتاح."}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild className="rounded-full bg-secondary hover:bg-accent">
                  <Link href="/register">{language === "en" ? "Register as artisan" : "سجل كحرفي"}</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/dashboard/artisan">{language === "en" ? "My artisan page" : "صفحة الحرفي"}</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {featuredCrafts.map((craft) => (
                <button
                  key={craft.id}
                  type="button"
                  onClick={() => setCategory(craft.id)}
                  className="rounded-lg border border-primary/10 bg-background p-4 text-left transition hover:border-secondary hover:bg-muted/30"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {craft.id.includes("palm") ? <Leaf className="h-5 w-5" /> : <Hammer className="h-5 w-5" />}
                  </div>
                  <h3 className="font-serif text-lg text-primary">{craft.label[language]}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {language === "en" ? "View matching artisans" : "عرض الحرفيين المناسبين"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/15 py-12">
          <div className="container mx-auto space-y-6 px-4">
            {!supabase && <ConfigNotice />}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <MarketplaceDisclaimer />
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-secondary" />
              <h2 className="text-3xl font-serif text-primary">
                {language === "en" ? "Find an artisan" : "ابحث عن حرفي"}
              </h2>
            </div>
            <ArtisanFilters query={query} category={category} onQueryChange={setQuery} onCategoryChange={setCategory} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArtisans.map((artisan) => <ArtisanCard key={artisan.id} artisan={artisan} />)}
            </div>
            {supabase && filteredArtisans.length === 0 && (
              <p className="rounded-lg border border-primary/10 p-6 text-sm text-muted-foreground">
                {language === "en" ? "No artisans match this search yet." : "لا يوجد حرفيون مطابقون لهذا البحث حاليا."}
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
