"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import { isSupabaseConfigured, supabaseEnv } from "@/lib/supabase/env"

let browserClient: SupabaseClient | null = null

// Real Supabase keys belong in .env.local. This helper stays safe to import before keys exist.
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseEnv.url, supabaseEnv.anonKey)
  }
  return browserClient
}
