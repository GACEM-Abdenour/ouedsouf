import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import { AuthProvider } from "@/context/auth-context"

export const metadata: Metadata = {
  title: "Wad Souf Heritage | Ù…Ù†ØµØ© ÙˆØ§Ø¯ÙŠ Ø³ÙˆÙ Ø§Ù„ØªØ±Ø§Ø«ÙŠØ©",
  description:
    "Explore the historical and cultural treasures of Wadi Souf, Algeria. A premium documentation of Islamic architecture and desert heritage.",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased selection:bg-secondary selection:text-white">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
