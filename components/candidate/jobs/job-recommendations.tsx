"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  DollarSign,
  Calendar,
  Bookmark,
  ShoppingCart,
  CheckCircle,
  Star,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Mock data for job recommendations
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$120,000 - $150,000",
    postedDate: "2023-03-10",
    matchScore: 95,
    description:
      "We are looking for a Senior Frontend Developer with experience in React, TypeScript, and modern web technologies.",
    requirements: ["5+ years of React experience", "TypeScript expertise", "Experience with state management"],
    isSaved: false,
    isInCart: false,
    isPremium: true,
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "WebSolutions Co.",
    location: "San Francisco, CA",
    salary: "$100,000 - $130,000",
    postedDate: "2023-03-12",
    matchScore: 88,
    description: "Join our team as a Frontend Developer to build responsive and user-friendly web applications.",
    requirements: ["3+ years of JavaScript experience", "React knowledge", "CSS/SCSS proficiency"],
    isSaved: true,
    isInCart: false,
    isPremium: false,
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "New York, NY",
    salary: "$130,000 - $160,000",
    postedDate: "2023-03-08",
    matchScore: 82,
    description: "Looking for a Full Stack Developer to work on our cutting-edge products.",
    requirements: ["React and Node.js experience", "Database knowledge", "API design"],
    isSaved: false,
    isInCart: true,
    isPremium: true,
  },
  {
    id: "4",
    title: "UI/UX Developer",
    company: "DesignHub",
    location: "Austin, TX",
    salary: "$90,000 - $120,000",
    postedDate: "2023-03-15",
    matchScore: 78,
    description: "Join our design team to create beautiful and functional user interfaces.",
    requirements: ["UI/UX design skills", "Frontend development experience", "Figma proficiency"],
    isSaved: false,
    isInCart: false,
    isPremium: false,
  },
  {
    id: "5",
    title: "React Native Developer",
    company: "MobileApps Inc.",
    location: "Remote",
    salary: "$110,000 - $140,000",
    postedDate: "2023-03-05",
    matchScore: 75,
    description: "Develop cross-platform mobile applications using React Native.",
    requirements: ["React Native experience", "Mobile app development", "JavaScript expertise"],
    isSaved: false,
    isInCart: false,
    isPremium: true,
  },
]

export function JobRecommendations() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobs, setJobs] = useState(mockJobs)
  const [sortBy, setSortBy] = useState("matchScore")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [salaryRange, setSalaryRange] = useState<[number, number]>([70, 200])
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const toggleSaveJob = (jobId: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, isSaved: !job.isSaved } : job)))

    const job = jobs.find((job) => job.id === jobId)
    if (job) {
      toast({
        title: job.isSaved ? "Removed from saved jobs" : "Saved to your jobs",
        description: job.isSaved
          ? `${job.title} has been removed from your saved jobs.`
          : `${job.title} has been added to your saved jobs.`,
      })
    }
  }

  const toggleCartJob = (jobId: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, isInCart: !job.isInCart } : job)))

    const job = jobs.find((job) => job.id === jobId)
    if (job) {
      toast({
        title: job.isInCart ? "Removed from cart" : "Added to cart",
        description: job.isInCart
          ? `${job.title} has been removed from your application cart.`
          : `${job.title} has been added to your application cart.`,
      })
    }
  }

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation =
        locationFilter === "all" ||
        (locationFilter === "remote" && job.location === "Remote") ||
        (locationFilter === "onsite" && job.location !== "Remote")

      // Extract salary range numbers for filtering
      const salaryText = job.salary.replace(/[^0-9-]/g, "")
      const [minSalary, maxSalary] = salaryText.split("-").map(Number)
      const matchesSalary = minSalary >= salaryRange[0] * 1000 && maxSalary <= salaryRange[1] * 1000

      return matchesSearch && matchesLocation && matchesSalary
    })
    .sort((a, b) => {
      if (sortBy === "matchScore") {
        return sortOrder === "asc" ? a.matchScore - b.matchScore : b.matchScore - a.matchScore
      } else if (sortBy === "salary") {
        // Extract the minimum salary for sorting
        const getMinSalary = (salary: string) => {
          const match = salary.match(/\$(\d+),000/)
          return match ? Number.parseInt(match[1]) : 0
        }
        const aMinSalary = getMinSalary(a.salary)
        const bMinSalary = getMinSalary(b.salary)
        return sortOrder === "asc" ? aMinSalary - bMinSalary : bMinSalary - aMinSalary
      } else if (sortBy === "date") {
        const aDate = new Date(a.postedDate).getTime()
        const bDate = new Date(b.postedDate).getTime()
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate
      }
      return 0
    })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      return "1 day ago"
    } else if (diffDays < 30) {
      return `${diffDays} days ago`
    } else {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card glow-effect">
        <CardHeader>
          <CardTitle className="text-gradient-brand">Job Recommendations</CardTitle>
          <CardDescription className="text-gray-400">Personalized job matches based on your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and filter controls */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search jobs, companies, or keywords..."
                className="pl-8 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="matchScore" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                      Match Percentage
                    </SelectItem>
                    <SelectItem value="salary" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                      Salary
                    </SelectItem>
                    <SelectItem value="date" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                      Date Posted
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="h-10 w-10 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {sortOrder === "asc" ? (
                    <ArrowUpDown className="h-4 w-4 rotate-180" />
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Advanced filters */}
            {showFilters && (
              <div className="grid gap-4 p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        All Locations
                      </SelectItem>
                      <SelectItem value="remote" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        Remote Only
                      </SelectItem>
                      <SelectItem value="onsite" className="text-gray-300 focus:bg-gray-800 focus:text-white">
                        On-site Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-200">Salary Range (K)</label>
                    <span className="text-sm text-gray-400">
                      ${salaryRange[0]}K - ${salaryRange[1]}K
                    </span>
                  </div>
                  <Slider
                    defaultValue={[70, 200]}
                    min={50}
                    max={250}
                    step={5}
                    value={salaryRange}
                    onValueChange={(value) => setSalaryRange(value as [number, number])}
                    className="py-4"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Job listings */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-gray-700 bg-gray-800/30">
                <div className="text-center">
                  <Search className="mx-auto h-8 w-8 text-gray-500" />
                  <h3 className="mt-2 text-lg font-medium text-white">No jobs found</h3>
                  <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                </div>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={cn(
                    "rounded-lg border p-4 transition-colors",
                    job.isPremium
                      ? "border-brand-700 bg-gradient-to-r from-brand-950/50 to-gray-900/80"
                      : "border-gray-700 bg-gray-800/30",
                  )}
                >
                  {job.isPremium && (
                    <div className="flex justify-end mb-2">
                      <Badge className="bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white border-amber-700">
                        <Star className="mr-1 h-3 w-3" /> Premium Match
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium">
                          {job.company.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{job.title}</h3>
                          <p className="text-gray-400">{job.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <MapPin className="mr-1 h-3.5 w-3.5 text-gray-500" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <DollarSign className="mr-1 h-3.5 w-3.5 text-gray-500" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
                          {formatDate(job.postedDate)}
                        </div>
                      </div>

                      <p className="text-sm text-gray-300">{job.description}</p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-300">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "text-lg font-bold",
                            job.matchScore >= 90
                              ? "text-green-400"
                              : job.matchScore >= 80
                                ? "text-brand-400"
                                : "text-amber-400",
                          )}
                        >
                          {job.matchScore}%
                        </div>
                        <div className="text-xs text-gray-400">Match</div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleSaveJob(job.id)}
                          className={cn(
                            "h-9 w-9 border-gray-700",
                            job.isSaved
                              ? "bg-brand-900/50 text-brand-400 border-brand-700"
                              : "text-gray-400 hover:text-white",
                          )}
                        >
                          <Bookmark className="h-4 w-4" />
                          <span className="sr-only">{job.isSaved ? "Unsave Job" : "Save Job"}</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleCartJob(job.id)}
                          className={cn(
                            "h-9 w-9 border-gray-700",
                            job.isInCart
                              ? "bg-brand-900/50 text-brand-400 border-brand-700"
                              : "text-gray-400 hover:text-white",
                          )}
                        >
                          {job.isInCart ? <CheckCircle className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                          <span className="sr-only">{job.isInCart ? "Remove from Cart" : "Add to Cart"}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

