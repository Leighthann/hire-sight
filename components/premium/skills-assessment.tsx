"use client"

import type React from "react"

import { useState } from "react"
import { Award, BookOpen, ChevronRight, Code, Database, FileText, Filter, Lightbulb, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for skills assessments
const assessmentCategories = [
  { id: "tech", name: "Technical", icon: <Code className="h-4 w-4" /> },
  { id: "data", name: "Data", icon: <Database className="h-4 w-4" /> },
  { id: "soft", name: "Soft Skills", icon: <Lightbulb className="h-4 w-4" /> },
  { id: "lang", name: "Languages", icon: <BookOpen className="h-4 w-4" /> },
]

const assessments = [
  {
    id: 1,
    title: "JavaScript Proficiency",
    category: "tech",
    difficulty: "Intermediate",
    duration: "45 min",
    questions: 30,
    popularity: 95,
    description: "Assess your JavaScript skills including ES6+ features, async programming, and DOM manipulation.",
  },
  {
    id: 2,
    title: "React Development",
    category: "tech",
    difficulty: "Advanced",
    duration: "60 min",
    questions: 35,
    popularity: 98,
    description: "Test your React knowledge including hooks, context API, and performance optimization.",
  },
  {
    id: 3,
    title: "SQL Fundamentals",
    category: "data",
    difficulty: "Beginner",
    duration: "30 min",
    questions: 25,
    popularity: 90,
    description: "Evaluate your SQL query writing skills and database concept understanding.",
  },
  {
    id: 4,
    title: "Data Analysis with Python",
    category: "data",
    difficulty: "Intermediate",
    duration: "50 min",
    questions: 28,
    popularity: 92,
    description: "Test your ability to analyze and visualize data using Python libraries like Pandas and Matplotlib.",
  },
  {
    id: 5,
    title: "Communication Skills",
    category: "soft",
    difficulty: "All Levels",
    duration: "40 min",
    questions: 20,
    popularity: 85,
    description: "Assess your written and verbal communication abilities in professional contexts.",
  },
  {
    id: 6,
    title: "Problem Solving",
    category: "soft",
    difficulty: "Intermediate",
    duration: "45 min",
    questions: 15,
    popularity: 88,
    description: "Evaluate your analytical thinking and creative problem-solving capabilities.",
  },
  {
    id: 7,
    title: "English Proficiency",
    category: "lang",
    difficulty: "All Levels",
    duration: "60 min",
    questions: 50,
    popularity: 94,
    description: "Comprehensive assessment of English reading, writing, and comprehension skills.",
  },
  {
    id: 8,
    title: "Spanish Business Communication",
    category: "lang",
    difficulty: "Intermediate",
    duration: "45 min",
    questions: 40,
    popularity: 82,
    description: "Test your Spanish language skills in business and professional contexts.",
  },
]

const completedAssessments = [
  {
    id: 101,
    title: "TypeScript Fundamentals",
    completedDate: "2023-11-15",
    score: 92,
    percentile: 87,
    certificateId: "TS-CERT-2023-11-15",
    badgeUrl: "/placeholder.svg?height=80&width=80",
    skills: ["TypeScript", "Static Typing", "Interfaces", "Generics"],
  },
  {
    id: 102,
    title: "Node.js Backend Development",
    completedDate: "2023-10-22",
    score: 88,
    percentile: 82,
    certificateId: "NODE-CERT-2023-10-22",
    badgeUrl: "/placeholder.svg?height=80&width=80",
    skills: ["Node.js", "Express", "API Design", "Authentication"],
  },
]

export function SkillsAssessment() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAssessments = assessments.filter(
    (assessment) =>
      (activeCategory === "all" || assessment.category === activeCategory) &&
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Skills Assessment</h2>
        <p className="text-muted-foreground">
          Verify your skills, earn badges, and showcase your expertise to potential employers.
        </p>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Assessment Marketplace</TabsTrigger>
          <TabsTrigger value="results">My Results</TabsTrigger>
          <TabsTrigger value="certificates">Skill Certificates</TabsTrigger>
        </TabsList>

        {/* Assessment Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assessments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Filter:</span>
              <select
                className="bg-background border border-input rounded-md px-3 py-1 text-sm"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {assessmentCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssessments.map((assessment) => (
              <Card
                key={assessment.id}
                className="overflow-hidden border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{assessment.title}</CardTitle>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{assessment.questions} questions</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Popularity:</span>
                    <Progress value={assessment.popularity} className="h-1.5" />
                    <span>{assessment.popularity}%</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full gap-1 bg-blue-600 hover:bg-blue-700">
                    Take Assessment
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-4">
          {completedAssessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedAssessments.map((assessment) => (
                <Card
                  key={assessment.id}
                  className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1">
                              <Award className="h-5 w-5 text-yellow-500" />
                              <span className="text-sm font-medium">Verified</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This skill has been verified through assessment</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Completed on {new Date(assessment.completedDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">{assessment.score}%</div>
                        <div className="text-xs text-muted-foreground">Your Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">{assessment.percentile}%</div>
                        <div className="text-xs text-muted-foreground">Percentile</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {assessment.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-950/30 text-blue-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Share Certificate
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-950/30 mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No assessments completed yet</h3>
              <p className="text-muted-foreground mb-4">
                Take an assessment to verify your skills and earn certificates.
              </p>
              <Button>Browse Assessments</Button>
            </div>
          )}
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          {completedAssessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedAssessments.map((assessment) => (
                <div
                  key={assessment.id}
                  className="flex flex-col items-center p-6 border border-border/40 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                >
                  <div className="mb-4">
                    <img
                      src={assessment.badgeUrl || "/placeholder.svg"}
                      alt={`${assessment.title} Badge`}
                      className="h-20 w-20"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{assessment.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Certificate ID: {assessment.certificateId}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {assessment.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-950/30 text-blue-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Add to LinkedIn
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-950/30 mb-4">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No certificates earned yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete assessments to earn certificates that showcase your skills.
              </p>
              <Button>Take an Assessment</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing component definition
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

