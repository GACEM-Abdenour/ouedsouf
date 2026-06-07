"use client"

import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, MapPin, MessageCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { getCategoryLabel } from "@/lib/marketplace"
import type { ArtisanProfile } from "@/types/artisan"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function ArtisanCard({ artisan }: { artisan: ArtisanProfile }) {
  const { language } = useLanguage()

  return (
    <Card className="overflow-hidden rounded-lg border-primary/10 py-0">
      <div className="relative h-48 bg-muted">
        {artisan.profileImage && <Image src={artisan.profileImage} alt={artisan.displayName} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />}
      </div>
      <CardContent className="space-y-4 p-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-serif text-primary">{artisan.workshopName ?? artisan.displayName}</h3>
            {artisan.isVerified && <BadgeCheck className="h-5 w-5 text-secondary" />}
          </div>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {artisan.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {artisan.categories.map((category) => (
            <Badge key={category} variant="secondary">{getCategoryLabel(category, language)}</Badge>
          ))}
        </div>
        <p className="line-clamp-3 text-sm text-muted-foreground">{artisan.bio[language]}</p>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="rounded-full bg-secondary hover:bg-accent">
            <Link href={`/artisans/${artisan.id}`}>{language === "en" ? "View profile" : "عرض الملف"}</Link>
          </Button>
          {(artisan.whatsapp || artisan.phone) && (
            <Button asChild variant="outline" className="rounded-full">
              <a href={artisan.whatsapp ? `https://wa.me/${artisan.whatsapp.replace(/\D/g, "")}` : `tel:${artisan.phone}`}>
                <MessageCircle className="h-4 w-4" />
                {language === "en" ? "Contact" : "تواصل"}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
