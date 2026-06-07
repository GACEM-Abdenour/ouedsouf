"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { ConfigNotice } from "@/components/common/config-notice"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DashboardProfilePage() {
  const { user, refreshProfile } = useAuth()
  const { language } = useLanguage()
  const supabase = getSupabaseBrowserClient()
  const [name, setName] = useState(user?.name ?? "")
  const [status, setStatus] = useState<string | null>(null)

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault()
    if (!supabase || !user) return
    const { error } = await supabase.from("profiles").update({ name }).eq("id", user.id)
    if (error) {
      setStatus(error.message)
      return
    }
    await refreshProfile()
    setStatus(language === "en" ? "Profile updated." : "تم تحديث الملف.")
  }

  return (
    <DashboardShell title={language === "en" ? "Profile" : "الملف الشخصي"}>
      <ProtectedRoute>
        {!supabase && <ConfigNotice />}
        {user && (
          <Card className="rounded-lg border-primary/10">
            <CardContent>
              <form className="grid gap-4" onSubmit={saveProfile}>
                <div className="grid gap-2">
                  <Label>{language === "en" ? "Name" : "الاسم"}</Label>
                  <Input value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <p><strong>{language === "en" ? "Email:" : "البريد:"}</strong> {user.email}</p>
                <p><strong>{language === "en" ? "Role:" : "الدور:"}</strong> {user.role}</p>
                <p><strong>{language === "en" ? "Subscription:" : "الاشتراك:"}</strong> {user.subscriptionStatus}</p>
                {status && <p className="text-sm text-muted-foreground">{status}</p>}
                <Button type="submit" disabled={!supabase} className="w-fit rounded-full bg-secondary hover:bg-accent"><Save className="h-4 w-4" />{language === "en" ? "Save profile" : "حفظ الملف"}</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </ProtectedRoute>
    </DashboardShell>
  )
}
