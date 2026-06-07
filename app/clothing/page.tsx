"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

export default function ClothingPage() {
  const { t, language } = useLanguage()

  const items = [
    {
      type: language === "en" ? "Men's Clothing" : "لباس الرجال",
      items: [
        {
          name: "Gandoura",
          desc: language === "en" ? "A loose-fitting tunic made for desert comfort." : "قميص فضفاض مصمم لراحة الصحراء.",
        },
        {
          name: "Burnous",
          desc:
            language === "en" ? "A traditional hooded cloak signifying dignity." : "عباءة تقليدية بقلنسوة ترمز للوقار.",
        },
      ],
    },
    {
      type: language === "en" ? "Women's Clothing" : "لباس النساء",
      items: [
        {
          name: "Hayek",
          desc: language === "en" ? "A traditional white wrap covering the body." : "لباس أبيض تقليدي يغطي الجسم.",
        },
        {
          name: "Traditional Jewelry",
          desc:
            language === "en" ? "Intricate silver pieces with regional symbols." : "قطع فضية معقدة تحمل رموزاً إقليمية.",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={t("nav.clothing")}
          subtitle={language === "en" ? "Fabric of Identity and Grace" : "نسيج الهوية والأناقة"}
          breadcrumb={[{ label: t("nav.clothing") }]}
        />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-24">
              {items.map((section, idx) => (
                <div key={idx} className="space-y-12">
                  <h2 className="text-4xl font-serif text-primary border-b border-primary/20 pb-4">{section.type}</h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="relative w-full md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shrink-0">
                          <Image
                            src={`/placeholder.svg?height=400&width=300&query=${item.name}`}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                          <h3 className="text-3xl font-serif text-primary">{item.name}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed italic">{item.desc}</p>
                        </div>
                      </div>
                    ))}
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
