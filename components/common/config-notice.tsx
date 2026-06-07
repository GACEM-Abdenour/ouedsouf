"use client"

import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export function ConfigNotice() {
  const { language } = useLanguage()

  return (
    <Card className="rounded-lg border-primary/10 bg-muted/30">
      <CardContent className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 text-secondary" />
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-medium text-primary">
            {language === "en" ? "Authentication setup needed" : "يلزم إعداد تسجيل الدخول"}
          </p>
          <p>
            {language === "en"
              ? "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server."
              : "أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY إلى .env.local ثم أعد تشغيل الخادم المحلي."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
