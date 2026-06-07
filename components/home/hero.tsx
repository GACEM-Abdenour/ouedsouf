"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const { t, language } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary text-white">
      {/* Background with premium pattern and animated overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-desert-pattern animate-pulse opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/95 to-secondary/30" />

        {/* Floating architectural abstract shapes */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
              {language === "ar" ? "مشروع التراث الجامعي" : "University Heritage Project"}
            </span>
          </div> */}

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] animate-in fade-in zoom-in duration-1000 delay-200 text-balance">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-3xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 font-medium">
              {t("hero.subtitle")}
            </p>
            <p className="text-base md:text-xl text-white/60 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 italic">
              {t("hero.description")}
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
            <Button
              asChild
              size="lg"
              className="h-16 px-12 text-lg rounded-full bg-secondary hover:bg-accent text-white border-none shadow-2xl shadow-secondary/20 transition-all duration-500 hover:-translate-y-1 font-bold group"
            >
              <Link href="#categories" className="flex items-center gap-3">
                {t("hero.cta")}
                <div className="p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-secondary transition-colors">
                  {language === "en" ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 px-12 text-lg rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all font-bold bg-transparent"
            >
              <Link href="/about-project">{language === "ar" ? "اقرأ المزيد" : "Read More"}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>

      {/* Bottom architectural transition element */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
