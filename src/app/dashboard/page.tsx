"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, FileText, Users, TrendingUp, Clock, Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data - in a real app, this would come from your API
const mockStats = {
  activeJobs: 12,
  pendingResumes: 48,
  screenedCandidates: 124,
  matchRate: 68,
}

const mockRecentActivity = [
  {
    id: 1,
    type: "resume",
    title: "Senior Frontend Developer",
    candidate: "Alex Johnson",
    time: "2 hours ago",
    matchScore: 92,
  },
  {
    id: 2,
    type: "resume",
    title: "UX Designer",
    candidate: "Maria Garcia",
    time: "3 hours ago",
    matchScore: 88,
  },
  {
    id: 3,
    type: "job",
    title: "DevOps Engineer",
    action: "created",
    time: "5 hours ago",
  },
  {
    id: 4,
    type: "resume",
    title: "Product Manager",
    candidate: "James Wilson",
    time: "Yesterday",
    matchScore: 76,
  },
  {
    id: 5,
    type: "job",
    title: "Backend Developer",
    action: "updated",
    time: "Yesterday",
  },
]

const mockTopCandidates = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Frontend Developer",
    matchScore: 92,
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    name: "Maria Garcia",
    position: "UX Designer",
    matchScore: 88,
    skills: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 3,
    name: "James Wilson",
    position: "Product Manager",
    matchScore: 76,
    skills: ["Agile", "Product Strategy", "User Stories"],
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.displayName || "User"}</h1>
          <p className="text-muted-foreground">Here's an overview of your recruitment activities</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href="/dashboard/jobs/new">Post New Job</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/resumes/upload">Upload Resumes</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{mockStats.activeJobs}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{mockStats.pendingResumes}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Screened Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">{mockStats.screenedCandidates}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Match Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{mockStats.matchRate}%</div>
                <Progress value={mockStats.matchRate} className="h-2 w-16" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Recent Activity and Top Candidates */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest recruitment activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 rounded-lg border p-3">
                        <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                          {activity.type === "resume" ? (
                            <FileText className="h-5 w-5 text-brand-500" />
                          ) : (
                            <Briefcase className="h-5 w-5 text-brand-500" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">
                            {activity.type === "resume"
                              ? `New resume for ${activity.title}`
                              : `Job ${activity.action}: ${activity.title}`}
                          </p>
                          {activity.type === "resume" && (
                            <p className="text-sm text-muted-foreground">Candidate: {activity.candidate}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                            {activity.type === "resume" && activity.matchScore && (
                              <div className="flex items-center space-x-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                <Award className="h-3 w-3" />
                                <span>{activity.matchScore}% Match</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Candidates</CardTitle>
              <CardDescription>Highest matching candidates across all your job postings</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="mb-4 flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="space-y-4">
                  {mockTopCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-start space-x-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{candidate.name}</h4>
                          <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {candidate.matchScore}% Match
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {candidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

