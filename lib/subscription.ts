import type { HeritageUser } from "@/types/auth"

export function hasActiveSubscription(user: HeritageUser | null) {
  if (user?.subscriptionStatus !== "active") return false
  if (!user.subscriptionExpiresAt) return true
  return new Date(user.subscriptionExpiresAt).getTime() > Date.now()
}
