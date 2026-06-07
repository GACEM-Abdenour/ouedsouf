"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, ShieldCheck, Target } from "lucide-react"

export default function ProjectPage() {
  const { t, language } = useLanguage()

  const points = [
    {
      icon: GraduationCap,
      title: language === "en" ? "Academic Mission" : "مهمة أكاديمية",
      text:
        language === "en"
          ? "This platform is a university project dedicated to the systematic documentation of Algerian desert heritage."
          : "هذه المنصة هي مشروع جامعي مخصص للتوثيق المنهجي للتراث الصحراوي الجزائري.",
    },
    {
      icon: ShieldCheck,
      title: language === "en" ? "Preservation Goal" : "هدف الحفظ",
      text:
        language === "en"
          ? "Our primary goal is to provide a reliable digital resource for future research and cultural preservation."
          : "هدفنا الأساسي هو توفير مورد رقمي موثوق للبحث المستقبلي والحفاظ على الثقافة.",
    },
    {
      icon: Target,
      title: language === "en" ? "Future Vision" : "رؤية مستقبلية",
      text:
        language === "en"
          ? "We aim to expand this archive to include interactive VR models of traditional ghorfas and interactive maps."
          : "نهدف إلى توسيع هذا الأرشيف ليشمل نماذج تفاعلية بالواقع الافتراضي للغرف التقليدية وخرائط تفاعلية.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={t("nav.project")}
          subtitle={language === "en" ? "Documenting the Legacy for the Future" : "توثيق الإرث من أجل المستقبل"}
          breadcrumb={[{ label: t("nav.project") }]}
        />

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-20">
              <div className="grid md:grid-cols-3 gap-8">
                {points.map((point, i) => (
                  <Card key={i} className="border-none shadow-sm bg-primary/5 p-4 text-center">
                    <CardContent className="space-y-4 pt-6">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto">
                        <point.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif text-primary">{point.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-muted/20 rounded-[40px] p-12 space-y-8">
                <h2 className="text-4xl font-serif text-primary text-center">
                  {language === "en" ? "Project Methodology" : "منهجية المشروع"}
                </h2>
                <div className="prose prose-lg prose-stone mx-auto text-muted-foreground leading-relaxed italic text-pretty">
                  <p>
                    {language === "en"
                      ? "The Wad Souf Cultural Heritage Platform utilizes a multi-disciplinary approach, combining historical research with architectural analysis and community interviews. As a non-commercial educational project, it prioritizes accessibility and accuracy over complex interactive elements, serving as a clean, digital repository for the region's tangible and intangible history."
                      : "تستخدم منصة تراث وادي سوف الثقافي نهجاً متعدد التخصصات، يجمع بين البحث التاريخي والتحليل المعماري والمقابلات المجتمعية. كمشروع تعليمي غير تجاري، فإنه يعطي الأولوية لسهولة الوصول والدقة على العناصر التفاعلية المعقدة، ليكون بمثابة مستودع رقمي نظيف للتاريخ المادي وغير المادي للمنطقة."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
