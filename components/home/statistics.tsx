"use client"

import { useLanguage } from "@/context/language-context"
import { MapPin, Clock, Users, Wheat, Briefcase, Banknote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"

export function Statistics() {
  const { t, language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { id: 1, icon: MapPin, label: t("stats.location.title"), value: t("stats.location.value"), delay: 0 },
    { id: 2, icon: Clock, label: t("stats.history.title"), value: t("stats.history.value"), delay: 100 },
    { id: 3, icon: Users, label: t("stats.poets.title"), value: t("stats.poets.value"), delay: 200 },
    { id: 4, icon: Wheat, label: t("stats.agriculture.title"), value: t("stats.agriculture.value"), delay: 300 },
    { id: 5, icon: Briefcase, label: t("stats.jobs.title"), value: t("stats.jobs.value"), delay: 400 },
    { id: 6, icon: Banknote, label: t("stats.revenue.title"), value: t("stats.revenue.value"), delay: 500 },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-muted to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-primary animate-in fade-in slide-in-from-top-4 duration-1000">
            {language === "ar" ? "إحصائيات وادي سوف" : "Wadi Souf Statistics"}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <Card
              key={stat.id}
              className={`border-none shadow-soft hover:shadow-premium transition-all duration-500 bg-white group overflow-hidden ${
                isVisible ? "animate-in fade-in zoom-in slide-in-from-bottom-8" : "opacity-0"
              }`}
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold text-primary tabular-nums tracking-tighter">
                    {isVisible ? stat.value : "0"}
                  </h3>
                </div>
                <div className="w-12 h-0.5 bg-secondary/30 group-hover:w-full transition-all duration-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
