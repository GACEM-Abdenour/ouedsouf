"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { CertifiedContentCard } from "@/components/certified-heritage/CertifiedContentCard"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getCertifiedItemsByType } from "@/lib/supabase/queries"
import { useLanguage } from "@/context/language-context"
import type { CertifiedHeritageItem } from "@/types/certified-heritage"

export default function CertifiedLibraryPage() {
  const { language } = useLanguage()
  return <CertifiedListing type="library" title={language === "en" ? "Certified Library" : "المكتبة المعتمدة"} />
}

function CertifiedListing({ type, title }: { type: "library" | "collection" | "document"; title: string }) {
  const [items, setItems] = useState<CertifiedHeritageItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    async function loadItems() {
      if (!supabase) return
      try {
        const nextItems = await getCertifiedItemsByType(supabase, type)
        setItems(nextItems)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load certified content.")
      }
    }

    void loadItems()
  }, [supabase, type])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title={title} breadcrumb={[{ label: title }]} />
        <section className="py-16">
          <div className="container mx-auto space-y-6 px-4">
            {!supabase && <ConfigNotice />}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="grid gap-6 md:grid-cols-3">
              {items.map((item) => <CertifiedContentCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
