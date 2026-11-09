"use client"

import { ReceiptText } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import {
  CERTIFIED_HERITAGE_CURRENCY,
  CERTIFIED_HERITAGE_PRICE,
  CERTIFIED_PAYMENT_ACCOUNT,
  CERTIFIED_PAYMENT_INSTRUCTIONS,
  CERTIFIED_PAYMENT_METHOD_LABEL,
} from "@/lib/certified-payment-config"
import { Card, CardContent } from "@/components/ui/card"

export function PaymentInstructions() {
  const { language } = useLanguage()

  return (
    <Card className="rounded-lg border-primary/10 bg-background">
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <ReceiptText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-primary">{language === "en" ? "Manual payment" : "دفع يدوي"}</h3>
        </div>
        <div className="grid gap-3 text-sm md:grid-cols-3">
          <div>
            <p className="text-muted-foreground">{language === "en" ? "Price" : "السعر"}</p>
            <p className="font-semibold text-primary">
              {CERTIFIED_HERITAGE_PRICE} {CERTIFIED_HERITAGE_CURRENCY}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">{language === "en" ? "Method" : "طريقة الدفع"}</p>
            <p className="font-semibold text-primary">{CERTIFIED_PAYMENT_METHOD_LABEL[language]}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{language === "en" ? "Duration" : "المدة"}</p>
            <p className="font-semibold text-primary">{language === "en" ? "1 year" : "سنة واحدة"}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{CERTIFIED_PAYMENT_ACCOUNT[language]}</p>
        <p className="text-sm text-muted-foreground">{CERTIFIED_PAYMENT_INSTRUCTIONS[language]}</p>
      </CardContent>
    </Card>
  )
}
