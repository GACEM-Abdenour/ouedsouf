"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Edit, Plus } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { ConfigNotice } from "@/components/common/config-notice"
import { ServiceCard } from "@/components/artisans/ServiceCard"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getOwnArtisanProfile, getOwnServices } from "@/lib/supabase/queries"
import type { ArtisanProfile } from "@/types/artisan"
import type { ArtisanService } from "@/types/service"
import { Button } from "@/components/ui/button"

export default function ArtisanServicesPage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()
  const [profile, setProfile] = useState<ArtisanProfile | null>(null)
  const [services, setServices] = useState<ArtisanService[]>([])

  useEffect(() => {
    async function loadServices() {
      if (!supabase || !user) return
      const artisanProfile = await getOwnArtisanProfile(supabase, user.id)
      setProfile(artisanProfile)
      if (!artisanProfile) return
      const ownServices = await getOwnServices(supabase, artisanProfile.id)
      setServices(ownServices)
    }

    void loadServices()
  }, [supabase, user])

  async function togglePublished(service: ArtisanService) {
    if (!supabase) return
    await supabase.from("artisan_services").update({ is_published: !service.isPublished }).eq("id", service.id)
    setServices((current) => current.map((item) => item.id === service.id ? { ...item, isPublished: !item.isPublished } : item))
  }

  return (
    <DashboardShell title={language === "en" ? "Services" : "الخدمات"}>
      <ProtectedRoute roles={["artisan", "admin"]}>
        {!supabase && <ConfigNotice />}
        <Button asChild className="rounded-full bg-secondary hover:bg-accent"><Link href="/dashboard/artisan/services/new"><Plus className="h-4 w-4" />{language === "en" ? "Add service" : "إضافة خدمة"}</Link></Button>
        {!profile && supabase && <p className="text-sm text-muted-foreground">{language === "en" ? "Create your artisan profile before adding services." : "أنشئ ملف الحرفي قبل إضافة الخدمات."}</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} className="space-y-2">
              <ServiceCard service={service} />
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm"><Link href={`/dashboard/artisan/services/${service.id}/edit`}><Edit className="h-4 w-4" />{language === "en" ? "Edit" : "تعديل"}</Link></Button>
                <Button type="button" variant="outline" size="sm" onClick={() => void togglePublished(service)}>
                  {service.isPublished ? (language === "en" ? "Unpublish" : "إلغاء النشر") : (language === "en" ? "Publish" : "نشر")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ProtectedRoute>
    </DashboardShell>
  )
}
