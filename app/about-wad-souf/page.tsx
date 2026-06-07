"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const { t, language } = useLanguage()

  const sections = [
    {
      title: language === "en" ? "Geographic Overview" : "نظرة عامة جغرافية",
      content:
        language === "en"
          ? "Wad Souf is a unique region situated in the Great Eastern Erg of the Algerian Sahara. Its landscape is characterized by vast sand dunes, interspersed with palm groves that have been cultivated in excavated hollows called 'ghouts'."
          : "وادي سوف هي منطقة فريدة تقع في العرق الشرقي الكبير للصحراء الجزائرية. يتميز منظرها الطبيعي بالكثبان الرملية الشاسعة، التي تتخللها غابات النخيل التي تم زرعها في تجاويف محفورة تسمى 'الغيطان'.",
    },
    {
      title: language === "en" ? "Cultural Significance" : "الأهمية الثقافية",
      content:
        language === "en"
          ? "The region's identity is a rich tapestry of desert resilience and architectural ingenuity. The 'City of a Thousand Domes' (El Oued) serves as its cultural heart, reflecting the local community's adaptation to harsh climatic conditions."
          : "هوية المنطقة هي نسيج غني من الصمود في الصحراء والبراعة المعمارية. تعتبر 'مدينة الألف قبة' (الوادي) قلبها الثقافي، مما يعكس تكيّف المجتمع المحلي مع الظروف المناخية القاسية.",
    },
  ]

  const facts = [
    { label: language === "en" ? "Location" : "الموقع", value: language === "en" ? "SE Algeria" : "جنوب شرق الجزائر" },
    { label: language === "en" ? "Main City" : "المدينة الرئيسية", value: language === "en" ? "El Oued" : "الوادي" },
    { label: language === "en" ? "Climate" : "المناخ", value: language === "en" ? "Arid Desert" : "صحراوي جاف" },
    {
      label: language === "en" ? "Key Feature" : "الميزة الأبرز",
      value: language === "en" ? "Sand Dunes" : "الكثبان الرملية",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={t("nav.about")}
          subtitle={language === "en" ? "The Jewel of the Great Eastern Erg" : "جوهرة العرق الشرقي الكبير"}
          breadcrumb={[{ label: t("nav.about") }]}
        />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {facts.map((fact, i) => (
                  <Card key={i} className="bg-primary/5 border-none">
                    <CardContent className="p-6 text-center">
                      <div className="text-sm font-bold text-accent uppercase mb-1">{fact.label}</div>
                      <div className="text-lg font-serif text-primary">{fact.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sections.map((section, idx) => (
                <div key={idx} className="space-y-6">
                  <h2 className="text-3xl font-serif text-primary">{section.title}</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed italic">
                    <p>{section.content}</p>
                  </div>
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg">
                    <Image
                      src={`/placeholder.svg?height=600&width=1200&query=${section.title}`}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
