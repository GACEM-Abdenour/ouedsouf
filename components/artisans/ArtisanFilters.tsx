"use client"

import { Search } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { artisanCategories } from "@/lib/supabase/queries"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ArtisanFilters({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: {
  query: string
  category: string
  onQueryChange: (value: string) => void
  onCategoryChange: (value: string) => void
}) {
  const { language } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={language === "en" ? "Search by name, craft, location, or keyword" : "ابحث بالاسم أو الحرفة أو الموقع أو كلمة مفتاحية"} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={category === "all" ? "default" : "outline"} onClick={() => onCategoryChange("all")}>
          {language === "en" ? "All" : "الكل"}
        </Button>
        {artisanCategories.map((item) => (
          <Button key={item.id} size="sm" variant={category === item.id ? "default" : "outline"} onClick={() => onCategoryChange(item.id)}>
            {item.label[language]}
          </Button>
        ))}
      </div>
    </div>
  )
}
