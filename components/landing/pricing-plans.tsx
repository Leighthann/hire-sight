"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started with recruitment",
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        "Up to 25 resume scans per month",
        "Basic candidate matching",
        "Job posting management",
        "Email support",
        "1 user account",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing companies with regular hiring needs",
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        "Up to 100 resume scans per month",
        "Advanced candidate matching",
        "Custom screening criteria",
        "Candidate communication tools",
        "Analytics dashboard",
        "Priority email support",
        "5 user accounts",
      ],
      cta: "Try Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with high-volume recruitment",
      monthlyPrice: 249,
      annualPrice: 2390,
      features: [
        "Unlimited resume scans",
        "AI-powered talent pool",
        "Custom integration options",
        "Advanced analytics and reporting",
        "Dedicated account manager",
        "24/7 priority support",
        "Unlimited user accounts",
        "Custom branding options",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center space-x-4 mb-12">
        <Label htmlFor="billing-toggle" className={`text-lg ${!isAnnual ? "text-white" : "text-gray-400"}`}>
          Monthly
        </Label>
        <div className="flex items-center">
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-gradient-to-r from-brand-500 to-blue-600"
          />
        </div>
        <Label htmlFor="billing-toggle" className={`text-lg ${isAnnual ? "text-white" : "text-gray-400"}`}>
          Annual <span className="text-brand-500 font-medium">Save 20%</span>
        </Label>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative border border-gray-800 bg-gray-900/50 backdrop-blur-sm ${
              plan.popular ? "ring-2 ring-brand-500 shadow-lg shadow-brand-500/20" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-gradient-to-r from-brand-500 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-4xl font-bold">${isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                <span className="text-gray-400 ml-2">{isAnnual ? "/year" : "/month"}</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-brand-500 mr-2 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center bg-gray-900/50 border border-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          We offer tailored solutions for organizations with specific requirements. Contact our sales team to discuss
          your needs.
        </p>
        <Button className="bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700">
          Contact Sales
        </Button>
      </div>
    </div>
  )
}

