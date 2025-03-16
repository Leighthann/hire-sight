import type { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { PricingPlans } from "@/components/landing/pricing-plans"

export const metadata: Metadata = {
  title: "Pricing | HireSight",
  description: "Choose the right plan for your recruitment needs",
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-blue-400">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the plan that works best for your recruitment needs. All plans include our core AI-powered resume
            screening technology.
          </p>
        </div>

        <PricingPlans />
      </main>
    </div>
  )
}

