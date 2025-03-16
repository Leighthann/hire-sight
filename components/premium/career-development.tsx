"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Compass,
  DollarSign,
  GraduationCap,
  LineChart,
  Lightbulb,
  Rocket,
  TrendingUp,
  Star,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for career paths
const careerPaths = [
  {
    id: 1,
    title: "Frontend Developer → Senior Frontend → Lead Frontend → Frontend Architect",
    currentPosition: "Frontend Developer",
    targetPosition: "Frontend Architect",
    progress: 25,
    timeEstimate: "4-5 years",
    salaryIncrease: "75-100%",
    keySkillsNeeded: ["React Advanced", "System Design", "Team Leadership", "Performance Optimization"],
  },
  {
    id: 2,
    title: "Frontend Developer → Full Stack Developer → Technical Lead → CTO",
    currentPosition: "Frontend Developer",
    targetPosition: "CTO",
    progress: 15,
    timeEstimate: "7-10 years",
    salaryIncrease: "150-200%",
    keySkillsNeeded: ["Backend Development", "System Architecture", "Business Strategy", "Team Management"],
  },
]

// Mock data for skill gaps
const skillGaps = [
  {
    id: 1,
    skill: "System Architecture",
    currentLevel: 2,
    requiredLevel: 4,
    gap: 2,
    importance: "High",
    resources: [
      { type: "Course", title: "System Design for Senior Engineers", provider: "Educative", url: "#" },
      { type: "Book", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", url: "#" },
    ],
  },
  {
    id: 2,
    skill: "Team Leadership",
    currentLevel: 1,
    requiredLevel: 3,
    gap: 2,
    importance: "High",
    resources: [
      { type: "Course", title: "Engineering Leadership 101", provider: "Coursera", url: "#" },
      { type: "Mentorship", title: "Leadership Mentorship Program", provider: "HireSight", url: "#" },
    ],
  },
  {
    id: 3,
    skill: "React Advanced Patterns",
    currentLevel: 3,
    requiredLevel: 4,
    gap: 1,
    importance: "Medium",
    resources: [
      { type: "Workshop", title: "Advanced React Patterns", provider: "Frontend Masters", url: "#" },
      { type: "Documentation", title: "React Advanced Concepts", provider: "React Docs", url: "#" },
    ],
  },
]

// Mock data for industry trends
const industryTrends = [
  {
    id: 1,
    skill: "React",
    demandTrend: "Stable High",
    growthRate: 5,
    averageSalary: "$120,000",
    jobOpenings: 15000,
    futureOutlook: "Strong for next 3-5 years",
  },
  {
    id: 2,
    skill: "TypeScript",
    demandTrend: "Rapidly Growing",
    growthRate: 15,
    averageSalary: "$125,000",
    jobOpenings: 12000,
    futureOutlook: "Very strong for next 5+ years",
  },
  {
    id: 3,
    skill: "Next.js",
    demandTrend: "Rapidly Growing",
    growthRate: 25,
    averageSalary: "$130,000",
    jobOpenings: 8000,
    futureOutlook: "Very strong for next 5+ years",
  },
]

// Mock data for learning resources
const learningResources = [
  {
    id: 1,
    title: "System Design Interview",
    type: "Course",
    provider: "Educative",
    duration: "20 hours",
    rating: 4.8,
    relevance: "High",
    url: "#",
  },
  {
    id: 2,
    title: "React Performance Optimization",
    type: "Workshop",
    provider: "Frontend Masters",
    duration: "6 hours",
    rating: 4.9,
    relevance: "High",
    url: "#",
  },
  {
    id: 3,
    title: "Engineering Leadership",
    type: "Book",
    author: "Camille Fournier",
    pages: 256,
    rating: 4.7,
    relevance: "Medium",
    url: "#",
  },
]

export function CareerDevelopment() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0])

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Career Development Insights</h2>
        <p className="text-muted-foreground">
          Visualize your career path, identify skill gaps, and get personalized recommendations.
        </p>
      </div>

      <Tabs defaultValue="career-path" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="career-path">Career Path</TabsTrigger>
          <TabsTrigger value="skill-gaps">Skill Gaps</TabsTrigger>
          <TabsTrigger value="industry-trends">Industry Trends</TabsTrigger>
          <TabsTrigger value="learning">Learning Resources</TabsTrigger>
        </TabsList>

        {/* Career Path Tab */}
        <TabsContent value="career-path" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xl font-semibold">Available Career Paths</h3>
              {careerPaths.map((path) => (
                <Card
                  key={path.id}
                  className={`cursor-pointer transition-all hover:border-blue-500 ${selectedPath.id === path.id ? "border-blue-500 bg-blue-950/20" : "border-border/40 bg-background/95"}`}
                  onClick={() => setSelectedPath(path)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{path.title}</CardTitle>
                    <CardDescription>Estimated time: {path.timeEstimate}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-1.5" />
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full justify-between text-blue-400">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Button className="w-full">Explore More Career Paths</Button>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full">
                <CardHeader>
                  <CardTitle>Career Path Visualization</CardTitle>
                  <CardDescription>
                    From {selectedPath.currentPosition} to {selectedPath.targetPosition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="relative py-8">
                    {/* Career path visualization */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-950 z-0"></div>

                    {selectedPath.title.split(" → ").map((position, index, array) => (
                      <div key={index} className="relative mb-8 last:mb-0 pl-8">
                        <div
                          className={`absolute left-0 top-1 w-4 h-4 rounded-full z-10 ${index === 0 ? "bg-blue-500" : "bg-blue-950 border-2 border-blue-800"}`}
                        ></div>
                        <h4 className="text-lg font-medium mb-1">{position}</h4>

                        {index < array.length - 1 && (
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                            {index === 0 ? "Current position" : "Next step"}
                          </div>
                        )}

                        {index === array.length - 1 && (
                          <div className="flex items-center text-sm text-blue-400 mb-2">
                            <Rocket className="h-3.5 w-3.5 mr-1.5" />
                            Target position
                          </div>
                        )}

                        {index < array.length - 1 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                              {index === 0 ? "1-2 years" : index === 1 ? "2-3 years" : "3-4 years"}
                            </Badge>
                            <Badge variant="outline" className="bg-green-950/30 text-green-400">
                              +{index === 0 ? "20-30%" : index === 1 ? "15-25%" : "25-35%"} salary
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Key Skills Needed</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPath.keySkillsNeeded.map((skill, index) => (
                          <Badge key={index} className="bg-blue-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-950/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-green-400" />
                          <h5 className="font-medium">Salary Increase Potential</h5>
                        </div>
                        <p className="text-2xl font-bold text-green-400">{selectedPath.salaryIncrease}</p>
                      </div>

                      <div className="bg-blue-950/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-5 w-5 text-blue-400" />
                          <h5 className="font-medium">Time Investment</h5>
                        </div>
                        <p className="text-2xl font-bold text-blue-400">{selectedPath.timeEstimate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                    Create Development Plan
                    <Compass className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Skill Gaps Tab */}
        <TabsContent value="skill-gaps" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>Based on your target role: Senior Frontend Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillGaps.map((gap) => (
                  <div key={gap.id} className="border border-border/40 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-medium">{gap.skill}</h4>
                        <p className="text-sm text-muted-foreground">Importance: {gap.importance}</p>
                      </div>
                      <Badge className={gap.importance === "High" ? "bg-red-600" : "bg-yellow-600"}>
                        Gap: {gap.gap} levels
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Level: {gap.currentLevel}</span>
                        <span>Required Level: {gap.requiredLevel}</span>
                      </div>
                      <div className="relative h-2 bg-blue-950/30 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-blue-600 rounded-full"
                          style={{ width: `${(gap.currentLevel / gap.requiredLevel) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Recommended Resources:</h5>
                      <div className="space-y-2">
                        {gap.resources.map((resource, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {resource.type === "Course" && <BookOpen className="h-3.5 w-3.5 text-blue-400" />}
                            {resource.type === "Book" && <BookOpen className="h-3.5 w-3.5 text-green-400" />}
                            {resource.type === "Mentorship" && (
                              <GraduationCap className="h-3.5 w-3.5 text-purple-400" />
                            )}
                            {resource.type === "Workshop" && <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />}
                            {resource.type === "Documentation" && <FileText className="h-3.5 w-3.5 text-gray-400" />}
                            <a href={resource.url} className="text-blue-400 hover:underline flex items-center">
                              {resource.title}
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </a>
                            <span className="text-muted-foreground">by {resource.provider || resource.author}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  Generate Personalized Learning Plan
                  <Compass className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Trends Tab */}
        <TabsContent value="industry-trends" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Industry Trends for Your Skills</CardTitle>
              <CardDescription>Market insights for your current and target skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {industryTrends.map((trend) => (
                  <div key={trend.id} className="border border-border/40 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-medium">{trend.skill}</h4>
                      <Badge
                        className={
                          trend.growthRate > 20
                            ? "bg-green-600"
                            : trend.growthRate > 10
                              ? "bg-blue-600"
                              : "bg-yellow-600"
                        }
                      >
                        {trend.demandTrend}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-950/20 rounded p-3">
                        <div className="text-sm text-muted-foreground mb-1">Growth Rate</div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-lg font-medium">{trend.growthRate}%</span>
                        </div>
                      </div>

                      <div className="bg-blue-950/20 rounded p-3">
                        <div className="text-sm text-muted-foreground mb-1">Avg. Salary</div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-400 mr-1" />
                          <span className="text-lg font-medium">{trend.averageSalary}</span>
                        </div>
                      </div>

                      <div className="bg-blue-950/20 rounded p-3">
                        <div className="text-sm text-muted-foreground mb-1">Job Openings</div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 text-blue-400 mr-1" />
                          <span className="text-lg font-medium">{trend.jobOpenings.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-blue-950/20 rounded p-3">
                        <div className="text-sm text-muted-foreground mb-1">Outlook</div>
                        <div className="flex items-center">
                          <Compass className="h-4 w-4 text-blue-400 mr-1" />
                          <span className="text-lg font-medium">Strong</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Future Outlook:</span> {trend.futureOutlook}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <Button className="flex-1 gap-2">
                  View Full Market Report
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button className="flex-1 gap-2" variant="outline">
                  Compare with Other Skills
                  <ArrowsCompare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Resources Tab */}
        <TabsContent value="learning" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Recommended Learning Resources</CardTitle>
              <CardDescription>Personalized recommendations based on your skill gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningResources.map((resource) => (
                  <Card key={resource.id} className="border-border/40 bg-background/95">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardDescription>{resource.provider || `By ${resource.author}`}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{resource.duration || `${resource.pages} pages`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-400" />
                          <span>{resource.rating}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Relevance:</span>
                        <Badge
                          variant="outline"
                          className={
                            resource.relevance === "High"
                              ? "bg-green-950/30 text-green-400"
                              : resource.relevance === "Medium"
                                ? "bg-yellow-950/30 text-yellow-400"
                                : "bg-blue-950/30 text-blue-400"
                          }
                        >
                          {resource.relevance}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="w-full gap-1" variant="outline">
                        View Resource
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  View All Recommended Resources
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing component definition
function Briefcase(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

// Missing component definition
function ArrowsCompare(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="m21 8-4-4-4 4" />
      <path d="M17 4v16" />
    </svg>
  )
}

// Missing component definition
function FileText(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
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

