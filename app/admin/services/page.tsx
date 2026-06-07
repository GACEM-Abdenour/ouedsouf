"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getAdminServices } from "@/lib/supabase/queries"
import type { ArtisanService } from "@/types/service"
import { Button } from "@/components/ui/button"

export default function AdminServicesPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Manage Services" : "إدارة الإعلانات"
  const supabase = getSupabaseBrowserClient()
  const [services, setServices] = useState<ArtisanService[]>([])

  useEffect(() => {
    async function loadServices() {
      if (!supabase) return
      setServices(await getAdminServices(supabase))
    }

    void loadServices()
  }, [supabase])

  async function togglePublished(service: ArtisanService) {
    if (!supabase) return
    await supabase.from("artisan_services").update({ is_published: !service.isPublished }).eq("id", service.id)
    setServices(await getAdminServices(supabase))
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
              {services.map((service) => (
                <div key={service.id} className="flex flex-col gap-4 rounded-lg border border-primary/10 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-primary">{service.title[language]}</p>
                    <p className="text-sm text-muted-foreground">{service.location}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => void togglePublished(service)}>
                    {service.isPublished ? (language === "en" ? "Unpublish" : "إلغاء النشر") : (language === "en" ? "Publish" : "نشر")}
                  </Button>
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
