"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/common/page-hero"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function HistoryPage() {
  const { t, language } = useLanguage()
  const [expandedPeriod, setExpandedPeriod] = useState<number | null>(null)

  const historicalPeriods = [
    {
      period: language === "en" ? "Pre-Islamic Period" : "ما قبل العصر الإسلامي",
      title: language === "en" ? "Ancient Foundations" : "الأسس القديمة",
      desc:
        language === "en"
          ? "The early presence of nomadic tribes and the discovery of water sources that would later define the region."
          : "الوجود المبكر للقبائل البدوية واكتشاف مصادر المياه التي ستحدد لاحقاً معالم المنطقة.",
      subsections: [
        {
          subtitle: language === "en" ? "Neolithic Age & Ancient Eras" : "العصر الحجري الحديث والعصور القديمة",
          content:
            language === "en"
              ? "Archaeological evidence shows Neolithic settlements dating back thousands of years. Early stone tools, hunting equipment, and evidence of small nomadic communities indicate active human presence. The economy relied on hunting wild animals, gathering natural plants and fruits, and the beginning of domesticating livestock like goats and sheep."
              : "تشهد الآثار النيوليتية على استيطان بشري مبكر. العثور على بقايا حجرية وأدوات صيد قديمة، دليل على وجود تجمعات بشرية صغيرة ومتنقلة. اعتمدت الحياة الاقتصادية على صيد الحيوانات البرية وجمع النباتات الطبيعية والثمار البرية، وبداية تدجين بعض الحيوانات.",
        },
        {
          subtitle: language === "en" ? "Bedouin Tribes: Gaetulians & Zenata" : "القبائل البدوية: الغيتولين والزناتة",
          content:
            language === "en"
              ? "Major Amazigh tribes, particularly the Zenata, dominated the region around the 5th-7th century BCE. These were nomadic pastoralists with strong tribal organizations, blood kinship systems, and inter-tribal alliances. They lived a purely bedouin lifestyle based on herding and migration across the Sahara."
              : "القبائل الأمازيغية الكبرى، وخاصة الزناتة، هيمنت على المنطقة حوالي القرن 5-7 قبل الميلاد. كانوا رعاة بدويين لهم تنظيمات قبلية قوية وأنظمة قرابة دموية وتحالفات بين القبائل.",
        },
        {
          subtitle: language === "en" ? "Discovery of Water Sources" : "اكتشاف مصادر المياه",
          content:
            language === "en"
              ? "Around the 5th-4th century BCE, the discovery of deep groundwater wells, natural springs, and seasonal wadis transformed the region. This pivotal event led to the transition from nomadic herding to settled agriculture, the emergence of permanent settlements, and the development of trade routes. Ancient engineering included well-digging, simple water channels, and irrigated gardens."
              : "حول 4-5 قبل الميلاد، أدى اكتشاف الآبار الجوفية العميقة والينابيع الطبيعية إلى تحول جذري. انتقل السكان من البداوة إلى الاستقرار، وتطورت الزراعة البدائية، وظهرت التجمعات السكانية الثابتة.",
        },
        {
          subtitle: language === "en" ? "Roman & Phoenician Activity" : "النشاط الروماني والفينيقي",
          content:
            language === "en"
              ? "From the 1st century BCE to 4th century CE, Roman coins, pottery, and Phoenician seals were discovered in the region. Evidence indicates that Wad Souf was an important stop on major trade routes connecting North Africa with sub-Saharan trade networks. The region served as a crucial commercial hub for caravans between north and south."
              : "من القرن 1 قبل الميلاد إلى 4 ميلادي، تم العثور على عملات رومانية وفخار وأختام فينيقية. كانت المنطقة نقطة توقف مهمة على طرق التجارة الصحراوية الرئيسية.",
        },
      ],
    },
    {
      period: language === "en" ? "Early Islamic Era" : "العصر الإسلامي المبكر",
      title: language === "en" ? "Cultural Transformation" : "التحول الثقافي",
      desc:
        language === "en"
          ? "The arrival of Islam brought new social structures and the beginning of established settlements in the Erg."
          : "وصول الإسلام جلب هياكل اجتماعية جديدة وبداية المستوطنات الثابتة في العرق.",
      subsections: [
        {
          subtitle: language === "en" ? "Islamic Conquest (7th-8th Century)" : "الفتح الإسلامي (القرن 7-8)",
          content:
            language === "en"
              ? "Led by Uqba ibn Nafi al-Fihri around 670-680 CE (50-60 AH), Islamic forces swept through the region. The Zenata tribes rapidly embraced Islam with minimal resistance and were integrated into Islamic society. This marked the beginning of a new social order based on Islamic law and structure."
              : "بقيادة عقبة بن نافي الفهري حوالي 670-680 م، دخلت القوات الإسلامية المنطقة. اعتنقت الزناتة الإسلام سريعاً مع مقاومة محدودة، وتم دمجهم في المجتمع الإسلامي. هذا أسس نظاماً اجتماعياً جديداً قائماً على الشريعة الإسلامية.",
        },
        {
          subtitle:
            language === "en" ? "Permanent Settlements & Economic Development" : "المستوطنات الثابتة والتطور الاقتصادي",
          content:
            language === "en"
              ? "The transition from nomadic herding to settled life transformed the landscape. Major settlements emerged: Qamar (as a regional capital), Al-Zaqm (agricultural center), Al-Wadi (commercial hub), Tamanrassett (desert fortress), and Al-Daeem (agricultural oasis). The economy developed through date palm cultivation, grain farming, handicrafts, and organized caravan trade."
              : "المستوطنات الرئيسية مثل قمار والزقم والوادي وتماسين والدعيم أصبحت مراكز إدارية وزراعية وتجارية. الاقتصاد تطور من خلال زراعة النخيل، والحبوب، والحرف اليدوية، والتجارة القافلية.",
        },
        {
          subtitle: language === "en" ? "Religious & Intellectual Growth" : "النمو الديني والفكري",
          content:
            language === "en"
              ? "Zaouias (Islamic religious schools) were established as centers for learning Islamic sciences, Quran memorization, and dissemination of Islamic culture. These institutions became the foundation for intellectual development and cultural transmission. The emergence of local scholars contributed to the region's reputation as a center of Islamic learning."
              : "تأسيس الزوايا التيجانية والقادرية كمراكز للعلوم الإسلامية وتحفيظ القرآن. هذه المؤسسات أصبحت أساساً للتطور الفكري والثقافي.",
        },
      ],
    },
    {
      period: language === "en" ? "Ottoman Period" : "الفترة العثمانية",
      title: language === "en" ? "Administrative Growth" : "النمو الإداري",
      desc:
        language === "en"
          ? "A period of administrative organization and the strengthening of trade routes through the desert."
          : "فترة من التنظيم الإداري وتعزيز طرق التجارة عبر الصحراء.",
      subsections: [
        {
          subtitle: language === "en" ? "Ottoman Integration (1550-1830)" : "الدمج العثماني (1550-1830)",
          content:
            language === "en"
              ? "Ottoman forces entered in 1556 CE, establishing administrative structures. The period saw three phases: Initial conquest (1550-1600), stability and centralization (1600-1750), and gradual decline with local autonomy reasserting (1750-1830). A Turkish governor (Wali) was appointed, dividing the region into administrative districts."
              : "دخول الجيوش العثمانية عام 1556، وتأسيس هياكل إدارية عثمانية. تعيين والي عثماني وتقسيم المنطقة إلى مناطق إدارية.",
        },
        {
          subtitle: language === "en" ? "Desert Trade Routes" : "طرق التجارة الصحراوية",
          content:
            language === "en"
              ? "Wad Souf became a crucial commercial hub on the Saharan trade networks. Gold from Sudan/Mali, salt from Taoudenni, and slaves were major commodities. The region developed caravanserais (trading inns), organized marketplaces (Qaissarias), and caravan protection systems. Dates and palm products were exported to northern markets."
              : "أصبحت وادي سوف محور تجاري حيوي. الذهب من السودان/مالي، الملح من تاودني، والعبيد كانت سلع أساسية. تطورت القيصريات والأسواق المنظمة وأنظمة حماية القوافل.",
        },
        {
          subtitle: language === "en" ? "Administrative Structure" : "البنية الإدارية",
          content:
            language === "en"
              ? "The Ottoman system included: Wali (Governor) with supreme authority, Qaid (local commanders) in major cities responsible for security and justice, and tribal Sheikhs who acted as intermediaries. Taxes included land taxes, crop taxes, trade taxes, and protection fees. Local resistance and rebellions occurred throughout the period."
              : "نظام إداري يشمل والياً عثمانياً وقايدين محليين وشيوخ عشائريين. نظام الجباية والضرائب. مقاومات محلية متواصلة.",
        },
      ],
    },
    {
      period: language === "en" ? "Colonial Period" : "الفترة الاستعمارية",
      title: language === "en" ? "The Struggle for Identity" : "النضال من أجل الهوية",
      desc:
        language === "en"
          ? "The people of Wad Souf played a vital role in resisting colonial forces and preserving their cultural autonomy."
          : "لعب سكان وادي سوف دوراً حيوياً في مقاومة القوى الاستعمارية والحفاظ على استقلالهم الثقافي.",
      subsections: [
        {
          subtitle:
            language === "en" ? "French Occupation & Resistance (1830-1872)" : "الاحتلال الفرنسي والمقاومة (1830-1872)",
          content:
            language === "en"
              ? "France occupied Algeria from the north, gradually advancing southward. After capturing Biskra (1844) and Ouargla (1853), they surrounded Wad Souf. The legendary Sheikh Sulayman ibn Jallah led fierce resistance. The Battle of Meqarrin (1854) was a pivotal moment where combined forces fought with honor, temporarily halting French advances and proving the region's capacity to resist."
              : "احتلال فرنسا من الشمال، وتقدم تدريجي نحو الجنوب. قيادة الشيخ سليمان بن جلاب للمقاومة. معركة المقارين 1854 كانت نقطة تحول حاسمة حيث قاتلت القوات المتحدة بشرف.",
        },
        {
          subtitle: language === "en" ? "Forms of Resistance (1854-1954)" : "أشكال المقاومة (1854-1954)",
          content:
            language === "en"
              ? "Military resistance through guerrilla warfare and attacks on French garrisons. Social resistance included harboring fighters, concealing weapons, and recruiting youth. Cultural resistance maintained Islamic identity through secret Quranic education, traditional zaouias, and preservation of language and culture. This 100-year struggle kept the spirit of resistance alive until the Liberation War."
              : "مقاومة عسكرية من خلال حرب العصابات. مقاومة اجتماعية عبر إيواء المقاومين. مقاومة ثقافية بالحفاظ على الهوية الإسلامية والعربية.",
        },
        {
          subtitle:
            language === "en"
              ? "Colonial Stability & Transformation (1872-1954)"
              : "الاستقرار الاستعماري والتحول (1872-1954)",
          content:
            language === "en"
              ? "After military conquest, France established administrative control with military garrisons. The period saw infrastructure development (roads, utilities) pursued for colonial interests. Growing national awareness emerged in the 1940s-1950s as intellectuals and nationalist movements prepared for independence."
              : "فرض السيطرة الإدارية الفرنسية مع حاميات عسكرية. تطوير البنية التحتية. تنامي الوعي الوطني في 1940-1950.",
        },
      ],
    },
    {
      period: language === "en" ? "Liberation & Independence" : "التحرر والاستقلال",
      title: language === "en" ? "Revolution & Freedom" : "الثورة والحرية",
      desc:
        language === "en"
          ? "The armed liberation struggle and the journey to independence in 1962."
          : "الكفاح المسلح من أجل التحرر والاستقلال عام 1962.",
      subsections: [
        {
          subtitle: language === "en" ? "The Liberation War (1954-1962)" : "حرب التحرير (1954-1962)",
          content:
            language === "en"
              ? "Starting November 1, 1954, Wad Souf participated in the nationwide uprising. The Battle of Hassi Khalifa (November 17, 1954) led by hero Hamah Lakhdar was a turning point, proving the south's participation in the revolution. Eight years of intense fighting followed, with approximately 140 martyrs from Wad Souf by 1957. The entire population endured displacement, destruction, and hardship but remained steadfast."
              : "بدء الثورة 1 نوفمبر 1954. معركة حاسي خليفة 17 نوفمبر 1954 بقيادة البطل حمه لخضر. ثماني سنوات من القتال المرير، حوالي 140 شهيداً من وادي سوف. معاناة السكان من الحرب لكنهم بقوا صامدين.",
        },
        {
          subtitle: language === "en" ? "Path to Independence" : "الطريق إلى الاستقلال",
          content:
            language === "en"
              ? "The revolutionaries organized networks for weapons smuggling through Tunisian borders, recruited fighters, and maintained popular support. Military and civil resistance sustained the eight-year struggle. On July 5, 1962, Algeria achieved independence, liberating Wad Souf and fulfilling the dream of freedom and national sovereignty."
              : "تنظيم شبكات لتهريب الأسلحة والتجنيد. الدعم الشعبي المستمر. حققت الجزائر الاستقلال 5 جويلية 1962، محررة وادي سوف.",
        },
      ],
    },
    {
      period: language === "en" ? "Modern Era" : "العصر الحديث",
      title: language === "en" ? "Development & Preservation" : "التنمية والحفظ",
      desc:
        language === "en"
          ? "Post-independence focus on infrastructure development while maintaining the region's unique heritage."
          : "التركيز بعد الاستقلال على تطوير البنية التحتية مع الحفاظ على التراث الفريد للمنطقة.",
      subsections: [
        {
          subtitle:
            language === "en" ? "Reconstruction & Development (1962-2000)" : "إعادة البناء والتنمية (1962-2000)",
          content:
            language === "en"
              ? "Infrastructure development included national roads, water and sewage networks, electricity grids, and an international airport (Hassi Messaoud). Administrative institutions were established: the Wilaya (provincial capital), municipalities, courts, and security services. Educational institutions expanded with schools, secondary schools, and the founding of Martyr Hamah Lakhdar University as a major research center."
              : "تطوير البنية التحتية: الطرق الوطنية، شبكات المياه، الكهرباء، المطار. إنشاء مؤسسات إدارية وتعليمية. تأسيس جامعة الشهيد حمه لخضر.",
        },
        {
          subtitle: language === "en" ? "Agricultural Revolution" : "الثورة الزراعية",
          content:
            language === "en"
              ? "The introduction of potato cultivation (starting 1992) transformed the economy—called 'meat of the poor,' it became a massive success story. The region now produces millions of tons annually for national and international markets. Alongside traditional date palm cultivation and tomato production, agriculture became a major economic driver with modern irrigation systems and 12,466 farmer beneficiaries."
              : "تطوير زراعة البطاطس ابتداء من 1992، أصبحت 'لحم الفقراء' وحققت نجاحاً باهراً. ملايين الأطنان سنوياً. مع نخيل التمر والطماطم، أصبحت الزراعة محرك اقتصادي رئيسي.",
        },
        {
          subtitle:
            language === "en" ? "Modern Investments & Heritage Preservation" : "الاستثمارات الحديثة وحفظ التراث",
          content:
            language === "en"
              ? "Development of special economic zones, business incubators, renewable energy projects (solar power), and food processing industries. Simultaneously, government programs document intangible heritage, protect traditional crafts, restore historical landmarks, and promote cultural tourism. Annual festivals celebrate folk arts, traditional music, the Nakha dance, and Soufi cuisine. Martyr Hamah Lakhdar University conducts advanced research on history, culture, and regional development."
              : "تطوير مناطق اقتصادية خاصة، حاضنات أعمال، مشاريع الطاقة المتجددة. برامج حكومية للحفاظ على التراث، استعادة المعالم التاريخية، تطوير السياحة الثقافية. مهرجانات سنوية تحتفل بالفنون الشعبية والموسيقى التقليدية.",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          title={t("nav.history")}
          subtitle={language === "en" ? "Chronicles of the Desert Sands" : "يوميات رمال الصحراء"}
          breadcrumb={[{ label: t("nav.history") }]}
        />

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-desert-pattern pointer-events-none" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent transform md:-translate-x-1/2" />

                <div className="space-y-12 md:space-y-0">
                  {historicalPeriods.map((event, i) => (
                    <div
                      key={i}
                      className={cn(
                        "relative flex items-start justify-between md:mb-24 last:mb-0",
                        i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row",
                      )}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 z-10 shadow-lg shadow-primary/20" />

                      {/* Content Card */}
                      <div
                        className={cn(
                          "w-full md:w-[45%] pl-12 md:pl-0",
                          i % 2 === 0 ? "md:text-right" : "md:text-left",
                        )}
                      >
                        <div className="group rounded-2xl bg-white/50 backdrop-blur-sm border border-primary/10 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                          <button
                            onClick={() => setExpandedPeriod(expandedPeriod === i ? null : i)}
                            className="w-full p-8 text-left hover:bg-white/30 transition-colors"
                          >
                            <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                              {event.period}
                            </div>
                            <h3 className="text-2xl font-heritage mb-4 group-hover:text-secondary transition-colors flex items-center justify-between">
                              {event.title}
                              <ChevronDown
                                size={20}
                                className={cn("transition-transform", expandedPeriod === i ? "rotate-180" : "")}
                              />
                            </h3>
                            <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base">
                              {event.desc}
                            </p>
                          </button>

                          {/* Expandable subsections */}
                          {expandedPeriod === i && (
                            <div className="border-t border-primary/10 px-8 py-6 bg-white/30 space-y-6">
                              {event.subsections?.map((sub, j) => (
                                <div key={j} className="space-y-2">
                                  <h4 className="font-heritage text-lg text-primary">{sub.subtitle}</h4>
                                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                    {sub.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Spacer for the other side on desktop */}
                      <div className="hidden md:block w-[45%]" />
                    </div>
                  ))}
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
