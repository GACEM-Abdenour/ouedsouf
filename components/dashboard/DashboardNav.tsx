"use client"

import Link from "next/link"
import { Settings, User, Hammer, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardNav() {
  const { user } = useAuth()
  const { language } = useLanguage()
  const links = [
    { href: "/dashboard", label: language === "en" ? "Dashboard" : "لوحة التحكم", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: language === "en" ? "Profile" : "الملف الشخصي", icon: User },
    { href: "/dashboard/settings", label: language === "en" ? "Settings" : "الإعدادات", icon: Settings },
    ...(user?.role === "artisan" || user?.role === "admin" ? [{ href: "/dashboard/artisan", label: language === "en" ? "Artisan Dashboard" : "لوحة الحرفي", icon: Hammer }] : []),
  ]
  return (
    <Card className="h-fit rounded-lg border-primary/10">
      <CardContent className="grid gap-2">
        {links.map((link) => {
          const Icon = link.icon
          return <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"><Icon className="h-4 w-4" />{link.label}</Link>
        })}
      </CardContent>
    </Card>
  )
}
