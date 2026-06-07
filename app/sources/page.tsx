"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function SourcesPage() {
  const { t, language } = useLanguage()

  const sourceCategories = [
    {
      title: language === "en" ? "Academic Research Platforms" : "منصات البحث الأكاديمي",
      sources: [
        {
          name: language === "en" ? "Arab Scientific Journal Platform (ASJP)" : "منصة ASJP (الجزائري للبحث العلمي)",
          url: "https://asjp.cerist.dz",
          reliability: language === "en" ? "Very High" : "عالية جداً",
          studies:
            language === "en"
              ? [
                  '"Archaeological Landmarks in Wadi Souf Between Deterioration and Restoration" (Ref: 36673)',
                  '"Textile Industry: A Traditional Inherited Industry in Wadi Souf" (2024-02-23)',
                  '"Engagement and Wedding Customs in Wadi Souf Society During Two Centuries..." (Ref: 34312)',
                  '"Historical Dimensions of Human Civilization in Wadi Souf Region..." (Ref: 258075)',
                  '"The Role of Tangible and Intangible Heritage in the Cultural Identity..." (Ref: 475/2/3/79365)',
                ]
              : [
                  '"المعالم الأثرية بوادي سوف بين الانهيار والترميم" (الرقم: 36673)',
                  '"الصناعة النسيجية صناعة تقليدية متوارثة في وادي سوف" (2024-02-23)',
                  '"عادات وتقاليد الخطوبة والزفاف في مجتمع وادي سوف خلال القرنين..." (الرقم: 34312)',
                  '"الأبعاد التاريخية للعمران البشري بإقليم وادي سوف..." (الرقم: 258075)',
                  '"دور الرتاث المادي والالمادي لمجتمع وادي سوف في الهوية الثقافية..." (الرقم: 475/2/3/79365)',
                ],
        },
        {
          name:
            language === "en" ? "University of El Oued (Université El Oued)" : "جامعة الوادي (جامعة الشهيد حمه لخضر)",
          url: "https://www.univ-eloued.dz",
          reliability: language === "en" ? "Very High" : "عالية جداً",
          studies:
            language === "en"
              ? ['"Customs and Traditions in Occasions and Celebrations in Wadi Souf" (2014-06-03)']
              : ['"العادات والتقاليد في المناسبات والأفراح في وادي سوف" (2014-06-03)'],
        },
      ],
    },
    {
      title: language === "en" ? "Government & Official Sources" : "المصادر الحكومية والرسمية",
      sources: [
        {
          name: language === "en" ? "Wilaya Tourism Office - El Oued" : "مديرية السياحة والصناعة التقليدية - الوادي",
          url: "https://el-oued.mta.gov.dz/",
          reliability: language === "en" ? "Official & Trusted" : "رسمي موثوق",
          studies:
            language === "en"
              ? [
                  "Official list of tourist sites",
                  "Information about Zaouias and historical landmarks",
                  "Data on recognized traditional crafts",
                ]
              : [
                  "قائمة المواقع السياحية الرسمية",
                  "معلومات عن الزوايا والمعالم التاريخية",
                  "بيانات الحرف التقليدية المعترف بها",
                ],
        },
        {
          name:
            language === "en"
              ? "Algerian Ministry of Tourism and Traditional Crafts"
              : "وزارة السياحة والحرف التقليدية الجزائرية",
          url: "",
          reliability: language === "en" ? "Official & Trusted" : "رسمي موثوق",
          studies:
            language === "en"
              ? [
                  "Classification of historical sites",
                  "Criteria for traditional crafts",
                  "Heritage preservation policies",
                ]
              : ["تصنيفات المواقع التاريخية", "معايير الحرف التقليدية", "سياسات الحفاظ على التراث"],
        },
        {
          name: language === "en" ? "Direction of Religious Endowments (Awqaf)" : "مديرية الأوقاف - الوادي",
          url: "https://waqf-dz.org/",
          reliability: language === "en" ? "Official & Trusted" : "رسمي موثوق",
          studies:
            language === "en"
              ? [
                  "Information about Zaouias and historical mosques",
                  '"Belal Mosque in Wadi Souf" (2023-05-09)',
                  "Records of classified religious landmarks",
                ]
              : [
                  "معلومات الزوايا والمساجد التاريخية",
                  '"مسجد بلال بوادي سوف" (2023-05-09)',
                  "سجلات المعالم الدينية المصنفة",
                ],
        },
      ],
    },
    {
      title: language === "en" ? "Media & Press Sources" : "المصادر الإعلامية الموثوقة",
      sources: [
        {
          name: language === "en" ? "Echab Newspaper (Yawmiyat Al-Shaab)" : "يومية الشعب الجزائرية",
          url: "http://www.ech-chaab.com",
          reliability: language === "en" ? "Official Newspaper" : "جريدة رسمية",
          studies:
            language === "en"
              ? [
                  '"Wadi Souf .. Glowing Craft and Traditional Treasures"',
                  "Information about traditional crafts",
                  "Reports on tourist sites",
                ]
              : [
                  '"وَادِي سُـوف .. كُنــوزٌ حِرفيـــّة وتقليــدِيّة تَتَوهَّـج"',
                  "معلومات عن الحرف التقليدية",
                  "تقارير عن المواقع السياحية",
                ],
        },
        {
          name: language === "en" ? "Algérie Direct Information" : "موقع Algérie Direct",
          url: "https://www.algeriedirect.dz",
          reliability: language === "en" ? "Trusted" : "موثوق",
          studies:
            language === "en"
              ? [
                  '"Crafts and Industries Brushing Off Dust" (2011-12-31)',
                  "Information about heritage crafts threatened with extinction",
                ]
              : ['"حرف وصناعات تنفض الغبار عن نفسها" (2011-12-31)', "معلومات عن الحرف التراثية المهددة بالاندثار"],
        },
        {
          name: language === "en" ? "Souri Cyber Services" : "مدونة Souri Cyber",
          url: "https://souricyber.fr.gd",
          reliability: language === "en" ? "Local Trusted" : "محلي موثوق",
          studies:
            language === "en"
              ? [
                  '"Customs and Traditions of Wadi Souf Region"',
                  "Information about social life and traditions",
                  "Details of daily customs",
                ]
              : [
                  '"عادات وتقاليد أهالي منطقة وادي سوف الوادي"',
                  "معلومات عن الحياة الاجتماعية والتقاليد",
                  "تفاصيل العادات اليومية",
                ],
        },
      ],
    },
    {
      title: language === "en" ? "Wikipedia & Reference Sources" : "مصادر ويكيبيديا والمراجع",
      sources: [
        {
          name: language === "en" ? "Wikipedia - Al-Tijani Zawiya (Guimar)" : "ويكيبيديا - الزاوية التيجانية",
          url: "https://ar.wikipedia.org/wiki/الزاوية_التيجانية_(قمار)",
          reliability: language === "en" ? "Internationally Recognized" : "معترف به دولياً",
          studies:
            language === "en"
              ? [
                  "Founding date of Zawiya (1789 CE - 1204 AH)",
                  "Information about Al-Tijani Order",
                  "Global significance of Zawiya",
                ]
              : ["تاريخ تأسيس الزاوية (1789 م - 1204 هـ)", "معلومات عن الطريقة التيجانية", "أهمية الزاوية عالمياً"],
        },
        {
          name: language === "en" ? "Wikipedia - Guimar (El Oued State)" : "ويكيبيديا - قمار (ولاية الوادي)",
          url: "https://ar.wikipedia.org/wiki/قمار_(ولاية_الوادي)",
          reliability: language === "en" ? "Internationally Recognized" : "معترف به دولياً",
          studies:
            language === "en"
              ? ["Historical information about Guimar city", "Demographic data", "Historical landmarks"]
              : ["معلومات تاريخية عن مدينة قمار", "البيانات الديموغرافية", "المعالم التاريخية"],
        },
        {
          name: language === "en" ? "Wikipedia - El Oued (Algeria)" : "ويكيبيديا - الوادي (الجزائر)",
          url: "https://ar.wikipedia.org/wiki/الوادي_(الجزائر)",
          reliability: language === "en" ? "Internationally Recognized" : "معترف به دولياً",
          studies:
            language === "en"
              ? ["General geographic information", "Statistical data", "Main landmarks"]
              : ["معلومات جغرافية عامة", "البيانات الإحصائية", "المعالم الرئيسية"],
        },
        {
          name:
            language === "en"
              ? "Wikipedia - List of Classified Sites in El Oued Wilaya"
              : "ويكيبيديا - قائمة المواقع المصنفة",
          url: "https://ar.wikipedia.org/wiki/قائمة_المواقع_والمعالم_المصنفة_في_ولاية_الوادي",
          reliability: language === "en" ? "Internationally Recognized" : "معترف به دولياً",
          studies:
            language === "en"
              ? ["Official list of classified sites", "Information about classifications and protection"]
              : ["قائمة المواقع الرسمية المصنفة", "معلومات عن التصنيفات والحماية"],
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={t("nav.sources")}
          subtitle={language === "en" ? "References & Documentation Methodology" : "المراجع ومنهجية التوثيق"}
          breadcrumb={[{ label: t("nav.sources") }]}
        />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="prose prose-lg prose-stone mb-16">
                <p className="text-xl text-muted-foreground italic leading-relaxed">
                  {language === "en"
                    ? "This project follows strict academic guidelines for cultural documentation. All information presented has been verified through multiple scholarly and community-based sources to ensure historical accuracy and authenticity."
                    : "يتبع هذا المشروع إرشادات أكاديمية صارمة للتوثيق الثقافي. تم التحقق من جميع المعلومات المقدمة من خلال مصادر علمية ومجتمعية متعددة لضمان الدقة التاريخية والأصالة."}
                </p>
              </div>

              {sourceCategories.map((cat, idx) => (
                <div key={idx} className="space-y-6">
                  <h2 className="text-3xl font-serif text-primary border-b border-primary/10 pb-2">{cat.title}</h2>
                  <div className="grid gap-6">
                    {cat.sources.map((source, i) => (
                      <Card
                        key={i}
                        className="border-l-4 border-l-primary/30 hover:border-l-primary/70 transition-colors bg-muted/20"
                      >
                        <CardContent className="p-6 space-y-4">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {source.url ? (
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors"
                                >
                                  {source.name}
                                </a>
                              ) : (
                                source.name
                              )}
                            </h3>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium text-muted-foreground">
                                {language === "en" ? "Reliability:" : "الموثوقية:"}
                              </span>
                              <span className="text-primary font-semibold">{source.reliability}</span>
                            </div>
                          </div>
                          <div className="space-y-2 border-t border-muted/20 pt-4">
                            {source.studies.map((study, j) => (
                              <p key={j} className="text-sm text-muted-foreground italic leading-relaxed">
                                • {study}
                              </p>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
