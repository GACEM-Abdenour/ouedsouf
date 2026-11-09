"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import type { CertifiedPayment } from "@/types/certified-payment"

const statusText = {
  pending: { en: "Pending review", ar: "قيد المراجعة" },
  approved: { en: "Approved", ar: "مقبول" },
  rejected: { en: "Rejected", ar: "مرفوض" },
}

export function PaymentStatusCard({ payment }: { payment: CertifiedPayment }) {
  const { language } = useLanguage()
  const createdAt = new Date(payment.createdAt).toLocaleDateString(language === "en" ? "en-US" : "ar-DZ")

  return (
    <Card className="rounded-lg border-primary/10 bg-muted/20">
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-semibold text-primary">{language === "en" ? "Latest payment request" : "آخر طلب دفع"}</p>
            <p className="text-sm text-muted-foreground">{createdAt}</p>
          </div>
          <Badge variant={payment.status === "approved" ? "secondary" : payment.status === "rejected" ? "destructive" : "outline"}>
            {statusText[payment.status][language]}
          </Badge>
        </div>
        {payment.adminNote && (
          <p className="rounded-md bg-background p-3 text-sm text-muted-foreground">
            {language === "en" ? "Admin note: " : "ملاحظة المسؤول: "}
            {payment.adminNote}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
