"use client"

import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardSettingsPage() {
  const { language } = useLanguage()
  return (
    <DashboardShell title={language === "en" ? "Settings" : "الإعدادات"}>
      <ProtectedRoute>
        <Card className="rounded-lg border-primary/10"><CardContent><p className="text-muted-foreground">{language === "en" ? "Basic settings placeholder for future account, language, and notification preferences." : "مساحة إعدادات أساسية مستقبلية للحساب واللغة والتنبيهات."}</p></CardContent></Card>
      </ProtectedRoute>
    </DashboardShell>
  )
}
