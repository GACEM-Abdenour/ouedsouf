"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { ArtisanProfile } from "@/types/artisan"
import { artisanCategories } from "@/lib/supabase/queries"
import { ConfigNotice } from "@/components/common/config-notice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ArtisanProfileForm({ initialProfile }: { initialProfile?: ArtisanProfile | null }) {
  const { language } = useLanguage()
  const { user } = useAuth()
  const supabase = getSupabaseBrowserClient()
  const [displayName, setDisplayName] = useState(initialProfile?.displayName ?? user?.name ?? "")
  const [location, setLocation] = useState(initialProfile?.location ?? "")
  const [phone, setPhone] = useState(initialProfile?.phone ?? "")
  const [whatsapp, setWhatsapp] = useState(initialProfile?.whatsapp ?? "")
  const [category, setCategory] = useState(initialProfile?.categories[0] ?? artisanCategories[0]?.id ?? "other")
  const [bio, setBio] = useState(language === "en" ? initialProfile?.bio.en ?? "" : initialProfile?.bio.ar ?? "")
  const [status, setStatus] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!supabase) return <ConfigNotice />
  const client = supabase

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!user) return

    setSubmitting(true)
    setStatus(null)

    const payload = {
      user_id: user.id,
      display_name: displayName,
      workshop_name: null,
      bio_en: language === "en" ? bio : initialProfile?.bio.en ?? bio,
      bio_ar: language === "ar" ? bio : initialProfile?.bio.ar ?? bio,
      location: location || null,
      categories: [category],
      phone: phone || null,
      email: user.email,
      whatsapp: whatsapp || null,
      is_public: true,
    }

    const query = initialProfile
      ? client.from("artisan_profiles").update(payload).eq("id", initialProfile.id)
      : client.from("artisan_profiles").insert(payload)

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
        <CardTitle className="text-2xl font-serif text-primary">{language === "en" ? "Artisan page" : "صفحة الحرفي"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <Field label={language === "en" ? "Name or workshop" : "الاسم أو الورشة"} value={displayName} onChange={setDisplayName} />
          <div className="grid gap-2">
            <Label>{language === "en" ? "Craft" : "الحرفة"}</Label>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
              {artisanCategories.map((item) => <option key={item.id} value={item.id}>{item.label[language]}</option>)}
            </select>
          </div>
          <Field label={language === "en" ? "Location" : "الموقع"} value={location} onChange={setLocation} />
          <Field label={language === "en" ? "Phone" : "الهاتف"} value={phone} onChange={setPhone} />
          <Field label={language === "en" ? "WhatsApp" : "واتساب"} value={whatsapp} onChange={setWhatsapp} />
          <div className="grid gap-2">
            <Label>{language === "en" ? "Short description" : "وصف قصير"}</Label>
            <Textarea value={bio} onChange={(event) => setBio(event.target.value)} />
          </div>
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
