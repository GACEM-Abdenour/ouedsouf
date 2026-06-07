"use client"

import Link from "next/link"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPage() {
  const { language } = useLanguage()
  const title = language === "en" ? "Admin" : "الإدارة"
  const links = [
    ["/admin/users", language === "en" ? "Manage Users" : "إدارة المستخدمين"],
    ["/admin/artisans", language === "en" ? "Manage Artisans" : "إدارة الحرفيين"],
    ["/admin/services", language === "en" ? "Manage Services" : "إدارة الإعلانات"],
    ["/admin/certified-heritage", language === "en" ? "Certified Heritage" : "التراث المعتمد"],
    ["/admin/subscriptions", language === "en" ? "Subscriptions" : "الاشتراكات"],
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageHero title={title} breadcrumb={[{ label: title }]} />
        <ProtectedRoute roles={["admin"]}>
          <section className="py-16">
            <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
              {links.map(([href, label]) => (
                <Link key={href} href={href}>
                  <Card className="rounded-lg border-primary/10">
                    <CardContent>
                      <h2 className="font-semibold text-primary">{label}</h2>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </ProtectedRoute>
      </main>
      <Footer />
    </div>
  )
}
