"use client"

import type React from "react"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import {
  AlertCircle,
  Edit,
  EyeOff,
  Filter,
  Heart,
  Info,
  LineChart,
  RefreshCw,
  Save,
  Settings,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts"

// Mock data for bias detection
const jobDescriptionExample = `We're looking for a rockstar developer to join our young and dynamic team. The ideal candidate will be a hard-working self-starter who can work independently with minimal supervision. Must be willing to work long hours when needed and be a team player. Looking for someone with 10+ years of experience in React, Node.js, and AWS.`

const biasDetectionResults = [
  {
    id: 1,
    term: "rockstar",
    category: "Gender",
    issue: "May discourage female applicants",
    suggestion: "experienced developer, skilled professional",
  },
  {
    id: 2,
    term: "young and dynamic",
    category: "Age",
    issue: "Age discrimination",
    suggestion: "innovative, adaptable, collaborative",
  },
  {
    id: 3,
    term: "hard-working",
    category: "Cultural",
    issue: "Subjective evaluation",
    suggestion: "detail-oriented, results-driven",
  },
  {
    id: 4,
    term: "long hours",
    category: "Work-Life",
    issue: "May discourage candidates with family responsibilities",
    suggestion: "flexible schedule, focused work environment",
  },
  {
    id: 5,
    term: "10+ years of experience",
    category: "Age",
    issue: "Potential age discrimination",
    suggestion: "extensive experience, advanced knowledge",
  },
]

// Mock data for diversity goals
const diversityGoals = [
  { category: "Gender", current: 35, target: 50, unit: "%" },
  { category: "Underrepresented Minorities", current: 22, target: 30, unit: "%" },
  { category: "Veterans", current: 5, target: 8, unit: "%" },
  { category: "People with Disabilities", current: 3, target: 7, unit: "%" },
  { category: "LGBTQ+", current: 8, target: 10, unit: "%" },
]

// Mock data for representation analytics
const representationData = [
  { name: "Male", value: 65, color: "#3b82f6" },
  { name: "Female", value: 32, color: "#ec4899" },
  { name: "Non-Binary", value: 3, color: "#10b981" },
]

const ethnicityData = [
  { name: "White", value: 58, color: "#3b82f6" },
  { name: "Asian", value: 22, color: "#10b981" },
  { name: "Hispanic/Latino", value: 10, color: "#f59e0b" },
  { name: "Black", value: 7, color: "#6366f1" },
  { name: "Other", value: 3, color: "#ec4899" },
]

const departmentData = [
  { department: "Engineering", diversity: 28, industry: 25 },
  { department: "Product", diversity: 42, industry: 35 },
  { department: "Design", diversity: 45, industry: 40 },
  { department: "Marketing", diversity: 52, industry: 45 },
  { department: "Sales", diversity: 38, industry: 30 },
  { department: "HR", diversity: 65, industry: 60 },
]

const COLORS = ["#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#6366f1", "#a855f7"]

export function DiversityInclusion() {
  const [jobDescription, setJobDescription] = useState(jobDescriptionExample)
  const [isBlindMode, setIsBlindMode] = useState(false)
  const [showBiasResults, setShowBiasResults] = useState(true)

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Diversity & Inclusion Tools</h2>
        <p className="text-muted-foreground">Create inclusive job descriptions and track diversity goals.</p>
      </div>

      <Tabs defaultValue="bias-detection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bias-detection">Bias Detection</TabsTrigger>
          <TabsTrigger value="diversity-goals">Diversity Goals</TabsTrigger>
          <TabsTrigger value="blind-review">Blind Review</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Bias Detection Tab */}
        <TabsContent value="bias-detection" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>Inclusive Language Checker</CardTitle>
              <CardDescription>Analyze job descriptions for potentially biased language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="h-40 mt-1.5"
                  placeholder="Enter your job description here..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
                <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                  <Sparkles className="h-4 w-4" />
                  Analyze Text
                </Button>
              </div>

              {showBiasResults && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Analysis Results</h3>
                    <Badge className="bg-yellow-600">5 issues found</Badge>
                  </div>

                  <div className="space-y-3">
                    {biasDetectionResults.map((result) => (
                      <div key={result.id} className="border border-border/40 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                result.category === "Gender"
                                  ? "bg-pink-600"
                                  : result.category === "Age"
                                    ? "bg-orange-600"
                                    : result.category === "Cultural"
                                      ? "bg-purple-600"
                                      : "bg-blue-600"
                              }
                            >
                              {result.category}
                            </Badge>
                            <h4 className="font-medium">"{result.term}"</h4>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Info className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{result.issue}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{result.issue}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Suggestions:</span>
                          <div className="flex flex-wrap gap-1">
                            {result.suggestion.split(", ").map((suggestion, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-blue-950/30 text-blue-400 cursor-pointer hover:bg-blue-900/40"
                              >
                                {suggestion}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" className="gap-1">
                      <Edit className="h-4 w-4" />
                      Edit All
                    </Button>
                    <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                      <Sparkles className="h-4 w-4" />
                      Apply All Suggestions
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diversity Goals Tab */}
        <TabsContent value="diversity-goals" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Diversity Goals Tracking</CardTitle>
                  <CardDescription>Monitor progress toward your organization's diversity targets</CardDescription>
                </div>
                <Button variant="outline" className="gap-1 w-full md:w-auto">
                  <Settings className="h-4 w-4" />
                  Configure Goals
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {diversityGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{goal.category}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            Current: {goal.current}
                            {goal.unit}
                          </span>
                          <span>•</span>
                          <span>
                            Target: {goal.target}
                            {goal.unit}
                          </span>
                        </div>
                      </div>
                      <Badge
                        className={
                          goal.current / goal.target >= 0.9
                            ? "bg-green-600"
                            : goal.current / goal.target >= 0.7
                              ? "bg-yellow-600"
                              : "bg-blue-600"
                        }
                      >
                        {Math.round((goal.current / goal.target) * 100)}% of goal
                      </Badge>
                    </div>
                    <div className="relative">
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      <div
                        className="absolute top-0 bottom-0 w-px bg-white/50"
                        style={{ left: `${goal.target}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 border border-blue-500/30 bg-blue-950/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Diversity Insights</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your organization is making good progress in gender diversity but could improve in representation
                      of people with disabilities and veterans.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                        Expand veteran outreach
                      </Badge>
                      <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                        Improve accessibility
                      </Badge>
                      <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                        Partner with disability organizations
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                <Heart className="h-4 w-4" />
                Diversity Resources
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Blind Review Tab */}
        <TabsContent value="blind-review" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Blind Review Mode</CardTitle>
                  <CardDescription>Review applications without seeing potentially biasing information</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="blind-mode" checked={isBlindMode} onCheckedChange={setIsBlindMode} />
                  <Label htmlFor="blind-mode">{isBlindMode ? "Blind Mode Active" : "Blind Mode Inactive"}</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${isBlindMode ? "bg-blue-600" : "bg-blue-950/50 overflow-hidden"}`}
                    >
                      {isBlindMode ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Candidate"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{isBlindMode ? "Candidate #38291" : "Alex Johnson"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isBlindMode ? "Experience: 5+ years" : "Stanford University, 5+ years at Google"}
                      </p>
                    </div>
                  </div>
                  <Button size="sm">View Application</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${isBlindMode ? "bg-blue-600" : "bg-blue-950/50 overflow-hidden"}`}
                    >
                      {isBlindMode ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Candidate"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{isBlindMode ? "Candidate #38292" : "Maria Rodriguez"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isBlindMode ? "Experience: 7+ years" : "MIT, 7+ years at Amazon"}
                      </p>
                    </div>
                  </div>
                  <Button size="sm">View Application</Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${isBlindMode ? "bg-blue-600" : "bg-blue-950/50 overflow-hidden"}`}
                    >
                      {isBlindMode ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Candidate"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{isBlindMode ? "Candidate #38293" : "David Kim"}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isBlindMode ? "Experience: 4+ years" : "UC Berkeley, 4+ years at Microsoft"}
                      </p>
                    </div>
                  </div>
                  <Button size="sm">View Application</Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Blind Mode Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="hide-name" defaultChecked />
                      <Label htmlFor="hide-name">Hide Name</Label>
                    </div>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                      Recommended
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="hide-photo" defaultChecked />
                      <Label htmlFor="hide-photo">Hide Photo</Label>
                    </div>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                      Recommended
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="hide-education" defaultChecked />
                      <Label htmlFor="hide-education">Hide Education</Label>
                    </div>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                      Recommended
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="hide-previous-employers" defaultChecked />
                      <Label htmlFor="hide-previous-employers">Hide Previous Employers</Label>
                    </div>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                      Recommended
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id="hide-dates" />
                      <Label htmlFor="hide-dates">Hide Graduation/Employment Dates</Label>
                    </div>
                    <Badge variant="outline" className="bg-blue-950/30 text-blue-400">
                      Optional
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-1">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </Button>
              <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Representation Analytics</CardTitle>
                  <CardDescription>Analyze diversity metrics across your organization</CardDescription>
                </div>
                <Select defaultValue="company">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">Entire Company</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Gender Distribution</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={representationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {representationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Ethnicity Distribution</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={ethnicityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {ethnicityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Diversity by Department vs. Industry</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="diversity" name="Your Company" fill="#3b82f6" />
                      <Bar dataKey="industry" name="Industry Average" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 p-4 border border-blue-500/30 bg-blue-950/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Diversity Insights</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your organization is performing above industry average in most departments. Consider focusing on
                      improving diversity in Engineering, which is slightly above industry average but below your
                      company's performance in other departments.
                    </p>
                    <Button size="sm" className="gap-1">
                      <LineChart className="h-4 w-4" />
                      View Detailed Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Export Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing component definition
function Download(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
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

