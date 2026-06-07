"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import { User } from "lucide-react"

export default function FiguresPage() {
  const { t, language } = useLanguage()

  const figures = [
    {
      name: language === "en" ? "Mohamed Al-Eid Al Khalifa" : "محمد العيد آل خليفة",
      years: "1906 - 1979",
      role: language === "en" ? "Algerian Poet" : "شاعر جزائري مشهور",
      origin: language === "en" ? "From Wadi Souf" : "من وادي سوف",
      desc:
        language === "en"
          ? "A legendary Algerian poet from Wadi Souf. He is considered one of the most prominent poets of the Algerian Revolution. His poems reflect the spirit of resistance and liberation."
          : "شاعر جزائري عريق من وادي سوف. يعتبر من أبرز شعراء الثورة الجزائرية. كان ملهماً لأجيال من الشعراء والمثقفين. أحد أبرز الأصوات الثقافية في الحركة الوطنية الجزائرية.",
      achievements:
        language === "en"
          ? [
              "Famous poetic collection",
              "Poems decorate the Unknown Soldier monument",
              "Symbol of Algerian cultural identity",
            ]
          : ["ديوان شعري مشهور ومعروف", "قصائده تزين قبة الجندي المجهول", "رمز من رموز الهوية الثقافية"],
    },
    {
      name: language === "en" ? "Sheikh Al-Hashemi Sharif" : "الشيخ الهاشمي شريف",
      years: "1853 - ...",
      role: language === "en" ? "Religious & National Leader" : "قائد ديني ووطني",
      origin: language === "en" ? "From El-Bayadha" : "من وادي سوف (البياضة)",
      desc:
        language === "en"
          ? "Founded the Qadiriyya Zawiya in El-Bayadha in 1886. Led a major popular uprising on November 15, 1918, against French occupation."
          : "شيخ ديني وقائد وطني من وادي سوف. أسس الزاوية القادرية بالبياضة سنة 1886م. قاد انتفاضة شعبية كبيرة ضد الاحتلال الفرنسي يوم 15 نوفمبر 1918.",
      achievements:
        language === "en"
          ? ["Founded Qadiriyya Zawiya", "Led the 1918 Uprising", "Preserved Islamic identity"]
          : ["تأسيس الزاوية القادرية", "قيادة انتفاضة 1918", "الحفاظ على الهوية الإسلامية"],
    },
    {
      name: language === "en" ? "Hamza Boukoucha" : "حمزة بوكوشة",
      role: language === "en" ? "Classical & Folk Poet" : "شاعر فصيح وشعبي",
      origin: language === "en" ? "From Wadi Souf" : "من وادي سوف",
      desc:
        language === "en"
          ? "A prominent literary figure in Wadi Souf, known for his mastery of both classical and folk poetry. An inspiring and influential voice in Souf cultural life."
          : "شاعر معروف من وادي سوف. يتميز بقدرته على الشعر الفصيح والشعبي. من القامات الأدبية البارزة في المنطقة وشاعر ملهم ومؤثر في الحياة الثقافية السوفية.",
    },
    {
      name: language === "en" ? "Mahmoud Al-Sayegh" : "محمود الصائغ",
      role: language === "en" ? "Traditional Jewelry Master" : "حرفي صياغة تقليدية",
      origin: language === "en" ? "From Wadi Souf" : "من وادي سوف",
      desc:
        language === "en"
          ? "A skilled craftsman specialized in traditional jewelry and silver-smithing. He represents the continuity of traditional crafts and preserves ancient techniques."
          : "حرفي ماهر متخصص في صناعة المجوهرات والحلي التقليدية. يمثل استمرارية الحرف التقليدي في المنطقة ومحافظ على التقاليد والأساليب القديمة.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={language === "en" ? "Cultural Figures" : "أعلام المنطقة"}
          subtitle={language === "en" ? "The People Who Shaped Wad Souf" : "الشخصيات التي شكلت وادي سوف"}
          breadcrumb={[{ label: language === "en" ? "Figures" : "الأعلام" }]}
        />
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {figures.map((figure, i) => (
                <div
                  key={i}
                  className="group flex flex-col p-8 rounded-3xl border border-primary/10 bg-muted/20 hover:bg-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <User className="w-24 h-24 text-primary" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest px-2 py-1 bg-secondary/10 rounded-full">
                        {figure.role}
                      </span>
                      {figure.years && (
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1 bg-muted rounded-full">
                          {figure.years}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-heritage mb-2 group-hover:text-primary transition-colors">
                      {figure.name}
                    </h3>
                    {figure.origin && (
                      <p className="text-xs font-semibold text-accent mb-4 uppercase tracking-wider">{figure.origin}</p>
                    )}
                    <p className="text-muted-foreground leading-relaxed text-sm mb-4">{figure.desc}</p>

                    {figure.achievements && (
                      <ul className="space-y-1">
                        {figure.achievements.map((ach, idx) => (
                          <li key={idx} className="text-[11px] text-muted-foreground flex items-start gap-2 italic">
                            <span className="text-secondary">•</span> {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
