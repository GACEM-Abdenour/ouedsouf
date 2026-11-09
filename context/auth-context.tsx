"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getDashboardPathForRole } from "@/lib/auth"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { missingSupabaseMessage } from "@/lib/supabase/env"
import { getCurrentProfile } from "@/lib/supabase/queries"
import type { AuthActionResult, HeritageUser } from "@/types/auth"

interface AuthContextType {
  user: HeritageUser | null
  isAuthenticated: boolean
  isLoading: boolean
  isConfigured: boolean
  authError: string | null
  login: (email: string, password: string) => Promise<AuthActionResult>
  register: (name: string, email: string, password: string, role: "client" | "artisan") => Promise<AuthActionResult>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<HeritageUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const supabase = getSupabaseBrowserClient()

  async function hydrateFromSession() {
    if (!supabase) {
      setUser(null)
      setAuthError(missingSupabaseMessage)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setAuthError(null)

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      setUser(null)
      setAuthError(sessionError.message)
      setIsLoading(false)
      return
    }

    if (!session?.user) {
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      const profile = await getCurrentProfile(supabase, session.user.id)
      setUser(profile)
    } catch (error) {
      setUser(null)
      setAuthError(error instanceof Error ? error.message : "Unable to load profile.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void hydrateFromSession()

    if (!supabase) return

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void hydrateFromSession()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  async function login(email: string, password: string): Promise<AuthActionResult> {
    if (!supabase) return { error: missingSupabaseMessage }

    setAuthError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
      return { error: error.message }
    }

    if (!data.user) {
      const errorMessage = "Unable to load your account after login."
      setAuthError(errorMessage)
      return { error: errorMessage }
    }

    try {
      const profile = await getCurrentProfile(supabase, data.user.id)
      setUser(profile)
      return { error: null, redirectTo: getDashboardPathForRole(profile.role) }
    } catch (caught) {
      const errorMessage = caught instanceof Error ? caught.message : "Unable to load your account role."
      setAuthError(errorMessage)
      return { error: errorMessage }
    }
  }

  async function register(name: string, email: string, password: string, role: "client" | "artisan"): Promise<AuthActionResult> {
    if (!supabase) return { error: missingSupabaseMessage }

    setAuthError(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    })

    if (error) {
      setAuthError(error.message)
      return { error: error.message }
    }

    if (data.session && data.user) {
      try {
        const profile = await getCurrentProfile(supabase, data.user.id)
        setUser(profile)
        return {
          error: null,
          redirectTo: profile.role === "artisan" ? "/dashboard/artisan/profile" : getDashboardPathForRole(profile.role),
        }
      } catch {
        await hydrateFromSession()
      }

      return {
        error: null,
        redirectTo: getDashboardPathForRole(role),
      }
    }

    return {
      error: null,
      redirectTo: "/login",
    }
  }

  async function logout() {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
  }

  async function refreshProfile() {
    await hydrateFromSession()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isConfigured: Boolean(supabase),
        authError,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
