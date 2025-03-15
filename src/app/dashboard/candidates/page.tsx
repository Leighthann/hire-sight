"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, SlidersHorizontal, ArrowUpDown, Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data - in a real app, this would come from your API
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
    position: "UX Designer",
    appliedDate: "2023-05-10",
    matchScore: 88,
    skills: ["Figma", "User Research", "Prototyping"],
    status: "pending",
  },
  {
    id: "3",
    name: "James Wilson",
    position: "Product Manager",
    appliedDate: "2023-05-08",
    matchScore: 76,
    skills: ["Agile", "Product Strategy", "User Stories"],
    status: "reviewed",
  },
  {
    id: "4",
    name: "Sarah Chen",
    position: "DevOps Engineer",
    appliedDate: "2023-05-05",
    matchScore: 82,
    skills: ["Docker", "Kubernetes", "CI/CD"],
    status: "pending",
  },
  {
    id: "5",
    name: "Michael Brown",
    position: "Backend Developer",
    appliedDate: "2023-04-20",
    matchScore: 65,
    skills: ["Python", "Django", "PostgreSQL"],
    status: "rejected",
  },
]

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [candidates, setCandidates] = useState<typeof mockCandidates>([])
  const [sortBy, setSortBy] = useState("matchScore")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterPosition, setFilterPosition] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setCandidates(mockCandidates)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filteredCandidates = candidates
    .filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesPosition = filterPosition === "all" || candidate.position === filterPosition

      const matchesStatus = filterStatus === "all" || candidate.status === filterStatus

      return matchesSearch && matchesPosition && matchesStatus
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

  const positions = Array.from(new Set(candidates.map((candidate) => candidate.position)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">View and manage all candidate applications</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/resumes/upload">Upload Resumes</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
          <CardDescription>Browse and filter candidates across all job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates, positions, or skills..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

          {loading ? (
            <div className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 py-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

