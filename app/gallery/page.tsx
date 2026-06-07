"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/common/page-hero";
import { useLanguage } from "@/context/language-context";
import Image from "next/image";

export default function GalleryPage() {
  const { t, language } = useLanguage();

  const images = [
    { src: "/placeholder.svg", alt: "Panorama of El Oued" },
    { src: "/placeholder.svg", alt: "Heritage Doorway" },
    { src: "/placeholder.svg", alt: "Golden Dunes" },
    { src: "/placeholder.svg", alt: "Dome Interior" },
    { src: "/placeholder.svg", alt: "Local Face" },
    { src: "/placeholder.svg", alt: "Desert Night" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <PageHero
          title={language === "en" ? "Photo Gallery" : "معرض الصور"}
          subtitle={
            language === "en"
              ? "Visual Journey Through Wadi Souf"
              : "رحلة بصرية عبر وادي سوف"
          }
          breadcrumb={[{ label: language === "en" ? "Gallery" : "المعرض" }]}
        />
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {images.map((image, i) => (
                <div
                  key={i}
                  className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-lg"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
