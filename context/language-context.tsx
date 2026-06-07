"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  year: number;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Wadi Souf",
    "nav.heritage": "Heritage",
    "nav.architecture": "Architecture",
    "nav.traditions": "Traditions",
    "nav.clothing": "Traditional Clothing",
    "nav.history": "History",
    "nav.sources": "Sources",
    "nav.project": "About Project",
    "nav.sites": "Sites",
    "nav.figures": "Figures",
    "nav.crafts": "Crafts",
    "nav.gallery": "Gallery",
    "nav.artisans": "Artisans",
    "nav.certified": "Certified Heritage",
    "nav.login": "Login",
    "nav.dashboard": "Dashboard",
    "nav.admin": "Admin",
    "auth.register": "Register",
    "auth.subscribe": "Subscribe",
    "auth.activeSubscription": "Active Subscription",
    "certified.locked": "Locked Content",
    "marketplace.title": "Artisan Marketplace",
    "marketplace.browse": "Browse Artisans",
    "marketplace.profile": "Artisan Profile",
    "marketplace.addService": "Add Service",
    "marketplace.editService": "Edit Service",
    "marketplace.contact": "Contact Artisan",
    "marketplace.noCommission": "No Commission",
    "marketplace.noPayments": "The platform does not process payments",
    "admin.manageUsers": "Manage Users",
    "admin.manageArtisans": "Manage Artisans",
    "admin.verifyArtisan": "Verify Artisan",
    "status.published": "Published",
    "status.unpublished": "Unpublished",
    "hero.title": "Wadi Souf: City of a Thousand Domes",
    "hero.subtitle":
      "Explore the historical and cultural treasures in the heart of the Algerian desert",
    "hero.description":
      "The capital of the green revolution and the city of poets and poetry",
    "hero.cta": "Start Exploration",
    "intro.title": "The Desert Jewel",
    "intro.text":
      "Wadi Souf, located in southeastern Algeria, is renowned for its unique architectural heritage, rich traditions, and distinctive cultural identity. This platform serves as a digital archive documenting the tangible and intangible heritage of this remarkable region.",
    "categories.title": "Exploring the Pillars of Soufi Heritage",
    "stats.location.title": "Location",
    "stats.location.value": "Wadi Souf, Algeria",
    "stats.history.title": "Settlement History",
    "stats.history.value": "600+",
    "stats.poets.title": "Poets",
    "stats.poets.value": "1,000+",
    "stats.agriculture.title": "Agricultural Area",
    "stats.agriculture.value": "120K",
    "stats.jobs.title": "Job Opportunities",
    "stats.jobs.value": "150K",
    "stats.revenue.title": "Annual Revenue",
    "stats.revenue.value": "255B",
    "footer.about":
      "A premium cultural heritage platform dedicated to preserving the historical treasures of Wadi Souf.",
    "footer.copyright":
      "© {year} Wadi Souf Heritage Platform. All rights reserved.",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "عن وادي سوف",
    "nav.heritage": "التراث",
    "nav.architecture": "العمارة",
    "nav.traditions": "التقاليد",
    "nav.clothing": "اللباس التقليدي",
    "nav.history": "التاريخ",
    "nav.sources": "المصادر",
    "nav.project": "حول المشروع",
    "nav.sites": "المواقع التاريخية",
    "nav.figures": "الشخصيات",
    "nav.crafts": "الحرف",
    "nav.gallery": "المعرض",
    "nav.artisans": "الحرفيون",
    "nav.certified": "التراث المعتمد",
    "nav.login": "دخول",
    "nav.dashboard": "لوحة التحكم",
    "nav.admin": "الإدارة",
    "auth.register": "تسجيل",
    "auth.subscribe": "اشتراك",
    "auth.activeSubscription": "اشتراك نشط",
    "certified.locked": "محتوى مقفل",
    "marketplace.title": "سوق الحرفيين",
    "marketplace.browse": "تصفح الحرفيين",
    "marketplace.profile": "ملف الحرفي",
    "marketplace.addService": "إضافة خدمة",
    "marketplace.editService": "تعديل الخدمة",
    "marketplace.contact": "تواصل مع الحرفي",
    "marketplace.noCommission": "بدون عمولة",
    "marketplace.noPayments": "لا تعالج المنصة المدفوعات",
    "admin.manageUsers": "إدارة المستخدمين",
    "admin.manageArtisans": "إدارة الحرفيين",
    "admin.verifyArtisan": "توثيق الحرفي",
    "status.published": "منشور",
    "status.unpublished": "غير منشور",
    "hero.title": "وادي سوف: مدينة الألف قبة وقبة",
    "hero.subtitle": "استكشف واحة التاريخ والثقافة في قلب الصحراء الجزائرية",
    "hero.description": "عاصمة الثورة الخضراء ومدينة الشعراء والشعر",
    "hero.cta": "ابدأ الاستكشاف",
    "intro.title": "جوهرة الصحراء",
    "intro.text":
      "تُعرف منطقة وادي سوف، الواقعة في الجنوب الشرقي للجزائر، بتراثها المعماري الفريد وتقاليدها الغنية وهويتها الثقافية المميزة. تعمل هذه المنصة كأرشيف رقمي لتوثيق التراث المادي وغير المادي لهذه المنطقة الرائعة.",
    "categories.title": "استكشاف ركائز التراث السوفي",
    "stats.location.title": "الموقع",
    "stats.location.value": "وادي سوف، الجزائر",
    "stats.history.title": "تاريخ الاستقرار",
    "stats.history.value": "600+",
    "stats.poets.title": "عدد الشعراء",
    "stats.poets.value": "1,000+",
    "stats.agriculture.title": "المساحة الزراعية",
    "stats.agriculture.value": "120K",
    "stats.jobs.title": "فرص العمل",
    "stats.jobs.value": "150K",
    "stats.revenue.title": "الإيرادات السنوية",
    "stats.revenue.value": "255B",
    "footer.about":
      "منصة وادي سوف التراثية: بوابة رقمية لاستكشاف الكنوز التاريخية والثقافية للمنطقة.",
    "footer.copyright": "© {year} منصة وادي سوف التراثية. جميع الحقوق محفوظة.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved);
    }
    // Update year when component mounts and whenever year changes
    setYear(new Date().getFullYear());
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string) => {
    const text =
      translations[language][key as keyof (typeof translations)["en"]] || key;
    return text.replace("{year}", year.toString());
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t, dir, year }}
    >
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
