export type SubscriptionStatus = "none" | "active" | "expired"

export interface HeritageSubscription {
  userId: string
  status: SubscriptionStatus
  planName: string
  startedAt?: string
  expiresAt?: string
}
