import type React from "react"
import { requireArtisanOrAdmin } from "@/lib/supabase/server-auth"

export default async function ArtisanDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireArtisanOrAdmin()
  return children
}
