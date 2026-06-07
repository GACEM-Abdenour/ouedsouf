"use client"

import { useLanguage } from "@/context/language-context"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href?: string }[]
}

export function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  const { t, language } = useLanguage()

  return (
    <section className="bg-primary/5 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              {t("nav.home")}
            </Link>
            {language === "en" ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            {breadcrumb?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium">{item.label}</span>
                )}
                {idx < breadcrumb.length - 1 &&
                  (language === "en" ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />)}
              </div>
            ))}
          </nav>

          <h1 className="text-4xl md:text-6xl font-serif text-primary">{title}</h1>
          {subtitle && <p className="text-xl text-muted-foreground leading-relaxed italic">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
