"use client"

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { useLanguage } from "@/context/language-context"

export default function RegisterPage() {
  const { language } = useLanguage()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-primary/5 pt-32">
        <div className="container mx-auto grid gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-serif text-primary">{language === "en" ? "Join Wadi Souf Heritage" : "انضم إلى تراث وادي سوف"}</h1>
            <p className="text-lg text-muted-foreground">
              {language === "en" ? "Register as a client for basic profile features or as an artisan to publish your services." : "سجل كزائر لميزات الملف البسيطة أو كحرفي لنشر خدماتك."}
            </p>
            <Link className="font-semibold text-secondary" href="/login">{language === "en" ? "Already have an account?" : "لديك حساب بالفعل؟"}</Link>
          </div>
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
