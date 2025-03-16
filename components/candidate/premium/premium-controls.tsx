"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Eye, Award, Zap, Bell, Shield, CheckCircle, Lock, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Mock data for premium features
const mockPremiumFeatures = {
  tier: "free", // "free", "basic", "pro"
  profileViews: 32,
  profileViewsChange: 12,
  recruiterInterest: 5,
  recruiterInterestChange: 2,
  features: {
    profileBoost: false,
    featuredCandidate: false,
    priorityMatching: false,
    applicationHighlight: false,
    advancedAnalytics: false,
  },
}

const premiumTiers = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Basic visibility and job matching",
    features: ["Standard profile visibility", "Basic job recommendations", "Limited application tracking"],
    current: true,
  },
  {
    id: "basic",
    name: "Basic",
    price: "$9.99/month",
    description: "Enhanced visibility to recruiters",
    features: [
      "Profile boost in search results",
      "Featured candidate status",
      "Priority job matching",
      "Unlimited applications",
    ],
    current: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: "$19.99/month",
    description: "Maximum visibility and premium features",
    features: [
      "All Basic features",
      "Application highlighting",
      "Advanced analytics dashboard",
      "Direct recruiter messaging",
      "Resume review service",
    ],
    current: false,
  },
]

export function PremiumControls() {
  const [premiumFeatures, setPremiumFeatures] = useState(mockPremiumFeatures)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const { toast } = useToast()

  const handleFeatureToggle = (feature: keyof typeof premiumFeatures.features) => {
    if (premiumFeatures.tier === "free") {
      toast({
        title: "Premium Feature",
        description: "Upgrade your account to access this premium feature.",
      })
      return
    }

    setPremiumFeatures({
      ...premiumFeatures,
      features: {
        ...premiumFeatures.features,
        [feature]: !premiumFeatures.features[feature],
      },
    })

    toast({
      title: premiumFeatures.features[feature] ? "Feature Disabled" : "Feature Enabled",
      description: `${feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} has been ${premiumFeatures.features[feature] ? "disabled" : "enabled"}.`,
    })
  }

  const handleUpgrade = (tierId: string) => {
    setIsUpgrading(true)

    // Simulate API call
    setTimeout(() => {
      setPremiumFeatures({
        ...premiumFeatures,
        tier: tierId,
      })

      setIsUpgrading(false)

      toast({
        title: "Subscription Updated",
        description: `Your subscription has been updated to ${tierId.charAt(0).toUpperCase() + tierId.slice(1)}.`,
      })
    }, 1500)
  }

  const isFeatureAvailable = (feature: keyof typeof premiumFeatures.features) => {
    if (premiumFeatures.tier === "free") return false
    if (premiumFeatures.tier === "basic" && (feature === "advancedAnalytics" || feature === "applicationHighlight"))
      return false
    return true
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Analytics Card */}
        <Card className="bg-gradient-card glow-effect">
          <CardHeader>
            <CardTitle className="text-gradient-brand">Profile Analytics</CardTitle>
            <CardDescription className="text-gray-400">Track your profile performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-brand-400" />
                    <span className="text-sm font-medium text-gray-300">Profile Views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-white">{premiumFeatures.profileViews}</span>
                    <span className="text-xs text-green-400">
                      <TrendingUp className="inline h-3 w-3 mr-0.5" />
                      {premiumFeatures.profileViewsChange}
                    </span>
                  </div>
                </div>
                <Progress value={65} className="h-2 bg-gray-800" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-brand-400" />
                    <span className="text-sm font-medium text-gray-300">Recruiter Interest</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-white">{premiumFeatures.recruiterInterest}</span>
                    <span className="text-xs text-green-400">
                      <TrendingUp className="inline h-3 w-3 mr-0.5" />
                      {premiumFeatures.recruiterInterestChange}
                    </span>
                  </div>
                </div>
                <Progress value={40} className="h-2 bg-gray-800" />
              </div>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-amber-900/30 p-2">
                  <Star className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Boost Your Visibility</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Upgrade to Premium to increase your profile visibility and get more recruiter attention.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Features Card */}
        <Card className="bg-gradient-card glow-effect">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gradient-brand">Premium Features</CardTitle>
              <Badge
                className={cn(
                  "bg-gradient-to-r border",
                  premiumFeatures.tier === "pro"
                    ? "from-purple-600/80 to-purple-700/80 border-purple-800 text-white"
                    : premiumFeatures.tier === "basic"
                      ? "from-brand-500/80 to-brand-600/80 border-brand-700 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-400",
                )}
              >
                {premiumFeatures.tier === "free"
                  ? "Free Tier"
                  : premiumFeatures.tier === "basic"
                    ? "Basic Tier"
                    : "Pro Tier"}
              </Badge>
            </div>
            <CardDescription className="text-gray-400">Enhance your job search with premium features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-brand-400" />
                  <Label htmlFor="profileBoost" className="text-sm font-medium text-gray-300">
                    Profile Boost
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("profileBoost") && <Lock className="h-4 w-4 text-gray-500 mr-2" />}
                  <Switch
                    id="profileBoost"
                    checked={premiumFeatures.features.profileBoost}
                    onCheckedChange={() => handleFeatureToggle("profileBoost")}
                    disabled={!isFeatureAvailable("profileBoost")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-brand-400" />
                  <Label htmlFor="featuredCandidate" className="text-sm font-medium text-gray-300">
                    Featured Candidate
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("featuredCandidate") && <Lock className="h-4 w-4 text-gray-500 mr-2" />}
                  <Switch
                    id="featuredCandidate"
                    checked={premiumFeatures.features.featuredCandidate}
                    onCheckedChange={() => handleFeatureToggle("featuredCandidate")}
                    disabled={!isFeatureAvailable("featuredCandidate")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-brand-400" />
                  <Label htmlFor="priorityMatching" className="text-sm font-medium text-gray-300">
                    Priority Matching
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("priorityMatching") && <Lock className="h-4 w-4 text-gray-500 mr-2" />}
                  <Switch
                    id="priorityMatching"
                    checked={premiumFeatures.features.priorityMatching}
                    onCheckedChange={() => handleFeatureToggle("priorityMatching")}
                    disabled={!isFeatureAvailable("priorityMatching")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-brand-400" />
                  <Label htmlFor="applicationHighlight" className="text-sm font-medium text-gray-300">
                    Application Highlight
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("applicationHighlight") && <Lock className="h-4 w-4 text-gray-500 mr-2" />}
                  <Switch
                    id="applicationHighlight"
                    checked={premiumFeatures.features.applicationHighlight}
                    onCheckedChange={() => handleFeatureToggle("applicationHighlight")}
                    disabled={!isFeatureAvailable("applicationHighlight")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4 text-brand-400" />
                  <Label htmlFor="advancedAnalytics" className="text-sm font-medium text-gray-300">
                    Advanced Analytics
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  {!isFeatureAvailable("advancedAnalytics") && <Lock className="h-4 w-4 text-gray-500 mr-2" />}
                  <Switch
                    id="advancedAnalytics"
                    checked={premiumFeatures.features.advancedAnalytics}
                    onCheckedChange={() => handleFeatureToggle("advancedAnalytics")}
                    disabled={!isFeatureAvailable("advancedAnalytics")}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Tiers */}
      <Card className="bg-gradient-card glow-effect">
        <CardHeader>
          <CardTitle className="text-gradient-brand">Subscription Plans</CardTitle>
          <CardDescription className="text-gray-400">Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {premiumTiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "rounded-lg border p-6 transition-all",
                  tier.current
                    ? "border-brand-700 bg-gradient-to-r from-brand-950/50 to-gray-900/80 shadow-lg shadow-brand-900/20"
                    : "border-gray-700 bg-gray-800/30 hover:border-gray-600",
                )}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-white">{tier.name}</h3>
                  {tier.current && <Badge className="bg-brand-500/80 text-white border-brand-700">Current</Badge>}
                </div>

                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-bold text-white">{tier.price}</span>
                </div>

                <p className="mt-2 text-sm text-gray-400">{tier.description}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-brand-400 shrink-0 mr-2" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {tier.current ? (
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-gradient-primary"
                      onClick={() => handleUpgrade(tier.id)}
                      disabled={isUpgrading}
                    >
                      {isUpgrading ? "Upgrading..." : `Upgrade to ${tier.name}`}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-800 pt-6">
          <p className="text-sm text-gray-400">
            All plans include a 7-day free trial. You can cancel anytime during the trial period.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

