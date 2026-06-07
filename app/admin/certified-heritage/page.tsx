"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getAdminCertifiedItems } from "@/lib/supabase/queries"
import type { CertifiedHeritageItem, CertifiedContentType } from "@/types/certified-heritage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminCertifiedPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Manage Certified Heritage" : "إدارة التراث المعتمد"
  const supabase = getSupabaseBrowserClient()
  const [items, setItems] = useState<CertifiedHeritageItem[]>([])
  const [titleEn, setTitleEn] = useState("")
  const [titleAr, setTitleAr] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionAr, setDescriptionAr] = useState("")
  const [type, setType] = useState<CertifiedContentType>("library")

  useEffect(() => {
    async function loadItems() {
      if (!supabase) return
      setItems(await getAdminCertifiedItems(supabase))
    }

    void loadItems()
  }, [supabase])

  async function reload() {
    if (!supabase) return
    setItems(await getAdminCertifiedItems(supabase))
  }

  async function createItem(event: React.FormEvent) {
    event.preventDefault()
    if (!supabase) return
    await supabase.from("certified_heritage_items").insert({
      title_en: titleEn,
      title_ar: titleAr || null,
      description_en: descriptionEn || null,
      description_ar: descriptionAr || null,
      content_en: descriptionEn || null,
      content_ar: descriptionAr || null,
      type,
      is_published: true,
    })
    setTitleEn("")
    setTitleAr("")
    setDescriptionEn("")
    setDescriptionAr("")
    await reload()
  }

  async function togglePublished(item: CertifiedHeritageItem) {
    if (!supabase) return
    await supabase.from("certified_heritage_items").update({ is_published: !item.isPublished }).eq("id", item.id)
    await reload()
  }

  async function deleteItem(itemId: string) {
    if (!supabase) return
    await supabase.from("certified_heritage_items").delete().eq("id", itemId)
    await reload()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title={title} breadcrumb={[{ label: title }]} />
        <ProtectedRoute roles={["admin"]}>
          <section className="py-16">
            <div className="container mx-auto space-y-8 px-4">
              {!supabase && <ConfigNotice />}
              <form className="grid gap-3 rounded-lg border border-primary/10 p-4" onSubmit={createItem}>
                <Input placeholder="English title" value={titleEn} onChange={(event) => setTitleEn(event.target.value)} />
                <Input placeholder="Arabic title" value={titleAr} onChange={(event) => setTitleAr(event.target.value)} />
                <Textarea placeholder="English description" value={descriptionEn} onChange={(event) => setDescriptionEn(event.target.value)} />
                <Textarea placeholder="Arabic description" value={descriptionAr} onChange={(event) => setDescriptionAr(event.target.value)} />
                <select className="rounded-md border px-3 py-2" value={type} onChange={(event) => setType(event.target.value as CertifiedContentType)}>
                  <option value="library">{language === "en" ? "library" : "مكتبة"}</option>
                  <option value="collection">{language === "en" ? "collection" : "مجموعة"}</option>
                  <option value="document">{language === "en" ? "document" : "وثيقة"}</option>
                </select>
                <Button type="submit" className="w-fit rounded-full bg-secondary hover:bg-accent">
                  {language === "en" ? "Create item" : "إنشاء عنصر"}
                </Button>
              </form>
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-lg border border-primary/10 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-primary">{item.title[language]}</p>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => void togglePublished(item)}>
                      {language === "en" ? "Toggle publish" : "تبديل النشر"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void deleteItem(item.id)}>
                      {language === "en" ? "Delete" : "حذف"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}
