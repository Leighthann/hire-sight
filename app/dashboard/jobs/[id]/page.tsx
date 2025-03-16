"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Calendar, MapPin, Building, Users, FileText, Edit } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demo mode
const mockJobDetails = {
  id: "1",
  title: "Senior Frontend Developer",
  department: "Engineering",
  location: "Remote",
  status: "active",
  postedDate: "2023-05-15",
  description:
    "We are looking for a Senior Frontend Developer to join our team. The ideal candidate will have experience with React, TypeScript, and modern frontend development practices.",
  requirements:
    "- 5+ years of experience with React\n- Strong TypeScript skills\n- Experience with state management libraries\n- Knowledge of modern CSS and responsive design\n- Experience with testing frameworks",
  applicants: 24,
  matchedCandidates: 8,
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { isDemoMode } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true)

      try {
        if (isDemoMode) {
          // Use mock data in demo mode
          await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay
          setJob({
            ...mockJobDetails,
            id: params.id,
          })
        } else {
          // Fetch from Firebase
          const jobDoc = await getDoc(doc(db, "jobs", params.id))

          if (jobDoc.exists()) {
            setJob({
              id: jobDoc.id,
              ...jobDoc.data(),
              // Format dates for display
              postedDate: jobDoc.data().createdAt
                ? new Date(jobDoc.data().createdAt.toDate()).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
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

        // In development, use mock data as fallback
        if (process.env.NODE_ENV === "development") {
          setJob({
            ...mockJobDetails,
            id: params.id,
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [params.id, isDemoMode, router, toast])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-[400px] rounded-lg" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Job Not Found</h2>
          <p className="text-muted-foreground">The job you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/jobs">Back to Jobs</Link>
          </Button>
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
            <Link href="/dashboard/jobs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gradient">{job.title}</h1>
            <p className="text-gray-400">
              {job.department} • {job.location}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            asChild
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Link href={`/dashboard/jobs/${job.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Job
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Link href={`/dashboard/jobs/${job.id}/candidates`}>
              <Users className="mr-2 h-4 w-4" />
              View Candidates
            </Link>
          </Button>
        </div>
      </div>

      {isDemoMode && (
        <Card className="bg-blue-900/30 border-blue-800">
          <CardContent className="py-3">
            <p className="text-sm text-blue-400">
              You are viewing demo data. In a real application, this would display actual job details from the database.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-gradient-card glow-effect">
          <CardHeader>
            <CardTitle className="text-gradient-brand">Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p className="whitespace-pre-line text-gray-300">{job.description || "No description provided."}</p>

              <h3 className="text-lg font-medium mt-6 mb-2 text-white">Requirements</h3>
              <p className="whitespace-pre-line text-gray-300">
                {job.requirements || "No specific requirements listed."}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 order-first md:order-last">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <Badge
                  variant={job.status === "active" ? "default" : "secondary"}
                  className={
                    job.status === "active"
                      ? "bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 hover:from-green-500/30 hover:to-green-500/20"
                      : ""
                  }
                >
                  {job.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Department</span>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{job.department}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Location</span>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{job.location}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Posted Date</span>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Candidates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Applicants</span>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{job.applicants || 0}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Matched Candidates</span>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{job.matchedCandidates || 0}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-primary" asChild>
                <Link href={`/dashboard/jobs/${job.id}/candidates`}>View All Candidates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

