import { createClient } from "@supabase/supabase-js"
import { isSupabaseAdminConfigured, supabaseEnv } from "@/lib/supabase/env"

// This client must only run on the server. Never expose SUPABASE_SERVICE_ROLE_KEY in the browser.
export function getSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured()) return null
  return createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
