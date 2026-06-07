import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentProfile } from "@/lib/supabase/queries"

export async function getServerAuthState() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) {
    return {
      supabase: null,
      user: null,
      profile: null,
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      supabase,
      user: null,
      profile: null,
    }
  }

  try {
    const profile = await getCurrentProfile(supabase, user.id)
    return { supabase, user, profile }
  } catch {
    return { supabase, user, profile: null }
  }
}

export async function requireAuthenticatedUser() {
  const state = await getServerAuthState()
  if (!state.user) redirect("/login")
  return state
}

export async function requireArtisanOrAdmin() {
  const state = await requireAuthenticatedUser()
  if (!state.profile || (state.profile.role !== "artisan" && state.profile.role !== "admin")) {
    redirect("/dashboard")
  }
  return state
}

export async function requireAdmin() {
  const state = await requireAuthenticatedUser()
  if (!state.profile || state.profile.role !== "admin") {
    redirect("/dashboard")
  }
  return state
}

export async function requireActiveSubscription() {
  const state = await requireAuthenticatedUser()
  if (!state.profile || state.profile.subscriptionStatus !== "active") {
    redirect("/certified-heritage")
  }
  return state
}
