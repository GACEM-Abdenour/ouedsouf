"use client"

import type React from "react"
import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { CERTIFIED_HERITAGE_CURRENCY, CERTIFIED_HERITAGE_PRICE } from "@/lib/certified-payment-config"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getPendingCertifiedPaymentForUser } from "@/lib/supabase/queries"
import type { CertifiedPayment } from "@/types/certified-payment"

function cleanFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
}

export function ReceiptUploadForm({
  latestPayment,
  onSubmitted,
}: {
  latestPayment?: CertifiedPayment | null
  onSubmitted?: () => void
}) {
  const { user } = useAuth()
  const { language } = useLanguage()
  const supabase = getSupabaseBrowserClient()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hasPendingPayment = latestPayment?.status === "pending"

  async function submitReceipt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || !user || !file || hasPendingPayment) return

    setIsSubmitting(true)
    setMessage(null)
    setError(null)

    try {
      const existing = await getPendingCertifiedPaymentForUser(supabase, user.id)
      if (existing) {
        setMessage(language === "en" ? "You already have a pending payment request." : "لديك طلب دفع قيد المراجعة بالفعل.")
        onSubmitted?.()
        return
      }

      const paymentId = crypto.randomUUID()
      const path = `${user.id}/${paymentId}-${Date.now()}-${cleanFileName(file.name)}`
      const upload = await supabase.storage.from("payment-receipts").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (upload.error) throw upload.error

      const { error: insertError } = await supabase.from("certified_payments").insert({
        id: paymentId,
        user_id: user.id,
        amount: CERTIFIED_HERITAGE_PRICE,
        currency: CERTIFIED_HERITAGE_CURRENCY,
        payment_method: paymentMethod.trim() || null,
        receipt_path: path,
        status: "pending",
      })

      if (insertError) throw insertError

      setPaymentMethod("")
      setFile(null)
      setMessage(language === "en" ? "Receipt uploaded. Admin will review it soon." : "تم رفع الوصل. سيقوم المسؤول بمراجعته قريبا.")
      onSubmitted?.()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : language === "en" ? "Unable to upload receipt." : "تعذر رفع الوصل.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (hasPendingPayment) {
    return (
      <p className="rounded-lg border border-primary/10 bg-background p-4 text-sm text-muted-foreground">
        {language === "en"
          ? "Your receipt is already pending review. Please wait for the admin decision."
          : "وصلك قيد المراجعة حاليا. يرجى انتظار قرار المسؤول."}
      </p>
    )
  }

  return (
    <form className="space-y-4 rounded-lg border border-primary/10 bg-background p-4" onSubmit={submitReceipt}>
      <div className="grid gap-2">
        <Label htmlFor="payment-method">{language === "en" ? "Payment method or reference" : "طريقة الدفع أو رقم العملية"}</Label>
        <Input
          id="payment-method"
          value={paymentMethod}
          onChange={(event) => setPaymentMethod(event.target.value)}
          placeholder={language === "en" ? "Example: BaridiMob transfer" : "مثال: تحويل بريدي موب"}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="receipt-file">{language === "en" ? "Receipt image" : "صورة وصل الدفع"}</Label>
        <Input id="receipt-file" type="file" accept="image/*,application/pdf" required onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      </div>
      {message && <p className="text-sm text-secondary">{message}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={!file || isSubmitting || !supabase} className="bg-secondary hover:bg-accent">
        <Upload className="h-4 w-4" />
        {isSubmitting ? (language === "en" ? "Uploading..." : "جار الرفع...") : language === "en" ? "Upload receipt" : "رفع الوصل"}
      </Button>
    </form>
  )
}
