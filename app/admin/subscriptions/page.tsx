"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getAdminUsers } from "@/lib/supabase/queries"
import type { HeritageUser } from "@/types/auth"
import type { SubscriptionStatus } from "@/types/subscription"

export default function AdminSubscriptionsPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Manage Subscriptions" : "إدارة الاشتراكات"
  const supabase = getSupabaseBrowserClient()
  const [users, setUsers] = useState<HeritageUser[]>([])

  useEffect(() => {
    async function loadUsers() {
      if (!supabase) return
      setUsers(await getAdminUsers(supabase))
    }

    void loadUsers()
  }, [supabase])

  async function updateSubscription(userId: string, status: SubscriptionStatus) {
    if (!supabase) return
    await supabase.from("profiles").update({ subscription_status: status }).eq("id", userId)
    setUsers(await getAdminUsers(supabase))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title={title} breadcrumb={[{ label: title }]} />
        <ProtectedRoute roles={["admin"]}>
          <section className="py-16">
            <div className="container mx-auto space-y-6 px-4">
              {!supabase && <ConfigNotice />}
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex flex-col gap-3 rounded-lg border border-primary/10 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-primary">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <select className="rounded-md border px-3 py-2" value={user.subscriptionStatus} onChange={(event) => void updateSubscription(user.id, event.target.value as SubscriptionStatus)}>
                      <option value="none">none</option>
                      <option value="active">active</option>
                      <option value="expired">expired</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}
