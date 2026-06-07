"use client"

import Link from "next/link"
import { CheckCircle2, Lock } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SubscriptionStatusCard() {
  const { user, isConfigured } = useAuth()
  const { language } = useLanguage()
  const active = user?.subscriptionStatus === "active"

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
                : language === "en" ? "Subscribe to unlock" : "اشترك للفتح"}
          </h2>
        </div>
        <p className="text-muted-foreground">
          {!user
            ? language === "en" ? "Create an account or log in to prepare access to certified materials." : "أنشئ حسابا أو سجل الدخول لتجهيز الوصول إلى المواد المعتمدة."
            : active
              ? language === "en" ? "Your account can access the certified library, collections, and documents." : "يمكن لحسابك الوصول إلى المكتبة والمجموعات والوثائق المعتمدة."
              : language === "en" ? "Subscriptions are managed by admin for now. Payment processing has not been added yet." : "تتم إدارة الاشتراكات حاليا من خلال الإدارة. لم تتم إضافة الدفع بعد."}
        </p>
        <div className="flex flex-wrap gap-2">
          {!user && <Button asChild><Link href="/login">{language === "en" ? "Login" : "دخول"}</Link></Button>}
          {user && !active && !isConfigured && <p className="text-sm text-muted-foreground">{language === "en" ? "Configure Supabase keys to connect real subscription data." : "أضف مفاتيح Supabase لربط بيانات الاشتراك الحقيقية."}</p>}
          {active && <Button asChild className="bg-secondary hover:bg-accent"><Link href="/certified-heritage/library">{language === "en" ? "Open library" : "فتح المكتبة"}</Link></Button>}
        </div>
      </CardContent>
    </Card>
  )
}
