"use client"

import { AlertTriangle } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export function MarketplaceDisclaimer() {
  const { language } = useLanguage()
  return (
    <div className="rounded-lg border border-secondary/30 bg-secondary/10 p-4 text-sm text-muted-foreground">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
        <p>
          {language === "en"
            ? "The platform does not process payments, take commissions, guarantee transactions, manage orders, or handle disputes. It only helps visitors discover artisans and contact them directly."
            : "لا تعالج المنصة المدفوعات ولا تأخذ عمولات ولا تضمن المعاملات ولا تدير الطلبات أو النزاعات. دورها هو مساعدة الزوار على اكتشاف الحرفيين والتواصل معهم مباشرة."}
        </p>
      </div>
    </div>
  )
}
