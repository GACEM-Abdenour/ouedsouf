"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DashboardNav } from "@/components/dashboard/DashboardNav"

export function DashboardShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-28">
        <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[260px_1fr]">
          <DashboardNav />
          <section className="space-y-6">
            <h1 className="text-4xl font-serif text-primary">{title}</h1>
            {children}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
