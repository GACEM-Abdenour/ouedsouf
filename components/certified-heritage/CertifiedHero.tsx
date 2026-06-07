"use client"

import Link from "next/link"
import { Award } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"

export function CertifiedHero() {
  const { language } = useLanguage()
  return (
    <section className="bg-primary/5 pt-32 pb-16">
      <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Award className="h-4 w-4" />
            {language === "en" ? "Certified Heritage" : "التراث المعتمد"}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-primary">
            {language === "en" ? "Certified Heritage Access" : "الوصول إلى التراث المعتمد"}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {language === "en"
              ? "Unlock verified notes, expert-reviewed site descriptions, educational documents, and curated heritage collections from Wad Souf."
              : "افتح ملاحظات موثقة ووصف مواقع بمراجعة خبراء ووثائق تعليمية ومجموعات تراثية منتقاة من وادي سوف."}
          </p>
          <Button asChild className="rounded-full bg-secondary hover:bg-accent">
            <Link href="/certified-heritage/library">{language === "en" ? "Enter library" : "دخول المكتبة"}</Link>
          </Button>
        </div>
        <div className="rounded-lg border border-primary/10 bg-background p-6 shadow-sm">
          <div className="aspect-[4/3] rounded-lg bg-[url('https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  )
}
