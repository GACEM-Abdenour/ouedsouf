"use client"

import { useLanguage } from "@/context/language-context"
import { Map, Landmark, Users, Shirt, BookOpen, ArrowUpRight, Camera, Hammer, UserCheck } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function Categories() {
  const { t, language } = useLanguage()

  const categories = [
    {
      id: "sites",
      icon: Map,
      title: t("nav.sites"),
      text:
        language === "en"
          ? "Discover key historical locations and natural landmarks"
          : "اكتشف المواقع التاريخية الرئيسية والمعالم الطبيعية",
      href: "/sites",
    },
    {
      id: "architecture",
      icon: Landmark,
      title: t("nav.architecture"),
      text:
        language === "en"
          ? "Traditional ghorfas and unique desert dwellings"
          : "الغرف التقليدية والمساكن الصحراوية الفريدة",
      href: "/architecture",
    },
    {
      id: "figures",
      icon: UserCheck,
      title: t("nav.figures"),
      text:
        language === "en" ? "Influential figures and scholars of the region" : "الشخصيات المؤثرة والعلماء في المنطقة",
      href: "/figures",
    },
    {
      id: "crafts",
      icon: Hammer,
      title: t("nav.crafts"),
      text: language === "en" ? "Traditional soufi crafts and handiwork" : "الحرف التقليدية السوفية والأعمال اليدوية",
      href: "/crafts",
    },
    {
      id: "traditions",
      icon: Users,
      title: t("nav.traditions"),
      text:
        language === "en"
          ? "Social practices and living cultural rituals"
          : "الممارسات الاجتماعية والطقوس الثقافية الحية",
      href: "/traditions",
    },
    {
      id: "clothing",
      icon: Shirt,
      title: t("nav.clothing"),
      text:
        language === "en" ? "Distinctive identity through fabric and attire" : "الهوية المميزة من خلال النسيج واللباس",
      href: "/clothing",
    },
    {
      id: "history",
      icon: BookOpen,
      title: t("nav.history"),
      text:
        language === "en"
          ? "Historical stages that shaped the desert identity"
          : "المراحل التاريخية التي شكلت الهوية الصحراوية",
      href: "/history",
    },
    {
      id: "gallery",
      icon: Camera,
      title: t("nav.gallery"),
      text: language === "en" ? "Visual journey through the treasures of Souf" : "رحلة بصرية عبر كنوز وادي سوف",
      href: "/gallery",
    },
  ]

  return (
    <section id="categories" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest border border-secondary/20">
            {language === "en" ? "Heritage Pillars" : "ركائز التراث"}
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-primary leading-tight">{t("categories.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic text-lg md:text-xl leading-relaxed">
            {language === "en"
              ? "A comprehensive gateway to the tangible and intangible treasures of Wadi Souf"
              : "بوابة شاملة للكنوز المادية وغير المادية لمنطقة وادي سوف"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link key={cat.id} href={cat.href} className="group">
              <Card className="h-full border-none shadow-soft hover:shadow-premium transition-all duration-500 bg-muted/30 group-hover:bg-primary relative overflow-hidden flex flex-col justify-between">
                {/* Background decorative number or icon */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                  <cat.icon className="w-32 h-32 text-primary group-hover:text-white" />
                </div>

                <CardContent className="p-8 space-y-6 relative z-10">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold font-sans text-primary group-hover:text-white transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300 leading-relaxed text-sm">
                      {cat.text}
                    </p>
                  </div>
                </CardContent>

                <div className="px-8 pb-8 pt-2 relative z-10">
                  <div className="flex items-center text-secondary group-hover:text-white font-bold gap-2 text-xs uppercase tracking-widest transform transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                    <span>{language === "en" ? "Discover More" : "اكتشف المزيد"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Background subtle desert texture */}
      <div className="absolute inset-0 bg-desert-pattern opacity-5 pointer-events-none" />
    </section>
  )
}
