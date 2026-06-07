import type React from "react"
import { requireActiveSubscription } from "@/lib/supabase/server-auth"

export default async function CertifiedDocumentsLayout({ children }: { children: React.ReactNode }) {
  await requireActiveSubscription()
  return children
}
