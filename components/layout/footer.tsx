"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          <div className="space-y-4">
            <div className="relative mx-auto h-16 w-[200px] md:mx-0">
              <Image src="/logo.png" alt="Wadi Souf Heritage logo" fill sizes="200px" className="object-contain object-left" />
            </div>
            <p className="mx-auto max-w-xs leading-relaxed text-muted-foreground md:mx-0">{t("footer.about")}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("nav.heritage")}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/architecture" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.architecture")}
              </Link>
              <Link href="/traditions" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.traditions")}
              </Link>
              <Link href="/clothing" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.clothing")}
              </Link>
              <Link href="/history" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.history")}
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t("nav.sources")}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/sources" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.sources")}
              </Link>
              <Link href="/certified-heritage" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.certified")}
              </Link>
              <Link href="/about-project" className="text-muted-foreground transition-colors hover:text-primary">
                {t("nav.project")}
              </Link>
              <div className="pt-4 text-sm italic text-muted-foreground">{t("footer.copyright")}</div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
