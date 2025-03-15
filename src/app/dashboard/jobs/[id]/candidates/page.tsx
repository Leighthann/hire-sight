"use client"

import { Input } from "@/components/ui/input"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Briefcase,
  Calendar,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - in a real app, this would come from your API
const mockJob = {
  id: "1",
  title: "Senior Frontend Developer",
  department: "Engineering",
  location: "Remote",
  status: "active",
  postedDate: "2023-05-15",
  description: "We are looking for a Senior Frontend Developer to join our team...",
  requirements: "5+ years of experience with React, TypeScript, and modern frontend development...",
}

const mockCandidates = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-15",
    matchScore: 92,
    skills: ["React", "TypeScript", "Node.js"],
    status: "reviewed",
  },
  {
    id: "2",
    name: "Maria Garcia",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-10",
    matchScore: 88,
    skills: ["React", "JavaScript", "CSS"],
    status: "pending",
  },
  {
    id: "3",
    name: "James Wilson",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-08",
    matchScore: 76,
    skills: ["React", "Redux", "HTML/CSS"],
    status: "reviewed",
  },
  {
    id: "4",
    name: "Sarah Chen",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-05",
    matchScore: 82,
    skills: ["React", "TypeScript", "GraphQL"],
    status: "pending",
  },
  {
    id: "5",
    name: "Michael Brown",
    position: "Senior Frontend Developer",
    appliedDate: "2023-04-20",
    matchScore: 65,
    skills: ["React", "JavaScript", "Bootstrap"],
    status: "rejected",
  },
]

export default function JobCandidatesPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState<typeof mockJob | null>(null)
  const [candidates, setCandidates] = useState<typeof mockCandidates>([])
  const [sortBy, setSortBy] = useState("matchScore")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setJob(mockJob)
      setCandidates(mockCandidates)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filteredCandidates = candidates
    .filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = filterStatus === "all" || candidate.status === filterStatus

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "matchScore") {
        return sortOrder === "asc" ? a.matchScore - b.matchScore : b.matchScore - a.matchScore
      } else if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "appliedDate") {
        return sortOrder === "asc"
          ? new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
          : new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      }
      return 0
    })

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
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/jobs/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{job.title}</h1>
            <p className="text-muted-foreground">Candidates for this position</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/dashboard/resumes/upload">Upload Resumes</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Matched Candidates</CardTitle>
          <CardDescription>AI-matched candidates for {job.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates or skills..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matchScore">Match Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="appliedDate">Applied Date</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={toggleSortOrder} className="h-10 w-10">
                {sortOrder === "asc" ? (
                  <ArrowUpDown className="h-4 w-4 rotate-180" />
                ) : (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredCandidates.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-lg border">
                <div className="text-center">
                  <Search className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No candidates found</h3>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              filteredCandidates.map((candidate) => (
                <Link key={candidate.id} href={`/dashboard/candidates/${candidate.id}`} className="block">
                  <div className="flex flex-col rounded-lg border p-4 transition-colors hover:bg-muted/50 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{candidate.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="mr-1 h-3 w-3" />
                          {candidate.position}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4 md:mt-0">
                      <div className="flex items-center space-x-2">
                        {candidate.status === "reviewed" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : candidate.status === "rejected" ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-amber-500" />
                        )}
                        <span className="text-sm capitalize">{candidate.status}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{candidate.matchScore}% Match</span>
                        </div>
                        <Progress value={candidate.matchScore} className="h-2 w-24" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

