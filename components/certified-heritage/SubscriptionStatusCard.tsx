"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PaymentInstructions } from "@/components/certified-heritage/PaymentInstructions"
import { PaymentStatusCard } from "@/components/certified-heritage/PaymentStatusCard"
import { ReceiptUploadForm } from "@/components/certified-heritage/ReceiptUploadForm"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { hasActiveSubscription } from "@/lib/subscription"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { getLatestCertifiedPaymentForUser } from "@/lib/supabase/queries"
import type { CertifiedPayment } from "@/types/certified-payment"

export function SubscriptionStatusCard() {
  const { user, isConfigured, refreshProfile } = useAuth()
  const { language } = useLanguage()
  const supabase = getSupabaseBrowserClient()
  const active = hasActiveSubscription(user)
  const [latestPayment, setLatestPayment] = useState<CertifiedPayment | null>(null)

  async function loadLatestPayment() {
    if (!supabase || !user) {
      setLatestPayment(null)
      return
    }

    setLatestPayment(await getLatestCertifiedPaymentForUser(supabase, user.id))
  }

  useEffect(() => {
    void loadLatestPayment()
  }, [supabase, user?.id])

  const expiresAt = user?.subscriptionExpiresAt
    ? new Date(user.subscriptionExpiresAt).toLocaleDateString(language === "en" ? "en-US" : "ar-DZ")
    : null

  return (
    <Card className="rounded-lg border-primary/10 bg-muted/30">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {active ? <CheckCircle2 className="h-6 w-6 text-secondary" /> : <Lock className="h-6 w-6 text-primary" />}
          <h2 className="text-2xl font-serif text-primary">
            {!user
              ? language === "en" ? "Log in to subscribe" : "سجل الدخول للاشتراك"
              : active
                ? language === "en" ? "Active subscription" : "اشتراك نشط"
                : language === "en" ? "Subscribe to unlock" : "اشترك لفتح المحتوى"}
          </h2>
        </div>
        <p className="text-muted-foreground">
          {!user
            ? language === "en" ? "Create an account or log in to prepare access to certified materials." : "أنشئ حسابا أو سجل الدخول للوصول إلى المواد المعتمدة."
            : active
              ? expiresAt
                ? language === "en" ? `Access is active until ${expiresAt}.` : `الوصول مفعل إلى غاية ${expiresAt}.`
                : language === "en" ? "Your account can access the certified library, collections, and documents." : "يمكن لحسابك الوصول إلى المكتبة والمجموعات والوثائق المعتمدة."
              : language === "en" ? "Pay manually, upload the receipt, and wait for admin approval." : "ادفع يدويا، ارفع الوصل، وانتظر موافقة المسؤول."}
        </p>

        {user && !active && (
          <div className="space-y-4">
            <PaymentInstructions />
            {latestPayment && <PaymentStatusCard payment={latestPayment} />}
            <ReceiptUploadForm
              latestPayment={latestPayment}
              onSubmitted={() => {
                void loadLatestPayment()
                void refreshProfile()
              }}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {!user && (
            <Button asChild>
              <Link href="/login">{language === "en" ? "Login" : "دخول"}</Link>
            </Button>
          )}
          {user && !active && !isConfigured && (
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Connect the environment variables to load real subscription data." : "أضف متغيرات البيئة لعرض بيانات الاشتراك الحقيقية."}
            </p>
          )}
          {active && (
            <Button asChild className="bg-secondary hover:bg-accent">
              <Link href="/certified-heritage/library">{language === "en" ? "Open library" : "فتح المكتبة"}</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
