"use client"

import { useState, useEffect } from "react"
import { ApplicationCart } from "@/components/candidate/cart/application-cart"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export default function ApplicationQueuePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-8 w-full max-w-2xl mb-6" />
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient-brand mb-2">Application Queue</h1>
        <p className="text-gray-400 max-w-2xl">
          Review and submit your job applications. You can apply to multiple jobs at once to save time and increase your
          chances of finding the perfect position.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-xl">
          <CardHeader className="border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-brand-900/30 p-2">
                <ClipboardList className="h-5 w-5 text-brand-400" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">Your Application Queue</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your job applications before submitting
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ApplicationCart />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-xl">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-gradient-brand">Application Tips</CardTitle>
            <CardDescription className="text-gray-400">Maximize your chances of getting hired</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-800/50 p-4 border border-gray-700">
                <h3 className="font-medium text-brand-400 mb-2">Personalize Your Cover Letters</h3>
                <p className="text-gray-300 text-sm">
                  Tailor each cover letter to the specific job. Mention the company name and how your skills match their
                  requirements.
                </p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-4 border border-gray-700">
                <h3 className="font-medium text-brand-400 mb-2">Apply to Jobs That Match Your Skills</h3>
                <p className="text-gray-300 text-sm">
                  Focus on jobs with higher match scores. Our AI analyzes your resume against job requirements to find
                  the best fits.
                </p>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-4 border border-gray-700">
                <h3 className="font-medium text-brand-400 mb-2">Follow Up After Applying</h3>
                <p className="text-gray-300 text-sm">
                  Wait one week after applying, then send a polite follow-up email expressing your continued interest in
                  the position.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

