"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const router = useRouter()
  const { register, authError, isConfigured } = useAuth()
  const { language } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"client" | "artisan">("artisan")
  const [submitting, setSubmitting] = useState(false)

  const copy = {
    title: language === "en" ? "Create account" : "إنشاء حساب",
    name: language === "en" ? "Name" : "الاسم",
    email: language === "en" ? "Email" : "البريد الإلكتروني",
    password: language === "en" ? "Password" : "كلمة المرور",
    client: language === "en" ? "Client account" : "حساب زائر",
    artisan: language === "en" ? "Artisan account" : "حساب حرفي",
    submit: language === "en" ? "Register" : "تسجيل",
    note: language === "en" ? "Admin accounts are not created publicly." : "لا يتم إنشاء حسابات الإدارة من التسجيل العام.",
    pending:
      language === "en"
        ? "Supabase keys are still missing. Add them to .env.local before registration can work."
        : "مفاتيح Supabase غير مضافة بعد. أضفها إلى .env.local قبل تفعيل التسجيل.",
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const result = await register(name, email, password, role)
    setSubmitting(false)
    if (!result.error) {
      router.push(result.redirectTo ?? "/login")
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
            <Label htmlFor="name">{copy.name}</Label>
            <Input id="name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">{copy.email}</Label>
            <Input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">{copy.password}</Label>
            <Input id="register-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" variant={role === "client" ? "default" : "outline"} onClick={() => setRole("client")}>
              {copy.client}
            </Button>
            <Button type="button" variant={role === "artisan" ? "default" : "outline"} onClick={() => setRole("artisan")}>
              {copy.artisan}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{isConfigured ? copy.note : copy.pending}</p>
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <Button type="submit" disabled={!isConfigured || submitting} className="w-full rounded-full bg-secondary hover:bg-accent">
            <UserPlus className="h-4 w-4" />
            {copy.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
