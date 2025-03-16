"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronRight, Info, User, FileText, Briefcase, Settings, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface OnboardingProps {
  userRole: "candidate" | "recruiter"
  onComplete?: () => void
}

export function UserOnboarding({ userRole, onComplete }: OnboardingProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showTour, setShowTour] = useState(true)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const [profileCompletion, setProfileCompletion] = useState(20)

  // Define onboarding steps based on user role
  const candidateSteps = [
    {
      title: "Welcome to HireSight",
      description: "Let's get you set up to find your dream job. Complete these steps to get started.",
      icon: User,
      action: {
        label: "Complete Profile",
        href: "/candidate/profile",
      },
    },
    {
      title: "Upload Your Resume",
      description: "Upload your resume to help us match you with the perfect opportunities.",
      icon: FileText,
      action: {
        label: "Upload Resume",
        href: "/candidate/profile/resume",
      },
    },
    {
      title: "Set Job Preferences",
      description: "Tell us what you're looking for so we can find the best matches.",
      icon: Briefcase,
      action: {
        label: "Set Preferences",
        href: "/candidate/profile/preferences",
      },
    },
    {
      title: "Explore Job Matches",
      description: "Browse jobs that match your skills and experience.",
      icon: CheckCircle2,
      action: {
        label: "View Jobs",
        href: "/candidate/jobs",
      },
    },
  ]

  const recruiterSteps = [
    {
      title: "Welcome to HireSight",
      description: "Let's get you set up to find the perfect candidates. Complete these steps to get started.",
      icon: User,
      action: {
        label: "Complete Profile",
        href: "/dashboard/settings",
      },
    },
    {
      title: "Create Your First Job",
      description: "Post a job to start attracting qualified candidates.",
      icon: Briefcase,
      action: {
        label: "Post Job",
        href: "/dashboard/jobs/new",
      },
    },
    {
      title: "Set Matching Preferences",
      description: "Configure how we match candidates to your positions.",
      icon: Settings,
      action: {
        label: "Set Preferences",
        href: "/dashboard/settings/matching",
      },
    },
    {
      title: "Explore Candidate Pool",
      description: "Browse pre-matched candidates for your open positions.",
      icon: CheckCircle2,
      action: {
        label: "View Candidates",
        href: "/dashboard/candidates",
      },
    },
  ]

  const steps = userRole === "candidate" ? candidateSteps : recruiterSteps

  // Feature spotlight data
  const spotlightFeatures = [
    {
      title: "AI-Powered Matching",
      description: "Our advanced AI analyzes resumes and job descriptions to find the perfect matches.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Skills Assessment",
      description: "Verify your skills with our assessment tools to stand out to employers.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Career Insights",
      description: "Get personalized career path recommendations and skill gap analysis.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Handle tour navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowTour(false)
      if (onComplete) onComplete()
    }
  }

  const skipTour = () => {
    setShowTour(false)
    if (onComplete) onComplete()
  }

  // Handle spotlight navigation
  const nextSpotlight = () => {
    if (spotlightIndex < spotlightFeatures.length - 1) {
      setSpotlightIndex(spotlightIndex + 1)
    } else {
      setShowSpotlight(false)
    }
  }

  return (
    <>
      {/* Guided Tour Dialog */}
      <Dialog open={showTour} onOpenChange={setShowTour}>
        <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gradient-brand">{steps[currentStep].title}</DialogTitle>
            <DialogDescription className="text-gray-400">{steps[currentStep].description}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center py-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 flex items-center justify-center">
              \{steps[currentStep].icon && <steps[currentStep].icon className="h-12 w-12 text-blue-400" />}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentStep ? "w-8 bg-gradient-to-r from-brand-500 to-blue-500" : "w-2 bg-gray-700",
                )}
              />
            ))}
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button variant="ghost" onClick={skipTour} className="text-gray-400 hover:text-white">
              Skip tour
            </Button>
            <div className="flex gap-2">
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} className="bg-gradient-primary">
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowTour(false)
                    router.push(steps[currentStep].action.href)
                  }}
                  className="bg-gradient-primary"
                >
                  {steps[currentStep].action.label}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feature Spotlight */}
      <Dialog open={showSpotlight} onOpenChange={setShowSpotlight}>
        <DialogContent className="sm:max-w-lg bg-gray-900 border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gradient-brand">{spotlightFeatures[spotlightIndex].title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {spotlightFeatures[spotlightIndex].description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center py-4">
            <img
              src={spotlightFeatures[spotlightIndex].image || "/placeholder.svg"}
              alt={spotlightFeatures[spotlightIndex].title}
              className="rounded-lg border border-gray-800 w-full h-auto"
            />
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            {spotlightFeatures.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === spotlightIndex ? "w-8 bg-gradient-to-r from-brand-500 to-blue-500" : "w-2 bg-gray-700",
                )}
              />
            ))}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowSpotlight(false)} className="text-gray-400 hover:text-white">
              Skip
            </Button>
            {spotlightIndex < spotlightFeatures.length - 1 ? (
              <Button onClick={nextSpotlight} className="bg-gradient-primary">
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => setShowSpotlight(false)} className="bg-gradient-primary">
                Got it
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Completion Card */}
      <Card className="bg-gradient-card glow-effect mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient-brand text-lg">Complete Your Profile</CardTitle>
          <CardDescription className="text-gray-400">
            Finish setting up your profile to get the most out of HireSight
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Profile completion</span>
              <span className="text-sm font-medium text-blue-400">{profileCompletion}%</span>
            </div>
            <Progress
              value={profileCompletion}
              className="h-2 bg-gray-800"
              indicatorClassName="bg-gradient-to-r from-brand-500 to-blue-500"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-primary"
            onClick={() => router.push(userRole === "candidate" ? "/candidate/profile" : "/dashboard/settings")}
          >
            Continue Setup
          </Button>
        </CardFooter>
      </Card>

      {/* Getting Started Checklist */}
      <Card className="bg-gradient-card glow-effect">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient-brand text-lg">Getting Started</CardTitle>
          <CardDescription className="text-gray-400">
            Complete these tasks to get the most out of HireSight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    index < 2 ? "bg-blue-500/20 text-blue-400" : "bg-gray-800 text-gray-500",
                  )}
                >
                  {index < 1 ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">{index + 1}</span>}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className={cn("text-sm font-medium", index < 2 ? "text-white" : "text-gray-400")}>
                      {step.title}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-500">
                            <Info className="h-3 w-3" />
                            <span className="sr-only">More info</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 border border-gray-800 text-gray-300">
                          {step.description}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => router.push(step.action.href)}
                  >
                    {step.action.label}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Contextual Help Tooltip */}
      <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-600 to-blue-500 shadow-lg"
                onClick={() => setShowSpotlight(true)}
              >
                <AlertCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 border border-gray-800 text-gray-300">
              Click for help and feature tour
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

