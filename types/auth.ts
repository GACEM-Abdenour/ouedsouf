import type { SubscriptionStatus } from "./subscription"

export type UserRole = "client" | "artisan" | "admin"

export interface HeritageUser {
  id: string
  name: string
  email: string
  role: UserRole
  subscriptionStatus: SubscriptionStatus
  avatarUrl?: string
  createdAt: string
}

export interface AuthSession {
  user: HeritageUser | null
  isAuthenticated: boolean
}

export interface AuthActionResult {
  error: string | null
  redirectTo?: string
}
