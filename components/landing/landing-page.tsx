"use client"

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { CandidatePortalSection } from "@/components/landing/candidate-portal-section"
import { useThemeFix } from "@/hooks/use-theme-fix"

export function LandingPage() {
  // Ensure dark mode is properly applied
  useThemeFix()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <CandidatePortalSection />
      </main>
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} HireSight. All rights reserved.</p>
      </footer>
    </div>
  )
}

