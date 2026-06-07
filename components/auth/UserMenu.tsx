"use client"

import Link from "next/link"
import { LayoutDashboard, LogOut, Shield } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function UserMenu() {
  const { user, logout, isLoading } = useAuth()
  const { language } = useLanguage()

  if (!user && !isLoading) {
    return (
      <Button asChild className="hidden md:flex rounded-full bg-secondary px-5 text-white hover:bg-accent">
        <Link href="/login">{language === "en" ? "Login" : "دخول"}</Link>
      </Button>
    )
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hidden md:flex rounded-full">
          <LayoutDashboard className="h-4 w-4" />
          {language === "en" ? "Dashboard" : "لوحة التحكم"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={language === "ar" ? "start" : "end"}>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">{language === "en" ? "Dashboard" : "لوحة التحكم"}</Link>
        </DropdownMenuItem>
        {user.role === "artisan" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard/artisan">{language === "en" ? "Artisan Dashboard" : "لوحة الحرفي"}</Link>
          </DropdownMenuItem>
        )}
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin"><Shield className="h-4 w-4" />{language === "en" ? "Admin" : "الإدارة"}</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => void logout()}>
          <LogOut className="h-4 w-4" />
          {language === "en" ? "Logout" : "خروج"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
