import type React from "react"
import { requireAdmin } from "@/lib/supabase/server-auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return children
}
