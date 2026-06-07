"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const { login, authError, isConfigured } = useAuth()
  const { language } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const copy = {
    title: language === "en" ? "Login" : "تسجيل الدخول",
    email: language === "en" ? "Email" : "البريد الإلكتروني",
    password: language === "en" ? "Password" : "كلمة المرور",
    submit: language === "en" ? "Enter dashboard" : "الدخول للوحة التحكم",
    note:
      language === "en"
        ? "Use your Supabase email and password. Public registration supports client and artisan roles."
        : "استخدم البريد وكلمة المرور من Supabase. التسجيل العام يدعم دور الزائر والحرفي.",
    pending:
      language === "en"
        ? "Supabase keys are still missing. Add them to .env.local to enable real login."
        : "مفاتيح Supabase غير مضافة بعد. أضفها إلى .env.local لتفعيل تسجيل الدخول الحقيقي.",
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const result = await login(email, password)
    setSubmitting(false)
    if (!result.error) {
      router.push(result.redirectTo ?? "/dashboard")
    }
  }

  return (
    <Card className="rounded-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-3xl font-serif text-primary">{copy.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">{copy.email}</Label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{copy.password}</Label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <p className="text-sm text-muted-foreground">{isConfigured ? copy.note : copy.pending}</p>
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <Button type="submit" disabled={!isConfigured || submitting} className="w-full rounded-full bg-secondary hover:bg-accent">
            <LogIn className="h-4 w-4" />
            {copy.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
