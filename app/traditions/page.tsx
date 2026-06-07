"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Music, Users, Utensils, Shirt } from "lucide-react"
import { useState } from "react"

export default function TraditionsPage() {
  const { t, language } = useLanguage()
  const [expandedTradition, setExpandedTradition] = useState<number | null>(null)

  const traditions = [
    {
      icon: Music,
      title: language === "en" ? "Nakha Dance (Hair Dance)" : "رقصة النخ (رقصة الشعر)",
      shortDesc:
        language === "en"
          ? "A world-famous heritage folk dance with unique head movements."
          : "رقصة شعبية تراثية عريقة معروفة عالمياً برقصة الشعر.",
      fullDesc:
        language === "en"
          ? "The Nakha is an ancient folk dance performed primarily by unmarried girls at weddings and celebrations. It's characterized by unique movements where dancers move their hair and head in special rhythmic patterns. The dance is performed in geometric formations with live drum accompaniment."
          : "النخ رقصة شعبية تراثية سوفية عريقة تتميز بحركات فريدة. تقوم الفتيات بتحريك الشعر والرأس بطريقة خاصة. تؤدى بشكل أساسي في الأعراس والمناسبات الاجتماعية بتشكيلات هندسية.",
      types:
        language === "en"
          ? [
              "Al-Waqif (Evening) - Slow and melodic",
              "Al-Radissi (Daytime) - Faster and more lively",
              "Al-Sharqi (With Qasba) - Fast and powerful",
            ]
          : [
              "الموقف (الليل) - بطيئة وحزينة نسبياً",
              "الرادسي (النهار) - حركات أسرع وأكثر حيوية",
              "الشرقي (بالقصبة) - حركات سريعة وقوية",
            ],
      significance:
        language === "en"
          ? "A world-famous folk tradition representing Soufi culture, performed in international festivals"
          : "موروث شعبي معروف عالمياً يمثل الهوية السوفية",
    },
    {
      icon: Heart,
      title: language === "en" ? "Al-Futool (Wedding Eve Ceremony)" : "الفتول (ليلة توديع العروس)",
      shortDesc:
        language === "en"
          ? "An emotional farewell ceremony for the bride on the eve of marriage."
          : "عادة تقليدية خاصة توديع العروس الرسمي للعزوبية.",
      fullDesc:
        language === "en"
          ? "Al-Futool is a special women's ceremony held the night before the wedding. It represents the bride's formal farewell to her single life and her transition to adulthood. The ceremony involves twisting hair with colored threads (red and green) symbolizing purity and love, while traditional songs and prayers are recited."
          : "الفتول عادة تقليدية نسوية خاصة تتم ليلة الزفاف. تمثل توديع العروس الرسمي للعزوبية ودخولها مرحلة جديدة. يتم تفتيل الشعر بخيوط حمراء وخضراء ترمز للعفة والحب.",
      process:
        language === "en"
          ? [
              "Hair preparation and decoration with colored threads",
              "Application of traditional incense",
              "Recitation of traditional songs and blessings",
              "Bride spins 10 times symbolizing patience and steadfastness",
              "Thread distribution among single girls as a symbol of good fortune",
            ]
          : [
              "تحضير الشعر بخيوط حمراء وخضراء",
              "وضع البخور التقليدي",
              "ترديد الأغاني والدعاء",
              "دوران العروس 10 مرات ترمز للصبر والثبات",
              "توزيع الخيوط على الفتيات العازبات",
            ],
      significance:
        language === "en"
          ? "A deeply symbolic ritual maintaining social bonds and family traditions"
          : "طقس عميق الرمزية يحافظ على الروابط الأسرية",
    },
    {
      icon: Users,
      title: language === "en" ? "Wedding Rituals (7-Day Celebrations)" : "طقوس الزواج التقليدية",
      shortDesc:
        language === "en"
          ? "Complex ceremonial traditions spanning seven days of celebration and union."
          : "طقوس اجتماعية معقدة تستمر سبعة أيام.",
      fullDesc:
        language === "en"
          ? "Soufi weddings are elaborate celebrations lasting 7 days, involving multiple phases from engagement to final ceremonies. Each day has specific rituals including the offering of the 'Qaffa' (a gift box), henna nights, ceremonial processions, and the bride's journey on a decorated camel in a howdaj (litter)."
          : "أعراس سوفية معقدة تستمر 7 أيام بمراحل متعددة من الخطوبة إلى الاحتفالات النهائية. كل يوم له طقوسه الخاصة.",
      stages:
        language === "en"
          ? [
              "Day 1-2: Engagement and Gift Exchange (Qaffa)",
              "Day 2-3: Women's Celebrations and Henna Night",
              "Day 3: Al-Futool (Bride's Farewell)",
              "Day 4: Marriage Contract Signing",
              "Day 5: Grand Wedding Celebration",
              "Day 6-7: Bride visits family",
            ]
          : [
              "اليوم 1-2: الخطوبة وتبادل الهدايا",
              "اليوم 2-3: احتفالات النساء وليلة الحناء",
              "اليوم 3: الفتول",
              "اليوم 4: عقد النكاح",
              "اليوم 5: حفلة الزفاف الكبرى",
              "اليوم 6-7: زيارة الأهل",
            ],
      significance:
        language === "en"
          ? "Unites families and reinforces community bonds through shared celebration"
          : "توحيد العائلتين وتقوية الروابط الاجتماعية",
    },
    {
      icon: Shirt,
      title: language === "en" ? "Traditional Soufi Clothing" : "اللباس التقليدي السوفي",
      shortDesc:
        language === "en"
          ? "Distinct attire reflecting desert heritage and cultural identity."
          : "زي تقليدي فريد يعكس الموروث الصحراوي.",
      fullDesc:
        language === "en"
          ? "Soufi traditional clothing is a distinctive blend of comfort and elegance designed for the desert climate. Women wear the 'Hawli' (colorful long dress), 'Binnosak' (headwear), and ornate jewelry. Men wear white 'Qamis' (shirt), 'Burnous' (cloak), and traditional headwear with a dagger."
          : "اللباس التقليدي السوفي مزيج فريد من الراحة والأناقة. النساء يرتدين الحولي والبخنوق والحلي. الرجال يرتدون القميص الأبيض والبرنوس والعمامة.",
      womenWear:
        language === "en"
          ? [
              "Hawli (Jilwali) - Colorful long embroidered dress",
              "Qandoura - Traditional undergarment",
              "Binnosak - Decorative headwrap",
              "Khal'sa - Ornate silk belt",
              "Gold and silver jewelry",
            ]
          : [
              "الحولي - رداء طويل ملون مزركش",
              "القندورة - فستان تحتاني تقليدي",
              "البخنوق - غطاء رأس ملون",
              "الخالصة - حزام حريري مزخرف",
              "حلي ذهبية وفضية",
            ],
      significance:
        language === "en" ? "A living symbol of Soufi cultural identity and heritage" : "رمز حي للهوية والتراث السوفي",
    },
    {
      icon: Utensils,
      title: language === "en" ? "Traditional Soufi Cuisine" : "الأطباق والطعام التقليدي",
      shortDesc:
        language === "en"
          ? "Authentic desert flavors with unique recipes and traditional preparation methods."
          : "نكهات صحراوية أصيلة بوصفات فريدة.",
      fullDesc:
        language === "en"
          ? "Soufi cuisine reflects centuries of desert traditions using locally-sourced ingredients. Dishes feature camel and lamb meat, local spices, and dates. Every celebration includes traditional dishes prepared with time-honored methods, representing hospitality and cultural continuity."
          : "الطعام السوفي يعكس تقاليد صحراوية معروفة باستخدام مكونات محلية. الأطباق تتميز بلحم الإبل والغنم والتمور.",
      traditionalDishes:
        language === "en"
          ? [
              "Al-Matbaq (fried pastry with filling)",
              "As-Saffa (couscous with sauce)",
              "Al-Bendereq (local vegetable stew)",
              "Ash-Shawat (spiced minced meat)",
              "Al-Fol (traditional beans dish)",
              "Kosksus (couscous with meat and vegetables)",
            ]
          : [
              "المطابيق (معجنات مقلية)",
              "السفة (كسكسي بصلصة)",
              "البندراق (طبق خضار محلي)",
              "الشواط (لحم مفروم محابل)",
              "الفول (طبق الفول التقليدي)",
              "الكسكسي بسيطة",
            ],
      significance:
        language === "en"
          ? "100% natural ingredients reflecting authentic desert culinary heritage"
          : "مكونات طبيعية 100% تعكس التراث الغذائي الأصيل",
    },
    {
      icon: Music,
      title: language === "en" ? "Folk Music & Instruments" : "الغناء والموسيقى الشعبية",
      shortDesc:
        language === "en"
          ? "Ancient musical traditions with distinctive instruments and melodies."
          : "تقاليد موسيقية عريقة بآلات مميزة.",
      fullDesc:
        language === "en"
          ? "Soufi folk music represents centuries of cultural expression through traditional instruments and melodies. Each musical form serves a specific social purpose, from celebrations to storytelling. The music is deeply connected to daily life and major life events."
          : "الموسيقى الشعبية السوفية تمثل قروناً من التعبير الثقافي. كل شكل موسيقي يخدم غرضاً اجتماعياً محدداً.",
      musicalForms:
        language === "en"
          ? [
              "Az-Zaqayir - Celebratory folk songs",
              "Al-Waqif - Evening melodic music",
              "Ar-Radissi - Daytime lively music",
              "Al-Ghayita - Wind instrument music",
            ]
          : [
              "الزقايري - أغاني شعبية احتفالية",
              "الموقف - موسيقى ليلية حزينة",
              "الرادسي - موسيقى نهارية حيوية",
              "الغيطة - موسيقى آلات النفخ",
            ],
      instruments:
        language === "en"
          ? [
              "Tabl (Bendir) - Traditional drum",
              "Zarna - Wind instrument",
              "Qasba - Reed flute",
              "Hand clapping and vocals",
            ]
          : ["الطبل - آلة إيقاع رئيسية", "الزرنة - آلة نفخ", "القصبة - الناي الريفي", "التصفيق الصوتي"],
      significance:
        language === "en"
          ? "Represents the living heartbeat of Soufi culture and community celebrations"
          : "تمثل نبض الحياة الثقافية السوفية",
    },
    {
      icon: Heart,
      title: language === "en" ? "Social Solidarity & Humanitarian Values" : "التكافل الاجتماعي والقيم الإنسانية",
      shortDesc:
        language === "en"
          ? "Deep-rooted values of communal support, sharing, and generosity."
          : "قيم متجذرة للتضامن والتعاون والعطاء.",
      fullDesc:
        language === "en"
          ? "Soufi society is built on strong principles of social solidarity, mutual aid, and collective responsibility. Food sharing, helping those in need, and family bonds are central to daily life and celebrations. These values are reinforced during holidays and significant life events."
          : "المجتمع السوفي مبني على مبادئ قوية من التضامن الاجتماعي والمساعدة المتبادلة. تقاسم الطعام ومساعدة المحتاجين وقوة الروابط الأسرية.",
      practices:
        language === "en"
          ? [
              "Food sharing with neighbors and the poor",
              "Generous hospitality and welcoming guests",
              "Mutual help in work and projects",
              "Family cooperation and support",
              "Aid during celebrations and festivals",
            ]
          : [
              "توزيع الطعام على الجيران والفقراء",
              "كرم الضيافة والترحيب بالضيوف",
              "المساعدة المتبادلة في الأعمال",
              "التعاون والدعم الأسري",
              "المساعدة في الاحتفالات",
            ],
      keyValues:
        language === "en"
          ? [
              "Compassion and empathy",
              "Generosity and charitable giving",
              "Family bonds and kinship",
              "Religious commitment",
              "Community cooperation",
            ]
          : ["التراحم والعطف", "السخاء والعطاء", "روابط الأسرة", "الالتزام الديني", "التعاون المجتمعي"],
      significance:
        language === "en"
          ? "The moral foundation that binds Soufi society together across generations"
          : "الأساس الأخلاقي الذي يربط المجتمع السوفي",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={t("nav.traditions")}
          subtitle={language === "en" ? "The Intangible Soul of the Region" : "الروح غير المادية للمنطقة"}
          breadcrumb={[{ label: t("nav.traditions") }]}
        />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-6">
                {traditions.map((trad, i) => (
                  <Card
                    key={i}
                    className="border-none shadow-sm hover:shadow-lg transition-all cursor-pointer bg-muted/20"
                    onClick={() => setExpandedTradition(expandedTradition === i ? null : i)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                          <trad.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="text-2xl font-serif text-primary">{trad.title}</h3>
                          <p className="text-muted-foreground leading-relaxed italic">{trad.shortDesc}</p>

                          {expandedTradition === i && (
                            <div className="mt-6 pt-6 border-t space-y-4 animate-in fade-in">
                              <div>
                                <p className="text-foreground leading-relaxed">{trad.fullDesc}</p>
                              </div>

                              {trad.types && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Types:" : "الأنواع:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.types.map((type, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {type}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.process && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Process:" : "المراحل:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.process.map((step, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {step}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.stages && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "7-Day Schedule:" : "جدول الأيام السبعة:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.stages.map((stage, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {stage}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.womenWear && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Women's Attire:" : "ملابس النساء:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.womenWear.map((item, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.traditionalDishes && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Traditional Dishes:" : "الأطباق التقليدية:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.traditionalDishes.map((dish, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {dish}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.musicalForms && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Musical Forms:" : "الأشكال الموسيقية:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.musicalForms.map((form, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {form}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.instruments && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Instruments:" : "الآلات:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.instruments.map((instrument, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {instrument}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.practices && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Key Practices:" : "الممارسات الأساسية:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.practices.map((practice, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {practice}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {trad.keyValues && (
                                <div>
                                  <h4 className="font-semibold text-primary mb-2">
                                    {language === "en" ? "Core Values:" : "القيم الأساسية:"}
                                  </h4>
                                  <ul className="space-y-1 list-disc list-inside text-sm">
                                    {trad.keyValues.map((value, idx) => (
                                      <li key={idx} className="text-muted-foreground">
                                        {value}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <p className="text-sm font-semibold text-primary pt-4">
                                {language === "en" ? "Cultural Significance: " : "الأهمية الثقافية: "}
                                <span className="text-foreground font-normal">{trad.significance}</span>
                              </p>
                            </div>
                          )}

                          <button className="text-primary text-sm font-semibold mt-2 hover:underline">
                            {expandedTradition === i
                              ? language === "en"
                                ? "Show Less"
                                : "إظهار أقل"
                              : language === "en"
                                ? "Learn More"
                                : "اعرف المزيد"}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
