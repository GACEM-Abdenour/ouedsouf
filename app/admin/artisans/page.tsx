"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getAdminArtisans } from "@/lib/supabase/queries"
import type { ArtisanProfile } from "@/types/artisan"
import { Button } from "@/components/ui/button"

export default function AdminArtisansPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Manage Artisans" : "إدارة الحرفيين"
  const supabase = getSupabaseBrowserClient()
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([])

  useEffect(() => {
    async function loadArtisans() {
      if (!supabase) return
      setArtisans(await getAdminArtisans(supabase))
    }

    void loadArtisans()
  }, [supabase])

  async function updateArtisan(id: string, patch: { is_verified?: boolean; is_public?: boolean }) {
    if (!supabase) return
    await supabase.from("artisan_profiles").update(patch).eq("id", id)
    setArtisans(await getAdminArtisans(supabase))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title={title} breadcrumb={[{ label: title }]} />
        <ProtectedRoute roles={["admin"]}>
          <section className="py-16">
            <div className="container mx-auto space-y-4 px-4">
              {!supabase && <ConfigNotice />}
              {artisans.map((artisan) => (
                <div key={artisan.id} className="flex flex-col gap-4 rounded-lg border border-primary/10 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-primary">{artisan.displayName}</p>
                    <p className="text-sm text-muted-foreground">{artisan.workshopName ?? artisan.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => void updateArtisan(artisan.id, { is_verified: !artisan.isVerified })}>
                      {artisan.isVerified ? (language === "en" ? "Unverify" : "إلغاء التوثيق") : (language === "en" ? "Verify" : "توثيق")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void updateArtisan(artisan.id, { is_public: !artisan.isPublic })}>
                      {artisan.isPublic ? (language === "en" ? "Hide" : "إخفاء") : (language === "en" ? "Show" : "إظهار")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}
