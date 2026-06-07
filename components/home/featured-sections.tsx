"use client";

import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function FeaturedSections() {
  const { language } = useLanguage();

  const sections = [
    {
      id: "agriculture",
      title:
        language === "ar"
          ? "الثورة الخضراء في الصحراء"
          : "The Green Revolution in the Desert",
      description:
        language === "ar"
          ? "تعتبر وادي سوف نموذجاً فريداً في الزراعة الصحراوية، حيث تحولت الكثبان الرملية إلى واحات خضراء منتجة لأجود أنواع التمور والبطاطس، مما جعلها سلة غذاء الجزائر."
          : "Wadi Souf is a unique model for desert agriculture, where sand dunes have been transformed into green oases producing the finest dates and potatoes, making it Algeria's food basket.",
      image: "/greenrevoulition.png",
      link: "/agriculture",
      tag: language === "ar" ? "الزراعة المستدامة" : "Sustainable Agriculture",
      reverse: false,
    },
    {
      id: "history",
      title:
        language === "ar"
          ? "تاريخ عريق يمتد لآلاف السنين"
          : "Ancient History Spanning Millennia",
      description:
        language === "ar"
          ? "منذ العصور الحجرية وحتى الفتوحات الإسلامية، شهدت منطقة سوف تعاقب العديد من الحضارات التي تركت بصماتها في العادات والتقاليد والعمارة الفريدة للمنطقة."
          : "Since the Stone Age through the Islamic conquests, the Souf region has witnessed the succession of many civilizations that left their marks on the unique customs, traditions, and architecture of the region.",
      image: "/olddate.png",
      link: "/history",
      tag: language === "ar" ? "إرث حضاري" : "Civilizational Legacy",
      reverse: true,
    },
    {
      id: "industry",
      title:
        language === "ar"
          ? "الصناعة والحرف التقليدية"
          : "Industry and Traditional Crafts",
      description:
        language === "ar"
          ? "تتميز المنطقة بحرف يدوية عريقة مثل صناعة الزرابي والجلود، والتي تعكس الهوية السوفية وتعتبر مصدراً اقتصادياً حيوياً يجمع بين الإبداع والأصالة."
          : "The region is characterized by ancient handicrafts such as carpet and leather making, which reflect the Soufi identity and are a vital economic source that combines creativity and authenticity.",
      image: "/traditionalhiraf.png",
      link: "/crafts",
      tag: language === "ar" ? "إبداع محلي" : "Local Creativity",
      reverse: false,
    },
  ];

  return (
    <div className="space-y-0">
      {sections.map((section, idx) => (
        <section
          key={section.id}
          className={`py-24 ${idx % 2 === 0 ? "bg-background" : "bg-muted/50"} overflow-hidden`}
        >
          <div className="container mx-auto px-4">
            <div
              className={`flex flex-col ${section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`}
            >
              {/* Image side with premium frames */}
              <div className="flex-1 relative group w-full">
                <div className="absolute -inset-4 bg-secondary/10 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-700" />
                <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src={section.image || "/placeholder.svg"}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 space-y-8">
                <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-lg text-xs font-bold uppercase tracking-[0.2em] border border-secondary/20">
                  {section.tag}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight text-balance">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                  {section.description}
                </p>
                <div className="pt-4">
                  <Button
                    asChild
                    variant="link"
                    className="p-0 text-secondary font-bold text-lg group items-center gap-2 hover:no-underline"
                  >
                    <Link href={section.link}>
                      {language === "ar" ? "اكتشف التفاصيل" : "Explore Details"}
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                        {language === "en" ? (
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        ) : (
                          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        )}
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
