"use client"

import { BookOpen, FileArchive, GraduationCap, ShieldCheck } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CertifiedHero } from "@/components/certified-heritage/CertifiedHero"
import { SubscriptionStatusCard } from "@/components/certified-heritage/SubscriptionStatusCard"
import { LockedContentCard } from "@/components/certified-heritage/LockedContentCard"
import { useLanguage } from "@/context/language-context"

export default function CertifiedHeritagePage() {
  const { language } = useLanguage()
  const benefits = [
    { icon: ShieldCheck, en: "Expert-reviewed material", ar: "مواد بمراجعة خبراء" },
    { icon: GraduationCap, en: "Educational resources", ar: "موارد تعليمية" },
    { icon: BookOpen, en: "Verified cultural collections", ar: "مجموعات ثقافية موثقة" },
    { icon: FileArchive, en: "Archive-style documents", ar: "وثائق بأسلوب أرشيفي" },
  ]
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <CertifiedHero />
        <section className="py-16">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1fr_380px]">
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon
                  return <div key={benefit.en} className="rounded-lg border border-primary/10 bg-muted/20 p-6"><Icon className="mb-4 h-6 w-6 text-secondary" /><h3 className="text-xl font-serif text-primary">{benefit[language]}</h3></div>
                })}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <LockedContentCard title={language === "en" ? "Certified Library" : "المكتبة المعتمدة"} href="/certified-heritage/library" />
                <LockedContentCard title={language === "en" ? "Guided Collections" : "المجموعات الموجهة"} href="/certified-heritage/collections" />
                <LockedContentCard title={language === "en" ? "Documents" : "الوثائق"} href="/certified-heritage/documents" />
              </div>
            </div>
            <SubscriptionStatusCard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
