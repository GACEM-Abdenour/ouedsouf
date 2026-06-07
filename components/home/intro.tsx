"use client"

import { useLanguage } from "@/context/language-context"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function Intro() {
  const { t, language } = useLanguage()

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="w-16 h-1 bg-accent mx-auto" />
          <h2 className="text-3xl md:text-4xl font-serif text-primary italic">{t("intro.title")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t("intro.text")}</p>
          <Link
            href="/about-wad-souf"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            {language === "en" ? "Learn More About the Region" : "اكتشف المزيد عن المنطقة"}
            {language === "en" ? (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            ) : (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}
