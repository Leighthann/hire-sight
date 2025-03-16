"use client"

import { useState } from "react"
import { ArrowRight, Check, FileText, HelpCircle, Info, PieChart, Star, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for subscription plans
const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    billing: "Free",
    description: "Essential features for job seekers",
    features: [
      { name: "Resume Upload & Analysis", included: true },
      { name: "Job Recommendations", included: true, limit: "10 per month" },
      { name: "Application Tracking", included: true },
      { name: "Skills Assessment", included: false },
      { name: "Career Development Insights", included: false },
      { name: "Industry Insights Dashboard", included: false },
      { name: "Premium Support", included: false },
    ],
    popular: false,
    current: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: 19.99,
    billing: "monthly",
    description: "Advanced features for serious job seekers",
    features: [
      { name: "Resume Upload & Analysis", included: true, enhanced: true },
      { name: "Job Recommendations", included: true, limit: "Unlimited", enhanced: true },
      { name: "Application Tracking", included: true, enhanced: true },
      { name: "Skills Assessment", included: true, limit: "5 per month" },
      { name: "Career Development Insights", included: true },
      { name: "Industry Insights Dashboard", included: false },
      { name: "Premium Support", included: false },
    ],
    popular: true,
    current: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 39.99,
    billing: "monthly",
    description: "Complete suite for career advancement",
    features: [
      { name: "Resume Upload & Analysis", included: true, enhanced: true },
      { name: "Job Recommendations", included: true, limit: "Unlimited", enhanced: true },
      { name: "Application Tracking", included: true, enhanced: true },
      { name: "Skills Assessment", included: true, limit: "Unlimited", enhanced: true },
      { name: "Career Development Insights", included: true, enhanced: true },
      { name: "Industry Insights Dashboard", included: true },
      { name: "Premium Support", included: true },
    ],
    popular: false,
    current: false,
  },
]

// Mock data for usage metrics
const usageMetrics = [
  { feature: "Job Applications", used: 18, limit: 25, unlimited: false },
  { feature: "Resume Analyses", used: 3, limit: 5, unlimited: false },
  { feature: "Skills Assessments", used: 2, limit: 5, unlimited: false },
  { feature: "Career Insights", used: 1, limit: 1, unlimited: true },
]

// Mock data for billing history
const billingHistory = [
  {
    id: "INV-2023-12",
    date: "2023-12-01",
    amount: 19.99,
    status: "Paid",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "INV-2023-11",
    date: "2023-11-01",
    amount: 19.99,
    status: "Paid",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "INV-2023-10",
    date: "2023-10-01",
    amount: 19.99,
    status: "Paid",
    paymentMethod: "Visa ending in 4242",
  },
]

export function SubscriptionManagement() {
  const [currentPlan, setCurrentPlan] = useState("pro")
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Premium Subscription</h2>
        <p className="text-muted-foreground">
          Manage your subscription, track usage, and view billing history.
        </p>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="features">Feature Access</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        {/* Subscription Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map(plan => (
              <Card 
                key={plan.id} 
                className={`relative border-border/40 ${
                  plan.current ? 'border-blue-500 bg-blue-950/20' : 'bg-background/95'
                } backdrop-blur supports-[backdrop-filter]:bg-background/60`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <Badge className="bg-green-600">Current Plan</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.billing}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className={`h-5 w-5 mt-0.5 ${feature.enhanced ? 'text-blue-400' : 'text-green-400'}`} />
                        ) : (
                          <Minus className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        )}
                        <div>
                          <span className={feature.enhanced ? 'text-blue-400 font-medium' : ''}>
                            {feature.name}
                          </span>
                          {feature.limit && (
                            <span className="text-sm text-muted-foreground block">
                              {feature.limit}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.current ? (
                    <Button className="w-full" variant="outline">
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full gap-1 bg-blue-600 hover:bg-blue-700">
                      {plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 border border-blue-500/30 bg-blue-950/10 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Subscription Benefits</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Premium subscribers receive priority access to new features, unlimited skills assessments, and personalized career coaching. Upgrade today to accelerate your job search and career growth.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <HelpCircle className="h-4 w-4" />
                    Compare Plans
                  </Button>
                  <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                    <Zap className="h-4 w-4" />
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Feature Access Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Feature Access</CardTitle>
              <CardDescription>
                Overview of features available with your current subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <h4 className="font-medium">Resume Analysis</h4>
                      <Badge className="ml-auto bg-green-600">Unlocked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      AI-powered resume analysis with keyword optimization and industry-specific recommendations.
                    </p>
                    <Button size="sm" className="gap-1">
                      <ArrowRight className="h-4 w-4" />
                      Use Feature
                    </Button>
                  </div>
                  
                  <div className="border border-border/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-5 w-5 text-blue-400" />
                      <h4 className="font-medium">Job Recommendations</h4>
                      <Badge className="ml-auto bg-green-600">Unlocked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Personalized job matches based on your skills, experience, and preferences.
                    </p>
                    <Button size="sm" className="gap-1">
                      <ArrowRight className="h-4 w-4" />
                      Use Feature
                    </Button>
                  </div>
                  
                  <div className="border border-border/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <PieChart className="h-5 w-5 text-blue-400" />
                      <h4 className="font-medium">Skills Assessment</h4>
                      <Badge className="ml-auto bg-green-600">Unlocked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Verify your skills with industry-standard assessments and earn certificates.
                    </p>
                    <Button size="sm" className="gap-1">
                      <ArrowRight className="h-4 w-4" />
                      Use Feature
                    </Button>
                  </div>
                  
                  <div className="border border-border/40 rounded-lg p-4">
                    <div className="flex items-\

