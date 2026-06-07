"use client"

import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { getCategoryLabel } from "@/lib/marketplace"
import type { ArtisanService } from "@/types/service"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function ServiceCard({ service }: { service: ArtisanService }) {
  const { language } = useLanguage()
  return (
    <Card className="overflow-hidden rounded-lg border-primary/10 py-0">
      <div className="relative h-44 bg-muted">
        {service.images[0] && <Image src={service.images[0]} alt={service.title[language]} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />}
      </div>
      <CardContent className="space-y-3 p-5">
        <Badge variant="secondary">{getCategoryLabel(service.category, language)}</Badge>
        <h3 className="text-xl font-serif text-primary">{service.title[language]}</h3>
        <p className="text-sm text-muted-foreground">{service.description[language]}</p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{service.location}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {service.contactMethod.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{service.contactMethod.phone}</span>}
          {service.contactMethod.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{service.contactMethod.email}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
