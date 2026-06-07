"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/common/page-hero";
import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ArchitecturePage() {
  const { t, language } = useLanguage();

  const categories = [
    {
      title: language === "en" ? "The Traditional Ghorfa" : "الغرفة التقليدية",
      desc:
        language === "en"
          ? "Modular rooms with vaulted roofs for thermal regulation."
          : "غرف نموذجية ذات سقوف مقوسة للتنظيم الحراري.",
      features:
        language === "en"
          ? ["Vaulted Domes", "Thick Walls", "Gypsum Construction"]
          : ["قباب مقوسة", "جدران سميكة", "بناء بالجبس"],
    },
    {
      title: language === "en" ? "Underground Dwellings" : "المساكن تحت الأرض",
      desc:
        language === "en"
          ? "Homes built below ground level to escape extreme heat."
          : "منازل بنيت تحت مستوى الأرض للهروب من الحرارة الشديدة.",
      features:
        language === "en"
          ? ["Thermal Mass", "Natural Cooling", "Excavated Patios"]
          : ["كتلة حرارية", "تبريد طبيعي", "أفنية محفورة"],
    },
    {
      title: language === "en" ? "Historic Mosques" : "المساجد التاريخية",
      desc:
        language === "en"
          ? "Religious centers with distinct Soufi architectural styles."
          : "مراكز دينية ذات أنماط معمارية سوفية مميزة.",
      features:
        language === "en"
          ? ["Decorative Arches", "Central Patios", "Distinct Minarets"]
          : ["أقواس مزخرفة", "أفنية مركزية", "مآذن مميزة"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={t("nav.architecture")}
          subtitle={
            language === "en"
              ? "The Ingenious City of Domes"
              : "عبقرية مدينة القباب"
          }
          breadcrumb={[{ label: t("nav.architecture") }]}
        />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-24">
              <div className="grid md:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                  <Card
                    key={i}
                    className="group hover:shadow-xl transition-all duration-500 overflow-hidden border-none bg-background shadow-sm"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={`/placeholder.svg?height=400&width=400&query=${cat.title}`}
                        alt={cat.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <h3 className="text-2xl font-serif text-primary">
                        {cat.title}
                      </h3>
                      <p className="text-muted-foreground">{cat.desc}</p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {cat.features.map((f, fi) => (
                          <span
                            key={fi}
                            className="text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-3 py-1 rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detail section */}
              <div className="bg-primary/5 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-serif text-primary">
                    {language === "en"
                      ? "Materiality & Technique"
                      : "المواد والتقنيات"}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    {language === "en"
                      ? "Architecture in Wad Souf is defined by the use of local materials such as gypsum (louss) and palm wood. The dome is not merely aesthetic; its shape facilitates hot air circulation, directing it upwards and away from the inhabitants."
                      : "تتميز العمارة في وادي سوف باستخدام المواد المحلية مثل الجبس (اللوص) وخشب النخيل. القبة ليست مجرد عنصر جمالي؛ فشكلها يسهل دوران الهواء الساخن، ويوجهه للأعلى بعيداً عن السكان."}
                  </p>
                </div>
                <div className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg"
                    alt="Building Technique"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
