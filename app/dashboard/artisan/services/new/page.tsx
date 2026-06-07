"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { ConfigNotice } from "@/components/common/config-notice"
import { ServiceForm } from "@/components/artisans/ServiceForm"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getOwnArtisanProfile } from "@/lib/supabase/queries"
import type { ArtisanProfile } from "@/types/artisan"

export default function NewServicePage() {
  const { language } = useLanguage()
  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()
  const [profile, setProfile] = useState<ArtisanProfile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      if (!supabase || !user) return
      const artisanProfile = await getOwnArtisanProfile(supabase, user.id)
      setProfile(artisanProfile)
    }

    void loadProfile()
  }, [supabase, user])

  return (
    <DashboardShell title={language === "en" ? "Add Service" : "إضافة خدمة"}>
      <ProtectedRoute roles={["artisan", "admin"]}>
        {!supabase ? <ConfigNotice /> : <ServiceForm mode="new" artisanProfileId={profile?.id} />}
      </ProtectedRoute>
    </DashboardShell>
  )
}
