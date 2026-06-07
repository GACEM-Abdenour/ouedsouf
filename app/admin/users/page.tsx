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
import type { HeritageUser, UserRole } from "@/types/auth"
import type { SubscriptionStatus } from "@/types/subscription"
import { Button } from "@/components/ui/button"

export default function AdminUsersPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Manage Users" : "إدارة المستخدمين"
  const supabase = getSupabaseBrowserClient()
  const [users, setUsers] = useState<HeritageUser[]>([])
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      if (!supabase) return
      const nextUsers = await getAdminUsers(supabase)
      setUsers(nextUsers)
    }

    void loadUsers()
  }, [supabase])

  async function updateUser(userId: string, patch: { role?: UserRole; subscription_status?: SubscriptionStatus }) {
    if (!supabase) return
    const { error } = await supabase.from("profiles").update(patch).eq("id", userId)
    if (error) {
      setStatus(error.message)
      return
    }
    const nextUsers = await getAdminUsers(supabase)
    setUsers(nextUsers)
    setStatus(language === "en" ? "User updated." : "تم تحديث المستخدم.")
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
              {status && <p className="text-sm text-muted-foreground">{status}</p>}
              <div className="overflow-x-auto rounded-lg border border-primary/10">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="bg-muted/30 text-left">
                    <tr>
                      <th className="p-3">{language === "en" ? "Name" : "الاسم"}</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">{language === "en" ? "Role" : "الدور"}</th>
                      <th className="p-3">{language === "en" ? "Subscription" : "الاشتراك"}</th>
                      <th className="p-3">{language === "en" ? "Actions" : "الإجراءات"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <select className="rounded-md border px-2 py-1" value={user.role} onChange={(event) => void updateUser(user.id, { role: event.target.value as UserRole })}>
                            <option value="client">{language === "en" ? "client" : "زائر"}</option>
                            <option value="artisan">{language === "en" ? "artisan" : "حرفي"}</option>
                            <option value="admin">{language === "en" ? "admin" : "مدير"}</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <select className="rounded-md border px-2 py-1" value={user.subscriptionStatus} onChange={(event) => void updateUser(user.id, { subscription_status: event.target.value as SubscriptionStatus })}>
                            <option value="none">{language === "en" ? "none" : "بدون اشتراك"}</option>
                            <option value="active">{language === "en" ? "active" : "نشط"}</option>
                            <option value="expired">{language === "en" ? "expired" : "منتهي"}</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <Button size="sm" variant="outline" onClick={() => void updateUser(user.id, { role: user.role, subscription_status: user.subscriptionStatus })}>
                            {language === "en" ? "Save" : "حفظ"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}
