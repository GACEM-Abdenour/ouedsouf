import type React from "react"
import { requireAuthenticatedUser } from "@/lib/supabase/server-auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuthenticatedUser()
  return children
}
