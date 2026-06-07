"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import type { UserRole } from "@/types/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: UserRole[]
  requireSubscription?: boolean
  fallbackHref?: string
}

export function ProtectedRoute({ children, roles, requireSubscription, fallbackHref = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const { language } = useLanguage()

  const label = {
    loginTitle: language === "en" ? "Login required" : "تسجيل الدخول مطلوب",
    loginText: language === "en" ? "Create an account or log in to continue." : "أنشئ حسابا أو سجل الدخول للمتابعة.",
    roleTitle: language === "en" ? "Protected area" : "منطقة محمية",
    roleText: language === "en" ? "Your account does not have access to this section." : "حسابك لا يملك صلاحية الوصول إلى هذا القسم.",
    subTitle: language === "en" ? "Locked certified content" : "محتوى معتمد مقفل",
    subText: language === "en" ? "An active Certified Heritage subscription is required." : "تحتاج إلى اشتراك نشط في التراث المعتمد.",
    action: language === "en" ? "Continue" : "متابعة",
  }

  if (isLoading) return null

  if (!user) {
    return <LockedNotice title={label.loginTitle} text={label.loginText} href={fallbackHref} action={label.action} />
  }

  if (roles && !roles.includes(user.role)) {
    return <LockedNotice title={label.roleTitle} text={label.roleText} href="/dashboard" action={label.action} />
  }

  if (requireSubscription && user.subscriptionStatus !== "active") {
    return <LockedNotice title={label.subTitle} text={label.subText} href="/certified-heritage" action={label.action} />
  }

  return <>{children}</>
}

function LockedNotice({ title, text, href, action }: { title: string; text: string; href: string; action: string }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-xl rounded-lg border-primary/10 bg-muted/30">
          <CardContent className="space-y-5 text-center">
            <h2 className="text-3xl font-serif text-primary">{title}</h2>
            <p className="text-muted-foreground">{text}</p>
            <Button asChild className="rounded-full bg-secondary hover:bg-accent">
              <Link href={href}>{action}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
