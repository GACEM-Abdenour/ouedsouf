"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { ConfigNotice } from "@/components/common/config-notice"
import { ServiceForm } from "@/components/artisans/ServiceForm"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getOwnArtisanProfile, getServiceById } from "@/lib/supabase/queries"
import type { ArtisanProfile } from "@/types/artisan"
import type { ArtisanService } from "@/types/service"

export default function EditServicePage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const params = useParams<{ id: string }>()
  const supabase = getSupabaseBrowserClient()
  const [profile, setProfile] = useState<ArtisanProfile | null>(null)
  const [service, setService] = useState<ArtisanService | null>(null)

  useEffect(() => {
    async function loadService() {
      if (!supabase || !user) return
      const [artisanProfile, currentService] = await Promise.all([
        getOwnArtisanProfile(supabase, user.id),
        getServiceById(supabase, params.id),
      ])
      setProfile(artisanProfile)
      setService(currentService)
    }

    void loadService()
  }, [params.id, supabase, user])

  return (
    <DashboardShell title={language === "en" ? "Edit Service" : "تعديل الخدمة"}>
      <ProtectedRoute roles={["artisan", "admin"]}>
        {!supabase ? <ConfigNotice /> : <ServiceForm mode="edit" artisanProfileId={profile?.id} initialService={service} />}
      </ProtectedRoute>
    </DashboardShell>
  )
}
