"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { artisanCategories } from "@/lib/supabase/queries"
import type { ArtisanService } from "@/types/service"
import { ConfigNotice } from "@/components/common/config-notice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ServiceForm({
  mode = "new",
  artisanProfileId,
  initialService,
}: {
  mode?: "new" | "edit"
  artisanProfileId?: string
  initialService?: ArtisanService | null
}) {
  const { language } = useLanguage()
  const supabase = getSupabaseBrowserClient()
  const [title, setTitle] = useState(language === "en" ? initialService?.title.en ?? "" : initialService?.title.ar ?? "")
  const [description, setDescription] = useState(language === "en" ? initialService?.description.en ?? "" : initialService?.description.ar ?? "")
  const [category, setCategory] = useState(initialService?.category ?? artisanCategories[0]?.id ?? "other")
  const [phone, setPhone] = useState(initialService?.contactMethod.phone ?? "")
  const [whatsapp, setWhatsapp] = useState(initialService?.contactMethod.whatsapp ?? "")
  const [isPublished, setIsPublished] = useState(initialService?.isPublished ?? true)
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!supabase) return <ConfigNotice />
  const client = supabase

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!artisanProfileId) {
      setStatus(language === "en" ? "Create your artisan page first." : "أنشئ صفحة الحرفي أولا.")
      return
    }

    setSubmitting(true)
    setStatus(null)

    const payload = {
      artisan_id: artisanProfileId,
      title_en: language === "en" ? title : initialService?.title.en ?? title,
      title_ar: language === "ar" ? title : initialService?.title.ar ?? title,
      description_en: language === "en" ? description : initialService?.description.en ?? description,
      description_ar: language === "ar" ? description : initialService?.description.ar ?? description,
      category,
      phone: phone || null,
      whatsapp: whatsapp || null,
      is_published: isPublished,
    }

    const query = initialService
      ? client.from("artisan_services").update(payload).eq("id", initialService.id)
      : client.from("artisan_services").insert(payload)

    const { error } = await query
    setSubmitting(false)

    if (error) {
      setStatus(error.message)
      return
    }

    setStatus(language === "en" ? "Saved." : "تم الحفظ.")
  }

  return (
    <Card className="rounded-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-primary">
          {mode === "new" ? (language === "en" ? "Add service" : "إضافة خدمة") : (language === "en" ? "Edit service" : "تعديل الخدمة")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <Field label={language === "en" ? "Service title" : "عنوان الخدمة"} value={title} onChange={setTitle} />
          <div className="grid gap-2">
            <Label>{language === "en" ? "Craft" : "الحرفة"}</Label>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
              {artisanCategories.map((item) => <option key={item.id} value={item.id}>{item.label[language]}</option>)}
            </select>
          </div>
          <Field label={language === "en" ? "Phone" : "الهاتف"} value={phone} onChange={setPhone} />
          <Field label={language === "en" ? "WhatsApp" : "واتساب"} value={whatsapp} onChange={setWhatsapp} />
          <div className="grid gap-2">
            <Label>{language === "en" ? "Short description" : "وصف قصير"}</Label>
            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input checked={isPublished} onChange={(event) => setIsPublished(event.target.checked)} type="checkbox" />
            {language === "en" ? "Published" : "منشور"}
          </label>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
          <Button disabled={submitting} className="w-fit rounded-full bg-secondary hover:bg-accent">
            <Save className="h-4 w-4" />
            {language === "en" ? "Save" : "حفظ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
