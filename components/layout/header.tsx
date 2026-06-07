"use client"

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
        isScrolled ? "bg-background/98 backdrop-blur-md border-b shadow-md py-3" : "bg-background border-b py-4", // Removed transparent gradient for better visibility
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-serif text-2xl group-hover:bg-accent transition-all duration-300 shadow-lg group-hover:shadow-primary/20">
            WS
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-tight text-primary leading-tight">
              {language === "ar" ? "منصة وادي سوف التراثية" : "Wadi Souf Heritage"}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              {language === "ar" ? "بوابة الكنوز التاريخية" : "Historical Treasures Gateway"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.dropdown ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 font-semibold text-muted-foreground hover:text-primary transition-all duration-300 focus:outline-none text-sm uppercase tracking-wider group">
                  {link.label}
                  <ChevronDown className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === "rtl" ? "end" : "start"} className="bg-background border-border">
                  {link.dropdown.map((sub) => (
                    <DropdownMenuItem key={sub.href} asChild>
                      <Link href={sub.href} className="w-full cursor-pointer hover:bg-muted py-2">
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
                className="font-semibold text-muted-foreground hover:text-primary transition-all duration-300 text-sm uppercase tracking-wider relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-secondary after:transition-all hover:after:w-full"
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
            className="flex items-center gap-2 hover:bg-muted font-bold"
          >
            <Globe className="w-4 h-4 text-secondary" />
            <span className="hidden sm:inline uppercase tracking-tighter">
              {language === "en" ? "العربية" : "English"}
            </span>
          </Button>

          <UserMenu />

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b shadow-lg animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col gap-2">
                  <span className="font-semibold text-primary px-2">{link.label}</span>
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-muted-foreground hover:text-primary px-4 py-1 border-l-2 border-transparent hover:border-accent transition-all"
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
                  className="font-medium text-muted-foreground hover:text-primary px-2 py-2"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              href={user ? "/dashboard" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-primary hover:text-secondary px-2 py-2"
            >
              {user ? t("nav.dashboard") : t("nav.login")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
