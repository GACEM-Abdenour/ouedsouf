"use client"

import Link from "next/link"
import { Shield, User, Hammer, Award } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardPage() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const title = language === "en" ? "Dashboard" : "لوحة التحكم"
  const links = [
    { href: "/dashboard/profile", label: language === "en" ? "Manage profile" : "إدارة الملف", icon: User },
    { href: "/certified-heritage", label: language === "en" ? "Certified Heritage" : "التراث المعتمد", icon: Award },
    ...(user?.role === "artisan" || user?.role === "admin"
      ? [{ href: "/dashboard/artisan", label: language === "en" ? "Artisan Dashboard" : "لوحة الحرفي", icon: Hammer }]
      : []),
    ...(user?.role === "admin" ? [{ href: "/admin", label: language === "en" ? "Admin" : "الإدارة", icon: Shield }] : []),
  ]

  return (
    <DashboardShell title={title}>
      <ProtectedRoute>
        <p className="text-muted-foreground">
          {language === "en"
            ? `Signed in as ${user?.name} (${user?.role}). Subscription: ${user?.subscriptionStatus}.`
            : `تم تسجيل الدخول باسم ${user?.name} (${user?.role}). حالة الاشتراك: ${user?.subscriptionStatus}.`}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Card className="rounded-lg border-primary/10 transition hover:shadow-md">
                  <CardContent className="flex items-center gap-4">
                    <Icon className="h-6 w-6 text-secondary" />
                    <span className="font-semibold text-primary">{link.label}</span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </ProtectedRoute>
    </DashboardShell>
  )
}
