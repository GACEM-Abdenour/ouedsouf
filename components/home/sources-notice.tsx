"use client"

import { useLanguage } from "@/context/language-context"
import { Info } from "lucide-react"
import Link from "next/link"

export function SourcesNotice() {
  const { language } = useLanguage()

  return (
    <section className="bg-primary/5 border-y border-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-primary font-medium">
              {language === "en"
                ? "All content is compiled from publicly available academic sources, historical records, and community knowledge."
                : "تم تجميع كل المحتوى من مصادر أكاديمية متاحة وسجلات تاريخية ومعارف مجتمعية."}
            </p>
            <Link href="/sources" className="inline-block text-accent font-bold hover:underline">
              {language === "en" ? "View Full Sources & References →" : "عرض قائمة المصادر والمراجع كاملة ←"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
