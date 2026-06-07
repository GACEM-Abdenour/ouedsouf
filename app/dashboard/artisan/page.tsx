"use client"

import Link from "next/link"
import { Plus, Store, Wrench } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtisanDashboardPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Artisan Dashboard" : "لوحة الحرفي"
  const links = [
    { href: "/dashboard/artisan/profile", label: language === "en" ? "Edit public profile" : "تعديل الملف العام", icon: Store },
    { href: "/dashboard/artisan/services", label: language === "en" ? "Manage services" : "إدارة الخدمات", icon: Wrench },
    { href: "/dashboard/artisan/services/new", label: language === "en" ? "Add service" : "إضافة خدمة", icon: Plus },
  ]
  return (
    <DashboardShell title={title}>
      <ProtectedRoute roles={["artisan", "admin"]}>
        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => {
            const Icon = link.icon
            return <Link key={link.href} href={link.href}><Card className="rounded-lg border-primary/10"><CardContent className="flex items-center gap-4"><Icon className="h-6 w-6 text-secondary" /><span className="font-semibold text-primary">{link.label}</span></CardContent></Card></Link>
          })}
        </div>
      </ProtectedRoute>
    </DashboardShell>
  )
}
