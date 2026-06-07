"use client"

import { FileText } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import type { CertifiedHeritageItem } from "@/types/certified-heritage"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function CertifiedContentCard({ item }: { item: CertifiedHeritageItem }) {
  const { language } = useLanguage()
  return (
    <Card className="rounded-lg border-primary/10">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <FileText className="h-6 w-6 text-secondary" />
          <Badge variant="secondary">{item.type}</Badge>
        </div>
        <h3 className="text-2xl font-serif text-primary">{item.title[language]}</h3>
        <p className="text-sm text-muted-foreground">{item.summary[language]}</p>
        <p className="text-xs text-muted-foreground">{item.author} · {item.readTime}</p>
      </CardContent>
    </Card>
  )
}
