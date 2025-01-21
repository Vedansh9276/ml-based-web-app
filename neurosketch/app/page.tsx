import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FuturisticBackground } from "@/components/futuristic-background"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      <NavBar />
      <HeroSection />
      <FeaturesSection />
    </main>
  )
}

