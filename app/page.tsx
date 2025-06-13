import HeroSection from "@/components/hero-section"
import SearchSection from "@/components/search-section"
import SoftwareCatalog from "@/components/software-catalog"
import RecommendationsSection from "@/components/recommendations-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <SearchSection />
      <SoftwareCatalog />
      <RecommendationsSection />
    </div>
  )
}
