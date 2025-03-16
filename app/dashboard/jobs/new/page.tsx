"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function NewJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { isDemoMode, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: "",
    isActive: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.department || !formData.location) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (isDemoMode) {
        // Simulate API call in demo mode
        await new Promise((resolve) => setTimeout(resolve, 1500))

        toast({
          title: "Job created (Demo)",
          description: "Your job posting has been created successfully in demo mode.",
        })
      } else {
        // Actual Firebase implementation
        const jobData = {
          ...formData,
          createdBy: user?.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: formData.isActive ? "active" : "draft",
          applicants: 0,
          matchedCandidates: 0,
        }

        await addDoc(collection(db, "jobs"), jobData)

        toast({
          title: "Job created",
          description: "Your job posting has been created successfully.",
        })
      }

      router.push("/dashboard/jobs")
    } catch (error) {
      console.error("Error creating job:", error)
      toast({
        title: "Error",
        description: "There was an error creating the job posting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">Create New Job</h1>
        <p className="text-gray-400">Fill in the details to create a new job posting</p>
      </div>

      {isDemoMode && (
        <Card className="bg-blue-900/30 border-blue-800">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-400">
              You are in demo mode. Job creation will be simulated but not actually saved to a database.
            </p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="bg-gradient-card glow-effect">
          <CardHeader>
            <CardTitle className="text-gradient-brand">Job Details</CardTitle>
            <CardDescription className="text-gray-400">
              Enter the basic information about the job position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-200">
                Job Title<span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-200">
                  Department<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g. Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-200">
                  Location<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Remote, New York, NY"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-200">
                Job Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter a detailed description of the job..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="bg-gray-800 border-gray-700 text-white resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-gray-200">
                Requirements
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="List the skills, qualifications, and experience required..."
                value={formData.requirements}
                onChange={handleChange}
                rows={5}
                className="bg-gray-800 border-gray-700 text-white resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="isActive" className="text-gray-200">
                Publish job immediately
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/jobs")}
              disabled={isSubmitting}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-primary">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Job"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

