"use client"

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/components/auth/LoginForm"
import { useLanguage } from "@/context/language-context"

export default function LoginPage() {
  const { language } = useLanguage()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-primary/5 pt-32">
        <div className="container mx-auto grid gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-serif text-primary">{language === "en" ? "Welcome back" : "مرحبا بعودتك"}</h1>
            <p className="text-lg text-muted-foreground">
              {language === "en" ? "Access your dashboard, artisan tools, admin moderation, or certified heritage subscription." : "ادخل إلى لوحة التحكم أو أدوات الحرفي أو الإدارة أو اشتراك التراث المعتمد."}
            </p>
            <Link className="font-semibold text-secondary" href="/register">{language === "en" ? "Create a client or artisan account" : "أنشئ حساب زائر أو حرفي"}</Link>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
