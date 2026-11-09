"use client"

import { useEffect, useState } from "react"
import { Eye, RefreshCw, ShieldCheck, XCircle } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { ConfigNotice } from "@/components/common/config-notice"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/context/language-context"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getAdminCertifiedPayments } from "@/lib/supabase/queries"
import type { CertifiedPayment, CertifiedPaymentStatus } from "@/types/certified-payment"

const filters: Array<CertifiedPaymentStatus | "all"> = ["pending", "approved", "rejected", "all"]

const statusLabels = {
  all: { en: "All", ar: "الكل" },
  pending: { en: "Pending", ar: "قيد المراجعة" },
  approved: { en: "Approved", ar: "مقبول" },
  rejected: { en: "Rejected", ar: "مرفوض" },
}

export default function AdminPaymentsPage() {
  const { language } = useLanguage()
  const supabase = getSupabaseBrowserClient()
  const [payments, setPayments] = useState<CertifiedPayment[]>([])
  const [status, setStatus] = useState<CertifiedPaymentStatus | "all">("pending")
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function loadPayments(nextStatus = status) {
    if (!supabase) return
    setIsLoading(true)
    try {
      setPayments(await getAdminCertifiedPayments(supabase, nextStatus))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadPayments(status)
  }, [supabase, status])

  async function openReceipt(payment: CertifiedPayment) {
    const response = await fetch(`/api/admin/payment-receipts?path=${encodeURIComponent(payment.receiptPath)}`)
    const data = await response.json()
    if (!response.ok) {
      setMessage(data.error ?? (language === "en" ? "Unable to open receipt." : "تعذر فتح الوصل."))
      return
    }
    window.open(data.url, "_blank", "noopener,noreferrer")
  }

  async function reviewPayment(payment: CertifiedPayment, nextStatus: "approved" | "rejected") {
    setMessage(null)
    const response = await fetch(`/api/admin/payments/${payment.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: nextStatus,
        adminNote: notes[payment.id] ?? "",
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      setMessage(data.error ?? (language === "en" ? "Review failed." : "فشلت المراجعة."))
      return
    }
    setMessage(nextStatus === "approved" ? (language === "en" ? "Payment approved." : "تم قبول الدفع.") : language === "en" ? "Payment rejected." : "تم رفض الدفع.")
    await loadPayments()
  }

  const title = language === "en" ? "Payment Reviews" : "مراجعة المدفوعات"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title={title} breadcrumb={[{ label: title }]} />
        <ProtectedRoute roles={["admin"]}>
          <section className="py-16">
            <div className="container mx-auto space-y-6 px-4">
              {!supabase && <ConfigNotice />}
              <div className="flex flex-wrap items-center gap-2">
                {filters.map((filter) => (
                  <Button key={filter} type="button" variant={status === filter ? "default" : "outline"} onClick={() => setStatus(filter)}>
                    {statusLabels[filter][language]}
                  </Button>
                ))}
                <Button type="button" variant="outline" onClick={() => void loadPayments()}>
                  <RefreshCw className="h-4 w-4" />
                  {language === "en" ? "Refresh" : "تحديث"}
                </Button>
              </div>
              {message && <p className="rounded-lg border border-primary/10 p-3 text-sm text-muted-foreground">{message}</p>}
              <div className="space-y-4">
                {isLoading && <p className="text-sm text-muted-foreground">{language === "en" ? "Loading payments..." : "جار تحميل المدفوعات..."}</p>}
                {!isLoading && payments.length === 0 && (
                  <p className="rounded-lg border border-primary/10 p-4 text-sm text-muted-foreground">
                    {language === "en" ? "No payments found." : "لا توجد مدفوعات."}
                  </p>
                )}
                {payments.map((payment) => (
                  <Card key={payment.id} className="rounded-lg border-primary/10">
                    <CardContent className="space-y-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-semibold text-primary">{payment.userName ?? (language === "en" ? "User" : "مستخدم")}</p>
                          <p className="text-sm text-muted-foreground">{payment.userEmail}</p>
                          <p className="mt-2 text-sm">
                            {payment.amount} {payment.currency}
                            {payment.paymentMethod ? ` - ${payment.paymentMethod}` : ""}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.createdAt).toLocaleString(language === "en" ? "en-US" : "ar-DZ")}
                          </p>
                        </div>
                        <Badge variant={payment.status === "approved" ? "secondary" : payment.status === "rejected" ? "destructive" : "outline"}>
                          {statusLabels[payment.status][language]}
                        </Badge>
                      </div>
                      {payment.adminNote && <p className="rounded-md bg-muted/40 p-3 text-sm text-muted-foreground">{payment.adminNote}</p>}
                      {payment.status === "pending" && (
                        <Textarea
                          value={notes[payment.id] ?? ""}
                          onChange={(event) => setNotes((current) => ({ ...current, [payment.id]: event.target.value }))}
                          placeholder={language === "en" ? "Optional admin note" : "ملاحظة اختيارية"}
                        />
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="outline" onClick={() => void openReceipt(payment)}>
                          <Eye className="h-4 w-4" />
                          {language === "en" ? "Open receipt" : "فتح الوصل"}
                        </Button>
                        {payment.status === "pending" && (
                          <>
                            <Button type="button" className="bg-secondary hover:bg-accent" onClick={() => void reviewPayment(payment, "approved")}>
                              <ShieldCheck className="h-4 w-4" />
                              {language === "en" ? "Approve" : "قبول"}
                            </Button>
                            <Button type="button" variant="destructive" onClick={() => void reviewPayment(payment, "rejected")}>
                              <XCircle className="h-4 w-4" />
                              {language === "en" ? "Reject" : "رفض"}
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}
