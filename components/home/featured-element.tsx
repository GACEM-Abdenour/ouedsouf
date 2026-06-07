"use client";

import { useLanguage } from "@/context/language-context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FeaturedElement() {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative group">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/traditionalroom.png"
                alt="Traditional Ghorfa Architecture"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-md text-sm font-bold uppercase tracking-widest">
              {language === "en"
                ? "Featured Heritage Element"
                : "عنصر تراثي مميز"}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              {language === "en"
                ? "The Traditional Ghorfa"
                : "الغرفة التقليدية"}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {language === "en"
                  ? "The ghorfa represents one of the most distinctive architectural features of Wad Souf. These traditional rooms, built with specific techniques adapted to the desert environment, showcase the ingenious solutions developed by local communities over centuries."
                  : "تمثل الغرفة واحدة من أبرز المعالم المعمارية في وادي سوف. هذه الغرف التقليدية، التي بُنيت بتقنيات محددة تتكيف مع بيئة الصحراء، تبرز الحلول العبقرية التي طورها المجتمع المحلي عبر القرون."}
              </p>
              <p>
                {language === "en"
                  ? "Their vaulted roofs and thick walls provide natural thermal regulation, keeping the interior cool during harsh desert summers and warm during winter nights."
                  : "توفر سقوفها المقوسة وجدرانها السميكة تنظيماً حرارياً طبيعياً، مما يحافظ على برودة الداخل خلال صيف الصحراء القاسي ودفئه خلال ليالي الشتاء."}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 h-12 border-primary text-primary hover:bg-primary hover:text-white transition-all bg-transparent"
            >
              <Link href="/architecture">
                {language === "en"
                  ? "Read Full Article →"
                  : "اقرأ المقال كاملاً ←"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
