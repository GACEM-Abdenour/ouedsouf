"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function LockedContentCard({ title, href }: { title: string; href: string }) {
  const { language } = useLanguage()
  return (
    <Card className="rounded-lg border-primary/10">
      <CardContent className="space-y-4">
        <Lock className="h-6 w-6 text-secondary" />
        <h3 className="text-xl font-serif text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground">{language === "en" ? "Certified content requires an active subscription." : "يتطلب المحتوى المعتمد اشتراكا نشطا."}</p>
        <Button asChild variant="outline" className="rounded-full"><Link href={href}>{language === "en" ? "Preview access" : "معاينة الوصول"}</Link></Button>
      </CardContent>
    </Card>
  )
}
