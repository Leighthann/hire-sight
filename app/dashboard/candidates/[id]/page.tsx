"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ThumbsDown,
  ThumbsUp,
  User,
  XCircle,
} from "lucide-react"

// Update the mock data to include multiple candidates
// Replace the single mockCandidate with a mockCandidates object that has multiple candidates

// Replace the single mockCandidate constant with this:
const mockCandidates = {
  "1": {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    position: "Senior Frontend Developer",
    appliedDate: "2023-05-15",
    matchScore: 92,
    status: "reviewed",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "GraphQL", level: 80 },
      { name: "Next.js", level: 88 },
      { name: "CSS/SCSS", level: 92 },
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        startDate: "2020-03",
        endDate: "Present",
        description:
          "Led the development of a complex SaaS platform using React, TypeScript, and GraphQL. Improved performance by 40% and implemented CI/CD pipelines.",
      },
      {
        title: "Frontend Developer",
        company: "Digital Solutions LLC",
        location: "Boston, MA",
        startDate: "2017-06",
        endDate: "2020-02",
        description:
          "Developed responsive web applications using React and Redux. Collaborated with UX designers to implement pixel-perfect interfaces.",
      },
      {
        title: "Junior Web Developer",
        company: "WebTech Startup",
        location: "New York, NY",
        startDate: "2015-09",
        endDate: "2017-05",
        description:
          "Built and maintained client websites using JavaScript, HTML, and CSS. Implemented responsive designs and ensured cross-browser compatibility.",
      },
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "New York University",
        location: "New York, NY",
        year: "2015",
      },
      {
        degree: "Bachelor of Science in Computer Engineering",
        institution: "University of Michigan",
        location: "Ann Arbor, MI",
        year: "2013",
      },
    ],
    notes: [
      {
        id: "note1",
        author: "Sarah Miller",
        date: "2023-05-16",
        content:
          "Great communication skills during the initial screening call. Demonstrated strong technical knowledge and problem-solving abilities.",
      },
      {
        id: "note2",
        author: "David Chen",
        date: "2023-05-18",
        content:
          "Performed exceptionally well in the technical assessment. Completed all challenges with optimal solutions.",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    position: "UX Designer",
    appliedDate: "2023-05-10",
    matchScore: 88,
    status: "pending",
    skills: [
      { name: "Figma", level: 98 },
      { name: "User Research", level: 92 },
      { name: "Prototyping", level: 95 },
      { name: "Adobe XD", level: 85 },
      { name: "UI Design", level: 90 },
      { name: "Wireframing", level: 93 },
    ],
    experience: [
      {
        title: "Senior UX Designer",
        company: "Creative Design Studio",
        location: "San Francisco, CA",
        startDate: "2019-04",
        endDate: "Present",
        description:
          "Lead designer for enterprise SaaS products. Conducted user research, created wireframes and prototypes, and collaborated with development teams to implement designs.",
      },
      {
        title: "UX/UI Designer",
        company: "Tech Innovations",
        location: "Seattle, WA",
        startDate: "2016-08",
        endDate: "2019-03",
        description:
          "Designed user interfaces for mobile and web applications. Conducted usability testing and implemented design improvements based on user feedback.",
      },
    ],
    education: [
      {
        degree: "Master of Fine Arts in Design",
        institution: "California College of the Arts",
        location: "San Francisco, CA",
        year: "2016",
      },
      {
        degree: "Bachelor of Arts in Graphic Design",
        institution: "University of California, Los Angeles",
        location: "Los Angeles, CA",
        year: "2014",
      },
    ],
    notes: [
      {
        id: "note1",
        author: "James Wilson",
        date: "2023-05-12",
        content:
          "Impressive portfolio with strong focus on user-centered design. Excellent communication skills during the initial interview.",
      },
    ],
  },
  "3": {
    id: "3",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    position: "Product Manager",
    appliedDate: "2023-05-08",
    matchScore: 76,
    status: "reviewed",
    skills: [
      { name: "Agile", level: 90 },
      { name: "Product Strategy", level: 85 },
      { name: "User Stories", level: 88 },
      { name: "Market Research", level: 82 },
      { name: "Roadmapping", level: 80 },
      { name: "Stakeholder Management", level: 87 },
    ],
    experience: [
      {
        title: "Product Manager",
        company: "Tech Solutions Inc.",
        location: "Chicago, IL",
        startDate: "2018-06",
        endDate: "Present",
        description:
          "Managed the development of B2B SaaS products from conception to launch. Defined product roadmaps, gathered requirements, and prioritized features based on business value and user needs.",
      },
      {
        title: "Associate Product Manager",
        company: "Digital Innovations",
        location: "Chicago, IL",
        startDate: "2016-03",
        endDate: "2018-05",
        description:
          "Assisted in the development of product strategies and roadmaps. Conducted market research and competitive analysis to identify opportunities for product improvement.",
      },
    ],
    education: [
      {
        degree: "MBA, Product Management",
        institution: "Northwestern University",
        location: "Evanston, IL",
        year: "2016",
      },
      {
        degree: "Bachelor of Business Administration",
        institution: "University of Illinois",
        location: "Urbana-Champaign, IL",
        year: "2014",
      },
    ],
    notes: [
      {
        id: "note1",
        author: "Emily Johnson",
        date: "2023-05-10",
        content:
          "Strong understanding of product development processes. Demonstrated excellent analytical skills during the case study exercise.",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 234-5678",
    location: "Austin, TX",
    position: "DevOps Engineer",
    appliedDate: "2023-05-05",
    matchScore: 82,
    status: "pending",
    skills: [
      { name: "Docker", level: 95 },
      { name: "Kubernetes", level: 90 },
      { name: "CI/CD", level: 92 },
      { name: "AWS", level: 88 },
      { name: "Terraform", level: 85 },
      { name: "Linux", level: 93 },
    ],
    experience: [
      {
        title: "DevOps Engineer",
        company: "Cloud Solutions",
        location: "Austin, TX",
        startDate: "2019-08",
        endDate: "Present",
        description:
          "Designed and implemented CI/CD pipelines for microservices architecture. Managed Kubernetes clusters and containerized applications using Docker.",
      },
      {
        title: "Systems Administrator",
        company: "Tech Enterprises",
        location: "Dallas, TX",
        startDate: "2017-02",
        endDate: "2019-07",
        description:
          "Maintained and optimized Linux-based infrastructure. Implemented automation scripts to streamline deployment processes.",
      },
    ],
    education: [
      {
        degree: "Master of Science in Computer Engineering",
        institution: "University of Texas",
        location: "Austin, TX",
        year: "2017",
      },
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Texas A&M University",
        location: "College Station, TX",
        year: "2015",
      },
    ],
    notes: [
      {
        id: "note1",
        author: "Michael Brown",
        date: "2023-05-08",
        content:
          "Excellent technical knowledge of cloud infrastructure and containerization. Demonstrated problem-solving skills during the technical interview.",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 876-5432",
    location: "Boston, MA",
    position: "Backend Developer",
    appliedDate: "2023-04-20",
    matchScore: 65,
    status: "rejected",
    skills: [
      { name: "Python", level: 85 },
      { name: "Django", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "API Design", level: 70 },
      { name: "Flask", level: 65 },
      { name: "MongoDB", level: 60 },
    ],
    experience: [
      {
        title: "Backend Developer",
        company: "Software Solutions",
        location: "Boston, MA",
        startDate: "2018-10",
        endDate: "Present",
        description:
          "Developed and maintained RESTful APIs using Python and Django. Designed database schemas and optimized queries for performance.",
      },
      {
        title: "Junior Developer",
        company: "Tech Startups Inc.",
        location: "Providence, RI",
        startDate: "2016-05",
        endDate: "2018-09",
        description:
          "Assisted in the development of web applications using Python and Flask. Implemented database migrations and wrote unit tests.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Boston University",
        location: "Boston, MA",
        year: "2016",
      },
    ],
    notes: [
      {
        id: "note1",
        author: "Jennifer Lee",
        date: "2023-04-25",
        content:
          "Limited experience with modern backend frameworks. Struggled with the technical assessment tasks related to database optimization.",
      },
      {
        id: "note2",
        author: "Robert Taylor",
        date: "2023-04-28",
        content: "Not a good fit for the current role due to lack of experience with required technologies.",
      },
    ],
  },
}

export default function CandidateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [candidate, setCandidate] = useState<(typeof mockCandidates)["1"] | null>(null)

  // Update the useEffect to use the candidate ID from the URL params
  // Replace the existing useEffect with this:
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      const candidateId = params.id as string
      setCandidate(mockCandidates[candidateId] || null)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-[200px] bg-gray-800" />
        </div>
        <Card className="bg-gray-800/30 border-gray-700">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full bg-gray-800" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px] bg-gray-800" />
                <Skeleton className="h-4 w-[150px] bg-gray-800" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-[120px] bg-gray-800" />
                  <Skeleton className="h-20 w-full bg-gray-800" />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-gray-700">
        <div className="text-center">
          <User className="mx-auto h-10 w-10 text-gray-500" />
          <h3 className="mt-4 text-lg font-medium text-white">Candidate not found</h3>
          <p className="mt-2 text-sm text-gray-400">
            The candidate you're looking for doesn't exist or has been removed
          </p>
          <Button asChild className="mt-4 bg-gradient-primary">
            <Link href="/dashboard/candidates">Back to Candidates</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-gradient">Candidate Profile</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Candidate Overview */}
        <Card className="bg-gradient-card glow-effect md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-gradient-to-r from-brand-600 to-blue-500 text-white text-xl">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-gradient-brand text-2xl">{candidate.name}</CardTitle>
              <CardDescription className="text-gray-400 text-lg">{candidate.position}</CardDescription>
              <div className="mt-2 flex items-center">
                <Badge
                  className={
                    candidate.status === "reviewed"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-400"
                      : candidate.status === "rejected"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-400"
                        : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20 hover:text-amber-400"
                  }
                >
                  {candidate.status === "reviewed" ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : candidate.status === "rejected" ? (
                    <XCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <div className="mr-1 h-3 w-3 rounded-full border-2 border-current" />
                  )}
                  <span className="capitalize">{candidate.status}</span>
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Match Score</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white">{candidate.matchScore}%</span>
                  <span className="ml-2 text-sm text-gray-400">match</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span className="sr-only">Decrease match</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span className="sr-only">Increase match</span>
                  </Button>
                </div>
              </div>
              <Progress
                value={candidate.matchScore}
                className="h-2 bg-gray-800"
                indicatorClassName="bg-gradient-to-r from-brand-500 to-blue-500"
              />
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Contact Information</h3>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <a href={`mailto:${candidate.email}`} className="text-sm text-gray-300 hover:text-blue-400">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-gray-500" />
                  <a href={`tel:${candidate.phone}`} className="text-sm text-gray-300 hover:text-blue-400">
                    {candidate.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-300">{candidate.location}</span>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Application Details</h3>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-300">{candidate.position}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-300">
                    Applied {new Date(candidate.appliedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  <Button variant="link" className="h-auto p-0 text-sm text-blue-400 hover:text-blue-300">
                    View Resume
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Button
                variant="outline"
                className="flex-1 border-red-800 bg-red-900/20 text-red-400 hover:bg-red-900/30 hover:text-red-300"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button className="flex-1 bg-gradient-primary">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Candidate Details */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="skills" className="space-y-4">
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <Card className="bg-gradient-card glow-effect">
                <CardHeader>
                  <CardTitle className="text-gradient-brand">Skills Assessment</CardTitle>
                  <CardDescription className="text-gray-400">
                    Skills extracted from resume and assessments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {candidate.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2 bg-gray-800"
                          indicatorClassName="bg-gradient-to-r from-brand-500 to-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="bg-gradient-card glow-effect">
                <CardHeader>
                  <CardTitle className="text-gradient-brand">Work Experience</CardTitle>
                  <CardDescription className="text-gray-400">Professional history and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="relative pl-6 pb-6 last:pb-0">
                        {index < candidate.experience.length - 1 && (
                          <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-800" />
                        )}
                        <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-brand-500 bg-gray-900" />
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium text-white">{exp.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-400">
                            <span className="font-medium text-blue-400">{exp.company}</span>
                            <span>•</span>
                            <span>{exp.location}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {exp.startDate} — {exp.endDate}
                          </div>
                          <p className="mt-2 text-sm text-gray-300">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="bg-gradient-card glow-effect">
                <CardHeader>
                  <CardTitle className="text-gradient-brand">Education</CardTitle>
                  <CardDescription className="text-gray-400">Academic background and qualifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="relative pl-6 pb-6 last:pb-0">
                        {index < candidate.education.length - 1 && (
                          <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-800" />
                        )}
                        <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-blue-500 bg-gray-900" />
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium text-white">{edu.degree}</h3>
                          <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-400">
                            <span className="font-medium text-blue-400">{edu.institution}</span>
                            <span>•</span>
                            <span>{edu.location}</span>
                          </div>
                          <div className="text-sm text-gray-500">{edu.year}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="bg-gradient-card glow-effect">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-gradient-brand">Interview Notes</CardTitle>
                    <CardDescription className="text-gray-400">
                      Notes and feedback from the interview process
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Add Note
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.notes.length === 0 ? (
                      <div className="flex h-[100px] items-center justify-center rounded-lg border border-gray-700">
                        <div className="text-center">
                          <FileText className="mx-auto h-8 w-8 text-gray-500" />
                          <h3 className="mt-2 text-sm font-medium text-white">No notes yet</h3>
                          <p className="text-xs text-gray-400">Add notes about this candidate</p>
                        </div>
                      </div>
                    ) : (
                      candidate.notes.map((note) => (
                        <div key={note.id} className="rounded-lg border border-gray-800 bg-gray-800/30 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="font-medium text-white">{note.author}</div>
                            <div className="text-xs text-gray-500">{new Date(note.date).toLocaleDateString()}</div>
                          </div>
                          <p className="text-sm text-gray-300">{note.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-gradient-card glow-effect">
            <CardHeader>
              <CardTitle className="text-gradient-brand">Next Steps</CardTitle>
              <CardDescription className="text-gray-400">Recommended actions for this candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button className="h-auto py-6 bg-gradient-primary flex flex-col items-center justify-center">
                  <MessageSquare className="mb-2 h-6 w-6" />
                  <span className="text-lg font-medium">Schedule Interview</span>
                  <span className="text-xs text-blue-200">Technical assessment</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white flex flex-col items-center justify-center"
                >
                  <ExternalLink className="mb-2 h-6 w-6" />
                  <span className="text-lg font-medium">Request Portfolio</span>
                  <span className="text-xs text-gray-400">View additional work</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

