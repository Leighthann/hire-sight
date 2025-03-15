"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResumeUploader } from "@/components/resume-uploader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Mock data - in a real app, this would come from your API
const mockJobs = [
  { id: "1", title: "Senior Frontend Developer" },
  { id: "2", title: "UX Designer" },
  { id: "3", title: "Product Manager" },
  { id: "4", title: "DevOps Engineer" },
  { id: "5", title: "Backend Developer" },
]

export default function UploadResumesPage() {
  const router = useRouter()
  const [selectedJob, setSelectedJob] = useState<string>("")
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleUploadComplete = (files: File[]) => {
    setUploadComplete(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Resumes</h1>
        <p className="text-muted-foreground">Upload candidate resumes for AI-powered screening</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resume Upload</CardTitle>
          <CardDescription>Upload resumes in PDF, DOC, or DOCX format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="job">Select Job Posting</Label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger id="job">
                <SelectValue placeholder="Select a job posting" />
              </SelectTrigger>
              <SelectContent>
                {mockJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ResumeUploader onUploadComplete={handleUploadComplete} />

          {uploadComplete && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => router.push("/dashboard/resumes")}>
                View All Resumes
              </Button>
              <Button onClick={() => router.push(`/dashboard/jobs/${selectedJob}/candidates`)} disabled={!selectedJob}>
                View Matched Candidates
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

