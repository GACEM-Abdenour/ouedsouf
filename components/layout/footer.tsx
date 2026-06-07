"use client"

import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary">Wad Souf Heritage</h3>
            <p className="text-muted-foreground max-w-xs mx-auto md:mx-0 leading-relaxed">{t("footer.about")}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t("nav.heritage")}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/architecture" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.architecture")}
              </Link>
              <Link href="/traditions" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.traditions")}
              </Link>
              <Link href="/clothing" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.clothing")}
              </Link>
              <Link href="/history" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.history")}
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t("nav.sources")}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/sources" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.sources")}
              </Link>
              <Link href="/certified-heritage" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.certified")}
              </Link>
              <Link href="/about-project" className="text-muted-foreground hover:text-primary transition-colors">
                {t("nav.project")}
              </Link>
              <div className="pt-4 text-sm text-muted-foreground italic">{t("footer.copyright")}</div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
