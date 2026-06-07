import type { HeritageUser } from "@/types/auth"

export function hasActiveSubscription(user: HeritageUser | null) {
  return user?.subscriptionStatus === "active"
}
