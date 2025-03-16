"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ResumesPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "Feature Not Available",
      description: "The Resumes management feature is coming soon.",
    })
  }, [toast])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resumes</h1>
        <p className="text-muted-foreground">Upload and manage candidate resumes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Resume Management</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            This feature is currently under development and will be available soon. You'll be able to upload, organize,
            and analyze candidate resumes.
          </p>
          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
            <Button onClick={() => router.push("/dashboard/candidates")}>View Candidates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

