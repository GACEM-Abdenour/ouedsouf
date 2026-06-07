import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/home/hero"
import { Intro } from "@/components/home/intro"
import { Statistics } from "@/components/home/statistics"
import { Categories } from "@/components/home/categories"
import { FeaturedSections } from "@/components/home/featured-sections"
import { FeaturedElement } from "@/components/home/featured-element"
import { SourcesNotice } from "@/components/home/sources-notice"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Statistics />
        <Categories />
        <FeaturedSections />
        <FeaturedElement />
        <SourcesNotice />
      </main>
      <Footer />
    </div>
  )
}
