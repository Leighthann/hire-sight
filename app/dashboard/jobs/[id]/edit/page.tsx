"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { isDemoMode, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: "",
    isActive: true,
  })

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true)

      try {
        if (isDemoMode) {
          // Use mock data in demo mode
          await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay
          setFormData({
            title: "Senior Frontend Developer",
            department: "Engineering",
            location: "Remote",
            description:
              "We are looking for a Senior Frontend Developer to join our team. The ideal candidate will have experience with React, TypeScript, and modern frontend development practices.",
            requirements:
              "- 5+ years of experience with React\n- Strong TypeScript skills\n- Experience with state management libraries\n- Knowledge of modern CSS and responsive design\n- Experience with testing frameworks",
            isActive: true,
          })
        } else {
          // Fetch from Firebase
          const jobDoc = await getDoc(doc(db, "jobs", params.id))

          if (jobDoc.exists()) {
            const jobData = jobDoc.data()
            setFormData({
              title: jobData.title || "",
              department: jobData.department || "",
              location: jobData.location || "",
              description: jobData.description || "",
              requirements: jobData.requirements || "",
              isActive: jobData.status === "active",
            })
          } else {
            toast({
              title: "Job not found",
              description: "The requested job posting could not be found.",
              variant: "destructive",
            })
            router.push("/dashboard/jobs")
          }
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
        toast({
          title: "Error",
          description: "There was an error loading the job details.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [params.id, isDemoMode, router, toast])

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
          title: "Job updated (Demo)",
          description: "Your job posting has been updated successfully in demo mode.",
        })
      } else {
        // Actual Firebase implementation
        const jobData = {
          ...formData,
          updatedBy: user?.uid,
          updatedAt: serverTimestamp(),
          status: formData.isActive ? "active" : "inactive",
        }

        await updateDoc(doc(db, "jobs", params.id), jobData)

        toast({
          title: "Job updated",
          description: "Your job posting has been updated successfully.",
        })
      }

      router.push(`/dashboard/jobs/${params.id}`)
    } catch (error) {
      console.error("Error updating job:", error)
      toast({
        title: "Error",
        description: "There was an error updating the job posting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-500" />
          <h2 className="mt-4 text-lg font-semibold">Loading job details...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Link href={`/dashboard/jobs/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gradient">Edit Job</h1>
            <p className="text-gray-400">Update the details of your job posting</p>
          </div>
        </div>
      </div>

      {isDemoMode && (
        <Card className="bg-blue-900/30 border-blue-800">
          <CardContent className="py-3">
            <p className="text-sm text-blue-400">
              You are in demo mode. Job updates will be simulated but not actually saved to a database.
            </p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="bg-gradient-card glow-effect">
          <CardHeader>
            <CardTitle className="text-gradient-brand">Job Details</CardTitle>
            <CardDescription className="text-gray-400">Update the information about the job position</CardDescription>
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
                Job is active and visible to candidates
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/jobs/${params.id}`)}
              disabled={isSubmitting}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-primary">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Job"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

