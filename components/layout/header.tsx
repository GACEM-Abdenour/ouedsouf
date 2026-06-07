"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserMenu } from "@/components/auth/UserMenu"
import { useAuth } from "@/context/auth-context"

export function Header() {
  const { t, language, setLanguage, dir } = useLanguage()
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/sites", label: t("nav.sites") },
    { href: "/figures", label: t("nav.figures") },
    { href: "/crafts", label: t("nav.crafts") },
    {
      label: t("nav.heritage"),
      dropdown: [
        { href: "/architecture", label: t("nav.architecture") },
        { href: "/traditions", label: t("nav.traditions") },
        { href: "/clothing", label: t("nav.clothing") },
        { href: "/history", label: t("nav.history") },
      ],
    },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/certified-heritage", label: t("nav.certified") },
    { href: "/about-project", label: t("nav.project") },
    ...(user?.role === "admin" ? [{ href: "/admin", label: t("nav.admin") }] : []),
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled ? "bg-background/98 backdrop-blur-md border-b shadow-md py-3" : "bg-background border-b py-4",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-14 w-[176px] shrink-0 transition-transform duration-300 group-hover:scale-[1.02] sm:h-16 sm:w-[208px]">
            <Image
              src="/logo.png"
              alt={language === "ar" ? "شعار منصة وادي سوف التراثية" : "Wadi Souf Heritage logo"}
              fill
              sizes="(min-width: 640px) 208px, 176px"
              className="object-contain object-center"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="group flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:text-primary focus:outline-none">
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === "rtl" ? "end" : "start"} className="border-border bg-background">
                  {link.dropdown.map((sub) => (
                    <DropdownMenuItem key={sub.href} asChild>
                      <Link href={sub.href} className="w-full cursor-pointer py-2 hover:bg-muted">
                        {sub.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center gap-2 font-bold hover:bg-muted"
          >
            <Globe className="h-4 w-4 text-secondary" />
            <span className="hidden uppercase tracking-tighter sm:inline">
              {language === "en" ? "العربية" : "English"}
            </span>
          </Button>

          <UserMenu />

          <Button
            variant="ghost"
            size="icon"
            className="text-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full animate-in fade-in slide-in-from-top-4 border-b bg-background shadow-lg lg:hidden">
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col gap-2">
                  <span className="px-2 font-semibold text-primary">{link.label}</span>
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="border-l-2 border-transparent px-4 py-1 text-muted-foreground transition-all hover:border-accent hover:text-primary"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 py-2 font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              href={user ? "/dashboard" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-2 font-medium text-primary hover:text-secondary"
            >
              {user ? t("nav.dashboard") : t("nav.login")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
