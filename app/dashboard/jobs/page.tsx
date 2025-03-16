"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Calendar, Users, FileText, MoreHorizontal, Building, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { useToast } from "@/components/ui/use-toast"

// Mock data - in a real app, this would come from your API
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "active",
    postedDate: "2023-05-15",
    applicants: 24,
    matchedCandidates: 8,
  },
  {
    id: "2",
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    status: "active",
    postedDate: "2023-05-10",
    applicants: 18,
    matchedCandidates: 5,
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    status: "active",
    postedDate: "2023-05-08",
    applicants: 12,
    matchedCandidates: 3,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    status: "active",
    postedDate: "2023-05-05",
    applicants: 9,
    matchedCandidates: 2,
  },
  {
    id: "5",
    title: "Backend Developer",
    department: "Engineering",
    location: "Austin, TX",
    status: "inactive",
    postedDate: "2023-04-20",
    applicants: 32,
    matchedCandidates: 10,
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<any[]>([])
  const { isDemoMode, user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Fetch jobs data
    const fetchJobs = async () => {
      setLoading(true)

      try {
        if (isDemoMode) {
          // Use mock data in demo mode
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
          setJobs(mockJobs)
        } else {
          // Fetch from Firebase
          try {
            const jobsQuery = query(collection(db, "jobs"), orderBy("createdAt", "desc"))
            const snapshot = await getDocs(jobsQuery)

            if (snapshot.empty) {
              console.log("No jobs found in Firestore, using mock data")
              setJobs(mockJobs)
            } else {
              const jobsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                // Format dates for display
                postedDate: doc.data().createdAt
                  ? new Date(doc.data().createdAt.toDate()).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0],
              }))
              setJobs(jobsData)
            }
          } catch (error) {
            console.error("Error fetching jobs from Firestore:", error)
            // Fallback to mock data if there's an error
            setJobs(mockJobs)
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error)
        // Fallback to mock data if there's an error
        setJobs(mockJobs)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [isDemoMode])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient">Jobs</h1>
          <p className="text-gray-400">Manage your job postings and view applicants</p>
        </div>
        <Button asChild className="bg-gradient-primary">
          <Link href="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Link>
        </Button>
      </div>

      {isDemoMode && (
        <Card className="bg-blue-900/30 border-blue-800">
          <CardContent className="py-3">
            <p className="text-sm text-blue-400">
              You are in demo mode. Job data is simulated and not stored in a database.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-card glow-effect">
        <CardHeader>
          <CardTitle className="text-gradient-brand">Job Listings</CardTitle>
          <CardDescription className="text-gray-400">View and manage all your job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 py-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-gray-800" />
                      <Skeleton className="h-4 w-[200px] bg-gray-800" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              {/* Desktop view - Table */}
              <div className="hidden md:block rounded-md border border-gray-700">
                <Table>
                  <TableHeader className="bg-gray-800/50">
                    <TableRow className="border-gray-700 hover:bg-gray-800/50">
                      <TableHead className="text-gray-400">Job Title</TableHead>
                      <TableHead className="text-gray-400">Department</TableHead>
                      <TableHead className="text-gray-400">Location</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Posted Date</TableHead>
                      <TableHead className="text-gray-400">Applicants</TableHead>
                      <TableHead className="text-gray-400">Matched</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.length === 0 ? (
                      <TableRow className="border-gray-700 hover:bg-gray-800/50">
                        <TableCell colSpan={8} className="h-24 text-center text-gray-400">
                          No jobs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredJobs.map((job) => (
                        <TableRow key={job.id} className="border-gray-700 hover:bg-gray-800/50">
                          <TableCell className="font-medium text-white">
                            <Link href={`/dashboard/jobs/${job.id}`} className="hover:text-brand-400 hover:underline">
                              {job.title}
                            </Link>
                          </TableCell>
                          <TableCell className="text-gray-300">{job.department}</TableCell>
                          <TableCell className="text-gray-300">{job.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant={job.status === "active" ? "default" : "secondary"}
                              className={
                                job.status === "active"
                                  ? "bg-gradient-to-r from-green-600/30 to-green-500/20 text-green-300 hover:from-green-600/40 hover:to-green-500/30 border-green-700"
                                  : "bg-gray-800 text-gray-400 border-gray-700"
                              }
                            >
                              {job.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-gray-300">
                              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                              {new Date(job.postedDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-gray-300">
                              <Users className="mr-2 h-4 w-4 text-gray-500" />
                              {job.applicants}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-gray-300">
                              <FileText className="mr-2 h-4 w-4 text-gray-500" />
                              {job.matchedCandidates}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-white">
                                  <Link href={`/dashboard/jobs/${job.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-white">
                                  <Link href={`/dashboard/jobs/${job.id}/edit`}>Edit Job</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="text-gray-300 focus:bg-gray-800 focus:text-white">
                                  <Link href={`/dashboard/jobs/${job.id}/candidates`}>View Candidates</Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile view - Cards */}
              <div className="md:hidden space-y-4">
                {filteredJobs.length === 0 ? (
                  <div className="flex h-24 items-center justify-center rounded-lg border border-gray-700">
                    <p className="text-center text-gray-400">No jobs found.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-lg border border-gray-700 bg-gray-800/30 p-4 space-y-3 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/dashboard/jobs/${job.id}`}
                          className="font-medium text-white hover:text-brand-400 hover:underline"
                        >
                          {job.title}
                        </Link>
                        <Badge
                          variant={job.status === "active" ? "default" : "secondary"}
                          className={
                            job.status === "active"
                              ? "bg-gradient-to-r from-green-600/30 to-green-500/20 text-green-300 hover:from-green-600/40 hover:to-green-500/30 border-green-700"
                              : "bg-gray-800 text-gray-400 border-gray-700"
                          }
                        >
                          {job.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Building className="mr-2 h-4 w-4 text-gray-500" />
                          {job.department}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users className="mr-2 h-4 w-4 text-gray-500" />
                          {job.applicants} applicants
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          <Link href={`/dashboard/jobs/${job.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          <Link href={`/dashboard/jobs/${job.id}/candidates`}>Candidates</Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

