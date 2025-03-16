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
          <h1 className="text-2xl font-bold tracking-tight text-gradient">
            Welcome back, {user?.displayName || "User"}
          </h1>
          <p className="text-gray-400">Here's an overview of your recruitment activities</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild className="bg-gradient-primary">
            <Link href="/dashboard/jobs/new">Post New Job</Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-700 hover:bg-gray-800">
            <Link href="/dashboard/resumes/upload">Upload Resumes</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card glow-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-brand-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20 bg-gray-800" />
            ) : (
              <div className="text-2xl font-bold text-white">{mockStats.activeJobs}</div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-card glow-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Pending Resumes</CardTitle>
            <FileText className="h-4 w-4 text-brand-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20 bg-gray-800" />
            ) : (
              <div className="text-2xl font-bold text-white">{mockStats.pendingResumes}</div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-card glow-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Screened Candidates</CardTitle>
            <Users className="h-4 w-4 text-brand-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20 bg-gray-800" />
            ) : (
              <div className="text-2xl font-bold text-white">{mockStats.screenedCandidates}</div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-card glow-effect">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Match Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-brand-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20 bg-gray-800" />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-white">{mockStats.matchRate}%</div>
                <Progress value={mockStats.matchRate} className="h-2 w-16 bg-gray-800" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Recent Activity and Top Candidates */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Recent Activity
          </TabsTrigger>
          <TabsTrigger
            value="candidates"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
          >
            Top Candidates
          </TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest recruitment activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px] bg-gray-800" />
                          <Skeleton className="h-4 w-[200px] bg-gray-800" />
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 rounded-lg border border-gray-700 bg-gray-800/30 p-3 hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="rounded-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 p-2 shrink-0">
                          {activity.type === "resume" ? (
                            <FileText className="h-5 w-5 text-brand-400" />
                          ) : (
                            <Briefcase className="h-5 w-5 text-brand-400" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium text-white">
                            {activity.type === "resume"
                              ? `New resume for ${activity.title}`
                              : `Job ${activity.action}: ${activity.title}`}
                          </p>
                          {activity.type === "resume" && (
                            <p className="text-sm text-gray-400">Candidate: {activity.candidate}</p>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                            {activity.type === "resume" && activity.matchScore && (
                              <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-green-500/20 to-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400 w-fit">
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
          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Top Candidates</CardTitle>
              <CardDescription className="text-gray-400">
                Highest matching candidates across all your job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="mb-4 flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px] bg-gray-800" />
                        <Skeleton className="h-4 w-[200px] bg-gray-800" />
                      </div>
                    </div>
                  ))
              ) : (
                <div className="space-y-4">
                  {mockTopCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-start space-x-4 rounded-lg border border-gray-700 bg-gray-800/30 p-4 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 text-xl font-bold text-white">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{candidate.name}</h4>
                          <div className="rounded-full bg-gradient-to-r from-green-500/20 to-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                            {candidate.matchScore}% Match
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{candidate.position}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {candidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-gray-800 border border-gray-700 px-2 py-0.5 text-xs font-medium text-gray-300"
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

