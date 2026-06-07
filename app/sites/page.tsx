"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/common/page-hero";
import { useLanguage } from "@/context/language-context";
import Image from "next/image";

export default function SitesPage() {
  const { t, language } = useLanguage();

  const sites = [
    {
      title:
        language === "en"
          ? "Tijaniyya Zawiya of Guemar"
          : "الزاوية التيجانية بقمار",
      location: language === "en" ? "Guemar District" : "مدينة قمار",
      desc:
        language === "en"
          ? "Founded in 1789, it is the first Tijaniyya zawiya in the world and a major spiritual landmark featuring distinct domes and inscriptions."
          : "تعتبر من أقدم المعالم الدينية (تأسست 1789 م)، وهي أول زاوية تيجانية في العالم ومنارة علمية وروحية هامة تتميز بعمارتها الإسلامية الأصيلة.",
      image: "/zaouiatidjania.png",
    },
    {
      title:
        language === "en"
          ? "Diwan of the Kaid in Guemar"
          : "ديوان القائد بقمار",
      location: language === "en" ? "Guemar Center" : "وسط مدينة قمار العتيقة",
      desc:
        language === "en"
          ? "An ancient administrative landmark reflecting the traditional Soufi architecture with its characteristic arches, domes, and local gypsum construction."
          : "أكبر دليل على الموروث الأثري السوفي، كان مقراً حكومياً إدارياً قديماً يتميز بالأقواس والقباب والنقوش الإسلامية على الجبس المحلي.",
      image: "/diwanqaid.png",
    },
    {
      title:
        language === "en"
          ? "Rahmaniyya Zawiya (Sidi Salem)"
          : "الزاوية الرحمانية (زاوية سيدي سالم)",
      location: language === "en" ? "El Oued Center" : "وسط مدينة الوادي",
      desc:
        language === "en"
          ? "A spiritual and educational center in the heart of El Oued, preserving the Arabic language and Islamic values since the 12th century AH."
          : "منارة روحية وعلمية في قلب الوادي، قامت بدور كبير في ترسيخ القيم الإسلامية والحفاظ على اللغة العربية وتحفيظ القرآن الكريم.",
      image: "/zaouiarahmania.png",
    },
    {
      title: language === "en" ? "Zokak El-Bureau Cafe" : "مقهى زقاق البيرو",
      location:
        language === "en" ? "El Oued Market" : "وسط السوق الرئيسي بالوادي",
      desc:
        language === "en"
          ? "The oldest cafe in El Oued (1931), it served as a major political and intellectual hub during the liberation revolution."
          : "أقدم مقهى في مدينة الوادي (1931 م)، كان مركزاً للمجاهدين ومقراً لحزب الشعب وملتقى للنخبة المثقفة والمفكرين.",
      image: "/placeholder.svg",
    },
    {
      title:
        language === "en"
          ? "Tower of Smoke (Watchtower)"
          : "برج الدخان (برج المراقبة)",
      location:
        language === "en" ? "Elevated El Oued" : "موقع مرتفع بمدينة الوادي",
      desc:
        language === "en"
          ? "Built in 1889 for military surveillance, this stone tower offers a panoramic view and stands as a witness to the colonial era."
          : "يعود بناؤه لعام 1889 م، بني لأغراض المراقبة والدفاع ويوفر إطلالة بانورامية على المدينة، وهو شاهد على الحقبة الاستعمارية.",
      image: "/placeholder.svg",
    },
    {
      title:
        language === "en" ? "Guemar Traditional Market" : "سوق قمار التقليدي",
      location: language === "en" ? "Guemar" : "مدينة قمار",
      desc:
        language === "en"
          ? "A historic commercial hub dating back to 1800, known for its narrow Islamic-style alleys and protective architectural arches."
          : "سوق تاريخي عريق (حوالي 1800 م) يعكس الحياة الاقتصادية القديمة بأزقته الضيقة وطرازه المعماري الإسلامي المميز.",
      image: "/placeholder.svg",
    },
    {
      title:
        language === "en" ? "The Old Waqf Library" : "المكتبة الوقفية القديمة",
      location: language === "en" ? "El Oued" : "وسط مدينة الوادي",
      desc:
        language === "en"
          ? "Established in 1880, it houses rare Islamic manuscripts and ancient historical documents essential for research."
          : "تأسست عام 1880 م، وتحتفظ بمخطوطات إسلامية قديمة ووثائق تاريخية نادرة تعتبر مصدراً هاماً للباحثين والدارسين.",
      image: "/placeholder.svg",
    },
    {
      title:
        language === "en"
          ? "Minaret of Sidi Salem"
          : "منارة وزاوية سيدي سالم الحالية",
      location: language === "en" ? "El Oued" : "مدينة الوادي",
      desc:
        language === "en"
          ? "A contemporary architectural landmark representing the continuity of the region's spiritual and educational role."
          : "معلم معماري وديني معاصر يمثل استمرارية الدور الروحي والتعليمي للمنطقة واستقطاب الزوار والسياح.",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={language === "en" ? "Heritage Sites" : "المواقع التراثية"}
          subtitle={
            language === "en"
              ? "Landmarks of a Thousand Domes"
              : "معالم مدينة الألف قبة"
          }
          breadcrumb={[{ label: language === "en" ? "Sites" : "المواقع" }]}
        />
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {sites.map((site, i) => (
                <div
                  key={i}
                  className="group bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={site.image || "/placeholder.svg"}
                      alt={site.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 block">
                      {site.location}
                    </span>
                    <h3 className="text-2xl font-heritage mb-4">
                      {site.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {site.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
